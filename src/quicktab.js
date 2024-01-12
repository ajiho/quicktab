import Constants from './constants'
import Utils from './utils'
import Cache from './utils/cache'
import event from './utils/event'
import Struct from './utils/struct'

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom'

class Quicktab {
  #id
  //选项
  #options
  //quicktab的容器
  #container
  //整个工具条
  #toolbarEl
  // tab滚动区域包裹层
  #toolbarItemTabWrapperEl
  // tab的面板区域包裹层
  #tabBodyEl
  //缓存句柄
  #cacheHandle
  //tab持久化的缓存key
  #cacheKey
  //初始化缓存选项
  #cacheDefaultTabsKey
  //右键菜单的列表组
  #contextmenuEl
  //tab右键菜单floatui自动更新的监听器
  #contextmenuCleanup
  //可否关闭pen
  #canRemovePenClass = 0
  //工具栏需要隐藏的项目
  #hideItemSelector

  //实例集合
  static #instances = new Map()

  constructor(id, options) {
    this.#container = document.getElementById(id)
    if (!this.#container) {
      return console.error(`${Constants.CLASSES.container}:Invalid id!`)
    }
    if (Quicktab.#instances.has(id)) {
      return console.error(`The ID ${id} has already been used`)
    }
    Quicktab.#instances.set(id, this)

    //接收参数
    this.#options = Utils.extend(
      true,
      {},
      Constants.DEFAULTS,
      Utils.parseOptions(
        this.#container,
        Utils.extend(true, {}, Constants.FULLOPTION),
        'data-qt-',
      ),
      typeof options === 'object' && options,
    )

    //验证参数
    const result = Struct.validateOptions2(
      Constants.FULLOPTIONSTRUCT,
      this.#options,
    )
    if (result !== true) {
      return console.error(result)
    }

    //额外处理defaultTabs参数
    this.#options = this.#parsedefaultTabs(this.#options)

    console.log(this.#options)

    this.#id = id
    this.#cacheKey = `${Constants.CLASSES.container}-${id}`
    this.#cacheDefaultTabsKey = `${this.#cacheKey}-defaultTabs`
    this.#hideItemSelector = this.#options.responsive.hideToolbarItem?.map(
      (item) => {
        return `.${Constants.CLASSES.toolbar} li.${item}`
      },
    )

    //初始化
    this.#init()

    //初始化完毕调用init
    this.#options.onInit?.(this)
  }

  #init() {
    this.#initLocale()
    this.#initCache()
    this.#initContainer()
    this.#initContextmenu()
    this.#initEvent()
    this.#initTabs()
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

  #parsedefaultTabs(options) {
    //克隆对象,避免影响外部对象
    let ops = Utils.extend(true, {}, options)

    let defaultTabs = []
    ops.defaultTabs.map((item) => {
      const tab = this.#tabOptionExtend(item)
      if (tab.url.trim() !== '') {
        defaultTabs.push(tab)
      }
    })
    defaultTabs = Utils.arrUnique(defaultTabs, 'url')
    ops.defaultTabs = defaultTabs

    return ops
  }

  //合并单个tab的选项
  #tabOptionExtend(option) {
    return Utils.extend(true, {}, Constants.TABDEFAULTS, option, {
      [Constants.CLASSES.tabActive]: false,
    })
  }

  #initCache() {
    this.#cacheHandle = new Cache({
      type: this.#options.cacheType,
    })
  }

  #initEvent() {
    let that = this

    const resizeCenterActiveDebounce = Utils.debounce(() => {
      this.scrollToTabByUrl(this.#getTabUrl(this.getActiveTab()))
    }, 500)

    //响应式处理
    Utils.onResize(this.#container.parentNode, function (rect) {
      if (that.#options.responsive !== false) {
        //如果启用了响应式就动态设置显示和隐藏
        Utils.setProperty(
          that.#container,
          that.#hideItemSelector,
          'display',
          rect.width < that.#options.responsive.breakpoint ? 'none' : null,
        )
      }

      if (
        that.#options.toolbar.hide === false &&
        that.#options.tab.resizeCenterActive === true
      ) {
        resizeCenterActiveDebounce()
      }
    })

    //添加通过html属性添加tab的能力(这个非常方便)
    event(document.body).on(
      'click',
      `[${Constants.DATAKEYS.singleTab}][${Constants.DATAKEYS.singleTabTarget}]`,
      function (event) {
        event.preventDefault()

        if (
          this.getAttribute(Constants.DATAKEYS.singleTabTarget) === that.#id
        ) {
          try {
            that.addTab(
              JSON.parse(this.getAttribute(Constants.DATAKEYS.singleTab)),
            )
          } catch (error) {
            return console.error('tab格式错误')
          }
        }
      },
    )

    //事件委托监听loading过渡完毕
    event(this.#container).on(
      'transitionend',
      `.${Constants.CLASSES.tabBody} .${Constants.CLASSES.overlays}`,
      function (event) {
        if (event.target === event.currentTarget) {
          event.target.remove()
          //tab过渡完毕事件回调
          typeof that.#options.onTabLoadingTransitionend === 'function' &&
            that.#options.onTabLoadingTransitionend.call(that, that)
        }
      },
    )

    //tab的单击事件
    event(this.#toolbarItemTabWrapperEl).on(
      //单击和双击
      'click',
      'button',
      Utils.handleSingleAndDoubleClick(
        {
          click: {
            stopPropagation: false,
            handle: function () {
              that.#tabClickHandle(that.#getTabUrl(this))
            },
          },
          dbclick: {
            stopPropagation: false,
            handle: function () {
              that.refreshTabByUrl(that.#getTabUrl(this))
            },
          },
        },
        {
          enableDbClick: that.#options.tab.dbClickRefresh === true,
        },
      ),
    )

    //tab关闭事件
    if (this.#options.tab.closeBtn !== false) {
      event(this.#toolbarItemTabWrapperEl).on(
        'click',
        `button > svg`,
        function (event) {
          event.stopPropagation() //必须要阻止事件的冒泡

          let tab = this.parentNode
          that.closeTabByUrl(that.#getTabUrl(tab))
        },
      )
    }

    //给工具栏绑定事件
    event(this.#toolbarEl).on('click', `li > button`, function (event) {
      let classItem = this.parentNode.getAttribute('class')
      switch (classItem) {
        case 'fullscreen':
          that
            .getTabPaneByUrl(that.#getTabUrl(that.getActiveTab()))
            ?.requestFullscreen()
          break
        case 'prev':
          that.prevScroll()
          break
        case 'refresh':
          that.refreshTabByUrl(that.#getTabUrl(that.getActiveTab()))
          break
        case 'next':
          that.nextScroll()
          break
      }
    })

    //鼠标滚动切换
    if (this.#options.tab.mouseWheelSwitch !== false) {
      //鼠标滚轮切换tab功能启用

      const { onlyScroll, centerActive } = this.#options.tab.mouseWheelSwitch

      let centerTabEl
      const withTabPaneDebounce = Utils.debounce(function (event) {
        const activeTab = that.getActiveTab()
        const prev = activeTab.previousElementSibling
        const next = activeTab.nextElementSibling

        // 判断滚轮方向，负值表示向上滚动，正值表示向下滚动
        const direction = Math.sign(event.deltaY)

        if (direction === -1 && prev) {
          that.activeTabByUrl(that.#getTabUrl(prev))
          centerTabEl = prev
        } else if (direction === 1 && next) {
          that.activeTabByUrl(that.#getTabUrl(next))
          centerTabEl = next
        }

        if (centerActive === true && centerTabEl) {
          //是否启动居中,且将要激活的tab是否存在
          that.scrollToTabByUrl(that.#getTabUrl(centerTabEl))
        }
      }, 200)

      this.#toolbarItemTabWrapperEl.addEventListener(
        'wheel',
        function (event) {
          event.preventDefault() //阻止默认事件，否则它会被外部的滚动条影响

          //判断是否启用右键菜单，如果启用就要关闭
          if (that.#options.tab.contextmenu.enable === true) {
            that.#closeContextmenu()
          }

          if (onlyScroll === true) {
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
    if (this.#options.tab.contextmenu !== false) {
      //tab右键的事件委托
      event(this.#toolbarItemTabWrapperEl).on(
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

      event(document).on(
        'click contextmenu touchstart scroll dragstart',
        function () {
          that.#closeContextmenu()
        },
      )

      event(this.#contextmenuEl).on(
        'click contextmenu touchstart',
        `li[data-tab-url]`,
        function (event) {
          if (event.type === 'contextmenu') {
            event.preventDefault()
          }
          const url = that.#getTabUrl(this)
          const itemClass = this.getAttribute('class')

          console.log(itemClass)

          switch (itemClass) {
            case 'refresh':
              that.refreshTabByUrl(url)
              break
            case 'other':
              that.closeTabsExceptByUrl(that.getTabs(), url)
              break
            case 'prev':
              that.closeTabsExceptByUrl(that.getTabPrevAllByUrl(url), url)
              break
            case 'next':
              that.closeTabsExceptByUrl(that.getTabNextAllByUrl(url), url)
              break
            case 'all':
              that.closeAllTabs()
              break
            case 'new-blank':
              window.open(url, '_blank')
              break
            case 'fullscreen':
              that.activeTabByUrl(url)
              that.getTabPaneByUrl(url).requestFullscreen()
              break
            case 'center-active':
              that.scrollToTabByUrl(that.#getTabUrl(that.getActiveTab()))
              break
            case 'close':
              that.closeTabByUrl(url)
              break
          }
        },
      )
    }

    //如果启用拖动排序
    if (this.#options.tab.dragSort === true) {
      //当前拖动的元素
      let dragging = null

      event(this.#toolbarItemTabWrapperEl).on('dragstart', function (event) {
        dragging = event.target
      })

      //拖拽移动中
      event(this.#toolbarItemTabWrapperEl).on('dragover', function (event) {
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
      })

      //拖拽结束
      event(this.#toolbarItemTabWrapperEl).on('dragend', function () {
        dragging = null
      })
    }
  }

  //关闭所有的tabs
  closeAllTabs() {
    this.getTabs()?.forEach((tab) => {
      const tabUrl = this.#getTabUrl(tab)
      if (this.isTabClosableByUrl(tabUrl)) {
        this.closeTabByUrl(tabUrl)
      }
    })
  }

  /**
   * 除了指定的tab,其它的tab都关闭
   * @param {Array|NodeList} tabs  纯数组、或者是nodelist可以被forEach的包含dom对象的数组
   * @param {String} url
   */
  closeTabsExceptByUrl(tabs, url) {
    tabs?.forEach((tab) => {
      const tabUrl = this.#getTabUrl(tab)
      if (
        tabUrl !== url &&
        this.isTabClosableByUrl(tabUrl) &&
        this.isTabClosableByUrl(url)
      ) {
        this.closeTabByUrl(tabUrl)
      }
    })
  }

  // 从元素的data属性上获取Url
  #getTabUrl(element) {
    return element?.getAttribute(Constants.DATAKEYS.tabUrl)
  }

  //显示右键菜单
  #showContextmenuByUrl(url) {
    const listGroupCloseItemEl = this.#contextmenuEl.querySelector(
      `.${Constants.CLASSES.listGroupCloseItem}`,
    )
    if (this.isTabClosableByUrl(url)) {
      listGroupCloseItemEl?.style.setProperty('display', null) //是可关闭的，因此需要显示右键菜单的关闭当前
    } else {
      listGroupCloseItemEl?.style.setProperty('display', 'none')
    }

    let tabEl = this.getTabByUrl(url)

    this.#contextmenuCleanup?.()

    // 注册菜单自动更新位置
    this.#contextmenuCleanup = autoUpdate(
      tabEl,
      this.#contextmenuEl,
      this.#updatePosition.bind(this, tabEl, this.#contextmenuEl),
    )

    //显示右键菜单
    this.#contextmenuEl.classList.add(Constants.CLASSES.listGroupActive)

    //给iframe添加防止鼠标事件穿透的class效果,增加用户体验
    this.#addPenClass()

    //把url属性也给每一个列表项目设置一遍，方便后续事件的处理
    this.#contextmenuEl.querySelectorAll('li').forEach(function (li) {
      li.setAttribute(Constants.DATAKEYS.tabUrl, url)
    })
  }

  //关闭右键菜单
  #closeContextmenu() {
    this.#contextmenuCleanup?.()
    this.#contextmenuEl.classList.remove(Constants.CLASSES.listGroupActive)
    this.#removePenClass()
  }

  #addPenClass() {
    //添加防止鼠标事件失效的类名称
    this.#container.classList.add(Constants.CLASSES.pointerEventsNnoe)
    if (
      !this.#contextmenuEl.classList.contains(Constants.CLASSES.listGroupShow)
    ) {
      this.#canRemovePenClass++
    }
  }

  #removePenClass() {
    if (this.#canRemovePenClass > 0) {
      this.#canRemovePenClass--
    }

    if (this.#canRemovePenClass === 0) {
      this.#container.classList.remove(Constants.CLASSES.pointerEventsNnoe)
    }
  }

  #updatePosition(referenceEl, floatingEl) {
    computePosition(referenceEl, floatingEl, {
      placement: 'top',
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
    //给容器挂载类名
    this.#container.classList.add(Constants.CLASSES.container)

    //设置容器的尺寸
    const { height, width, minHeight } = this.#options
    this.#container.style.setProperty('height', height)
    this.#container.style.setProperty('width', width)
    this.#container.style.setProperty('min-height', minHeight)

    const toolbarTabWrapperOpsKey = 'tabWrapper'
    const toolbarItemClassMap = {
      prev: Constants.CLASSES.toolbarPrevItem,
      refresh: Constants.CLASSES.toolbarRefreshItem,
      [toolbarTabWrapperOpsKey]: Constants.CLASSES.toolbarTabWrapperItem,
      next: Constants.CLASSES.toolbarNextItem,
      dropdown: Constants.CLASSES.toolbarDropdownItem,
      fullscreen: Constants.CLASSES.toolbarFullscreenItem,
    }

    let html = [
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
      html.push(
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
    html.push(Constants.HTML.toolbar[1])

    //排序实现
    let pos = this.#options.toolbar.position

    if (pos === 'bottom') {
      html.unshift(Constants.HTML.tabBody)
    } else if (pos === 'top') {
      html.push(Constants.HTML.tabBody)
    }

    html = html.join('') //转换成字符串

    // 隐藏特定的项目
    if (
      this.#options.toolbar.hide === false &&
      this.#options.responsive !== false &&
      this.#container.parentNode.getBoundingClientRect().width <
        this.#options.responsive.breakpoint
    ) {
      html = Utils.setProperty(html, this.#hideItemSelector, 'display', 'none')
    }

    //插入到容器内部
    this.#container.insertAdjacentHTML('beforeEnd', html)

    //查找一些需要的dom
    this.#toolbarEl = this.#container.querySelector(
      `.${Constants.CLASSES.toolbar}`,
    )
    this.#toolbarItemTabWrapperEl = this.#container.querySelector(
      `.${Constants.CLASSES.toolbar} li.${Constants.CLASSES.toolbarTabWrapperItem}`,
    )
    this.#tabBodyEl = this.#container.querySelector(
      `.${Constants.CLASSES.tabBody}`,
    )
  }

  #initContextmenu() {
    if (
      this.#options.toolbar.hide === true ||
      this.#options.tab.contextmenu === false
    )
      return

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

    const html = [
      Utils.sprintf(
        Constants.HTML.listGroup[0],
        Constants.DATAKEYS.contextmenu,
        this.#id,
      ),
    ]

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
      `[${Constants.DATAKEYS.contextmenu}="${this.#id}"]`,
    )
  }

  #initTabs() {
    const defaultTabs = this.#options.defaultTabs

    if (this.#options.tab.remember === false) {
      //没有启用tab的缓存

      const cacheStores = ['local', 'session']
      const cacheKeys = [this.#cacheKey, this.#cacheDefaultTabsKey]

      for (const store of cacheStores) {
        for (const key of cacheKeys) {
          this.#cacheHandle.store(store).delete(key)
        }
      }

      this.#restoreTabs(
        //直接恢复选项提供的默认tab
        defaultTabs,
      )
      return
    }

    const cacheTabs = this.#cacheHandle.get(this.#cacheKey) //获取缓存中的tab

    if (
      cacheTabs &&
      this.#cacheTabsCheck(cacheTabs) &&
      JSON.stringify(defaultTabs) ===
        JSON.stringify(this.#cacheHandle.get(this.#cacheDefaultTabsKey))
    ) {
      this.#restoreTabs(cacheTabs, this.#getCacheActiveTab()?.url)
    } else {
      this.#restoreTabs(defaultTabs)

      this.#cacheHandle.set(this.#cacheKey, defaultTabs)
      this.#cacheHandle.set(this.#cacheDefaultTabsKey, defaultTabs)
    }
  }

  //检测缓存中的tab的合法性
  #cacheTabsCheck(tabs) {
    //要检查的键数组
    let targetKeys = [
      ...Object.keys(Constants.TABDEFAULTS),
      Constants.CLASSES.tabActive,
    ]

    return tabs.every((obj) =>
      targetKeys.every((key) => Object.hasOwnProperty.call(obj, key)),
    )
  }

  /**
   * 恢复tab
   * @param {Array} tabs 数组
   * @param {String} url 将要激活tab的url,不传将设置tabs中的最后一项
   * @returns
   */
  #restoreTabs(tabs, url = '') {
    if (!Array.isArray(tabs) || tabs.length === 0) {
      return
    }

    //创建两个虚拟节点
    const tabFrag = document.createDocumentFragment()

    //这里只添加所有的tab，不添加iframe,否则全部加载iframe将会卡爆(重点优化)
    tabs.forEach((tab) =>
      tabFrag.appendChild(Utils.createNode(this.#generateTabHtml(tab))),
    )

    //添加虚拟节点到tab的容器里面
    this.#toolbarItemTabWrapperEl.appendChild(tabFrag)

    if (url === '') {
      url = tabs.slice(-1)[0]?.url
    }

    //激活最后一个
    this.activeTabByUrl(url)

    //滚动到激活tab所在位置
    this.#scrollToTabByUrl(url, 'auto')
  }

  addTab(option) {
    //参数合并
    option = this.#tabOptionExtend(option)

    //参数验证
    const result = Struct.validateOptions2(Constants.TABOPTIONSTRUCT, option)
    if (result !== true) {
      return console.error(result)
    }

    console.log(option)

    const url = option.url

    if (!this.getTabByUrl(url)) {
      //如果这个tab不存在

      let maxNum = this.#options.tab.maxNum

      if (maxNum > 0) {
        let closableTabs = this.getClosableTabs() //获取所有的可删除的tab

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

      //如果没有该tab则添加这个tab
      this.#toolbarItemTabWrapperEl.insertAdjacentHTML(
        'beforeEnd',
        this.#generateTabHtml(option),
      )

      //添加进缓存
      this.#addCacheTab(option)
    }

    //激活这个被添加的tab
    this.activeTabByUrl(url, true)

    //滚动到tab所在位置
    this.scrollToTabByUrl(url)
  }

  closeTabByUrl(url) {
    if (this.isTabActiveByUrl(url)) {
      //判断是否是激活的tab

      //下一个即将激活的tab
      let nextTab
      let tab = this.getTabByUrl(url)
      if (tab?.nextElementSibling) {
        //如果后面有就激活后面的
        nextTab = tab.nextElementSibling
      } else if (tab?.previousElementSibling) {
        nextTab = tab.previousElementSibling
      }

      //删除tab
      this.#removeTabByUrl(url)

      //激活tab
      this.activeTabByUrl(this.#getTabUrl(nextTab))
    } else {
      this.#removeTabByUrl(url)
    }
  }

  //单纯的只做删除的工作
  #removeTabByUrl(url) {
    //删除tab
    this.getTabByUrl(url)?.remove()

    //删除面板
    this.#removeTabPaneByUrl(url)

    //删除缓存里的tab
    this.#removeCacheTabByUrl(url)
  }

  // 删除面板
  #removeTabPaneByUrl(url) {
    //先删除iframe
    this.#removeIFrameByUrl(url)
    //删除tab面板最外层的容器
    this.getTabPaneByUrl(url)?.remove()
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

  activeTabByUrl(url, fromAddTabMethod = false) {
    //过滤掉不存在的tab,或者已经激活的tab
    if (!this.getTabByUrl(url) || this.isTabActiveByUrl(url)) {
      return
    }

    //把之前激活的tab的激活状态类给删掉
    this.getActiveTab()?.classList.remove(Constants.CLASSES.tabActive)

    //添加上激活的类
    this.getTabByUrl(url)?.classList.add(Constants.CLASSES.tabActive)

    //激活缓存中的tab
    this.#activeCacheTabByUrl(url)

    //判断tab面板是否已经存在,不存在则添加
    if (!this.getTabPaneByUrl(url)) {
      this.#addTabPaneByUrl(url)
    }

    //激活面板
    //把之前激活的面板给移除掉
    this.getActiveTabPane()?.classList.remove(Constants.CLASSES.tabPaneActive)
    //把当前的tab面板给添加激活类
    this.getTabPaneByUrl(url)?.classList.add(Constants.CLASSES.tabPaneActive)

    //激活逻辑完成调用激活事件
    if (fromAddTabMethod) {
      typeof this.#options.onTabAddActivated === 'function' &&
        this.#options.onTabAddActivated.call(this, this)
    } else {
      typeof this.#options.onTabActivated === 'function' &&
        this.#options.onTabActivated.call(this, this)
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
    //创建iframe
    const iframe = document.createElement('iframe')

    //超时逻辑
    this.#iFrameTimeoutHandle(url, iframe)

    iframe.src = url

    iframe.onload = () => {
      //销毁定时器
      this.#clearIFrameTimeout(iframe)

      const canAccessIFrame = Utils.canAccessIFrame(iframe)

      //当右键菜单点击重新加载此框架的情况
      if (canAccessIFrame) {
        //如果不是跨域的iframe才给刷新,因为跨域的iframe访问contentWindow属性会报错
        // localStorage.setItem('ff',Math.random())
        iframe.contentWindow.onbeforeunload = () => {
          //遮罩
          this.#addLoadingByUrl(url)
          //清理掉iframe的状态
          delete iframe[Constants.DATAKEYS.iframeLoaded]
          //超时处理
          this.#iFrameTimeoutHandle(url, iframe)
        }
      }

      //设置iframe状态完毕
      iframe[Constants.DATAKEYS.iframeLoaded] = true

      //判断是否有loading 有的话就执行过渡
      this.#getTabLoadingByUrl(url)?.style.setProperty('opacity', 0)

      typeof this.#options.onTabLoaded === 'function' &&
        this.#options.onTabLoaded.call(this, iframe, url, this)

      this.#tabFinallyAndAll()

      if (!canAccessIFrame) {
        //如果是跨域的iframe,所有的逻辑执行完毕后清空onload,因为跨域的iframe,被用户点击重新加载此框架时,无法控制它
        iframe.onload = null
      }
    }

    // console.log(iframe);

    //插入iframe
    this.getTabPaneByUrl(url)?.appendChild(iframe)
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

      this.getTabPaneByUrl(url)?.insertAdjacentHTML('beforeEnd', timeoutHtml)

      typeof this.#options.onTabTimeout === 'function' &&
        this.#options.onTabTimeout.call(this, url, this)

      this.#tabFinallyAndAll()
    }, this.#options.tab.timeout.second)
  }

  //刷新iframe
  #refreshIFrameByUrl(url) {
    //先找到iframe
    const iframe = this.#getIFrameByUrl(url)

    if (
      Utils.canAccessIFrame(iframe) &&
      iframe[Constants.DATAKEYS.iframeLoaded] === true
    ) {
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

  #tabFinallyAndAll() {
    typeof this.#options.onTabFinally === 'function' &&
      this.#options.onTabFinally.call(this, this)

    // 判断所有的tab是否都完成
    const allCompleted = Array.from(this.#getIFrames()).every((iframe) => {
      return iframe[Constants.DATAKEYS.iframeLoaded] === true
    })

    if (allCompleted) {
      typeof this.#options.onTabAll === 'function' &&
        this.#options.onTabAll.call(this, this)
    }
  }

  // 生产tab的html字符串
  #generateTabHtml(option) {
    //是否启用
    const enable =
      this.#options.tab.closeBtn !== false && option.closable === true

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

  scrollToTabByUrl(url) {
    this.#scrollToTabByUrl(url)
  }

  #scrollToTabByUrl(url, behavior = 'smooth') {
    const tab = this.getTabByUrl(url)

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

  //tab被单击时的事件处理
  #tabClickHandle(url) {
    //tab被单击的回调
    typeof this.#options.onTabClick === 'function' &&
      this.#options.onTabClick.call(this, url, this)

    //激活
    this.activeTabByUrl(url)

    //滚动到tab所在位置
    if (this.#options.tab.clickCenterActive === true) {
      this.scrollToTabByUrl(url)
    }
  }

  //获取缓存中激活的tab项
  #getCacheActiveTab() {
    return this.#cacheHandle
      .get(this.#cacheKey)
      ?.find((item) => item.active === true)
  }

  #getTabLoadingByUrl(url) {
    return this.getTabPaneByUrl(url)?.querySelector(
      `.${Constants.CLASSES.overlays}`,
    )
  }

  // 添加遮罩层
  #addLoadingByUrl(url) {
    if (this.#options.tab.loading === false) return

    //关闭遮罩层
    this.clsoeLoadingByUrl(url)

    let filter = this.#options.tab.loading.filter.call(this, url)

    if (!filter) return

    let template =
      this.#options.tab.loading.template !== ''
        ? this.#options.tab.loading.template
        : Constants.HTML.loading

    //插入面板
    this.getTabPaneByUrl(url)?.insertAdjacentHTML(
      'beforeEnd',
      Utils.sprintf(Constants.HTML.maskWrapper, template),
    )
  }

  // 关闭loading层
  clsoeLoadingByUrl(url) {
    this.getTabPaneByUrl(url)
      ?.querySelector(`.${Constants.CLASSES.overlays}`)
      ?.remove()
  }

  getTabPaneByUrl(url) {
    return this.#tabBodyEl.querySelector(
      `[${Constants.DATAKEYS.tabUrl}="${url}"]`,
    )
  }

  //获取tab的左边的所有的tabs
  getTabPrevAllByUrl(url) {
    return Utils.prevAll(this.getTabByUrl(url))
  }

  //获取tab的右边的所有的tabs
  getTabNextAllByUrl(url) {
    return Utils.nextAll(this.getTabByUrl(url))
  }

  getActiveTab() {
    return this.#toolbarItemTabWrapperEl.querySelector(
      `button.${Constants.CLASSES.tabActive}`,
    )
  }

  getActiveTabPane() {
    return this.#tabBodyEl.querySelector(
      `li.${Constants.CLASSES.tabPaneActive}`,
    )
  }

  getTabByUrl(url) {
    return this.#toolbarItemTabWrapperEl.querySelector(
      `[${Constants.DATAKEYS.tabUrl}="${url}"]`,
    )
  }

  getTabs() {
    return this.#toolbarItemTabWrapperEl.querySelectorAll(
      `button[${Constants.DATAKEYS.tabUrl}]`,
    )
  }

  // 获取所有的iframe
  #getIFrames() {
    return this.#tabBodyEl.querySelectorAll(
      `li[${Constants.DATAKEYS.tabUrl}] > iframe`,
    )
  }

  #getIFrameByUrl(url) {
    return this.getTabPaneByUrl(url)?.querySelector('iframe')
  }

  // 获取所有的可以删除的tab
  getClosableTabs() {
    return Array.from(
      this.#toolbarItemTabWrapperEl.querySelectorAll('button'),
    ).filter((button) => button.querySelector('svg'))
  }

  //判断tab是否可以被关闭
  isTabClosableByUrl(url) {
    return this.getTabByUrl(url)?.querySelector('svg') ? true : false
  }

  //判断tab是否已激活
  isTabActiveByUrl(url) {
    return this.getTabByUrl(url)?.classList.contains(
      Constants.CLASSES.tabActive,
    )
      ? true
      : false
  }

  // 上滑动
  prevScroll() {
    this.#toolbarItemTabWrapperEl.scrollTo({
      left:
        this.#toolbarItemTabWrapperEl.scrollLeft -
        this.#toolbarItemTabWrapperEl.offsetWidth,
      behavior: 'smooth',
    })
  }

  //下滑动
  nextScroll() {
    this.#toolbarItemTabWrapperEl.scrollTo({
      left:
        this.#toolbarItemTabWrapperEl.scrollLeft +
        this.#toolbarItemTabWrapperEl.offsetWidth,
      behavior: 'smooth',
    })
  }

  // 通过url刷新tab
  refreshTabByUrl(url) {
    //判断tab是否存在，不存在则不执行
    if (!(this.getTabByUrl(url) instanceof Element)) {
      return
    }

    if (!this.getTabPaneByUrl(url)) {
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

  // 获取tab的所有数量
  getTabsCount() {}

  // 获取tab的标题
  getTitle(url) {}

  setTitle(url, title) {}

  getDisableByUrl(url) {}

  // 设置禁用状态
  setDisableByUrl(url, status = true) {}

  static get(selector) {
    return Quicktab.#instances[selector]
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
    .querySelectorAll(`${Constants.SELECTOR_DATA_TOGGLE}[id]`)
    .forEach((element) => {
      new Quicktab(element.getAttribute('id'))
    })
})

export default Quicktab
