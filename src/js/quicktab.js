import extend from 'just-extend'
import Constants from './constants'
import Utils from './utils'
import OptionsSchema from './schema/options'
import TabSchema from './schema/tab'
import get from 'just-safe-get'
import set from 'just-safe-set'
import Storagetify from 'storagetify'
import Delegateify from 'delegateify'
import debounce from 'just-debounce-it'

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom'

class Quicktab {
  // 选项
  #options
  // 传入的id查找对应的元素
  #element
  // quicktab的真实的容器元素
  #containerEl
  // 整个工具条
  #toolbarEl
  // tab滚动区域包裹层
  #toolbarItemTabWrapperEl
  // 工具栏-item-下拉菜单按钮
  #toolbarItemDropdownEl
  // tab的面板区域包裹层
  #tabBodyEl
  // 缓存句柄
  #cacheHandle
  // tab持久化的缓存key
  #cacheKey
  // 初始化缓存选项
  #cacheDefaultTabsKey
  // 右键菜单的列表组
  #contextmenuEl
  // 下拉菜单的元素
  #dropdownEl
  // tab右键菜单floatui自动更新的监听器
  #contextmenuCleanup
  //下拉菜单floatui自动更新的监听器
  #dropdownCleanup
  //工具栏需要隐藏的项目
  #hideItemSelector

  //激活tab居中防抖函数
  #debounceCenterActive

  // 下拉菜单的一些组成部分
  #openTabsSubtitleEl
  #openTabsOriginalListEl
  #openTabsearchResultsEl
  #recentlyClosedTabsSubtitleEl
  #recentlyClosedTabsOriginalListEl
  #recentlyClosedTabssearchResultsEl
  #noResultsMessageEl

  // 用以存储最近关闭的缓存的key
  #cacheRecentlyClosedTabsKey

  // 实例集合
  static #instances = new Map()

  constructor(element, options) {
    options = (typeof options === 'object' && options) || {}

    if (typeof element === 'string') {
      //如果是字符串则当作是选择器
      this.#element = document.querySelector(element)
      if (!this.#element) {
        return Utils.notify(`Invalid element`)
      }
    } else {
      //直接是元素
      this.#element = element
    }

    //合并默认参数
    this.#options = extend(
      true,
      {},
      Constants.DEFAULTS,
      this.#parseDataOptions(),
      options,
    )

    //参数额外处理
    this.#optionsProcess(options)

    //参数验证
    const result = Utils.validate(OptionsSchema, this.#options)
    if (result !== true) {
      return Utils.notify(result)
    }

    if (Quicktab.#instances.has(this.#options.id)) {
      return Utils.notify(`The ID ${this.#options.id} has already been used`)
    }

    //立马隐藏挂载元素
    this.#element.style.setProperty('display', 'none')

    Quicktab.#instances.set(this.#options.id, this)

    //合并一下单个tab的选项,因为默认单个Tab选项可以只传递url,那么此时需要合并别的选项
    this.#options.defaultTabs = this.#options.defaultTabs.map((option) =>
      this.#tabOptionExtend(option),
    )

    this.#cacheKey = `${Constants.NAMESPACE}-${this.#options.id}`
    this.#cacheDefaultTabsKey = `${this.#cacheKey}-defaultTabs`
    this.#cacheRecentlyClosedTabsKey = `${this.#cacheKey}-recentlyClosed`
    this.#hideItemSelector = this.#options.responsive.hide?.map((item) => {
      return `.${Constants.CLASSES.toolbar} li.${item}`
    })

    //这里要注意：实例化多个实例的时候，页面大小可能会改变，会触发该防抖函数
    this.#debounceCenterActive = debounce(() => {
      this.scrollToTabByUrl(this.#getTabUrl(this.#getActiveTab()))
    }, 500)

    //初始化
    this.#init()

    //初始化完毕调用init
    this.#options.onInit.call(this)
  }

  // 选项的二次加处理
  #optionsProcess(options) {
    //处理responsive.hide,如果用户传递了该参数,那么直接替换整个数据而不是extend会从索引为0开始逐个替换,这是符合正常的人类逻辑
    const hideItemKey = 'responsive.hide'
    const hideVal = get(options, hideItemKey)
    if (hideVal !== undefined) {
      set(this.#options, hideItemKey, get(options, hideItemKey))
    }
  }

  // 获取选项参数
  #parseDataOptions() {
    return Utils.parseDataOptions(
      this.#element,
      Constants.OPTIONS.Default,
      'data-qt-',
    )
  }

  /**
   * public API
   * ====================================================
   */

  // 直接通过id可以得到实例
  static get(id) {
    return Quicktab.#instances.get(id)
  }

  /**
   * 关闭所有的可关闭的tabs
   */
  closeAllTabs() {
    this.#closeTabsByElements(this.#getTabs())
  }

  /**
   * 添加tab
   * @param {Object} option
   * @returns
   */
  addTab(option) {
    //参数合并
    option = this.#tabOptionExtend(option)

    const result = Utils.validate(TabSchema, option)
    if (result !== true) {
      return Utils.notify(result)
    }

    const url = option.url

    if (!this.#getTabByUrl(url)) {
      //如果这个tab不存在

      let maxNum = this.#options.tab.maxNum

      if (maxNum > 0) {
        let closableTabs = this.#getClosableTabs() //获取所有的可删除的tab

        if (maxNum === 1) {
          //如果只保留一个，那么就把所有的tab给删除掉,因为添加的当前tab将会作为最新的1个tab

          for (let tab of closableTabs) {
            this.#removeTabByUrl(this.#getTabUrl(tab))
          }
        } else {
          if (closableTabs.length >= maxNum) {
            //得到需要排除的tab
            closableTabs.slice(0, -(maxNum - 1)).forEach((tab) => {
              this.#removeTabByUrl(this.#getTabUrl(tab))
            })
          }
        }
      }

      const tabEl = Utils.createNode(this.#generateTabHtml(option))
      option.timestamp = Date.now()
      tabEl[Constants.DATAKEYS.tabOptionDataKey] = option
      this.#toolbarItemTabWrapperEl.appendChild(tabEl)

      //添加进缓存
      this.#addCacheTab(option)
    }

    //激活这个被添加的tab
    this.#activeTabByUrl(url, true)

    //滚动到tab所在位置
    this.scrollToTabByUrl(url)
  }

  /**
   * 根据url来关闭tab
   * @param {String} url
   */
  closeTabByUrl(url) {
    if (this.#isActiveTabByUrl(url)) {
      //判断是否是激活的tab

      //下一个即将激活的tab
      let nextTab
      let tab = this.#getTabByUrl(url)
      if (tab?.nextElementSibling) {
        //如果后面有就激活后面的
        nextTab = tab.nextElementSibling
      } else if (tab?.previousElementSibling) {
        nextTab = tab.previousElementSibling
      }

      //删除tab
      this.#removeTabByUrl(url)

      //激活tab
      this.#activeTabByUrl(this.#getTabUrl(nextTab))
    } else {
      this.#removeTabByUrl(url)
    }
  }

  /**
   * 根据url来激活tab
   * @param {String} url
   */
  activeTabByUrl(url) {
    this.#activeTabByUrl(url)
  }

  /**
   * 滚动到指定url对应的tab的位置
   * @param {String} url
   */
  scrollToTabByUrl(url) {
    this.#scrollToTabByUrl(url)
  }

  /**
   * 上滚动
   */
  prevScroll() {
    this.#toolbarItemTabWrapperEl.scrollTo({
      left:
        this.#toolbarItemTabWrapperEl.scrollLeft -
        this.#toolbarItemTabWrapperEl.offsetWidth,
      behavior: 'smooth',
    })
  }

  /**
   * 下滚动
   */
  nextScroll() {
    this.#toolbarItemTabWrapperEl.scrollTo({
      left:
        this.#toolbarItemTabWrapperEl.scrollLeft +
        this.#toolbarItemTabWrapperEl.offsetWidth,
      behavior: 'smooth',
    })
  }

  /**
   * 根据url来刷新tab
   * @param {String} url
   */
  refreshTabByUrl(url) {
    //判断tab是否存在，不存在则不执行

    if (!Utils.isDOMElement(this.#getTabByUrl(url))) {
      return
    }

    if (!this.#getTabPaneByUrl(url)) {
      this.#addTabPaneByUrl(url)
    } else {
      //首先必须尝试添加loading层
      this.#addLoadingByUrl(url)

      // 刷新逻辑
      !this.#getIFrameByUrl(url)
        ? this.#addIFrameByUrl(url)
        : this.#refreshIFrameByUrl(url)
    }
  }

  /**
   * 根据url全屏显示tab
   * @param {String} url
   */
  fullscreenTabByUrl(url) {
    this.#activeTabByUrl(url)
    this.#getTabPaneByUrl(url).requestFullscreen()
  }

  /**
   * 刷新当前激活的tab
   */
  refreshActiveTab() {
    this.refreshTabByUrl(this.#getTabUrl(this.#getActiveTab()))
  }

  /**
   * 当前激活的tab全屏显示
   */
  fullscreenActiveTab() {
    this.fullscreenTabByUrl(this.#getTabUrl(this.#getActiveTab()))
  }

  /**
   * 滚动到当前激活的tab所在位置
   */
  scrollToActiveTab() {
    this.scrollToTabByUrl(this.#getTabUrl(this.#getActiveTab()))
  }

  /**
   * 在浏览器新选项卡打开指定url的tab
   * @param {String} url
   */
  openNewTabByUrl(url) {
    window.open(url, '_blank')
  }

  /**
   * 关闭所有的除了指定url的选项卡
   * @param {String} url
   */
  closeAllTabsExceptByUrl(url) {
    this.#closeTabsByElements(
      this.#getTabs().filter((tab) => this.#getTabUrl(tab) !== url),
    )
  }

  /**
   * 关闭除了指定url的tab前面所有的选项卡
   * @param {String} url
   */
  closePrevAllTabsByUrl(url) {
    this.#closeTabsByElements(Utils.prevAll(this.#getTabByUrl(url)))
  }

  /**
   * 关闭除了指定url的tab后面所有的选项卡
   * @param {String} url
   */
  closeNextAllTabsByUrl(url) {
    this.#closeTabsByElements(Utils.nextAll(this.#getTabByUrl(url)))
  }

  /**
   * 获取指定url的tab的contentWindow对象
   * @param {String} url
   */
  getTabWindowByUrl(url) {
    const iframe = this.#getIFrameByUrl(url)
    if (this.#canAccessIFrame(iframe)) {
      return iframe.contentWindow
    }
    return undefined
  }

  /**
   * private API
   * ====================================================
   */

  /**
   * 根据传入的iframe的dom判断是否可以访问
   * @param {Element|Document} iframeEl
   * @returns
   */
  #canAccessIFrame(iframeEl) {
    return (
      Utils.isDOMElement(iframeEl) &&
      iframeEl[Constants.DATAKEYS.iframeLoaded] === true &&
      Utils.isSameOriginIframe(iframeEl)
    )
  }

  /**
   * 根据 DOM 元素数组关闭选项卡
   * @param {Array} tabElements - 包含选项卡 DOM 元素的数组
   */
  #closeTabsByElements(tabElements) {
    tabElements.forEach((tabEl) => {
      const tabUrl = this.#getTabUrl(tabEl)
      if (this.#isClosableTabByUrl(tabUrl)) {
        this.closeTabByUrl(tabUrl)
      }
    })
  }

  #getActiveTab() {
    return this.#getTabs().find((tabEl) =>
      tabEl.classList.contains(Constants.CLASSES.tabActive),
    )
  }

  #getTabs() {
    return Array.from(
      this.#toolbarItemTabWrapperEl.querySelectorAll(
        `button[${Constants.DATAKEYS.tabUrl}]`,
      ),
    )
  }

  /**
   * 判断是否是可关闭的tab
   * @param {String} url
   * @returns
   */
  #isClosableTabByUrl(url) {
    return this.#getTabByUrl(url)?.querySelector('svg') ? true : false
  }

  // 获取所有可关闭的tab
  #getClosableTabs() {
    return this.#getTabs().filter((tabEl) =>
      this.#isClosableTabByUrl(this.#getTabUrl(tabEl)),
    )
  }

  #getTabByUrl(url) {
    return this.#toolbarItemTabWrapperEl.querySelector(
      `[${Constants.DATAKEYS.tabUrl}="${url}"]`,
    )
  }

  #getTabPaneByUrl(url) {
    return this.#tabBodyEl.querySelector(
      `[${Constants.DATAKEYS.tabUrl}="${url}"]`,
    )
  }

  #getActiveTabPane() {
    return this.#tabBodyEl.querySelector(
      `li.${Constants.CLASSES.tabPaneActive}`,
    )
  }

  /**
   * 根据url来判断tab是否已经激活
   * @param {String} url
   * @returns
   */
  #isActiveTabByUrl(url) {
    return this.#getTabByUrl(url)?.classList.contains(
      Constants.CLASSES.tabActive,
    )
      ? true
      : false
  }

  // 关闭loading层
  #clsoeLoadingByUrl(url) {
    this.#getTabPaneByUrl(url)
      ?.querySelector(`.${Constants.CLASSES.overlays}`)
      ?.remove()
  }

  #init() {
    this.#initLocale()
    this.#initCache()
    this.#initContainer()
    this.#initContextmenu()
    this.#initDropdown()
    this.#initEvent()
    this.#initTabs()
  }

  #initDropdown() {
    if (this.#options.toolbar.dropdown.enable === false) return

    const dropdownOptions = this.#options.toolbar.dropdown

    //组织html
    const html = [Utils.sprintf(Constants.HTML.dropdown[0], this.#options.id)]

    const placeholderText =
      dropdownOptions.searchInput.placeholder.trim() !== ''
        ? dropdownOptions.searchInput.placeholder
        : this.#options.formatSearchInputPlaceholder()

    html.push(
      Utils.sprintf(
        Constants.HTML.dropdownHeader,
        dropdownOptions.searchInput.prefixIcon,
        placeholderText,
      ),
    )

    // 加入body的开始标记
    html.push(Constants.HTML.dropdownBody[0])

    //打开的标签的副标题
    const openedTabsText =
      dropdownOptions.openedTabs.text.trim() !== ''
        ? dropdownOptions.openedTabs.text
        : this.#options.formatOpenedTabs()

    html.push(
      Utils.sprintf(Constants.HTML.dropdownBodySticky, '', openedTabsText, ''),
    )

    //插入两个section(一个存储原来的结果，一个是展示搜索结果，展示搜索结果的默认要隐藏)
    html.push(Constants.HTML.dropdownBodySection)
    html.push(
      Utils.setProperty(
        Constants.HTML.dropdownBodySection,
        ['.section'],
        'display',
        'none',
      ),
    )

    //插入第二个副标题
    const recentlyClosedTabsText =
      dropdownOptions.recentlyClosedTabs.text.trim() !== ''
        ? dropdownOptions.recentlyClosedTabs.text
        : this.#options.formatRecentlyClosedTabs()

    html.push(
      Utils.sprintf(
        Constants.HTML.dropdownBodySticky,
        Constants.CLASSES.dropdownBodyStickyHasIcon,
        recentlyClosedTabsText,
        Utils.sprintf(
          Constants.HTML.iconWrapper,
          'tabindex="0"',
          dropdownOptions.recentlyClosedTabs.hideIcon,
        ),
      ),
    )

    //这两个section外面再套一个div
    html.push('<div>')
    //再插入两个section
    html.push(Constants.HTML.dropdownBodySection)
    html.push(
      Utils.setProperty(
        Constants.HTML.dropdownBodySection,
        ['.section'],
        'display',
        'none',
      ),
    )
    html.push('</div>')

    //再插入一个无数据时的dom
    const noResultsText =
      dropdownOptions.emptyText.trim() !== ''
        ? dropdownOptions.emptyText
        : this.#options.formatSearchNoResults()

    html.push(Utils.sprintf(Constants.HTML.dropdownEmpty, noResultsText))

    html.push(Constants.HTML.dropdownBody[1])

    html.push(Constants.HTML.dropdown[1])

    //插入到body中去
    document.body.insertAdjacentHTML('beforeEnd', html.join(''))

    //查找右键菜单
    this.#dropdownEl = document.querySelector(
      `[${Constants.DATAKEYS.dropdown}="${this.#options.id}"]`,
    )

    //查找一些必须的元素

    const allSticky = this.#dropdownEl.querySelectorAll('.sticky')
    const allSection = this.#dropdownEl.querySelectorAll('ul.section')

    this.#openTabsSubtitleEl = allSticky[0]
    this.#openTabsOriginalListEl = allSection[0]
    this.#openTabsearchResultsEl = allSection[1]
    this.#recentlyClosedTabsSubtitleEl = allSticky[1]
    this.#recentlyClosedTabsOriginalListEl = allSection[2]
    this.#recentlyClosedTabssearchResultsEl = allSection[3]
    this.#noResultsMessageEl = this.#dropdownEl.querySelector('.empty')
  }

  #initLocale() {
    if (this.#options.lang) {
      const langs = Quicktab.LANGS

      const parts = this.#options.lang.split(/-|_/)

      parts[0] = parts[0].toLowerCase()
      if (parts[1]) {
        parts[1] = parts[1].toUpperCase()
      }

      let langsToExtend = {}

      if (langs[this.#options.lang]) {
        langsToExtend = langs[this.#options.lang]
      } else if (langs[parts.join('-')]) {
        langsToExtend = langs[parts.join('-')]
      } else if (langs[parts[0]]) {
        langsToExtend = langs[parts[0]]
      }

      for (const [formatName, func] of Object.entries(langsToExtend)) {
        if (this.#options[formatName] !== Quicktab.DEFAULTS[formatName]) {
          continue
        }
        this.#options[formatName] = func
      }
    }
  }

  //合并单个tab的选项
  #tabOptionExtend(option) {
    return Object.assign(
      { [Constants.CLASSES.tabActive]: false },
      Constants.OPTIONS.TabDefault,
      option,
    )
  }

  #initCache() {
    this.#cacheHandle = new Storagetify({
      type: this.#options.cacheType,
    })
  }

  #initEvent() {
    let that = this

    const d_document = new Delegateify(document)

    const events = ['click', 'contextmenu', 'scroll', 'touchstart', 'dragstart']

    events.forEach((event) => {
      d_document.on(event, function (event) {
        const clickedElement = event.target
        const eventType = event.type

        //上面的这几种事件全部都要关闭tab的右键菜单
        that.#closeContextmenu()

        if (['click', 'dragstart'].includes(eventType)) {
          //对于下拉菜单只处理点击和拖拽用户体验比较好
          if (
            !that.#dropdownEl?.contains(clickedElement) &&
            !that.#toolbarItemDropdownEl?.contains(clickedElement)
          ) {
            that.#closeDropdown()
          }
        }
      })
    })

    //响应式处理
    Utils.onResize(
      this.#element.parentNode,
      function (entry) {
        //关闭tab右键菜单和下拉菜单
        that.#closeContextmenu()
        that.#closeDropdown()

        if (that.#options.responsive.enable !== false) {
          //如果启用了响应式就动态设置显示和隐藏
          Utils.setProperty(
            that.#containerEl,
            that.#hideItemSelector,
            'display',
            entry.contentRect.width < that.#options.responsive.breakpoint
              ? 'none'
              : null,
          )
        }

        if (that.#options.tab.resizeCenterActive === true) {
          that.#debounceCenterActive()
        }
      },
      {
        type: 'width',
      },
    )

    //添加通过html属性添加tab的能力(这个非常方便)
    that.#dataAttrAddTabEventRegister(document, Constants.DATAKEYS.addTabTarget)

    //事件委托监听loading过渡完毕
    new Delegateify(this.#containerEl).on(
      'transitionend',
      `.${Constants.CLASSES.tabBody} .${Constants.CLASSES.overlays}`,
      function (event) {
        if (event.target === event.matchedTarget) {
          const maskEl = event.target

          const url = that.#getTabUrl(maskEl)

          maskEl.remove()

          //tab过渡完毕事件回调
          that.#options.onTabLoadingTransitionend.call(that, url)
        }
      },
    )

    //双击事件处理函数
    let tabDoubleClickHandle = null
    if (that.#options.tab.doubleClick.enable === true) {
      tabDoubleClickHandle = function () {
        const url = that.#getTabUrl(this)

        if (that.#options.tab.doubleClick.refresh === true) {
          that.refreshTabByUrl(url)
        }
        //双击事件回调
        that.#options.onTabDoubleClick.call(that, url)
      }
    }

    new Delegateify(this.#toolbarItemTabWrapperEl).on(
      'click',
      'button',
      Utils.handleClickAndDoubleClick(function () {
        let url = that.#getTabUrl(this)

        //tab被单击的回调
        that.#options.onTabClick.call(that, url)

        //激活
        that.#activeTabByUrl(url)

        //滚动到tab所在位置
        if (that.#options.tab.clickCenterActive === true) {
          that.scrollToTabByUrl(url)
        }
      }, tabDoubleClickHandle),
    )

    //tab关闭事件
    if (this.#options.tab.closeBtn.enable !== false) {
      new Delegateify(this.#toolbarItemTabWrapperEl).on(
        'click',
        `button > svg`,
        function (event) {
          event.stopPropagation() //必须要阻止事件的冒泡,否则会冲突

          let tab = this.parentNode
          //因为阻止了事件的冒泡传递，因此，需要手动关闭右键菜单
          that.#closeContextmenu()
          that.closeTabByUrl(that.#getTabUrl(tab))
        },
      )
    }

    //给工具栏绑定事件
    new Delegateify(this.#toolbarEl).on('click', `li > button`, function () {
      let classItem = this.parentNode.getAttribute('class')

      switch (classItem) {
        case 'fullscreen':
          that.fullscreenActiveTab()
          break
        case 'prev':
          that.prevScroll()
          break
        case 'refresh':
          that.refreshActiveTab()
          break
        case 'next':
          that.nextScroll()
          break
        case 'dropdown':
          that.#toggleDropdown()
          break
      }
    })

    //鼠标滚动切换
    if (this.#options.tab.mouseWheelSwitch.enable !== false) {
      //鼠标滚轮切换tab功能启用

      let centerTabEl
      const withTabPaneDebounce = debounce(function (event) {
        const activeTab = that.#getActiveTab()
        const prev = activeTab.previousElementSibling
        const next = activeTab.nextElementSibling

        // 判断滚轮方向，负值表示向上滚动，正值表示向下滚动
        const direction = Math.sign(event.deltaY)

        if (direction === -1 && prev) {
          that.#activeTabByUrl(that.#getTabUrl(prev))
          centerTabEl = prev
        } else if (direction === 1 && next) {
          that.#activeTabByUrl(that.#getTabUrl(next))
          centerTabEl = next
        }
        that.scrollToTabByUrl(that.#getTabUrl(centerTabEl))
      }, 200)

      this.#toolbarItemTabWrapperEl.addEventListener(
        'wheel',
        function (event) {
          event.preventDefault() //阻止默认事件，否则它会被外部的滚动条影响

          //判断是否启用右键菜单，如果启用就要关闭
          if (that.#options.tab.contextmenu !== false) {
            that.#closeContextmenu()
          }
          if (that.#options.tab.mouseWheelSwitch.onlyScroll === true) {
            //如果只是滚动
            that.#toolbarItemTabWrapperEl.scrollLeft +=
              (event.deltaY || event.detail || -event.wheelDelta) / 2
          } else {
            withTabPaneDebounce(event)
          }
        },
        { passive: false },
      ) //{ passive: false }解决控制台的警告错误
    }

    //是否启用右键菜单功能
    if (this.#options.tab.contextmenu.enable !== false) {
      //tab右键的事件委托
      new Delegateify(this.#toolbarItemTabWrapperEl).on(
        'contextmenu',
        'button',
        function (event) {
          let tabEl = this

          event.preventDefault()
          event.stopPropagation() //必须要防止冒泡,防止和外部的右键事件冲突

          //显示右键菜单
          that.#showContextmenuByUrl(that.#getTabUrl(tabEl))
        },
      )

      const v_contextmenu = new Delegateify(this.#contextmenuEl)
      const contextmenuEvents = ['click', 'contextmenu', 'touchstart']
      contextmenuEvents.forEach((event) => {
        v_contextmenu.on(
          event,
          `li[${Constants.DATAKEYS.tabUrl}]`,
          function (event) {
            if (event.type === 'contextmenu') {
              event.preventDefault()
            }
            const url = that.#getTabUrl(this)
            const itemClass = this.getAttribute('class')

            switch (itemClass) {
              case 'refresh':
                that.refreshTabByUrl(url)
                break
              case 'other':
                that.closeAllTabsExceptByUrl(url)
                break
              case 'prev':
                that.closePrevAllTabsByUrl(url)
                break
              case 'next':
                that.closeNextAllTabsByUrl(url)
                break
              case 'all':
                that.closeAllTabs()
                break
              case 'new-blank':
                that.openNewTabByUrl(url)
                break
              case 'fullscreen':
                that.fullscreenTabByUrl(url)
                break
              case 'center-active':
                that.scrollToActiveTab()
                break
              case 'close':
                that.closeTabByUrl(url)
                break
            }
          },
        )
      })
    }

    //如果启用拖动排序
    if (this.#options.tab.dragSort === true) {
      //当前拖动的元素
      let dragging = null

      new Delegateify(this.#toolbarItemTabWrapperEl).on(
        'dragstart',
        function (event) {
          dragging = event.target
        },
      )

      //拖拽移动中
      new Delegateify(this.#toolbarItemTabWrapperEl).on(
        'dragover',
        function (event) {
          event.preventDefault()
          // 默认无法将数据/元素放置到其他元素中。如果需要设置允许放置，必须阻止对元素的默认处理方式

          let target = event.target

          //当前拖动的元素是li 且不等于
          if (target.nodeName === 'BUTTON' && target !== dragging) {
            // 获取初始位置
            let targetRect = target.getBoundingClientRect()
            let draggingRect = dragging.getBoundingClientRect()

            if (target) {
              // 判断是否动画元素
              if (target.animated) {
                return
              }
            }

            if (Utils.index(dragging) < Utils.index(target)) {
              // 目标比元素大，插到其后面
              // extSibling下一个兄弟元素
              target.parentNode.insertBefore(dragging, target.nextSibling)
            } else {
              // 目标比元素小，插到其前面
              target.parentNode.insertBefore(dragging, target)
            }
            Utils.animate(draggingRect, dragging)
            Utils.animate(targetRect, target)
          }
        },
      )

      //拖拽结束
      new Delegateify(this.#toolbarItemTabWrapperEl).on('dragend', function () {
        dragging = null

        //判断是否启用了tab缓存
        if (that.#options.tab.remember === true) {
          that.#cacheHandle.delete(that.#cacheKey)

          that.#getTabs().forEach((item) => {
            const option = extend(
              true,
              {},
              item[Constants.DATAKEYS.tabOptionDataKey],
            )
            delete option.timestamp
            that.#addCacheTab(option)
          })
        }
      })
    }

    //下拉菜单的相关事件
    if (this.#options.toolbar.dropdown.enable !== false) {
      //是否进行正在合成
      let isComposing = false

      //点击最近关闭折叠
      new Delegateify(this.#dropdownEl).on(
        'click',
        '.has-icon',
        function (event) {
          const ul = this.nextElementSibling
          const iconWrapper = this.querySelector('.icon-wrapper')
          iconWrapper.focus()

          if (ul.style.display === 'none') {
            iconWrapper.innerHTML =
              that.#options.toolbar.dropdown.recentlyClosedTabs.hideIcon
            ul.style.display = 'block'
          } else {
            iconWrapper.innerHTML =
              that.#options.toolbar.dropdown.recentlyClosedTabs.showIcon
            ul.style.display = 'none'
          }
        },
      )

      const inputElementSelector = '.header input'
      //input框的事件
      new Delegateify(this.#dropdownEl).on(
        'input',
        inputElementSelector,
        function () {
          if (isComposing) return
          that.#search(this.value)
        },
      )

      new Delegateify(this.#dropdownEl).on(
        'compositionstart',
        inputElementSelector,
        function () {
          isComposing = true
        },
      )

      new Delegateify(this.#dropdownEl).on(
        'compositionend',
        inputElementSelector,
        function () {
          isComposing = false
          that.#search(this.value)
        },
      )

      //每个tab的点击事件
      new Delegateify(this.#dropdownEl).on('click', '.section li', function () {
        const option = this[Constants.DATAKEYS.tabOptionDataKey]

        that.addTab({
          title: option.title,
          url: option.url,
          closable: option.closable,
        })

        //点击完毕后关闭下拉菜单
        that.#closeDropdown()
      })

      //tab的关闭按钮被单击
      new Delegateify(this.#dropdownEl).on(
        'click',
        '.section li .icon-wrapper',
        function (event) {
          event.stopPropagation()

          const tabLiEl = this.parentNode

          const option = tabLiEl[Constants.DATAKEYS.tabOptionDataKey]

          that.closeTabByUrl(option.url)

          tabLiEl.remove()
        },
      )
    }
  }

  #restoreBodyElement(element, resultsEl, subtitleEl) {
    element.style.display = 'block'
    subtitleEl.style.display = 'block'
    resultsEl.style.display = 'none'
  }

  #highlightKeyword(text, keyword) {
    const regex = new RegExp(`(${keyword})`, 'gi')
    return text.replace(regex, '<span class="highlighted">$1</span>')
  }

  // 匹配关键词高亮
  #matchKeyword(keyword, element, resultsEl, subtitleEl) {
    let hasResults = false

    Array.from(element.children).forEach((li) => {
      const title = li.querySelector('.title').textContent
      const url = li.querySelector('.url').textContent.toLowerCase()

      if (
        title.toLowerCase().includes(keyword) ||
        url.toLowerCase().includes(keyword)
      ) {
        hasResults = true

        // console.log(li[Constants.DATAKEYS.tabOptionDataKey]);

        let matchLi = li.cloneNode(true)

        //bugfix:克隆会导致自定义属性丢失,重新赋值
        matchLi[Constants.DATAKEYS.tabOptionDataKey] =
          li[Constants.DATAKEYS.tabOptionDataKey]

        matchLi.querySelector('.title').innerHTML = this.#highlightKeyword(
          title,
          keyword,
        )
        matchLi.querySelector('.url').innerHTML = this.#highlightKeyword(
          url,
          keyword,
        )

        resultsEl.appendChild(matchLi)
      }
    })

    if (hasResults) {
      resultsEl.style.display = 'block'
      subtitleEl.style.display = 'block'
      element.style.display = 'none'
    } else {
      resultsEl.style.display = 'none'
      element.style.display = 'none'
      subtitleEl.style.display = 'none'
    }

    return hasResults
  }

  #search(keyword) {
    keyword = keyword.toLowerCase()

    //先清空
    this.#openTabsearchResultsEl.innerHTML = ''
    this.#recentlyClosedTabssearchResultsEl.innerHTML = ''

    if (keyword.trim() !== '') {
      let results1 = false
      let results2 = false

      results1 = this.#matchKeyword(
        keyword,
        this.#openTabsOriginalListEl,
        this.#openTabsearchResultsEl,
        this.#openTabsSubtitleEl,
      )
      results2 = this.#matchKeyword(
        keyword,
        this.#recentlyClosedTabsOriginalListEl,
        this.#recentlyClosedTabssearchResultsEl,
        this.#recentlyClosedTabsSubtitleEl,
      )

      if (results1 === false && results2 === false) {
        //说明两个都没找到结果
        this.#noResultsMessageEl.style.display = 'block'
      } else {
        this.#noResultsMessageEl.style.display = 'none'
      }
    } else {
      //隐藏结果
      this.#noResultsMessageEl.style.display = 'none'

      this.#restoreBodyElement(
        this.#openTabsOriginalListEl,
        this.#openTabsearchResultsEl,
        this.#openTabsSubtitleEl,
      )
      this.#restoreBodyElement(
        this.#recentlyClosedTabsOriginalListEl,
        this.#recentlyClosedTabssearchResultsEl,
        this.#recentlyClosedTabsSubtitleEl,
      )
    }
  }

  // 从元素的data属性上获取Url
  #getTabUrl(element) {
    return element?.getAttribute(Constants.DATAKEYS.tabUrl)
  }

  #toggleDropdown() {
    if (this.#dropdownEl.classList.contains(Constants.CLASSES.dropdownActive)) {
      this.#closeDropdown()
    } else {
      this.#prepareDropdownData()
      this.#showDropdown()
    }
  }

  // 准备下拉菜单的数据
  #prepareDropdownData() {
    const allOpenedTabs = []

    this.#getTabs()?.forEach((tabEl) => {
      allOpenedTabs.push(tabEl[Constants.DATAKEYS.tabOptionDataKey])
    })

    // 未激活的,按照timestamp从小到大排序
    const newOrderTabs = allOpenedTabs
      .filter((tab) => tab.active === false)
      .sort((a, b) => b.timestamp - a.timestamp)

    const ativeTabs = allOpenedTabs.find((tab) => tab.active === true)
    if (ativeTabs) {
      newOrderTabs.push(ativeTabs)
    }

    const closeBtnTpl = Utils.sprintf(
      Constants.HTML.iconWrapper,
      '',
      this.#options.toolbar.dropdown.openedTabs.closeIcon,
    )

    //创建两个虚拟节点
    const openTabsFrag = document.createDocumentFragment()

    const timeFormatOptions = this.#options.toolbar.dropdown.timeFormat

    //国际化时间文本
    const customText = {
      second:
        timeFormatOptions.seconds.trim() !== ''
          ? timeFormatOptions.seconds
          : this.#options.formatTimeSeconds(),
      minutes:
        timeFormatOptions.minutes.trim() !== ''
          ? timeFormatOptions.minutes
          : this.#options.formatTimeMinutes(),
      hours:
        timeFormatOptions.hours.trim() !== ''
          ? timeFormatOptions.hours
          : this.#options.formatTimeHours(),
      days:
        timeFormatOptions.days.trim() !== ''
          ? timeFormatOptions.days
          : this.#options.formatTimeDays(),
      months:
        timeFormatOptions.months.trim() !== ''
          ? timeFormatOptions.months
          : this.#options.formatTimeMonths(),
      years:
        timeFormatOptions.year.trim() !== ''
          ? timeFormatOptions.year
          : this.#options.formatTimeYear(),
    }

    newOrderTabs.forEach((item, index) => {
      const dropdownItemEl = Utils.createNode(
        Utils.sprintf(
          Constants.HTML.sectionItem,
          index === 0 ? Constants.CLASSES.dropdownActive : '',
          item.title,
          item.url,
          Utils.timeAgo(item.timestamp, customText),
          item.closable === true ? closeBtnTpl : '',
        ),
      )

      dropdownItemEl[Constants.DATAKEYS.tabOptionDataKey] = item
      openTabsFrag.appendChild(dropdownItemEl)
    })

    this.#openTabsOriginalListEl.replaceChildren(openTabsFrag)

    //然后准备最近关闭的标签
    const recentlyClosedTabsFrag = document.createDocumentFragment()
    //获取最近关闭的tabs
    this.#cacheHandle
      .get(this.#cacheRecentlyClosedTabsKey)
      ?.sort((a, b) => b.timestamp - a.timestamp)
      .forEach((item) => {
        const recentlyClosedTabEl = Utils.createNode(
          Utils.sprintf(
            Constants.HTML.sectionItem,
            '',
            item.title,
            item.url,
            Utils.timeAgo(item.timestamp, customText),
            '',
          ),
        )

        recentlyClosedTabEl[Constants.DATAKEYS.tabOptionDataKey] = item

        recentlyClosedTabsFrag.appendChild(recentlyClosedTabEl)
      })

    this.#recentlyClosedTabsOriginalListEl.replaceChildren(
      recentlyClosedTabsFrag,
    )
  }

  //显示下拉菜单
  #showDropdown() {
    this.#dropdownCleanup?.()
    // 注册菜单自动更新位置
    this.#dropdownCleanup = autoUpdate(
      this.#toolbarItemDropdownEl,
      this.#dropdownEl,
      this.#updatePosition.bind(
        this,
        this.#toolbarItemDropdownEl,
        this.#dropdownEl,
        'bottom-end',
      ),
    )

    this.#dropdownEl.classList.add(Constants.CLASSES.dropdownActive)

    this.#containerEl.classList.add(Constants.CLASSES.dropdownPEN)

    //关闭tab的右键菜单
    this.#closeContextmenu()
  }

  //关闭右键菜单
  #closeDropdown() {
    this.#dropdownCleanup?.()
    this.#dropdownEl?.classList.remove(Constants.CLASSES.dropdownActive)
    this.#containerEl.classList.remove(Constants.CLASSES.dropdownPEN)
  }

  //显示右键菜单
  #showContextmenuByUrl(url) {
    //判断关闭当前菜单选项是否被启用
    if (this.#options.tab.contextmenu.close !== false) {
      const listGroupCloseItemEl = this.#contextmenuEl.querySelector(
        `.${Constants.CLASSES.listGroupCloseItem}`,
      )
      const enableSeparator =
        this.#options.tab.contextmenu.close.separator === true

      if (this.#isClosableTabByUrl(url)) {
        listGroupCloseItemEl.style.setProperty('display', null) //是可关闭的，因此需要显示右键菜单的关闭当前
        enableSeparator &&
          listGroupCloseItemEl.nextElementSibling.style.setProperty(
            'display',
            null,
          )
      } else {
        listGroupCloseItemEl.style.setProperty('display', 'none')
        enableSeparator &&
          listGroupCloseItemEl.nextElementSibling.style.setProperty(
            'display',
            'none',
          )
      }
    }

    const tabEl = this.#getTabByUrl(url)

    this.#contextmenuCleanup?.()

    // 注册菜单自动更新位置
    this.#contextmenuCleanup = autoUpdate(
      tabEl,
      this.#contextmenuEl,
      this.#updatePosition.bind(this, tabEl, this.#contextmenuEl, 'top'),
    )

    //显示右键菜单
    this.#contextmenuEl.classList.add(Constants.CLASSES.listGroupActive)

    //给iframe添加蒙层
    this.#containerEl.classList.add(Constants.CLASSES.contextmenuPEN)

    //把url属性也给每一个列表项目设置一遍，方便后续事件的处理
    this.#contextmenuEl.querySelectorAll('li').forEach(function (li) {
      li.setAttribute(Constants.DATAKEYS.tabUrl, url)
    })

    //关闭下拉菜单
    this.#closeDropdown()
  }

  //关闭右键菜单
  #closeContextmenu() {
    this.#contextmenuCleanup?.()
    this.#contextmenuEl?.classList.remove(Constants.CLASSES.listGroupActive)
    this.#containerEl.classList.remove(Constants.CLASSES.contextmenuPEN)
  }

  #updatePosition(referenceEl, floatingEl, placement = 'top') {
    computePosition(referenceEl, floatingEl, {
      placement: placement,
      strategy: 'fixed', // 默认是'absolute'
      middleware: [
        offset(3), //offset(6)必须放在数组最前面，官方文档提示
        flip(),
        shift({ padding: 10 }),
        // arrow({element: arrowElement})
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    })
  }

  #initContainer() {
    const toolbarTabWrapperOpsKey = 'tabWrapper'
    const toolbarItemClassMap = {
      prev: Constants.CLASSES.toolbarPrevItem,
      refresh: Constants.CLASSES.toolbarRefreshItem,
      [toolbarTabWrapperOpsKey]: Constants.CLASSES.toolbarTabWrapperItem,
      next: Constants.CLASSES.toolbarNextItem,
      dropdown: Constants.CLASSES.toolbarDropdownItem,
      fullscreen: Constants.CLASSES.toolbarFullscreenItem,
    }

    let html = [Utils.sprintf(Constants.HTML.container[0], this.#options.id)]

    const toolbarHtml = [
      Utils.sprintf(
        Constants.HTML.toolbar[0],
        this.#options.toolbar.hide === true
          ? Constants.CLASSES.toolbarHide
          : '',
      ),
    ]

    Utils.getEnabledAndSortedOpsKey(
      this.#options.toolbar,
      toolbarItemClassMap,
    ).map((key) => {
      toolbarHtml.push(
        Utils.sprintf(
          Constants.HTML.toolbarItem,
          toolbarItemClassMap[key],
          key === toolbarTabWrapperOpsKey
            ? ''
            : `<button>${this.#options.toolbar[key].icon}</button>`,
        ),
      )
    })
    //加入工具栏的结尾
    toolbarHtml.push(Constants.HTML.toolbar[1])

    //排序实现
    const pos = this.#options.toolbar.position

    if (pos === 'bottom') {
      toolbarHtml.unshift(Constants.HTML.tabBody)
    } else if (pos === 'top') {
      toolbarHtml.push(Constants.HTML.tabBody)
    }

    html.push(...toolbarHtml)

    html.push(Constants.HTML.container[1])

    html = html.join('') //转换成字符串

    // 隐藏特定的项目
    if (
      this.#options.responsive.enable !== false &&
      this.#element.parentNode.getBoundingClientRect().width <
        this.#options.responsive.breakpoint
    ) {
      html = Utils.setProperty(html, this.#hideItemSelector, 'display', 'none')
    }

    //设置容器的尺寸
    const { height, width, minHeight } = this.#options

    const containerSelector = `[${Constants.DATAKEYS.container}="${this.#options.id}"]`

    html = Utils.setProperty(html, [containerSelector], 'height', height)
    html = Utils.setProperty(html, [containerSelector], 'width', width)
    html = Utils.setProperty(html, [containerSelector], 'min-height', minHeight)

    //插入到挂载元素之后
    this.#element.insertAdjacentHTML('afterend', html)

    this.#containerEl = document.querySelector(containerSelector)

    //查找一些需要的dom
    this.#toolbarEl = this.#containerEl.querySelector(
      `.${Constants.CLASSES.toolbar}`,
    )
    this.#toolbarItemTabWrapperEl = this.#containerEl.querySelector(
      `.${Constants.CLASSES.toolbar} li.${Constants.CLASSES.toolbarTabWrapperItem}`,
    )
    this.#tabBodyEl = this.#containerEl.querySelector(
      `.${Constants.CLASSES.tabBody}`,
    )

    //下拉菜单的按钮,弹出下拉菜单时需要使用
    this.#toolbarItemDropdownEl = this.#toolbarEl.querySelector(
      `.${Constants.CLASSES.toolbarDropdownItem} button`,
    )

    // console.log(this.#toolbarEl);
    // console.log(this.#toolbarItemTabWrapperEl);
    // console.log(this.#tabBodyEl);
    // console.log(this.#toolbarItemDropdownEl);
  }

  #initContextmenu() {
    if (this.#options.tab.contextmenu.enable === false) return

    const listGroupItemMap = {
      close: {
        class: Constants.CLASSES.listGroupCloseItem,
        text: this.#options.formatContextmenuClose(),
      },
      closeOthers: {
        class: Constants.CLASSES.listGroupCloseOtherItem,
        text: this.#options.formatContextmenuCloseOthers(),
      },
      closePrev: {
        class: Constants.CLASSES.listGroupClosePrevItem,
        text: this.#options.formatContextmenuClosePrev(),
      },
      closeNext: {
        class: Constants.CLASSES.listGroupCloseNextItem,
        text: this.#options.formatContextmenuCloseNext(),
      },
      closeAll: {
        class: Constants.CLASSES.listGroupCloseAllItem,
        text: this.#options.formatContextmenuCloseAll(),
      },
      fullscreen: {
        class: Constants.CLASSES.listGroupFullscreenItem,
        text: this.#options.formatContextmenuFullscreen(),
      },
      refresh: {
        class: Constants.CLASSES.listGroupRefreshItem,
        text: this.#options.formatContextmenuRefresh(),
      },
      centerActive: {
        class: Constants.CLASSES.listGroupCenterActiveItem,
        text: this.#options.formatContextmenuCenterActive(),
      },
      newBlank: {
        class: Constants.CLASSES.listGroupNewBlankItem,
        text: this.#options.formatContextmenuNewBlank(),
      },
    }

    const html = [Utils.sprintf(Constants.HTML.listGroup[0], this.#options.id)]

    Utils.getEnabledAndSortedOpsKey(
      this.#options.tab.contextmenu,
      listGroupItemMap,
    ).map((key) => {
      //开始组装字符串

      //根据key把配置项都解构出来
      const { text, separator } = this.#options.tab.contextmenu[key]

      let formatText = listGroupItemMap[key].text
      if (text !== '') {
        formatText = text
      }
      html.push(
        Utils.sprintf(
          Constants.HTML.listGroupItem,
          listGroupItemMap[key].class,
          formatText,
        ) + (separator ? Constants.HTML.listGroupSeparatorItem : ''),
      )
    })

    html.push(Constants.HTML.listGroup[1])

    //插入到body中去
    document.body.insertAdjacentHTML('beforeEnd', html.join(''))

    //查找右键菜单
    this.#contextmenuEl = document.querySelector(
      `[${Constants.DATAKEYS.contextmenu}="${this.#options.id}"]`,
    )
  }

  #initTabs() {
    const defaultTabs = this.#options.defaultTabs
    const cacheTabs = this.#cacheHandle.get(this.#cacheKey) //获取缓存中的tab
    const cacheDefaultTabs = this.#cacheHandle.get(this.#cacheDefaultTabsKey) //获取缓存中的tab

    if (this.#options.tab.remember === false) {
      const cacheStores = ['local', 'session']
      const cacheKeys = [this.#cacheKey, this.#cacheDefaultTabsKey]

      for (const store of cacheStores) {
        for (const key of cacheKeys) {
          this.#cacheHandle.store(store).delete(key)
        }
      }

      this.#restoreTabs(defaultTabs)

      return
    }

    if (
      cacheTabs !== null &&
      cacheDefaultTabs !== null &&
      this.#cacheTabsCheck(cacheTabs) &&
      JSON.stringify(defaultTabs) === JSON.stringify(cacheDefaultTabs)
    ) {
      //这里是缓存数据一切正常的情况下,直接回显就行
      this.#restoreTabs(cacheTabs, this.#getCacheActiveTab()?.url)
    } else {
      //必须先设置一遍缓存
      this.#cacheHandle.set(this.#cacheKey, defaultTabs)
      this.#restoreTabs(defaultTabs)
      this.#cacheHandle.set(this.#cacheDefaultTabsKey, defaultTabs)
    }
  }

  //检测缓存中的tab的合法性
  #cacheTabsCheck(tabs) {
    //要检查的键数组
    let targetKeys = [
      ...Object.keys(Constants.OPTIONS.TabDefault),
      Constants.CLASSES.tabActive,
    ]

    return tabs.every((obj) =>
      targetKeys.every((key) => Object.hasOwnProperty.call(obj, key)),
    )
  }

  /**
   * 恢复tab
   * @param {Array} options tab选项数组
   * @param {String} url 将要激活tab的url,不传将设置options中的最后一项
   * @returns
   */
  #restoreTabs(options, url = '') {
    if (!Array.isArray(options) || options.length === 0) {
      return
    }

    //创建两个虚拟节点
    const tabFrag = document.createDocumentFragment()

    //这里只添加所有的tab，不添加iframe,否则全部加载iframe将会卡爆(重点优化)
    options.forEach((option, index) => {
      //克隆
      option = extend(true, {}, option)

      const tabNode = Utils.createNode(this.#generateTabHtml(option))

      //插入一个时间参数，并把整个对象再次存到这个dom节点对象上,是下拉菜单功能需要使用
      if (!Object.hasOwnProperty.call(option, 'timestamp')) {
        option.timestamp = +`${Date.now()}.${index + 1}`
      }

      tabNode[Constants.DATAKEYS.tabOptionDataKey] = option
      tabFrag.appendChild(tabNode)
    })

    //添加虚拟节点到tab的容器里面
    this.#toolbarItemTabWrapperEl.appendChild(tabFrag)

    // 默认激活最后一项
    url = url || options.slice(-1)?.[0]?.url

    //激活最后一个
    this.#activeTabByUrl(url, false, false)

    //滚动到激活tab所在位置
    this.#scrollToTabByUrl(url, 'auto')
  }

  //通过data属性快速添加tab事件注册
  #dataAttrAddTabEventRegister(doc, targetKey) {
    const that = this
    //同时给子页面绑定快速打开tab的事件
    new Delegateify(doc).on(
      'click',
      `[${Constants.DATAKEYS.addTabUrl}][${targetKey}]`,
      function (event) {
        event.preventDefault()
        const target = this
        const targetID = target.getAttribute(targetKey).replace(/^#/, '')
        const url = target.getAttribute(Constants.DATAKEYS.addTabUrl)
        const title = target.getAttribute(Constants.DATAKEYS.addTabTitle)
        const closable = target.getAttribute(Constants.DATAKEYS.addTabClosable)

        if (Quicktab.#instances.has(targetID)) {
          let option = {
            ...(url !== null && { url }),
            ...(title !== null && { title }),
            ...(closable !== null &&
              (closable === 'true' || closable === 'false') && {
                closable: closable === 'true',
              }),
          }

          option = that.#tabOptionExtend(option)

          Quicktab.#instances.get(targetID).addTab(option)
        }
      },
    )
  }

  //单纯的只做删除的工作
  #removeTabByUrl(url) {
    //添加进最近关闭的缓存
    this.#cacheRecentlyClosedByUrl(url)

    //删除tab
    this.#getTabByUrl(url)?.remove()

    //删除面板
    this.#removeTabPaneByUrl(url)

    //删除缓存里的tab
    this.#removeCacheTabByUrl(url)

    //关闭tab的回调
    this.#options.onTabClose.call(this, url)
  }

  //从缓存中删除最近关闭的tab
  #cacheRecentlyClosedByUrl(url) {
    //添加最近删除的缓存,从tab的dom中拿到选项进行缓存
    let tabEl = this.#getTabByUrl(url)
    if (!tabEl) {
      return
    }
    let tabOption = tabEl[Constants.DATAKEYS.tabOptionDataKey]

    //更新时间戳为关闭时的时间戳
    tabOption.timestamp = Date.now()
    if (this.#cacheHandle.has(this.#cacheRecentlyClosedTabsKey)) {
      //先取所有的数组
      let all = this.#cacheHandle.get(this.#cacheRecentlyClosedTabsKey)

      while (all.length >= 10) {
        all.shift()
      }
      all.push(tabOption)

      this.#cacheHandle.set(this.#cacheRecentlyClosedTabsKey, all)
    } else {
      this.#cacheHandle.set(this.#cacheRecentlyClosedTabsKey, [tabOption])
    }
  }

  // 删除面板
  #removeTabPaneByUrl(url) {
    //先删除iframe
    this.#removeIFrameByUrl(url)
    //删除tab面板最外层的容器
    this.#getTabPaneByUrl(url)?.remove()
  }

  //根据url删除缓存里的tab
  #removeCacheTabByUrl(url) {
    if (this.#options.tab.remember === false) return

    let tabs = this.#cacheHandle.get(this.#cacheKey)

    tabs?.forEach((tab, index) => {
      if (tab.url === url) {
        tabs.splice(index, 1)
      }
    })
    this.#cacheHandle.set(this.#cacheKey, tabs)
  }

  /**
   * 私有的激活tab的方法
   * @param {String} url
   * @param {Boolean} fromAddTabMethod 激活tab的方法方法是否来自addTab()
   * @param {Boolean} timestamp 是否需要更新自动时间戳
   * @returns
   */
  #activeTabByUrl(url, fromAddTabMethod = false, timestamp = true) {
    const tabEl = this.#getTabByUrl(url)

    if (!tabEl || this.#isActiveTabByUrl(url)) {
      //过滤掉不存在的tab,或者已经激活的tab
      return
    }

    const activeTabEl = this.#getActiveTab()
    activeTabEl?.classList.remove(Constants.CLASSES.tabActive) //把之前激活的tab的激活状态类给删掉
    if (activeTabEl && activeTabEl[Constants.DATAKEYS.tabOptionDataKey]) {
      activeTabEl[Constants.DATAKEYS.tabOptionDataKey].active = false
    }

    //添加上激活的类,激活当前tab的dom里存的选项,并更新时间戳
    tabEl?.classList.add(Constants.CLASSES.tabActive)
    if (tabEl && tabEl[Constants.DATAKEYS.tabOptionDataKey]) {
      tabEl[Constants.DATAKEYS.tabOptionDataKey].active = true
      if (timestamp === true)
        tabEl[Constants.DATAKEYS.tabOptionDataKey].timestamp = Date.now()
    }

    //激活缓存中的tab
    this.#activeCacheTabByUrl(url)

    if (timestamp === true)
      this.#updateCacheTabByUrl(url, 'timestamp', Date.now())

    //判断tab面板是否已经存在,不存在则添加
    if (!this.#getTabPaneByUrl(url)) {
      this.#addTabPaneByUrl(url)
    }

    //激活面板
    //把之前激活的面板给移除掉
    this.#getActiveTabPane()?.classList.remove(Constants.CLASSES.tabPaneActive)
    //把当前的tab面板给添加激活类
    this.#getTabPaneByUrl(url)?.classList.add(Constants.CLASSES.tabPaneActive)

    //激活逻辑完成调用激活事件
    if (fromAddTabMethod) {
      this.#options.onTabAddActivated.call(this, url)
    } else {
      this.#options.onTabActivated.call(this, url)
    }
  }

  //根据url来添加面板
  #addTabPaneByUrl(url) {
    //添加tab面板的容器li元素
    this.#tabBodyEl.insertAdjacentHTML(
      'beforeEnd',
      Utils.sprintf(Constants.HTML.tabBodyItem, url),
    )

    //加载层逻辑
    this.#addLoadingByUrl(url)

    //加载iframe
    this.#addIFrameByUrl(url)
  }

  //往tab容器里插入iframe
  #addIFrameByUrl(url) {
    const that = this

    //创建iframe
    const iframe = document.createElement('iframe')

    //超时逻辑
    this.#iFrameTimeoutHandle(url, iframe)

    iframe.src = url

    iframe.onload = () => {
      //销毁定时器
      this.#clearIFrameTimeout(iframe)
      //设置iframe状态完毕
      iframe[Constants.DATAKEYS.iframeLoaded] = true

      //判断是否有loading 有的话就执行过渡
      this.#getTabLoadingByUrl(url)?.style.setProperty('opacity', 0)

      this.#options.onTabLoaded.call(this, url)

      this.#tabFinallyAndAll(url)

      if (this.#canAccessIFrame(iframe)) {
        //如果是非跨域的iframe

        iframe.contentWindow.onbeforeunload = () => {
          //遮罩
          this.#addLoadingByUrl(url)
          //清理掉iframe的状态
          delete iframe[Constants.DATAKEYS.iframeLoaded]
          //超时处理
          this.#iFrameTimeoutHandle(url, iframe)
        }

        //给子页面绑定通过属性快速注册tab的事件
        that.#dataAttrAddTabEventRegister(
          iframe.contentDocument,
          Constants.DATAKEYS.addTabParentTarget,
        )
      } else {
        //如果是跨域的iframe,所有的逻辑执行完毕后清空onload,因为跨域的iframe,被用户点击重新加载此框架时,无法控制它
        iframe.onload = null
      }
    }

    //插入iframe
    this.#getTabPaneByUrl(url)?.appendChild(iframe)
  }

  //iframe的超时处理逻辑
  #iFrameTimeoutHandle(url, iframeEl) {
    if (this.#options.tab.timeout === false) return

    //过滤掉某些需要超时的
    let filter = this.#options.tab.timeout.filter.call(this, url)

    if (!filter) return

    //清除原先的定时器,否则会重复触发
    this.#clearIFrameTimeout(iframeEl)

    iframeEl[Constants.DATAKEYS.iframeTimeoutTimer] = setTimeout(() => {
      this.#removeIFrameByUrl(url) //直接移除iframe停止加载

      //如果超时的话，就应该立即移除这个loading层
      this.#getTabLoadingByUrl(url)?.remove()

      let timeoutHtml = Utils.sprintf(
        Constants.HTML.maskWrapper,
        url,
        Utils.sprintf(
          Constants.HTML.timeout,
          this.#options.tab.timeout.text.trim() !== ''
            ? this.#options.tab.timeout.text
            : this.#options.formatTimeoutMessage(),
        ),
      )

      if (this.#options.tab.timeout.template.trim() !== '') {
        timeoutHtml = this.#options.tab.timeout.template
      }

      this.#getTabPaneByUrl(url)?.insertAdjacentHTML('beforeEnd', timeoutHtml)

      this.#options.onTabTimeout.call(this, url)

      this.#tabFinallyAndAll(url)
    }, this.#options.tab.timeout.second)
  }

  //刷新iframe
  #refreshIFrameByUrl(url) {
    //先找到iframe
    const iframe = this.#getIFrameByUrl(url)

    if (this.#canAccessIFrame(iframe)) {
      //iframe加载完毕时且非跨域的情况

      //超时逻辑
      this.#iFrameTimeoutHandle(url, iframe)
      //清理掉iframe的状态
      delete iframe[Constants.DATAKEYS.iframeLoaded]
      iframe.contentWindow.location.reload()
    } else {
      this.#removeIFrameByUrl(url)
      this.#addIFrameByUrl(url)
    }
  }

  // 移除tab面板里面的iframe
  #removeIFrameByUrl(url) {
    const iframe = this.#getIFrameByUrl(url)
    if (iframe) {
      this.#clearIFrameTimeout(iframe)
      iframe.onload = null
      iframe.remove()
    }
  }

  #clearIFrameTimeout(iframeEl) {
    clearTimeout(iframeEl[Constants.DATAKEYS.iframeTimeoutTimer])
  }

  #tabFinallyAndAll(url) {
    this.#options.onTabFinally.call(this, url)

    // 判断所有的tab是否都完成
    const allCompleted = Array.from(this.#getIFrames()).every((iframe) => {
      return iframe[Constants.DATAKEYS.iframeLoaded] === true
    })

    if (allCompleted) {
      this.#options.onTabAll.call(this, this)
    }
  }

  // 生产tab的html字符串
  #generateTabHtml(option) {
    //是否启用
    const enable =
      this.#options.tab.closeBtn.enable !== false && option.closable === true

    return Utils.sprintf(
      Constants.HTML.tab,
      this.#options.tab.dragSort === true ? `draggable="true"` : '',
      enable && this.#options.tab.closeBtn.showOnHover === true
        ? Constants.CLASSES.showCloseBtnOnHover
        : '',
      option.url,
      option.title,
      enable ? this.#options.tab.closeBtn.icon : '',
    )
  }

  #addCacheTab(option) {
    if (this.#options.tab.remember === false) return

    if (this.#cacheHandle.has(this.#cacheKey)) {
      this.#cacheHandle.push(this.#cacheKey, option)
    } else {
      this.#cacheHandle.set(this.#cacheKey, [option])
    }
  }

  #activeCacheTabByUrl(url) {
    if (this.#options.tab.remember === false) return

    const tabs = this.#cacheHandle.get(this.#cacheKey)

    tabs.forEach((item) => {
      item.active = item.url === url
    })
    this.#cacheHandle.set(this.#cacheKey, tabs)
  }

  #scrollToTabByUrl(url, behavior = 'smooth') {
    const tab = this.#getTabByUrl(url)

    if (!tab) return

    //需要父元素设置postion(relative、absolute、fixed)
    // 获取到当前点击元素的 offsetLeft  - 包裹盒子 offsetWidth 的一半 + 当前点击元素 offsetWidth 的一半
    this.#toolbarItemTabWrapperEl.scrollTo({
      left:
        tab.offsetLeft -
        this.#toolbarItemTabWrapperEl.offsetWidth / 2 +
        tab.offsetWidth / 2,
      behavior,
    })
  }

  //获取缓存中激活的tab项
  #getCacheActiveTab() {
    return this.#cacheHandle
      .get(this.#cacheKey)
      ?.find((item) => item.active === true)
  }

  //根据url来修改数据
  #updateCacheTabByUrl(url, updateKey, updateValue) {
    if (this.#options.tab.remember === false) return

    const tabs = this.#cacheHandle.get(this.#cacheKey)
    const targetElement = tabs.find((item) => item.url === url)
    if (targetElement) {
      targetElement[updateKey] = updateValue
    }
    this.#cacheHandle.set(this.#cacheKey, tabs)
  }

  #getTabLoadingByUrl(url) {
    return this.#getTabPaneByUrl(url)?.querySelector(
      `.${Constants.CLASSES.overlays}`,
    )
  }

  // 添加遮罩层
  #addLoadingByUrl(url) {
    if (this.#options.tab.loading.enable === false) return

    //关闭遮罩层
    this.#clsoeLoadingByUrl(url)

    let filter = this.#options.tab.loading.filter.call(this, url)

    if (!filter) return

    let template =
      this.#options.tab.loading.template !== ''
        ? this.#options.tab.loading.template
        : Constants.HTML.loading

    //插入面板
    this.#getTabPaneByUrl(url)?.insertAdjacentHTML(
      'beforeEnd',
      Utils.sprintf(Constants.HTML.maskWrapper, url, template),
    )
  }

  // 获取所有的iframe
  #getIFrames() {
    return this.#tabBodyEl.querySelectorAll(
      `li[${Constants.DATAKEYS.tabUrl}] > iframe`,
    )
  }

  #getIFrameByUrl(url) {
    return this.#getTabPaneByUrl(url)?.querySelector('iframe')
  }
}

Quicktab.VERSION = Constants.VERSION
Quicktab.DEFAULTS = Constants.DEFAULTS
Quicktab.LANGS = Constants.LANGS

/**
 * ------------------------------------------------------------------------
 * Data Api
 * ------------------------------------------------------------------------
 */
Utils.ready(() => {
  document
    .querySelectorAll(Constants.SELECTOR_DATA_TOGGLE)
    .forEach((element) => {
      new Quicktab(element)
    })
})

export default Quicktab
