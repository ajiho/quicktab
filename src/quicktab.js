import Constants from './constants'
import Utils from './utils'
import Cache from './utils/cache'
import event from './utils/event'
// import { is, object, number, string, array, enums, union } from 'superstruct'

import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom'

class Quicktab {
  //选项
  #options
  //quicktab的容器
  #container
  //整个工具条
  #tabBarEl
  // tab滚动区域包裹层
  #tabBarItemScrollEl
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
  #hideItemSelector

  //实例集合
  static #instances = new Map()

  constructor(element, options) {
    if (!(element instanceof Element)) {
      console.warn(`${Constants.CLASSES.container}:Invalid element!`)
      return
    }

    this.#container = element
    this.#options = options

    //初始化
    this.#init()

    console.log('init')

    //静态属性存实例对象,用于子页面快速找到父级页面实例，然后添加tab等..
    // Quicktab.#instances[this.#options.id] = this

    // //初始化完毕调用init
    // typeof this.#options.onInit === 'function' &&
    //   this.#options.onInit.call(this, this)
  }

  #init() {
    this.#initOptions()

    // this.#initMemberVariable()
    // this.#initLocale()
    // this.#initCache()
    // this.#initContainer()
    // this.#initResizeObserver()
    // this.#initContextmenu()
    // this.#initDragSort()
    // this.#initDropdown()
    // this.#initEvent()
    // this.#initTabs()
  }

  #initLocale() {
    if (this.#options.lang) {
      console.log('启用翻译了')

      const locales = Quicktab.LANGS

      const parts = this.#options.lang.split(/-|_/)

      console.log(locales, parts)

      // parts[0] = parts[0].toLowerCase()
      // if (parts[1]) {
      //   parts[1] = parts[1].toUpperCase()
      // }

      // let localesToExtend = {}

      // if (locales[this.options.locale]) {
      //   localesToExtend = locales[this.options.locale]
      // } else if (locales[parts.join('-')]) {
      //   localesToExtend = locales[parts.join('-')]
      // } else if (locales[parts[0]]) {
      //   localesToExtend = locales[parts[0]]
      // }

      // for (const [formatName, func] of Object.entries(localesToExtend)) {
      //   if (this.options[formatName] !== BootstrapTable.DEFAULTS[formatName]) {
      //     continue
      //   }

      //   this.options[formatName] = func
      // }
    }
  }

  //检查选项,以及检查类型是否正确
  #initOptions() {
    this.#options = Utils.extend(
      true,
      {},
      Constants.DEFAULTS,
      this.#parseOptions(Utils.extend(true, {}, Constants.FULLOPTION)),
      typeof this.#options === 'object' && this.#options,
    )


    // const ResponsiveStruct = object({
    //   breakpoint: number(),
    //   hideItem: string(),
    // });

    // const MainStruct = object({
    //   responsive: enums([false, ResponsiveStruct]),
    //   defaultTabs: array(),
    // });

    // const obj = {
    //   responsive: {
    //     breakpoint: 576,
    //     hideItem: 'prev,next',
    //   },
    //   defaultTabs: [],
    // };


    // if (is(obj, MainStruct)) {
    //   console.log('pass');
    // } else {
    //   console.log('error');
    // }



    // //参数的检查
    // //1.id必须是字符串
    // if (this.#options.id === null) {
    //   throw new Error('id option is  required')
    // }
    // this.#options.id = encodeURIComponent(this.#options.id)

    // //2.检查id是否已经在实例中
    // if (Quicktab.#instances.has(this.#options.id)) {
    //   throw new Error(`The ID ${this.#options.id} has already been used`)
    // }

    // Quicktab.#instances.set(this.#options.id, this)
    // console.log(this.#options)
    // //对一些参数的合法性验证

    // const cacheTypeallowVal = ['local', 'session']
    // if (!cacheTypeallowVal.includes(this.#options.cacheType)) {
    //   throw new Error(
    //     `cacheType must be one of: ${cacheTypeallowVal.join(', ')}`,
    //   )
    // }

    // if (
    //   !Utils.isObject(this.#options.responsive) &&
    //   this.#options.responsive !== false
    // ) {
    //   throw new Error(`必须是对象或者false`)
    // }





    // const MyStruct = object({
    //   id: enums(['Jane', 'John', 'Jack', false]),
    //   title: string(),
    //   tags: array(string()),
    //   author: union([string(), object({
    //     id: number(),
    //   })])
    // })

    // const data = {
    //   id: false,
    //   title: 'Hello World',
    //   tags: ['news', 'features'],
    //   author: 'nihao'
    // }

    // if (is(data, MyStruct)) {
    //   console.log('通过');
    // } else {
    //   console.log('false');
    // }

    // this.#validateOptions(this.#options, 'responsive', [
    //   'object',
    //   { 'boolean': false }
    // ])
  }

  #validateOptions() { }

  #parseOptions(options, prefix = 'data-qt-') {
    for (const key in options) {
      const attrKey = prefix + key
      const dataVal = Utils.parseAttributeValue(
        this.#container.getAttribute(attrKey),
      )

      if (Utils.isObject(options[key])) {
        //如果是对象
        dataVal === false
          ? (options[key] = false)
          : this.#parseOptions(options[key], attrKey + '-')
      } else {
        if (dataVal !== null) {
          options[key] = dataVal
        }
      }
    }
    return options
  }

  #initMemberVariable() {
    // 缓存的key
    this.#cacheKey = `${Constants.CLASSES.container}-${this.#options.id}`

    //默认初始化的选项的key
    this.#cacheDefaultTabsKey = `${this.#cacheKey}-defaultTabs`

    this.#hideItemSelector = this.#options.responsive.hideItem.map((item) => {
      return `.${Constants.CLASSES.tabBar} li.${item}`
    })
  }

  #initDragSort() {
    let that = this

    if (
      this.#options.tabBar.hide === false &&
      this.#options.tab.dragSort === true
    ) {
      //当前拖动的元素
      let dragging = null

      event(this.#tabBarItemScrollEl).on('dragstart', function (event) {
        dragging = event.target
      })

      //拖拽移动中
      event(this.#tabBarItemScrollEl).on('dragover', function (event) {
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

          if (that.#index(dragging) < that.#index(target)) {
            // 目标比元素大，插到其后面
            // extSibling下一个兄弟元素
            target.parentNode.insertBefore(dragging, target.nextSibling)
          } else {
            // 目标比元素小，插到其前面
            target.parentNode.insertBefore(dragging, target)
          }
          that.#animate(draggingRect, dragging)
          that.#animate(targetRect, target)
        }
      })

      //拖拽结束
      event(this.#tabBarItemScrollEl).on('dragend', function () {
        dragging = null
      })
    }
  }

  #initCache() {
    this.#cacheHandle = new Cache({
      type: this.#options.cache.type,
    })
  }

  #initEvent() {
    let that = this

    //启动通过html属性注册tab的能力
    event(document.body).on(
      'click',
      `[${Constants.DATAKEYS.singleTab}][${Constants.DATAKEYS.singleTabTarget}]`,
      function (event) {
        event.preventDefault()

        if (
          this.getAttribute(Constants.DATAKEYS.singleTabTarget) ===
          that.#options.selector
        ) {
          const tab = Utils.extend(
            {},
            Constants.TABDEFAULTS,
            JSON.parse(this.getAttribute(Constants.DATAKEYS.singleTab)),
          )

          that.addTab(tab)
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

    if (this.#options.tabBar.hide === false) {
      //判断工具栏是否显示,如果都不显示，没必要绑定这些事件了。

      //tab的单击事件
      event(this.#tabBarItemScrollEl).on(
        //单击和双击
        'click',
        'button',
        Utils.handleSingleAndDoubleClick(
          {
            click: {
              handle: function () {
                that.#tabClickHandle(that.#getTabUrl(this))
              },
            },
            dbclick: {
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
      if (this.#options.tab.closeBtn.enable === true) {
        event(this.#tabBarItemScrollEl).on(
          'click',
          `button > svg`,
          function (event) {
            event.stopPropagation() //必须要阻止事件的冒泡

            let tab = this.parentNode
            that.closeTabByUrl(that.#getTabUrl(tab))
          },
        )
      }

      //prev滑动事件
      if (this.#options.tabBar.prev.enable === true) {
        event(this.#tabBarEl).on(
          'click',
          `li.${Constants.CLASSES.tabBarPrevItem} > button`,
          function (event) {
            that.prevScroll()
          },
        )
      }

      //next滑动事件
      if (this.#options.tabBar.next.enable === true) {
        event(this.#tabBarEl).on(
          'click',
          `li.${Constants.CLASSES.tabBarNextItem} > button`,
          function (event) {
            that.nextScroll()
          },
        )
      }

      // 刷新按钮事件
      if (this.#options.tabBar.refresh.enable === true) {
        event(this.#tabBarEl).on(
          'click',
          `li.${Constants.CLASSES.tabBarRefreshItem} > button`,
          function () {
            that.refreshTabByUrl(that.#getTabUrl(that.getActiveTab()))
          },
        )
      }

      if (this.#options.tab.mouseWheelSwitch.enable === true) {
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

        this.#tabBarItemScrollEl.addEventListener(
          'wheel',
          function (event) {
            event.preventDefault() //阻止默认事件，否则它会被外部的滚动条影响

            //判断是否启用右键菜单，如果启用就要关闭
            if (that.#options.tab.contextmenu.enable === true) {
              that.#closeContextmenu()
            }

            if (onlyScroll === true) {
              //如果只是滚动
              that.#tabBarItemScrollEl.scrollLeft +=
                (event.deltaY || event.detail || -event.wheelDelta) / 2
            } else {
              withTabPaneDebounce(event)
            }
          },
          { passive: false },
        ) //{ passive: false }解决控制台的警告错误
      }

      //是否启用右键菜单功能
      if (this.#options.tab.contextmenu.enable === true) {
        //tab右键的事件委托
        event(this.#tabBarItemScrollEl).on(
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

        //绑定事件
        that.#bindMenuItemAction.call(
          this,
          Constants.CLASSES.listGroupRefreshItem,
          'refresh',
        )
        that.#bindMenuItemAction.call(
          this,
          Constants.CLASSES.listGroupCloseOtherItem,
          'closeOthers',
        )
        that.#bindMenuItemAction.call(
          this,
          Constants.CLASSES.listGroupClosePrevItem,
          'closePrev',
        )
        that.#bindMenuItemAction.call(
          this,
          Constants.CLASSES.listGroupCloseNextItem,
          'closeNext',
        )
        that.#bindMenuItemAction.call(
          this,
          Constants.CLASSES.listGroupCloseAllItem,
          'closeAll',
        )
        that.#bindMenuItemAction.call(
          this,
          Constants.CLASSES.listGroupNewBlankItem,
          'newBlank',
        )
        that.#bindMenuItemAction.call(
          this,
          Constants.CLASSES.listGroupFullscreenItem,
          'fullscreen',
        )
        that.#bindMenuItemAction.call(
          this,
          Constants.CLASSES.listGroupCenterActiveItem,
          'centerActive',
        )
        that.#bindMenuItemAction.call(
          this,
          Constants.CLASSES.listGroupCloseItem,
          'close',
        )
      }

      //全屏
      if (this.#options.tabBar.fullscreen.enable === true) {
        event(this.#tabBarEl).on(
          'click',
          `li.${Constants.CLASSES.tabBarFullscreenItem} > button`,
          function () {
            that
              .getTabPaneByUrl(that.#getTabUrl(that.getActiveTab()))
              ?.requestFullscreen()
          },
        )
      }
    }
  }

  //给列表菜单项绑定事件
  #bindMenuItemAction(itemClass, action) {
    if (this.#options.tab.contextmenu[action].enable === true) {
      let that = this
      event(this.#contextmenuEl).on(
        'click contextmenu touchstart',
        `.${itemClass}`,
        function (event) {
          if (event.type === 'contextmenu') {
            event.preventDefault()
          }

          const url = that.#getTabUrl(this)

          switch (action) {
            case 'refresh':
              that.refreshTabByUrl(url)
              break
            case 'closeOthers':
              that.closeTabsExceptByUrl(that.getTabs(), url)
              break
            case 'closePrev':
              that.closeTabsExceptByUrl(that.getTabPrevAllByUrl(url), url)
              break
            case 'closeNext':
              that.closeTabsExceptByUrl(that.getTabNextAllByUrl(url), url)
              break
            case 'closeAll':
              that.closeAllTabs()
              break
            case 'newBlank':
              window.open(url, '_blank')
              break
            case 'fullscreen':
              that.activeTabByUrl(url)
              that.getTabPaneByUrl(url).requestFullscreen()
              break
            case 'centerActive':
              that.scrollToTabByUrl(that.#getTabUrl(that.getActiveTab()))
              break
            case 'close':
              that.closeTabByUrl(url)
              break
            // 添加其他菜单项的处理逻辑
          }
        },
      )
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
      //判断是否需要显示关闭当前的列表项
      listGroupCloseItemEl?.style.setProperty('display', 'block')
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

    //添加显示右键菜单的类
    this.#contextmenuEl.classList.add(Constants.CLASSES.listGroupShow)

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
    this.#contextmenuEl.classList.remove(Constants.CLASSES.listGroupShow)
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

    let tabBarItemClassMap = {
      prev: Constants.CLASSES.tabBarPrevItem,
      refresh: Constants.CLASSES.tabBarRefreshItem,
      next: Constants.CLASSES.tabBarNextItem,
      dropdown: Constants.CLASSES.tabBarDropdownItem,
      fullscreen: Constants.CLASSES.tabBarFullscreenItem,
    }

    let tabBarScrollItemKey = 'scroll'

    let html = [
      Utils.sprintf(
        Constants.HTML.tabBar[0],
        this.#options.tabBar.hide === true ? Constants.CLASSES.tabBarHide : '',
      ),
    ]

    Object.keys(this.#options.tabBar)
      .filter((key) => {
        if (
          Object.keys(tabBarItemClassMap).includes(key) &&
          this.#options.tabBar[key].enable === true
        ) {
          return true
        } else if (key === tabBarScrollItemKey) {
          return true
        }
        return false
      })
      .sort(
        (a, b) => this.#options.tabBar[a].order - this.#options.tabBar[b].order,
      )
      .map((key) => {
        //开始组装字符串

        if (key === tabBarScrollItemKey) {
          html.push(
            Utils.sprintf(
              Constants.HTML.tabBarScrollItem,
              Constants.CLASSES.tabBarScrollItem,
            ),
          )
        } else {
          html.push(
            Utils.sprintf(
              Constants.HTML.tabBarItem,
              tabBarItemClassMap[key],
              this.#options.tabBar[key].icon,
            ),
          )
        }
      })

    //加入工具栏的结尾
    html.push(Constants.HTML.tabBar[1])

    //排序实现
    if (this.#options.tabBar.position === 'bottom') {
      html.unshift(Constants.HTML.tabBody)
    } else if (this.#options.tabBar.position === 'top') {
      html.push(Constants.HTML.tabBody)
    }

    html = html.join('') //转换成字符串

    const { enable, breakpoint } = this.#options.responsive //判断是否应该启用响应式功能
    if (
      this.#options.tabBar.hide === false &&
      enable === true &&
      this.#container.parentNode.getBoundingClientRect().width < breakpoint
    ) {
      html = Utils.setProperty(html, this.#hideItemSelector, 'display', 'none')
    }

    //插入到容器内部
    this.#container.insertAdjacentHTML('beforeEnd', html)

    //查找一些需要的dom
    this.#tabBarEl = this.#container.querySelector(
      `.${Constants.CLASSES.tabBar}`,
    )
    this.#tabBarItemScrollEl = this.#container.querySelector(
      `.${Constants.CLASSES.tabBar} li.scroll`,
    )
    this.#tabBodyEl = this.#container.querySelector(
      `.${Constants.CLASSES.tabBody}`,
    )
  }

  #initResizeObserver() {
    // resizeCenterActive

    let resizeCenterActiveDebounce
    if (
      this.#options.tabBar.hide === false &&
      this.#options.tab.resizeCenterActive === true
    ) {
      resizeCenterActiveDebounce = Utils.debounce(() => {
        this.scrollToTabByUrl(this.#getTabUrl(this.getActiveTab()))
      }, 500)
    }

    //使用ResizeObserver来监听dom的大小变化
    const resizeObserver = new ResizeObserver((entries) => {
      // 处理大小变化的回调函数
      entries.forEach((entry) => {
        // entry.target 是发生大小变化的元素 entry.contentRect 包含元素的新大小信息

        if (!entry.target.firstResize) {
          //优化:第一次不执行
          entry.target.firstResize = true
          return
        }

        if (this.#options.responsive.enable === true) {
          //如果启用了响应式就动态设置显示和隐藏
          Utils.setProperty(
            this.#container,
            this.#hideItemSelector,
            'display',
            entry.contentRect.width < this.#options.responsive.breakpoint
              ? 'none'
              : null,
          )
        }

        if (
          this.#options.tabBar.hide === false &&
          this.#options.tab.contextmenu.enable === true
        ) {
          //关闭tab的右键菜单
          this.#closeContextmenu()
        }

        if (
          this.#options.tabBar.hide === false &&
          this.#options.tab.resizeCenterActive === true
        ) {
          resizeCenterActiveDebounce()
        }
      })
    })
    //监听pc
    resizeObserver.observe(this.#container.parentNode)
  }

  #initContextmenu() {
    if (this.#options.tab.contextmenu.enable === true) {
      //判断右键菜单功能是否启用

      let listGroupItemClassMap = {
        close: Constants.CLASSES.listGroupCloseItem,
        closeOthers: Constants.CLASSES.listGroupCloseOtherItem,
        closePrev: Constants.CLASSES.listGroupClosePrevItem,
        closeNext: Constants.CLASSES.listGroupCloseNextItem,
        closeAll: Constants.CLASSES.listGroupCloseAllItem,
        fullscreen: Constants.CLASSES.listGroupFullscreenItem,
        refresh: Constants.CLASSES.listGroupRefreshItem,
        centerActive: Constants.CLASSES.listGroupCenterActiveItem,
        newBlank: Constants.CLASSES.listGroupNewBlankItem,
      }

      const html = [
        Utils.sprintf(
          Constants.HTML.listGroup[0],
          Constants.DATAKEYS.contextmenu,
          this.#options.id,
        ),
      ]

      Object.keys(this.#options.tab.contextmenu)
        .filter(
          (key) =>
            Object.keys(listGroupItemClassMap).includes(key) &&
            this.#options.tab.contextmenu[key].enable === true,
        )
        .sort(
          (a, b) =>
            this.#options.tab.contextmenu[a].order -
            this.#options.tab.contextmenu[b].order,
        )
        .map((key) => {
          //开始组装字符串

          //根据key把配置项都解构出来
          const { text, separator } = this.#options.tab.contextmenu[key]

          html.push(
            Utils.sprintf(
              Constants.HTML.listGroupItem,
              listGroupItemClassMap[key],
              text,
            ) + (separator ? Constants.HTML.listGroupSeparatorItem : ''),
          )
        })

      html.push(Constants.HTML.listGroup[1])
      let contextmenuHtml = html.join('')

      //插入到body中去
      document.body.insertAdjacentHTML('beforeEnd', contextmenuHtml)

      //查找右键菜单
      this.#contextmenuEl = document.querySelector(
        `[${Constants.DATAKEYS.contextmenu}="${this.#options.id}"]`,
      )
    }
  }

  #initDropdown() { }

  #initTabs() {
    if (this.#options.cache.enable === true) {
      const cacheTabs = this.#cacheHandle.get(this.#cacheKey) //获取缓存中的tab

      if (
        cacheTabs &&
        this.#cacheTabsCheck(cacheTabs) &&
        JSON.stringify(this.#options.defaultTabs) ===
        JSON.stringify(this.#cacheHandle.get(this.#cacheDefaultTabsKey))
      ) {
        this.#restoreTabs(
          cacheTabs,
          this.#getCacheActiveTab()?.url,
          false,
          false,
        )
      } else {
        this.#cacheHandle.delete(this.#cacheKey)
        this.#restoreTabs(
          this.#options.defaultTabs,
          this.#options.defaultTabs?.slice(-1)[0]?.url,
          true,
        )
        this.#cacheHandle.set(
          this.#cacheDefaultTabsKey,
          this.#options.defaultTabs,
        )
      }
    } else {
      //删除缓存
      this.#cacheHandle.store('local').delete(this.#cacheKey)
      this.#cacheHandle.store('session').delete(this.#cacheKey)
      this.#cacheHandle.store('local').delete(this.#cacheDefaultTabsKey)
      this.#cacheHandle.store('session').delete(this.#cacheDefaultTabsKey)

      //直接恢复选项提供的默认tab
      this.#restoreTabs(
        this.#options.defaultTabs,
        this.#options.defaultTabs.slice(-1)[0]?.url,
      )
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

  //复原tabs
  #restoreTabs(tabArr, url, pushCache = false, extend = true) {
    if (!Array.isArray(tabArr) || tabArr.length === 0) {
      return
    }

    //合并默认的单个tab的选项
    if (extend === true) {
      const extendTabs = []
      tabArr.forEach((item) => {
        extendTabs.push(
          Utils.extend({}, Constants.TABDEFAULTS, item, {
            [Constants.CLASSES.tabActive]: false,
          }),
        )
      })
      tabArr = Utils.arrUnique(extendTabs, 'url') //去重
    }

    //创建两个虚拟节点
    const tabFrag = document.createDocumentFragment()

    //这里只添加所有的tab，不添加iframe,否则全部加载iframe将会卡爆(重点优化)
    tabArr.forEach((tab) =>
      tabFrag.appendChild(Utils.createNode(this.#generateTabHtml(tab))),
    )

    //是否设置换成
    pushCache && this.#cacheHandle.set(this.#cacheKey, tabArr)

    //添加虚拟节点到tab的容器里面
    this.#tabBarItemScrollEl.appendChild(tabFrag)

    //激活最后一个
    this.activeTabByUrl(url)

    //滚动到激活tab所在位置
    this.scrollToTabByUrl(url, 'auto')
  }

  addTab(option) {
    //参数合并
    option = Utils.extend({}, Constants.TABDEFAULTS, option, {
      [Constants.CLASSES.tabActive]: false,
    })

    const url = option.url

    if (!this.getTabByUrl(url)) {
      //如果这个tab不存在
      if (
        Number.isInteger(this.#options.tab.maxNum) &&
        this.#options.tab.maxNum > 0
      ) {
        //如果是大于0的整数才生效
        //获取所有的可删除的tab

        let tabs = this.getClosableTabs()

        if (this.#options.tab.maxNum === 1) {
          //如果只保留一个，那么就把所有的tab给删除掉,因为添加的当前tab将会作为最新的1个tab

          for (let tab of tabs) {
            this.#removeTabByUrl(this.#getTabUrl(tab))
          }
        } else {
          if (tabs.length >= this.#options.tab.maxNum) {
            //判断是否已经达到了最大的tab数量,把第一个给移除

            //得到需要排除的tab
            tabs.slice(0, -(this.#options.tab.maxNum - 1)).forEach((tab) => {
              this.#removeTabByUrl(this.#getTabUrl(tab))
            })
          }
        }
      }

      //如果没有该tab则添加这个tab
      this.#tabBarItemScrollEl.insertAdjacentHTML(
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
    let tabs = this.#cacheHandle.get(this.#cacheKey)

    tabs.forEach((tab, index) => {
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

    //插入iframe
    this.getTabPaneByUrl(url)?.appendChild(iframe)
  }

  //iframe的超时处理逻辑
  #iFrameTimeoutHandle(url, iframeEl) {
    //超时设置
    const timeout =
      this.#options.tab.timeout.enable === true
        ? this.#options.tab.timeout.second
        : null

    if (Number.isInteger(timeout) && timeout >= 0) {
      //可能默认就已经存在这个定时
      this.#clearIFrameTimeout(iframeEl)

      iframeEl[Constants.DATAKEYS.iframeTimeoutTimer] = setTimeout(() => {
        this.#removeIFrameByUrl(url) //直接移除iframe停止加载

        //如果超时的话，就应该立即移除这个loading层
        this.#getTabLoadingByUrl(url)?.remove()

        let timeoutHtml = ''
        if (Utils.isStr(this.#options.tab.timeout.template)) {
          //如果是字符串说明是有自己设计超时界面
          timeoutHtml = this.#options.tab.timeout.template
        } else {
          timeoutHtml = Utils.sprintf(
            Constants.HTML.maskWrapper,
            Utils.sprintf(
              Constants.HTML.timeout,
              this.#options.tab.timeout.text,
            ),
          )
        }

        this.getTabPaneByUrl(url)?.insertAdjacentHTML('beforeEnd', timeoutHtml)

        typeof this.#options.onTabTimeout === 'function' &&
          this.#options.onTabTimeout.call(this, url, this)

        this.#tabFinallyAndAll()
      }, timeout)
    }
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
      this.#options.tab.closeBtn.enable === true && option.closable === true

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
    if (this.#options.cache.enable === true) {
      if (this.#cacheHandle.has(this.#cacheKey)) {
        this.#cacheHandle.push(this.#cacheKey, option)
      } else {
        this.#cacheHandle.set(this.#cacheKey, [option])
      }
    }
  }

  #activeCacheTabByUrl(url) {
    if (this.#options.cache.enable === true) {
      let tabs = this.#cacheHandle.get(this.#cacheKey)

      tabs.forEach((item) => {
        item.active = item.url === url
      })
      this.#cacheHandle.set(this.#cacheKey, tabs)
    }
  }

  scrollToTabByUrl(url, behavior = 'smooth') {
    const tab = this.getTabByUrl(url)

    //需要父元素设置postion(relative、absolute、fixed)
    // 获取到当前点击元素的 offsetLeft  - 包裹盒子 offsetWidth 的一半 + 当前点击元素 offsetWidth 的一半
    this.#tabBarItemScrollEl.scrollTo({
      left:
        tab.offsetLeft -
        this.#tabBarItemScrollEl.offsetWidth / 2 +
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
    this.clsoeLoadingByUrl(url)

    let enableLoading =
      typeof this.#options.tab.loading.enable === 'function'
        ? this.#options.tab.loading.enable.call(this, url, this)
        : this.#options.tab.loading.enable

    if (enableLoading) {
      //判断用户是否开启遮罩层

      let loadingHtml = ''
      let loading = Constants.HTML.loading
      if (Utils.isStr(this.#options.tab.loading.template)) {
        //判断用户是否自己传入字符串
        loading = this.#options.tab.loading.template
      }
      loadingHtml = Utils.sprintf(Constants.HTML.maskWrapper, loading)

      //插入面板
      this.getTabPaneByUrl(url)?.insertAdjacentHTML('beforeEnd', loadingHtml)
    }
  }

  // 关闭loading层
  clsoeLoadingByUrl(url) {
    this.getTabPaneByUrl(url)
      ?.querySelector(`.${Constants.CLASSES.overlays}`)
      ?.remove()
  }

  getTabPaneByUrl(url) {
    return this.#tabBodyEl.querySelector(`[data-tab-url="${url}"]`)
  }

  //获取tab的左边的所有的tabs
  getTabPrevAllByUrl(url) {
    return event(this.getTabByUrl(url)).prevAll().toArray()
  }

  //获取tab的右边的所有的tabs
  getTabNextAllByUrl(url) {
    return event(this.getTabByUrl(url)).nextAll().toArray()
  }

  getActiveTab() {
    return this.#tabBarItemScrollEl.querySelector('button.active')
  }

  getActiveTabPane() {
    return this.#tabBodyEl.querySelector('li.active')
  }

  getTabByUrl(url) {
    return this.#tabBarItemScrollEl.querySelector(`[data-tab-url="${url}"]`)
  }

  getTabs() {
    return this.#tabBarItemScrollEl.querySelectorAll(`button[data-tab-url]`)
  }

  // 获取所有的iframe
  #getIFrames() {
    return this.#tabBodyEl.querySelectorAll(`li[data-tab-url] > iframe`)
  }

  #getIFrameByUrl(url) {
    return this.getTabPaneByUrl(url)?.querySelector('iframe')
  }

  // 获取所有的可以删除的tab
  getClosableTabs() {
    return Array.from(
      this.#tabBarItemScrollEl.querySelectorAll('button'),
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
    this.#tabBarItemScrollEl.scrollTo({
      left:
        this.#tabBarItemScrollEl.scrollLeft -
        this.#tabBarItemScrollEl.offsetWidth,
      behavior: 'smooth',
    })
  }

  //下滑动
  nextScroll() {
    this.#tabBarItemScrollEl.scrollTo({
      left:
        this.#tabBarItemScrollEl.scrollLeft +
        this.#tabBarItemScrollEl.offsetWidth,
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
  getTabsCount() { }

  // 获取tab的标题
  getTitle(url) { }

  setTitle(url, title) { }

  getDisableByUrl(url) { }

  // 设置禁用状态
  setDisableByUrl(url, status = true) { }

  // 获取元素在父元素中的index
  #index(el) {
    let index = 0
    if (!el || !el.parentNode) {
      return -1
    }
    // previousElementSibling：上一个兄弟元素
    while (el && (el = el.previousElementSibling)) {
      index++
    }
    return index
  }

  // 触发动画
  #animate(prevRect, target) {
    let ms = 300
    if (ms) {
      let currentRect = target.getBoundingClientRect()
      if (prevRect.nodeType === 1) {
        prevRect = prevRect.getBoundingClientRect()
      }

      target.style.setProperty('transition', 'none')
      target.style.setProperty(
        'transform',
        `translate3d(${prevRect.left - currentRect.left}px,${prevRect.top - currentRect.top
        }px,0)`,
      )

      target.offsetWidth // 触发重绘

      target.style.setProperty('transition', `transform ${ms}ms`)
      target.style.setProperty('transform', 'translate3d(0,0,0)')

      // 时间到了之后把transition和transform清空
      clearTimeout(target.animated)
      target.animated = setTimeout(function () {
        target.style.setProperty('transition', '')
        target.style.setProperty('transform', '')
        target.animated = false
      }, ms)
    }
  }

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
  const pluginElements = document.querySelectorAll(
    Constants.SELECTOR_DATA_TOGGLE,
  )

  pluginElements.forEach((element) => {
    new Quicktab(element)
  })
})

export default Quicktab
