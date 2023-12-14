import Constants from './constants/index.js'
import Utils from './utils'

import query from './utils/query'

import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  autoUpdate,
} from '@floating-ui/dom'

class Quicktab {
  //实例对象
  static instances = []

  constructor(options) {
    //参数合并
    this.options = Object.freeze(
      query.extend(true, {}, Constants.DEFAULTS, options),
    )

    //全局变量,所有要用的变量都在这里定义统一管理
    this.$GLOBALS = {
      //选项selector的dom
      el: null,
      //缓存实例
      storage: null,
      //常量
      constants: Constants.CONSTANTS,
    }

    //初始化
    this._init()
  }

  _init() {
    // 容器检测
    this._validateContainer()

    //如果缓存被开启就初始化缓存工具
    if (this.options.cache.enable === true) {
      this.$GLOBALS.storage = new Storage(
        this.options.cache.type,
        this.options.selector,
      )
    }

    //给容器挂载类名
    this.$GLOBALS.el.classList.add(Constants.CONSTANTS.classes.container)

    //根据配置项设置容器的尺寸
    this._setElementSize()

    //初始化容器的主体构造
    this._initMainStructure()

    //回显tab(有缓存就回显缓存的tab)
    this._restoreTabs()
  }

  _restoreTabs() {
    //先判断缓存是否被开启
    if (this.options.cache.enable === true) {
      console.log('b')
    } else {
      console.log('a')
      // aa
    }
  }

  _initMainStructure() {
    const html = []

    if (this.options.tabBarConfig.enable === true) {
      //头部被启用

      html.push(`${Constants.CONSTANTS.html.tabBar[0]}`)

      //如果左滚动被启用就加入
      if (this.options.tabBarConfig.prev.enable === true) {
        html.push(
          Utils.sprintf(
            Constants.CONSTANTS.html.tabBarPrevItem,
            this.options.tabBarConfig.prev.icon,
          ),
        )
      }

      //刷新
      if (this.options.tabBarConfig.refresh.enable === true) {
        html.push(
          Utils.sprintf(
            Constants.CONSTANTS.html.tabBarRefreshItem,
            this.options.tabBarConfig.refresh.icon,
          ),
        )
      }

      //滚动区域
      html.push(Constants.CONSTANTS.html.tabBarScrollItem)

      //右滚动
      if (this.options.tabBarConfig.next.enable === true) {
        html.push(
          Utils.sprintf(
            Constants.CONSTANTS.html.tabBarNextItem,
            this.options.tabBarConfig.next.icon,
          ),
        )
      }
      //下拉菜单
      if (this.options.tabBarConfig.dropdown.enable === true) {
        html.push(
          Utils.sprintf(
            Constants.CONSTANTS.html.tabBarDropdownItem,
            this.options.tabBarConfig.dropdown.icon,
          ),
        )
      }
      //全屏
      if (this.options.tabBarConfig.fullscreen.enable === true) {
        html.push(
          Utils.sprintf(
            Constants.CONSTANTS.html.tabBarFullscreenItem,
            this.options.tabBarConfig.fullscreen.icon,
          ),
        )
      }
      html.push(Constants.CONSTANTS.html.tabBar[1])
    }

    //面板区域,总是要添加进去
    html.push(Constants.CONSTANTS.html.tabBody)

    const str = html.join('')

    console.log(str)

    this.$GLOBALS.el.insertAdjacentHTML('beforeEnd', str)

    // return str;
  }

  _setElementSize() {
    const { height, width, minHeight } = this.options

    const containerStyle = this.$GLOBALS.el.style

    if (Utils.isString(height) && height.trim().length !== 0) {
      containerStyle.setProperty('height', height)
    }
    if (Utils.isString(width) && width.trim().length !== 0) {
      containerStyle.setProperty('width', width)
    }
    if (Utils.isString(minHeight) && minHeight.trim().length !== 0) {
      containerStyle.setProperty('min-height', minHeight)
    }
  }

  _validateContainer() {
    const el = document.querySelector(this.options.selector)

    if (!(el instanceof HTMLElement)) {
      throw new Error(`selector '${this.options.selector}' invalid`)
    }

    if (el.classList.contains(Constants.CONSTANTS.classes.container)) {
      throw new Error(
        `The provided selector '${this.options.selector}' has been initialized`,
      )
    }

    this.$GLOBALS.el = el
  }
}

Quicktab.VERSION = Constants.VERSION
Quicktab.DEFAULTS = Constants.DEFAULTS

export default Quicktab
