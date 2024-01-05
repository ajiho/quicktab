/*!
 * quicktab v0.0.1 (https://gitee.com/ajiho/quicktab)
 * Copyright 2023-2024 ajiho
 * license MIT (https://gitee.com/ajiho/quicktab/blob/master/LICENSE)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Quicktab = factory());
})(this, (function () { 'use strict';

  var FullOption = {
    //必填项，是用户自己指定的唯一值用以区分quicktab的实例,缓存功能和通过data属性快捷添加tab的能力需要使用
    id: undefined,
    //最小高度
    minHeight: undefined,
    //高度
    height: undefined,
    //宽
    width: undefined,
    //本土化
    lang: undefined,
    //缓存类型  可用值: "session"  "local"
    cacheType: 'local',
    // 响应式支持(针对移动端或者小设备)
    responsive: {
      // 断点视口
      breakpoint: 576,
      // 小设备时因此的tabbar上的项目(只能是tabbar上被启用的item)
      hideItem: 'prev,next',
    },
    //默认tab
    defaultTabs: [],

    //tab工具栏配置
    toolbar: {
      //是否隐藏工具栏
      hide: false,

      //位置 top:在顶部，bottom:在底部
      position: 'top',

      // 左滚动
      prev: {
        icon: `<svg viewBox="0 0 16 16"><path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/></svg>`,
        order: 10,
      },

      // 刷新
      refresh: {
        icon: `<svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>`,
        order: 20,
      },

      // tab包裹区域
      tabWrapper: {
        order: 30,
      },

      // 右滚动
      next: {
        icon: `<svg viewBox="0 0 16 16"><path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/></svg>`,
        order: 40,
      },

      // 搜索tab、打开的标签、最近关闭的标签
      dropdown: {
        icon: `<svg viewBox="0 0 16 16"><path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/></svg>`,
        order: 50,
      },

      // 全屏
      fullscreen: {
        //图标
        icon: `<svg viewBox="0 0 16 16"><path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>`,
        //排序
        order: 60,
      },
    },

    //tab配置
    tab: {
      //记忆
      remember: false,

      //右键菜单配置
      contextmenu: {
        close: {
          text: '',
          order: 10,
          separator: false,
        },
        closeOthers: {
          text: '',
          order: 20,
          separator: false,
        },
        closePrev: {
          text: '',
          order: 30,
          separator: false,
        },
        closeNext: {
          text: '',
          order: 40,
          separator: false,
        },
        closeAll: {
          text: '',
          order: 50,
          separator: false,
        },
        fullscreen: {
          text: '',
          order: 60,
          separator: false,
        },
        refresh: {
          text: '',
          order: 70,
          separator: false,
        },
        centerActive: {
          text: '',
          order: 80,
          separator: false,
        },
        newBlank: {
          text: '',
          order: 90,
          separator: false,
        },
      },
      //鼠标滚轮切换tab   false:表示禁用该功能
      mouseWheelSwitch: {
        // 只是滚动tab的包裹区域   true:启用 false:不启用
        onlyScroll: false,
        //激活的tab自动滚动居中 true:启用 false:不启用 (当onlyScroll:false时有效)
        centerActive: true,
      },
      //最大数量  null:表示无限制
      maxNum: null,
      //关闭按钮  false:表示禁用该功能
      closeBtn: {
        //关闭按钮是否鼠标移入时才显示 true:启用 false:一直显示
        showOnHover: false,
        icon: `<svg viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg>`,
      },
      //当插件宽高改变时,当前激活的tab是否居中 false:不启用 true:启用
      resizeCenterActive: true,
      //tab单击时自动居中 false:不启用 true:启用
      clickCenterActive: false,
      //双击刷新 false:不启用 true:启用
      doubleClickRefresh: false,
      //tab是否可以拖动排序  false:不启用 true:启用
      dragSort: false,
      //超时设置 false:表示禁用该功能
      timeout: {
        //过滤器 func 可以对于一些特定的tab不启用超时
        filter(url) {
          return true
        },
        //超时时的提示文本
        text: '',
        //超时时间
        second: 3000,
        //超时自定义模板
        template: null,
      },
      //tab加载时的模板 false:表示禁用该功能
      loading: {
        //过滤器 func 可以对于一些特定的tab不启用loading
        filter(url) {
          return true
        },
        //自定义加载模板 str func
        template: null,
      },
    },
    //tab被激活的事件(这里是比如关闭tab时，会自动激活别的tab时的事件回调)
    onTabActivated() {
      return false
    },
    //通过tab的add方法添加时产生的tab激活事件(比如左侧菜单需要通过添加tab的方法产生的激活事件)
    onTabAddActivated() {
      return false
    },
    //tab加载完毕事件
    onTabLoaded() {
      return false
    },
    //tab加载超时事件
    onTabTimeout() {
      return false
    },
    //tab加载或超时都会触发的事件
    onTabFinally() {
      return false
    },
    //页面上所有的tab都完成事件。
    onTabAll() {
      return false
    },
    //tab加载层过渡完毕的事件,该事件需要tab配置项loading被启用才会执行回调。
    onTabLoadingTransitionend() {
      return false
    },
    //tab被点击回调事件
    onTabClick() {
      return false
    },
    //tab被双击回调事件
    onTabDoubleClick() {
      return false
    },
    //tab被关闭的事件
    onTabClose() {
      return false
    },
    //实例化完毕回调
    onInit() {
      return false
    },
  };

  var TabOption = {
    //标题
    title: '新标签页',
    // 地址
    url: '',
    //可否关闭
    closable: true,
    //禁用状态
    disabled: false,
  };

  var DataKeys = {
    tabUrl: 'data-tab-url',
    contextmenu: 'data-quicktab-contextmenu',
    //记录iframe的状态 true:表示已经加载完毕
    iframeLoaded: 'loaded',
    singleTab: 'data-qt-tab',
    singleTabTarget: 'data-qt-target',
    //iframe的超时句柄
    iframeTimeoutTimer: 'timer',
  };

  var Classes = {
    container: 'quicktab',
    tabBar: 'tab-bar',
    tabBarHide: 'hide',
    tabBarPrevItem: 'prev',
    tabBarRefreshItem: 'refresh',
    tabBarScrollItem: 'scroll',
    tabBarNextItem: 'next',
    tabBarDropdownItem: 'dropdown',
    tabBarFullscreenItem: 'fullscreen',
    tabBody: 'tab-body',
    //该类名实现iframe的鼠标事件穿透问题
    pointerEventsNnoe: 'pen',
    tabActive: 'active',
    tabDisabled: 'disabled',
    tabPaneActive: 'active',
    //关闭按钮鼠标移入时才显示时的辅助类名
    showCloseBtnOnHover: 'hover',
    listGroupCloseItem: 'close',
    listGroupShow: 'show',
    listGroupCloseOtherItem: 'other',
    listGroupClosePrevItem: 'prev',
    listGroupCloseNextItem: 'next',
    listGroupCloseAllItem: 'all',
    listGroupRefreshItem: 'refresh',
    listGroupCenterActiveItem: 'center-active',
    listGroupNewBlankItem: 'new-blank',
    listGroupFullscreenItem: 'fullscreen',
    //遮罩层
    overlays: 'mask',
  };

  var Html = {
    //tab工具栏容器
    tabBar: [`<ul class="${Classes.tabBar} %s">`, '</ul>'],

    // tab工具栏的项目
    tabBarItem: `<li class="%s"><button>%s</button></li>`,
    tabBarScrollItem: `<li class="%s"></li>`,
    //选项卡body部分
    tabBody: `<ul class="${Classes.tabBody}"></ul>`,

    tabBodyItem: `<li ${DataKeys.tabUrl}=%s></li>`,

    //遮罩层包裹层
    maskWrapper: `<div class="${Classes.overlays}"><div class="mask-inner">%s</div></div>`,

    //加载器
    loading: `<div class="quicktab-loaders"><div></div><div></div><div></div></div>`,
    //默认超时界面
    timeout: `<div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;background-color:#f8f9fa;"><span style="color: rgba(33, 37, 41, 0.75);">%s</span></div>`,

    //单个tab结构
    tab: `<button %s class="%s" ${DataKeys.tabUrl}=%s ><span>%s</span>%s</button>`,

    //列表组
    listGroup: [`<ul %s="%s" class="quicktab-list-group">`, '</ul>'],

    //列表关闭item
    listGroupItem: `<li class="%s"><span>%s</span></li>`,
    //分隔线
    listGroupSeparatorItem: '<li class="separator"></li>',
  };

  var Lang = {
    formatLoadingMessage() {
      return '请求超时'
    },

    formatContextmenuClose() {
      return `关闭当前`
    },

    formatContextmenuCloseOthers() {
      return `关闭其它`
    },
    formatContextmenuClosePrev() {
      return `关闭左侧`
    },
    formatContextmenuCloseNext() {
      return `关闭右侧`
    },
    formatContextmenuCloseAll() {
      return `关闭所有`
    },
    formatContextmenuFullscreen() {
      return `全屏显示`
    },
    formatContextmenuRefresh() {
      return `重新加载`
    },
    formatContextmenuCenterActive() {
      return `回到当前`
    },
    formatContextmenuNewBlank() {
      return `新窗口打开`
    },
  };

  var Utils = {
    /**
     * 通过字符串创建节点
     * @param htmlStr
     * @returns {Element}
     */
    createNode(htmlStr) {
      const node = document.createElement('div');
      node.innerHTML = htmlStr;
      return node.firstChild
    },

    //防抖
    debounce(func, wait = 500) {
      let timeout;

      return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      }
    },

    // 判断iframe是否跨域
    canAccessIFrame(iframe) {
      if (!iframe.contentWindow || !iframe.contentDocument) {
        return false
      }
      return true
    },

    /**
     * 给一个元素的某些特定后代元素设置属性
     * @param {Element|String} element  需要设置样式的元素,可以是dom对象也可以是dom字符串
     * @param {Array} selectorArr
     */
    setProperty(element, selectorArr, name, value) {
      if (!Array.isArray(selectorArr)) {
        console.error('Invalid arguments');
        return
      }

      const type = !(element instanceof Element);

      if (type) {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = element;
        element = tempElement;
      }

      element.querySelectorAll(selectorArr).forEach((tabBarItem) => {
        tabBarItem.style.setProperty(name, value);
      });

      return type ? element.innerHTML : element
    },

    sprintf(_str, ...args) {
      let flag = true;
      let i = 0;

      const str = _str.replace(/%s/g, () => {
        const arg = args[i++];

        if (typeof arg === 'undefined') {
          flag = false;
          return ''
        }
        return arg
      });

      return flag ? str : ''
    },

    isStr(str) {
      return Object.prototype.toString.call(str) === '[object String]'
    },

    //数组对象去重
    arrUnique(arr, objKey) {
      //临时数组
      let temp = [];
      return arr.reduce(function (prev, curr) {
        if (temp.indexOf(curr[objKey]) === -1) {
          temp.push(curr[objKey]);
          prev.push(curr);
        }
        return prev
      }, [])
    },

    // 类似jQuery的$(document).ready(function () {});
    ready(callback) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
      } else {
        callback();
      }
    },

    //可以让单击事件具备双击的能力
    handleSingleAndDoubleClick(
      callbacks,
      { enableDbClick = true, delay = 200 } = {},
    ) {
      let clicks = 0;
      let timer = null;
      const { click, dbclick } = callbacks;

      return function (event) {
        const preventAndstop = (type) => {
          const { preventDefault = true, stopPropagation = true } = type;
          if (preventDefault) event.preventDefault();
          if (stopPropagation) event.stopPropagation();
        };

        const callBack = (type) => {
          const { handle } = type;
          if (typeof handle === 'function') {
            handle.call(this, event);
          }
        };

        if (enableDbClick === true) {
          clicks++;
          if (clicks === 1) {
            //单击

            preventAndstop(click);

            timer = setTimeout(() => {
              callBack(click);
              clicks = 0;
            }, delay);
          } else {
            preventAndstop(dbclick);
            clearTimeout(timer);
            callBack(dbclick);
            clicks = 0;
          }
        } else {
          preventAndstop(click);
          callBack(click);
        }
      }
    },

    extend() {
      let options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {}, //第一个参数
        i = 1,
        length = arguments.length,
        deep = false;

      // 处理深度复制情况
      if (typeof target === 'boolean') {
        deep = target;

        // 跳过布尔值和目标
        target = arguments[i] || {};
        i++;
      }

      // 当目标是字符串或其他东西时处理大小写（可能在深度复制中）
      if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
      }

      // 如果只传递一个参数，则扩展jQuery本身
      if (i === length) {
        target = this;
        i--;
      }

      for (; i < length; i++) {
        // 仅处理非null/未定义的值
        if ((options = arguments[i]) != null) {
          // 延伸基础对象
          for (name in options) {
            copy = options[name];

            // 防止Object.prototype污染
            // 防止无休止的循环
            if (name === '__proto__' || target === copy) {
              continue
            }

            // 如果我们正在合并普通对象或数组，则重复出现
            if (
              deep &&
              copy &&
              (this.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
            ) {
              src = target[name];

              // 确保源值的类型正确
              if (copyIsArray && !Array.isArray(src)) {
                clone = [];
              } else if (!copyIsArray && !this.isPlainObject(src)) {
                clone = {};
              } else {
                clone = src;
              }
              copyIsArray = false;

              // 从不移动原始对象，而是克隆它们
              target[name] = this.extend(deep, clone, copy);

              // 不要引入未定义的值
              // } else if (copy !== undefined) {
            } else {
              target[name] = copy;
            }
          }
        }
      }

      // 返回修改后的对象
      return target
    },

    //用于判断一个对象是否是纯粹的 JavaScript 对象（即不是 DOM 对象、函数、数组等）。具体作用是检查对象是否通过对象字面量或 new Object() 创建，且其原型链上只包含标准的 Object 原型
    isPlainObject(obj) {
      if (typeof obj !== 'object' || obj === null || obj instanceof Array) {
        return false
      }

      const prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null
    },

    isObject(value) {
      return Object.prototype.toString.call(value) === '[object Object]'
    },

    isJSONString(str) {
      try {
        const result = JSON.parse(str);
        return (
          Object.prototype.toString.call(result) === '[object Object]' ||
          Array.isArray(result)
        )
      } catch (e) {
        return false
      }
    },

    parseAttributeValue(value) {
      // 如果值是 'true' 或 'false'，转换为相应的布尔值
      if (value === 'true') {
        return true
      } else if (value === 'false') {
        return false
      }

      // 尝试解析为 JSON
      if (this.isJSONString(value)) {
        return JSON.parse(value)
      }

      // 尝试获取全局函数
      const globalFunction = window[value];
      if (typeof globalFunction === 'function') {
        return globalFunction
      }

      // 返回原始值
      return value
    },
  };

  const VERSION = '0.0.1';
  const SELECTOR_DATA_TOGGLE = '[data-qt-toggle="quicktab"]';

  //禁用掉一些选项
  const Presets = {
    toolbar: {
      refresh: false,
      dropdown: false,
      fullscreen: false,
    },
    tab: {
      remember: false,
      contextmenu: false,
      mouseWheelSwitch: false,
      timeout: false,
      loading: false,
    },
  };

  // 默认选项
  const DEFAULTS = Utils.extend(true, {}, FullOption, Lang, Presets);

  //默认的语言包是中文
  const LANGS = {
    zh: Lang,
    'zh-CN': Lang,
  };

  var Constants = {
    VERSION,
    DEFAULTS,
    FULLOPTION: FullOption,
    DATAKEYS: DataKeys,
    TABDEFAULTS: TabOption,
    CLASSES: Classes,
    HTML: Html,
    SELECTOR_DATA_TOGGLE,
    LANGS,
  };

  class TagSet {
    constructor(tag, cache) {
      //标签的缓存Key
      this.tag = Array.isArray(tag) ? tag : [tag];

      //缓存句柄
      this.handler = cache;
    }

    set(key, value, expire = null) {
      this.handler.set(key, value, expire);

      this.append(key);
    }

    append(key) {
      for (const tag of this.tag) {
        //读取标签
        const tagItems = this.handler.getTagItems(tag);

        //判断标签是否在数组里,不再就直接加入
        if (!tagItems.includes(key)) {
          //加入数组
          tagItems.push(key);

          //重新设置回去
          this.handler.set(tag, tagItems);
        }
      }
    }

    clear() {
      for (const tag of this.tag) {
        const tagItems = this.handler.getTagItems(tag);

        //分别遍历删除所有的缓存
        for (const cacheKey of tagItems) {
          this.handler.delete(cacheKey);
        }
        //再删除标签
        this.handler.delete(tag);
      }
    }
  }

  class QuickCache {
    constructor(options = {}) {
      this.type = options.type || 'local'; //默认驱动是 localStorage
      this.expire = options.expire || 0;
      this.prefix = options.prefix || '';
      this.serialize = options.serialize || JSON.stringify;
      this.deserialize = options.deserialize || JSON.parse;
      this.storage = window[`${this.type}Storage`];
    }

    getKey(key) {
      return this.prefix + key
    }

    set(key, value, expire = null) {
      const cacheValue = {
        value,
        expire:
          expire || this.expire !== 0
            ? Date.now() + (expire || this.expire) * 1000
            : 0,
      };
      try {
        this.storage.setItem(this.getKey(key), this.serialize(cacheValue));
        return true
      } catch (error) {
        return false
      }
    }

    has(key) {
      return this.storage.getItem(this.getKey(key)) !== null
    }

    get(key, defaultValue = null) {
      const cacheValue = this.storage.getItem(this.getKey(key));
      if (cacheValue) {
        const parsedValue = this.deserialize(cacheValue);
        if (parsedValue.expire === 0 || parsedValue.expire >= Date.now()) {
          return parsedValue.value
        }
        this.delete(key);
      }
      return defaultValue
    }

    delete(key) {
      this.storage.removeItem(this.getKey(key));
    }

    clear() {
      this.storage.clear();
    }

    remember(key, value, expire = null) {
      const cachedValue = this.get(key);
      if (cachedValue !== null) {
        return cachedValue
      }

      if (typeof value === 'function') {
        //允许第二个参数是一个函数
        const computedValue = value();
        this.set(key, computedValue, expire);
        return computedValue
      }
      this.set(key, value, expire);
      return value
    }

    inc(key, step = 1) {
      const cachedValue = this.get(key, 0);
      if (typeof cachedValue === 'number') {
        this.set(key, cachedValue + step);
      }
    }

    tag(tag) {
      return new TagSet(tag, this)
    }

    dec(key, step = 1) {
      this.inc(key, -step);
    }

    //获取并删除缓存
    pull(key) {
      let value = this.get(key);
      this.delete(key);
      return value
    }

    push(key, value) {
      const cachedValue = this.get(key, []);
      if (Array.isArray(cachedValue)) {
        cachedValue.push(value);
        this.set(key, cachedValue);
      }
    }

    store(type) {
      return new this.constructor({
        type,
        expire: this.expire,
        prefix: this.prefix,
        serialize: this.serialize,
        deserialize: this.deserialize,
      })
    }

    getTagItems(tag) {
      return this.get(tag, [])
    }
  }

  // For ECMAScript module environments where a proper `window`
  // is present, execute the factory and get jQuery.
  function jQueryFactory( window, noGlobal ) {

  if ( typeof window === "undefined" || !window.document ) {
  	throw new Error( "jQuery requires a window with a document" );
  }

  var arr = [];

  var getProto = Object.getPrototypeOf;

  var slice = arr.slice;

  // Support: IE 11+
  // IE doesn't have Array#flat; provide a fallback.
  var flat = arr.flat ? function( array ) {
  	return arr.flat.call( array );
  } : function( array ) {
  	return arr.concat.apply( [], array );
  };

  var push = arr.push;

  var indexOf = arr.indexOf;

  // [[Class]] -> type pairs
  var class2type = {};

  var toString = class2type.toString;

  var hasOwn = class2type.hasOwnProperty;

  var fnToString = hasOwn.toString;

  var ObjectFunctionString = fnToString.call( Object );

  // All support tests are defined in their respective modules.
  var support = {};

  function toType( obj ) {
  	if ( obj == null ) {
  		return obj + "";
  	}

  	return typeof obj === "object" ?
  		class2type[ toString.call( obj ) ] || "object" :
  		typeof obj;
  }

  function isWindow( obj ) {
  	return obj != null && obj === obj.window;
  }

  function isArrayLike( obj ) {

  	var length = !!obj && obj.length,
  		type = toType( obj );

  	if ( typeof obj === "function" || isWindow( obj ) ) {
  		return false;
  	}

  	return type === "array" || length === 0 ||
  		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
  }

  var document = window.document;

  var preservedScriptAttributes = {
  	type: true,
  	src: true,
  	nonce: true,
  	noModule: true
  };

  function DOMEval( code, node, doc ) {
  	doc = doc || document;

  	var i,
  		script = doc.createElement( "script" );

  	script.text = code;
  	if ( node ) {
  		for ( i in preservedScriptAttributes ) {
  			if ( node[ i ] ) {
  				script[ i ] = node[ i ];
  			}
  		}
  	}
  	doc.head.appendChild( script ).parentNode.removeChild( script );
  }

  var version = "4.0.0-pre+e8b7db4b +event,+attributes",

  	rhtmlSuffix = /HTML$/i,

  	// Define a local copy of jQuery
  	jQuery = function( selector, context ) {

  		// The jQuery object is actually just the init constructor 'enhanced'
  		// Need init if jQuery is called (just allow error to be thrown if not included)
  		return new jQuery.fn.init( selector, context );
  	};

  jQuery.fn = jQuery.prototype = {

  	// The current version of jQuery being used
  	jquery: version,

  	constructor: jQuery,

  	// The default length of a jQuery object is 0
  	length: 0,

  	toArray: function() {
  		return slice.call( this );
  	},

  	// Get the Nth element in the matched element set OR
  	// Get the whole matched element set as a clean array
  	get: function( num ) {

  		// Return all the elements in a clean array
  		if ( num == null ) {
  			return slice.call( this );
  		}

  		// Return just the one element from the set
  		return num < 0 ? this[ num + this.length ] : this[ num ];
  	},

  	// Take an array of elements and push it onto the stack
  	// (returning the new matched element set)
  	pushStack: function( elems ) {

  		// Build a new jQuery matched element set
  		var ret = jQuery.merge( this.constructor(), elems );

  		// Add the old object onto the stack (as a reference)
  		ret.prevObject = this;

  		// Return the newly-formed element set
  		return ret;
  	},

  	// Execute a callback for every element in the matched set.
  	each: function( callback ) {
  		return jQuery.each( this, callback );
  	},

  	map: function( callback ) {
  		return this.pushStack( jQuery.map( this, function( elem, i ) {
  			return callback.call( elem, i, elem );
  		} ) );
  	},

  	slice: function() {
  		return this.pushStack( slice.apply( this, arguments ) );
  	},

  	first: function() {
  		return this.eq( 0 );
  	},

  	last: function() {
  		return this.eq( -1 );
  	},

  	even: function() {
  		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
  			return ( i + 1 ) % 2;
  		} ) );
  	},

  	odd: function() {
  		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
  			return i % 2;
  		} ) );
  	},

  	eq: function( i ) {
  		var len = this.length,
  			j = +i + ( i < 0 ? len : 0 );
  		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
  	},

  	end: function() {
  		return this.prevObject || this.constructor();
  	}
  };

  jQuery.extend = jQuery.fn.extend = function() {
  	var options, name, src, copy, copyIsArray, clone,
  		target = arguments[ 0 ] || {},
  		i = 1,
  		length = arguments.length,
  		deep = false;

  	// Handle a deep copy situation
  	if ( typeof target === "boolean" ) {
  		deep = target;

  		// Skip the boolean and the target
  		target = arguments[ i ] || {};
  		i++;
  	}

  	// Handle case when target is a string or something (possible in deep copy)
  	if ( typeof target !== "object" && typeof target !== "function" ) {
  		target = {};
  	}

  	// Extend jQuery itself if only one argument is passed
  	if ( i === length ) {
  		target = this;
  		i--;
  	}

  	for ( ; i < length; i++ ) {

  		// Only deal with non-null/undefined values
  		if ( ( options = arguments[ i ] ) != null ) {

  			// Extend the base object
  			for ( name in options ) {
  				copy = options[ name ];

  				// Prevent Object.prototype pollution
  				// Prevent never-ending loop
  				if ( name === "__proto__" || target === copy ) {
  					continue;
  				}

  				// Recurse if we're merging plain objects or arrays
  				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
  					( copyIsArray = Array.isArray( copy ) ) ) ) {
  					src = target[ name ];

  					// Ensure proper type for the source value
  					if ( copyIsArray && !Array.isArray( src ) ) {
  						clone = [];
  					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
  						clone = {};
  					} else {
  						clone = src;
  					}
  					copyIsArray = false;

  					// Never move original objects, clone them
  					target[ name ] = jQuery.extend( deep, clone, copy );

  				// Don't bring in undefined values
  				} else if ( copy !== undefined ) {
  					target[ name ] = copy;
  				}
  			}
  		}
  	}

  	// Return the modified object
  	return target;
  };

  jQuery.extend( {

  	// Unique for each copy of jQuery on the page
  	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

  	// Assume jQuery is ready without the ready module
  	isReady: true,

  	error: function( msg ) {
  		throw new Error( msg );
  	},

  	noop: function() {},

  	isPlainObject: function( obj ) {
  		var proto, Ctor;

  		// Detect obvious negatives
  		// Use toString instead of jQuery.type to catch host objects
  		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
  			return false;
  		}

  		proto = getProto( obj );

  		// Objects with no prototype (e.g., `Object.create( null )`) are plain
  		if ( !proto ) {
  			return true;
  		}

  		// Objects with prototype are plain iff they were constructed by a global Object function
  		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
  		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
  	},

  	isEmptyObject: function( obj ) {
  		var name;

  		for ( name in obj ) {
  			return false;
  		}
  		return true;
  	},

  	// Evaluates a script in a provided context; falls back to the global one
  	// if not specified.
  	globalEval: function( code, options, doc ) {
  		DOMEval( code, { nonce: options && options.nonce }, doc );
  	},

  	each: function( obj, callback ) {
  		var length, i = 0;

  		if ( isArrayLike( obj ) ) {
  			length = obj.length;
  			for ( ; i < length; i++ ) {
  				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
  					break;
  				}
  			}
  		} else {
  			for ( i in obj ) {
  				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
  					break;
  				}
  			}
  		}

  		return obj;
  	},


  	// Retrieve the text value of an array of DOM nodes
  	text: function( elem ) {
  		var node,
  			ret = "",
  			i = 0,
  			nodeType = elem.nodeType;

  		if ( !nodeType ) {

  			// If no nodeType, this is expected to be an array
  			while ( ( node = elem[ i++ ] ) ) {

  				// Do not traverse comment nodes
  				ret += jQuery.text( node );
  			}
  		}
  		if ( nodeType === 1 || nodeType === 11 ) {
  			return elem.textContent;
  		}
  		if ( nodeType === 9 ) {
  			return elem.documentElement.textContent;
  		}
  		if ( nodeType === 3 || nodeType === 4 ) {
  			return elem.nodeValue;
  		}

  		// Do not include comment or processing instruction nodes

  		return ret;
  	},


  	// results is for internal usage only
  	makeArray: function( arr, results ) {
  		var ret = results || [];

  		if ( arr != null ) {
  			if ( isArrayLike( Object( arr ) ) ) {
  				jQuery.merge( ret,
  					typeof arr === "string" ?
  						[ arr ] : arr
  				);
  			} else {
  				push.call( ret, arr );
  			}
  		}

  		return ret;
  	},

  	inArray: function( elem, arr, i ) {
  		return arr == null ? -1 : indexOf.call( arr, elem, i );
  	},

  	isXMLDoc: function( elem ) {
  		var namespace = elem && elem.namespaceURI,
  			docElem = elem && ( elem.ownerDocument || elem ).documentElement;

  		// Assume HTML when documentElement doesn't yet exist, such as inside
  		// document fragments.
  		return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
  	},

  	// Note: an element does not contain itself
  	contains: function( a, b ) {
  		var bup = b && b.parentNode;

  		return a === bup || !!( bup && bup.nodeType === 1 && (

  			// Support: IE 9 - 11+
  			// IE doesn't have `contains` on SVG.
  			a.contains ?
  				a.contains( bup ) :
  				a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
  		) );
  	},

  	merge: function( first, second ) {
  		var len = +second.length,
  			j = 0,
  			i = first.length;

  		for ( ; j < len; j++ ) {
  			first[ i++ ] = second[ j ];
  		}

  		first.length = i;

  		return first;
  	},

  	grep: function( elems, callback, invert ) {
  		var callbackInverse,
  			matches = [],
  			i = 0,
  			length = elems.length,
  			callbackExpect = !invert;

  		// Go through the array, only saving the items
  		// that pass the validator function
  		for ( ; i < length; i++ ) {
  			callbackInverse = !callback( elems[ i ], i );
  			if ( callbackInverse !== callbackExpect ) {
  				matches.push( elems[ i ] );
  			}
  		}

  		return matches;
  	},

  	// arg is for internal usage only
  	map: function( elems, callback, arg ) {
  		var length, value,
  			i = 0,
  			ret = [];

  		// Go through the array, translating each of the items to their new values
  		if ( isArrayLike( elems ) ) {
  			length = elems.length;
  			for ( ; i < length; i++ ) {
  				value = callback( elems[ i ], i, arg );

  				if ( value != null ) {
  					ret.push( value );
  				}
  			}

  		// Go through every key on the object,
  		} else {
  			for ( i in elems ) {
  				value = callback( elems[ i ], i, arg );

  				if ( value != null ) {
  					ret.push( value );
  				}
  			}
  		}

  		// Flatten any nested arrays
  		return flat( ret );
  	},

  	// A global GUID counter for objects
  	guid: 1,

  	// jQuery.support is not used in Core but other projects attach their
  	// properties to it so it needs to exist.
  	support: support
  } );

  if ( typeof Symbol === "function" ) {
  	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
  }

  // Populate the class2type map
  jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
  	function( _i, name ) {
  		class2type[ "[object " + name + "]" ] = name.toLowerCase();
  	} );

  var documentElement = document.documentElement;

  // Only count HTML whitespace
  // Other whitespace should count in values
  // https://infra.spec.whatwg.org/#ascii-whitespace
  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

  var rcheckableType = /^(?:checkbox|radio)$/i;

  var isIE = document.documentMode;

  /**
   * Determines whether an object can have data
   */
  function acceptData( owner ) {

  	// Accepts only:
  	//  - Node
  	//    - Node.ELEMENT_NODE
  	//    - Node.DOCUMENT_NODE
  	//  - Object
  	//    - Any
  	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
  }

  // Matches dashed string for camelizing
  var rdashAlpha = /-([a-z])/g;

  // Used by camelCase as callback to replace()
  function fcamelCase( _all, letter ) {
  	return letter.toUpperCase();
  }

  // Convert dashed to camelCase
  function camelCase( string ) {
  	return string.replace( rdashAlpha, fcamelCase );
  }

  function Data() {
  	this.expando = jQuery.expando + Data.uid++;
  }

  Data.uid = 1;

  Data.prototype = {

  	cache: function( owner ) {

  		// Check if the owner object already has a cache
  		var value = owner[ this.expando ];

  		// If not, create one
  		if ( !value ) {
  			value = Object.create( null );

  			// We can accept data for non-element nodes in modern browsers,
  			// but we should not, see trac-8335.
  			// Always return an empty object.
  			if ( acceptData( owner ) ) {

  				// If it is a node unlikely to be stringify-ed or looped over
  				// use plain assignment
  				if ( owner.nodeType ) {
  					owner[ this.expando ] = value;

  				// Otherwise secure it in a non-enumerable property
  				// configurable must be true to allow the property to be
  				// deleted when data is removed
  				} else {
  					Object.defineProperty( owner, this.expando, {
  						value: value,
  						configurable: true
  					} );
  				}
  			}
  		}

  		return value;
  	},
  	set: function( owner, data, value ) {
  		var prop,
  			cache = this.cache( owner );

  		// Handle: [ owner, key, value ] args
  		// Always use camelCase key (gh-2257)
  		if ( typeof data === "string" ) {
  			cache[ camelCase( data ) ] = value;

  		// Handle: [ owner, { properties } ] args
  		} else {

  			// Copy the properties one-by-one to the cache object
  			for ( prop in data ) {
  				cache[ camelCase( prop ) ] = data[ prop ];
  			}
  		}
  		return cache;
  	},
  	get: function( owner, key ) {
  		return key === undefined ?
  			this.cache( owner ) :

  			// Always use camelCase key (gh-2257)
  			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
  	},
  	access: function( owner, key, value ) {

  		// In cases where either:
  		//
  		//   1. No key was specified
  		//   2. A string key was specified, but no value provided
  		//
  		// Take the "read" path and allow the get method to determine
  		// which value to return, respectively either:
  		//
  		//   1. The entire cache object
  		//   2. The data stored at the key
  		//
  		if ( key === undefined ||
  				( ( key && typeof key === "string" ) && value === undefined ) ) {

  			return this.get( owner, key );
  		}

  		// When the key is not a string, or both a key and value
  		// are specified, set or extend (existing objects) with either:
  		//
  		//   1. An object of properties
  		//   2. A key and value
  		//
  		this.set( owner, key, value );

  		// Since the "set" path can have two possible entry points
  		// return the expected data based on which path was taken[*]
  		return value !== undefined ? value : key;
  	},
  	remove: function( owner, key ) {
  		var i,
  			cache = owner[ this.expando ];

  		if ( cache === undefined ) {
  			return;
  		}

  		if ( key !== undefined ) {

  			// Support array or space separated string of keys
  			if ( Array.isArray( key ) ) {

  				// If key is an array of keys...
  				// We always set camelCase keys, so remove that.
  				key = key.map( camelCase );
  			} else {
  				key = camelCase( key );

  				// If a key with the spaces exists, use it.
  				// Otherwise, create an array by matching non-whitespace
  				key = key in cache ?
  					[ key ] :
  					( key.match( rnothtmlwhite ) || [] );
  			}

  			i = key.length;

  			while ( i-- ) {
  				delete cache[ key[ i ] ];
  			}
  		}

  		// Remove the expando if there's no more data
  		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

  			// Support: Chrome <=35 - 45+
  			// Webkit & Blink performance suffers when deleting properties
  			// from DOM nodes, so set to undefined instead
  			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
  			if ( owner.nodeType ) {
  				owner[ this.expando ] = undefined;
  			} else {
  				delete owner[ this.expando ];
  			}
  		}
  	},
  	hasData: function( owner ) {
  		var cache = owner[ this.expando ];
  		return cache !== undefined && !jQuery.isEmptyObject( cache );
  	}
  };

  var dataPriv = new Data();

  function nodeName( elem, name ) {
  	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  }

  // rsingleTag matches a string consisting of a single HTML element with no attributes
  // and captures the element's name
  var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

  function isObviousHtml( input ) {
  	return input[ 0 ] === "<" &&
  		input[ input.length - 1 ] === ">" &&
  		input.length >= 3;
  }

  var pop = arr.pop;

  // https://www.w3.org/TR/css3-selectors/#whitespace
  var whitespace = "[\\x20\\t\\r\\n\\f]";

  // Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
  // Make sure the `:has()` argument is parsed unforgivingly.
  // We include `*` in the test to detect buggy implementations that are
  // _selectively_ forgiving (specifically when the list includes at least
  // one valid selector).
  // Note that we treat complete lack of support for `:has()` as if it were
  // spec-compliant support, which is fine because use of `:has()` in such
  // environments will fail in the qSA path and fall back to jQuery traversal
  // anyway.
  try {
  	document.querySelector( ":has(*,:jqfake)" );
  	support.cssHas = false;
  } catch ( e ) {
  	support.cssHas = true;
  }

  // Build QSA regex.
  // Regex strategy adopted from Diego Perini.
  var rbuggyQSA = [];

  if ( isIE ) {
  	rbuggyQSA.push(

  		// Support: IE 9 - 11+
  		// IE's :disabled selector does not pick up the children of disabled fieldsets
  		":enabled",
  		":disabled",

  		// Support: IE 11+
  		// IE 11 doesn't find elements on a `[name='']` query in some cases.
  		// Adding a temporary attribute to the document before the selection works
  		// around the issue.
  		"\\[" + whitespace + "*name" + whitespace + "*=" +
  			whitespace + "*(?:''|\"\")"
  	);
  }

  if ( !support.cssHas ) {

  	// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
  	// Our regular `try-catch` mechanism fails to detect natively-unsupported
  	// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
  	// in browsers that parse the `:has()` argument as a forgiving selector list.
  	// https://drafts.csswg.org/selectors/#relational now requires the argument
  	// to be parsed unforgivingly, but browsers have not yet fully adjusted.
  	rbuggyQSA.push( ":has" );
  }

  rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

  var rtrimCSS = new RegExp(
  	"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
  	"g"
  );

  // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
  var identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
  	"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+";

  var booleans = "checked|selected|async|autofocus|autoplay|controls|" +
  	"defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";

  var rleadingCombinator = new RegExp( "^" + whitespace + "*([>+~]|" +
  	whitespace + ")" + whitespace + "*" );

  var rdescend = new RegExp( whitespace + "|>" );

  var rsibling = /[+~]/;

  // Support: IE 9 - 11+
  // IE requires a prefix.
  var matches = documentElement.matches || documentElement.msMatchesSelector;

  /**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
  function createCache() {
  	var keys = [];

  	function cache( key, value ) {

  		// Use (key + " ") to avoid collision with native prototype properties
  		// (see https://github.com/jquery/sizzle/issues/157)
  		if ( keys.push( key + " " ) > jQuery.expr.cacheLength ) {

  			// Only keep the most recent entries
  			delete cache[ keys.shift() ];
  		}
  		return ( cache[ key + " " ] = value );
  	}
  	return cache;
  }

  /**
   * Checks a node for validity as a jQuery selector context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
  function testContext( context ) {
  	return context && typeof context.getElementsByTagName !== "undefined" && context;
  }

  // Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
  var attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

  	// Operator (capture 2)
  	"*([*^$|!~]?=)" + whitespace +

  	// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
  	"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
  	whitespace + "*\\]";

  var pseudos = ":(" + identifier + ")(?:\\((" +

  	// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
  	// 1. quoted (capture 3; capture 4 or capture 5)
  	"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

  	// 2. simple (capture 6)
  	"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

  	// 3. anything else (capture 2)
  	".*" +
  	")\\)|)";

  var filterMatchExpr = {
  	ID: new RegExp( "^#(" + identifier + ")" ),
  	CLASS: new RegExp( "^\\.(" + identifier + ")" ),
  	TAG: new RegExp( "^(" + identifier + "|[*])" ),
  	ATTR: new RegExp( "^" + attributes ),
  	PSEUDO: new RegExp( "^" + pseudos ),
  	CHILD: new RegExp(
  		"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
  		whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
  		whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" )
  };

  var rpseudo = new RegExp( pseudos );

  // CSS escapes

  var runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
  	"?|\\\\([^\\r\\n\\f])", "g" ),
  	funescape = function( escape, nonHex ) {
  		var high = "0x" + escape.slice( 1 ) - 0x10000;

  		if ( nonHex ) {

  			// Strip the backslash prefix from a non-hex escape sequence
  			return nonHex;
  		}

  		// Replace a hexadecimal escape sequence with the encoded Unicode code point
  		// Support: IE <=11+
  		// For values outside the Basic Multilingual Plane (BMP), manually construct a
  		// surrogate pair
  		return high < 0 ?
  			String.fromCharCode( high + 0x10000 ) :
  			String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
  	};

  function unescapeSelector( sel ) {
  	return sel.replace( runescape, funescape );
  }

  function selectorError( msg ) {
  	jQuery.error( "Syntax error, unrecognized expression: " + msg );
  }

  var rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" );

  var tokenCache = createCache();

  function tokenize( selector, parseOnly ) {
  	var matched, match, tokens, type,
  		soFar, groups, preFilters,
  		cached = tokenCache[ selector + " " ];

  	if ( cached ) {
  		return parseOnly ? 0 : cached.slice( 0 );
  	}

  	soFar = selector;
  	groups = [];
  	preFilters = jQuery.expr.preFilter;

  	while ( soFar ) {

  		// Comma and first run
  		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
  			if ( match ) {

  				// Don't consume trailing commas as valid
  				soFar = soFar.slice( match[ 0 ].length ) || soFar;
  			}
  			groups.push( ( tokens = [] ) );
  		}

  		matched = false;

  		// Combinators
  		if ( ( match = rleadingCombinator.exec( soFar ) ) ) {
  			matched = match.shift();
  			tokens.push( {
  				value: matched,

  				// Cast descendant combinators to space
  				type: match[ 0 ].replace( rtrimCSS, " " )
  			} );
  			soFar = soFar.slice( matched.length );
  		}

  		// Filters
  		for ( type in filterMatchExpr ) {
  			if ( ( match = jQuery.expr.match[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
  				( match = preFilters[ type ]( match ) ) ) ) {
  				matched = match.shift();
  				tokens.push( {
  					value: matched,
  					type: type,
  					matches: match
  				} );
  				soFar = soFar.slice( matched.length );
  			}
  		}

  		if ( !matched ) {
  			break;
  		}
  	}

  	// Return the length of the invalid excess
  	// if we're just parsing
  	// Otherwise, throw an error or return tokens
  	if ( parseOnly ) {
  		return soFar.length;
  	}

  	return soFar ?
  		selectorError( selector ) :

  		// Cache the tokens
  		tokenCache( selector, groups ).slice( 0 );
  }

  var preFilter = {
  	ATTR: function( match ) {
  		match[ 1 ] = unescapeSelector( match[ 1 ] );

  		// Move the given value to match[3] whether quoted or unquoted
  		match[ 3 ] = unescapeSelector( match[ 3 ] || match[ 4 ] || match[ 5 ] || "" );

  		if ( match[ 2 ] === "~=" ) {
  			match[ 3 ] = " " + match[ 3 ] + " ";
  		}

  		return match.slice( 0, 4 );
  	},

  	CHILD: function( match ) {

  		/* matches from filterMatchExpr["CHILD"]
  			1 type (only|nth|...)
  			2 what (child|of-type)
  			3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
  			4 xn-component of xn+y argument ([+-]?\d*n|)
  			5 sign of xn-component
  			6 x of xn-component
  			7 sign of y-component
  			8 y of y-component
  		*/
  		match[ 1 ] = match[ 1 ].toLowerCase();

  		if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

  			// nth-* requires argument
  			if ( !match[ 3 ] ) {
  				selectorError( match[ 0 ] );
  			}

  			// numeric x and y parameters for jQuery.expr.filter.CHILD
  			// remember that false/true cast respectively to 0/1
  			match[ 4 ] = +( match[ 4 ] ?
  				match[ 5 ] + ( match[ 6 ] || 1 ) :
  				2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" )
  			);
  			match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

  		// other types prohibit arguments
  		} else if ( match[ 3 ] ) {
  			selectorError( match[ 0 ] );
  		}

  		return match;
  	},

  	PSEUDO: function( match ) {
  		var excess,
  			unquoted = !match[ 6 ] && match[ 2 ];

  		if ( filterMatchExpr.CHILD.test( match[ 0 ] ) ) {
  			return null;
  		}

  		// Accept quoted arguments as-is
  		if ( match[ 3 ] ) {
  			match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

  		// Strip excess characters from unquoted arguments
  		} else if ( unquoted && rpseudo.test( unquoted ) &&

  			// Get excess from tokenize (recursively)
  			( excess = tokenize( unquoted, true ) ) &&

  			// advance to the next closing parenthesis
  			( excess = unquoted.indexOf( ")", unquoted.length - excess ) -
  				unquoted.length ) ) {

  			// excess is a negative index
  			match[ 0 ] = match[ 0 ].slice( 0, excess );
  			match[ 2 ] = unquoted.slice( 0, excess );
  		}

  		// Return only captures needed by the pseudo filter method (type and argument)
  		return match.slice( 0, 3 );
  	}
  };

  function toSelector( tokens ) {
  	var i = 0,
  		len = tokens.length,
  		selector = "";
  	for ( ; i < len; i++ ) {
  		selector += tokens[ i ].value;
  	}
  	return selector;
  }

  // CSS string/identifier serialization
  // https://drafts.csswg.org/cssom/#common-serializing-idioms
  var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

  function fcssescape( ch, asCodePoint ) {
  	if ( asCodePoint ) {

  		// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
  		if ( ch === "\0" ) {
  			return "\uFFFD";
  		}

  		// Control characters and (dependent upon position) numbers get escaped as code points
  		return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
  	}

  	// Other potentially-special ASCII characters get backslash-escaped
  	return "\\" + ch;
  }

  jQuery.escapeSelector = function( sel ) {
  	return ( sel + "" ).replace( rcssescape, fcssescape );
  };

  var sort = arr.sort;

  var splice = arr.splice;

  var hasDuplicate;

  // Document order sorting
  function sortOrder( a, b ) {

  	// Flag for duplicate removal
  	if ( a === b ) {
  		hasDuplicate = true;
  		return 0;
  	}

  	// Sort on method existence if only one input has compareDocumentPosition
  	var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
  	if ( compare ) {
  		return compare;
  	}

  	// Calculate position if both inputs belong to the same document
  	// Support: IE 11+
  	// IE sometimes throws a "Permission denied" error when strict-comparing
  	// two documents; shallow comparisons work.
  	// eslint-disable-next-line eqeqeq
  	compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
  		a.compareDocumentPosition( b ) :

  		// Otherwise we know they are disconnected
  		1;

  	// Disconnected nodes
  	if ( compare & 1 ) {

  		// Choose the first element that is related to the document
  		// Support: IE 11+
  		// IE sometimes throws a "Permission denied" error when strict-comparing
  		// two documents; shallow comparisons work.
  		// eslint-disable-next-line eqeqeq
  		if ( a == document || a.ownerDocument == document &&
  			jQuery.contains( document, a ) ) {
  			return -1;
  		}

  		// Support: IE 11+
  		// IE sometimes throws a "Permission denied" error when strict-comparing
  		// two documents; shallow comparisons work.
  		// eslint-disable-next-line eqeqeq
  		if ( b == document || b.ownerDocument == document &&
  			jQuery.contains( document, b ) ) {
  			return 1;
  		}

  		// Maintain original order
  		return 0;
  	}

  	return compare & 4 ? -1 : 1;
  }

  /**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
  jQuery.uniqueSort = function( results ) {
  	var elem,
  		duplicates = [],
  		j = 0,
  		i = 0;

  	hasDuplicate = false;

  	sort.call( results, sortOrder );

  	if ( hasDuplicate ) {
  		while ( ( elem = results[ i++ ] ) ) {
  			if ( elem === results[ i ] ) {
  				j = duplicates.push( i );
  			}
  		}
  		while ( j-- ) {
  			splice.call( results, duplicates[ j ], 1 );
  		}
  	}

  	return results;
  };

  jQuery.fn.uniqueSort = function() {
  	return this.pushStack( jQuery.uniqueSort( slice.apply( this ) ) );
  };

  var i,
  	outermostContext,

  	// Local document vars
  	document$1,
  	documentElement$1,
  	documentIsHTML,

  	// Instance-specific data
  	dirruns = 0,
  	done = 0,
  	classCache = createCache(),
  	compilerCache = createCache(),
  	nonnativeSelectorCache = createCache(),

  	// Regular expressions

  	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
  	rwhitespace = new RegExp( whitespace + "+", "g" ),

  	ridentifier = new RegExp( "^" + identifier + "$" ),

  	matchExpr = jQuery.extend( {
  		bool: new RegExp( "^(?:" + booleans + ")$", "i" ),

  		// For use in libraries implementing .is()
  		// We use this for POS matching in `select`
  		needsContext: new RegExp( "^" + whitespace +
  			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
  			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
  	}, filterMatchExpr ),

  	rinputs = /^(?:input|select|textarea|button)$/i,
  	rheader = /^h\d$/i,

  	// Easily-parseable/retrievable ID or TAG or CLASS selectors
  	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

  	// Used for iframes; see `setDocument`.
  	// Support: IE 9 - 11+
  	// Removing the function wrapper causes a "Permission Denied"
  	// error in IE.
  	unloadHandler = function() {
  		setDocument();
  	},

  	inDisabledFieldset = addCombinator(
  		function( elem ) {
  			return elem.disabled === true && nodeName( elem, "fieldset" );
  		},
  		{ dir: "parentNode", next: "legend" }
  	);

  function find( selector, context, results, seed ) {
  	var m, i, elem, nid, match, groups, newSelector,
  		newContext = context && context.ownerDocument,

  		// nodeType defaults to 9, since context defaults to document
  		nodeType = context ? context.nodeType : 9;

  	results = results || [];

  	// Return early from calls with invalid selector or context
  	if ( typeof selector !== "string" || !selector ||
  		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

  		return results;
  	}

  	// Try to shortcut find operations (as opposed to filters) in HTML documents
  	if ( !seed ) {
  		setDocument( context );
  		context = context || document$1;

  		if ( documentIsHTML ) {

  			// If the selector is sufficiently simple, try using a "get*By*" DOM method
  			// (excepting DocumentFragment context, where the methods don't exist)
  			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

  				// ID selector
  				if ( ( m = match[ 1 ] ) ) {

  					// Document context
  					if ( nodeType === 9 ) {
  						if ( ( elem = context.getElementById( m ) ) ) {
  							push.call( results, elem );
  						}
  						return results;

  					// Element context
  					} else {
  						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
  							jQuery.contains( context, elem ) ) {

  							push.call( results, elem );
  							return results;
  						}
  					}

  				// Type selector
  				} else if ( match[ 2 ] ) {
  					push.apply( results, context.getElementsByTagName( selector ) );
  					return results;

  				// Class selector
  				} else if ( ( m = match[ 3 ] ) && context.getElementsByClassName ) {
  					push.apply( results, context.getElementsByClassName( m ) );
  					return results;
  				}
  			}

  			// Take advantage of querySelectorAll
  			if ( !nonnativeSelectorCache[ selector + " " ] &&
  				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) ) {

  				newSelector = selector;
  				newContext = context;

  				// qSA considers elements outside a scoping root when evaluating child or
  				// descendant combinators, which is not what we want.
  				// In such cases, we work around the behavior by prefixing every selector in the
  				// list with an ID selector referencing the scope context.
  				// The technique has to be used as well when a leading combinator is used
  				// as such selectors are not recognized by querySelectorAll.
  				// Thanks to Andrew Dupont for this technique.
  				if ( nodeType === 1 &&
  					( rdescend.test( selector ) || rleadingCombinator.test( selector ) ) ) {

  					// Expand context for sibling selectors
  					newContext = rsibling.test( selector ) &&
  						testContext( context.parentNode ) ||
  						context;

  					// Outside of IE, if we're not changing the context we can
  					// use :scope instead of an ID.
  					// Support: IE 11+
  					// IE sometimes throws a "Permission denied" error when strict-comparing
  					// two documents; shallow comparisons work.
  					// eslint-disable-next-line eqeqeq
  					if ( newContext != context || isIE ) {

  						// Capture the context ID, setting it first if necessary
  						if ( ( nid = context.getAttribute( "id" ) ) ) {
  							nid = jQuery.escapeSelector( nid );
  						} else {
  							context.setAttribute( "id", ( nid = jQuery.expando ) );
  						}
  					}

  					// Prefix every selector in the list
  					groups = tokenize( selector );
  					i = groups.length;
  					while ( i-- ) {
  						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
  							toSelector( groups[ i ] );
  					}
  					newSelector = groups.join( "," );
  				}

  				try {
  					push.apply( results,
  						newContext.querySelectorAll( newSelector )
  					);
  					return results;
  				} catch ( qsaError ) {
  					nonnativeSelectorCache( selector, true );
  				} finally {
  					if ( nid === jQuery.expando ) {
  						context.removeAttribute( "id" );
  					}
  				}
  			}
  		}
  	}

  	// All others
  	return select( selector.replace( rtrimCSS, "$1" ), context, results, seed );
  }

  /**
   * Mark a function for special use by jQuery selector module
   * @param {Function} fn The function to mark
   */
  function markFunction( fn ) {
  	fn[ jQuery.expando ] = true;
  	return fn;
  }

  /**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
  function createInputPseudo( type ) {
  	return function( elem ) {
  		return nodeName( elem, "input" ) && elem.type === type;
  	};
  }

  /**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
  function createButtonPseudo( type ) {
  	return function( elem ) {
  		return ( nodeName( elem, "input" ) || nodeName( elem, "button" ) ) &&
  			elem.type === type;
  	};
  }

  /**
   * Returns a function to use in pseudos for :enabled/:disabled
   * @param {Boolean} disabled true for :disabled; false for :enabled
   */
  function createDisabledPseudo( disabled ) {

  	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
  	return function( elem ) {

  		// Only certain elements can match :enabled or :disabled
  		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
  		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
  		if ( "form" in elem ) {

  			// Check for inherited disabledness on relevant non-disabled elements:
  			// * listed form-associated elements in a disabled fieldset
  			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
  			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
  			// * option elements in a disabled optgroup
  			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
  			// All such elements have a "form" property.
  			if ( elem.parentNode && elem.disabled === false ) {

  				// Option elements defer to a parent optgroup if present
  				if ( "label" in elem ) {
  					if ( "label" in elem.parentNode ) {
  						return elem.parentNode.disabled === disabled;
  					} else {
  						return elem.disabled === disabled;
  					}
  				}

  				// Support: IE 6 - 11+
  				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
  				return elem.isDisabled === disabled ||

  					// Where there is no isDisabled, check manually
  					elem.isDisabled !== !disabled &&
  						inDisabledFieldset( elem ) === disabled;
  			}

  			return elem.disabled === disabled;

  		// Try to winnow out elements that can't be disabled before trusting the disabled property.
  		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
  		// even exist on them, let alone have a boolean value.
  		} else if ( "label" in elem ) {
  			return elem.disabled === disabled;
  		}

  		// Remaining elements are neither :enabled nor :disabled
  		return false;
  	};
  }

  /**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
  function createPositionalPseudo( fn ) {
  	return markFunction( function( argument ) {
  		argument = +argument;
  		return markFunction( function( seed, matches ) {
  			var j,
  				matchIndexes = fn( [], seed.length, argument ),
  				i = matchIndexes.length;

  			// Match elements found at the specified indexes
  			while ( i-- ) {
  				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
  					seed[ j ] = !( matches[ j ] = seed[ j ] );
  				}
  			}
  		} );
  	} );
  }

  /**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [node] An element or document object to use to set the document
   */
  function setDocument( node ) {
  	var subWindow,
  		doc = node ? node.ownerDocument || node : document;

  	// Return early if doc is invalid or already selected
  	// Support: IE 11+
  	// IE sometimes throws a "Permission denied" error when strict-comparing
  	// two documents; shallow comparisons work.
  	// eslint-disable-next-line eqeqeq
  	if ( doc == document$1 || doc.nodeType !== 9 ) {
  		return;
  	}

  	// Update global variables
  	document$1 = doc;
  	documentElement$1 = document$1.documentElement;
  	documentIsHTML = !jQuery.isXMLDoc( document$1 );

  	// Support: IE 9 - 11+
  	// Accessing iframe documents after unload throws "permission denied" errors (see trac-13936)
  	// Support: IE 11+
  	// IE sometimes throws a "Permission denied" error when strict-comparing
  	// two documents; shallow comparisons work.
  	// eslint-disable-next-line eqeqeq
  	if ( isIE && document != document$1 &&
  		( subWindow = document$1.defaultView ) && subWindow.top !== subWindow ) {
  		subWindow.addEventListener( "unload", unloadHandler );
  	}
  }

  find.matches = function( expr, elements ) {
  	return find( expr, null, null, elements );
  };

  find.matchesSelector = function( elem, expr ) {
  	setDocument( elem );

  	if ( documentIsHTML &&
  		!nonnativeSelectorCache[ expr + " " ] &&
  		( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

  		try {
  			return matches.call( elem, expr );
  		} catch ( e ) {
  			nonnativeSelectorCache( expr, true );
  		}
  	}

  	return find( expr, document$1, null, [ elem ] ).length > 0;
  };

  jQuery.expr = {

  	// Can be adjusted by the user
  	cacheLength: 50,

  	createPseudo: markFunction,

  	match: matchExpr,

  	find: {
  		ID: function( id, context ) {
  			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
  				var elem = context.getElementById( id );
  				return elem ? [ elem ] : [];
  			}
  		},

  		TAG: function( tag, context ) {
  			if ( typeof context.getElementsByTagName !== "undefined" ) {
  				return context.getElementsByTagName( tag );

  				// DocumentFragment nodes don't have gEBTN
  			} else {
  				return context.querySelectorAll( tag );
  			}
  		},

  		CLASS: function( className, context ) {
  			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
  				return context.getElementsByClassName( className );
  			}
  		}
  	},

  	relative: {
  		">": { dir: "parentNode", first: true },
  		" ": { dir: "parentNode" },
  		"+": { dir: "previousSibling", first: true },
  		"~": { dir: "previousSibling" }
  	},

  	preFilter: preFilter,

  	filter: {
  		ID: function( id ) {
  			var attrId = unescapeSelector( id );
  			return function( elem ) {
  				return elem.getAttribute( "id" ) === attrId;
  			};
  		},

  		TAG: function( nodeNameSelector ) {
  			var expectedNodeName = unescapeSelector( nodeNameSelector ).toLowerCase();
  			return nodeNameSelector === "*" ?

  				function() {
  					return true;
  				} :

  				function( elem ) {
  					return nodeName( elem, expectedNodeName );
  				};
  		},

  		CLASS: function( className ) {
  			var pattern = classCache[ className + " " ];

  			return pattern ||
  				( pattern = new RegExp( "(^|" + whitespace + ")" + className +
  					"(" + whitespace + "|$)" ) ) &&
  				classCache( className, function( elem ) {
  					return pattern.test(
  						typeof elem.className === "string" && elem.className ||
  							typeof elem.getAttribute !== "undefined" &&
  								elem.getAttribute( "class" ) ||
  							""
  					);
  				} );
  		},

  		ATTR: function( name, operator, check ) {
  			return function( elem ) {
  				var result = jQuery.attr( elem, name );

  				if ( result == null ) {
  					return operator === "!=";
  				}
  				if ( !operator ) {
  					return true;
  				}

  				result += "";

  				if ( operator === "=" ) {
  					return result === check;
  				}
  				if ( operator === "!=" ) {
  					return result !== check;
  				}
  				if ( operator === "^=" ) {
  					return check && result.indexOf( check ) === 0;
  				}
  				if ( operator === "*=" ) {
  					return check && result.indexOf( check ) > -1;
  				}
  				if ( operator === "$=" ) {
  					return check && result.slice( -check.length ) === check;
  				}
  				if ( operator === "~=" ) {
  					return ( " " + result.replace( rwhitespace, " " ) + " " )
  						.indexOf( check ) > -1;
  				}
  				if ( operator === "|=" ) {
  					return result === check || result.slice( 0, check.length + 1 ) === check + "-";
  				}

  				return false;
  			};
  		},

  		CHILD: function( type, what, _argument, first, last ) {
  			var simple = type.slice( 0, 3 ) !== "nth",
  				forward = type.slice( -4 ) !== "last",
  				ofType = what === "of-type";

  			return first === 1 && last === 0 ?

  				// Shortcut for :nth-*(n)
  				function( elem ) {
  					return !!elem.parentNode;
  				} :

  				function( elem, _context, xml ) {
  					var cache, outerCache, node, nodeIndex, start,
  						dir = simple !== forward ? "nextSibling" : "previousSibling",
  						parent = elem.parentNode,
  						name = ofType && elem.nodeName.toLowerCase(),
  						useCache = !xml && !ofType,
  						diff = false;

  					if ( parent ) {

  						// :(first|last|only)-(child|of-type)
  						if ( simple ) {
  							while ( dir ) {
  								node = elem;
  								while ( ( node = node[ dir ] ) ) {
  									if ( ofType ?
  										nodeName( node, name ) :
  										node.nodeType === 1 ) {

  										return false;
  									}
  								}

  								// Reverse direction for :only-* (if we haven't yet done so)
  								start = dir = type === "only" && !start && "nextSibling";
  							}
  							return true;
  						}

  						start = [ forward ? parent.firstChild : parent.lastChild ];

  						// non-xml :nth-child(...) stores cache data on `parent`
  						if ( forward && useCache ) {

  							// Seek `elem` from a previously-cached index
  							outerCache = parent[ jQuery.expando ] ||
  								( parent[ jQuery.expando ] = {} );
  							cache = outerCache[ type ] || [];
  							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
  							diff = nodeIndex && cache[ 2 ];
  							node = nodeIndex && parent.childNodes[ nodeIndex ];

  							while ( ( node = ++nodeIndex && node && node[ dir ] ||

  								// Fallback to seeking `elem` from the start
  								( diff = nodeIndex = 0 ) || start.pop() ) ) {

  								// When found, cache indexes on `parent` and break
  								if ( node.nodeType === 1 && ++diff && node === elem ) {
  									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
  									break;
  								}
  							}

  						} else {

  							// Use previously-cached element index if available
  							if ( useCache ) {
  								outerCache = elem[ jQuery.expando ] ||
  									( elem[ jQuery.expando ] = {} );
  								cache = outerCache[ type ] || [];
  								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
  								diff = nodeIndex;
  							}

  							// xml :nth-child(...)
  							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
  							if ( diff === false ) {

  								// Use the same loop as above to seek `elem` from the start
  								while ( ( node = ++nodeIndex && node && node[ dir ] ||
  									( diff = nodeIndex = 0 ) || start.pop() ) ) {

  									if ( ( ofType ?
  										nodeName( node, name ) :
  										node.nodeType === 1 ) &&
  										++diff ) {

  										// Cache the index of each encountered element
  										if ( useCache ) {
  											outerCache = node[ jQuery.expando ] ||
  												( node[ jQuery.expando ] = {} );
  											outerCache[ type ] = [ dirruns, diff ];
  										}

  										if ( node === elem ) {
  											break;
  										}
  									}
  								}
  							}
  						}

  						// Incorporate the offset, then check against cycle size
  						diff -= last;
  						return diff === first || ( diff % first === 0 && diff / first >= 0 );
  					}
  				};
  		},

  		PSEUDO: function( pseudo, argument ) {

  			// pseudo-class names are case-insensitive
  			// https://www.w3.org/TR/selectors/#pseudo-classes
  			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
  			// Remember that setFilters inherits from pseudos
  			var fn = jQuery.expr.pseudos[ pseudo ] ||
  				jQuery.expr.setFilters[ pseudo.toLowerCase() ] ||
  				selectorError( "unsupported pseudo: " + pseudo );

  			// The user may use createPseudo to indicate that
  			// arguments are needed to create the filter function
  			// just as jQuery does
  			if ( fn[ jQuery.expando ] ) {
  				return fn( argument );
  			}

  			return fn;
  		}
  	},

  	pseudos: {

  		// Potentially complex pseudos
  		not: markFunction( function( selector ) {

  			// Trim the selector passed to compile
  			// to avoid treating leading and trailing
  			// spaces as combinators
  			var input = [],
  				results = [],
  				matcher = compile( selector.replace( rtrimCSS, "$1" ) );

  			return matcher[ jQuery.expando ] ?
  				markFunction( function( seed, matches, _context, xml ) {
  					var elem,
  						unmatched = matcher( seed, null, xml, [] ),
  						i = seed.length;

  					// Match elements unmatched by `matcher`
  					while ( i-- ) {
  						if ( ( elem = unmatched[ i ] ) ) {
  							seed[ i ] = !( matches[ i ] = elem );
  						}
  					}
  				} ) :
  				function( elem, _context, xml ) {
  					input[ 0 ] = elem;
  					matcher( input, null, xml, results );

  					// Don't keep the element
  					// (see https://github.com/jquery/sizzle/issues/299)
  					input[ 0 ] = null;
  					return !results.pop();
  				};
  		} ),

  		has: markFunction( function( selector ) {
  			return function( elem ) {
  				return find( selector, elem ).length > 0;
  			};
  		} ),

  		contains: markFunction( function( text ) {
  			text = unescapeSelector( text );
  			return function( elem ) {
  				return ( elem.textContent || jQuery.text( elem ) ).indexOf( text ) > -1;
  			};
  		} ),

  		// "Whether an element is represented by a :lang() selector
  		// is based solely on the element's language value
  		// being equal to the identifier C,
  		// or beginning with the identifier C immediately followed by "-".
  		// The matching of C against the element's language value is performed case-insensitively.
  		// The identifier C does not have to be a valid language name."
  		// https://www.w3.org/TR/selectors/#lang-pseudo
  		lang: markFunction( function( lang ) {

  			// lang value must be a valid identifier
  			if ( !ridentifier.test( lang || "" ) ) {
  				selectorError( "unsupported lang: " + lang );
  			}
  			lang = unescapeSelector( lang ).toLowerCase();
  			return function( elem ) {
  				var elemLang;
  				do {
  					if ( ( elemLang = documentIsHTML ?
  						elem.lang :
  						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

  						elemLang = elemLang.toLowerCase();
  						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
  					}
  				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
  				return false;
  			};
  		} ),

  		// Miscellaneous
  		target: function( elem ) {
  			var hash = window.location && window.location.hash;
  			return hash && hash.slice( 1 ) === elem.id;
  		},

  		root: function( elem ) {
  			return elem === documentElement$1;
  		},

  		focus: function( elem ) {
  			return elem === document$1.activeElement &&
  				document$1.hasFocus() &&
  				!!( elem.type || elem.href || ~elem.tabIndex );
  		},

  		// Boolean properties
  		enabled: createDisabledPseudo( false ),
  		disabled: createDisabledPseudo( true ),

  		checked: function( elem ) {

  			// In CSS3, :checked should return both checked and selected elements
  			// https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
  			return ( nodeName( elem, "input" ) && !!elem.checked ) ||
  				( nodeName( elem, "option" ) && !!elem.selected );
  		},

  		selected: function( elem ) {

  			// Support: IE <=11+
  			// Accessing the selectedIndex property
  			// forces the browser to treat the default option as
  			// selected when in an optgroup.
  			if ( isIE && elem.parentNode ) {
  				// eslint-disable-next-line no-unused-expressions
  				elem.parentNode.selectedIndex;
  			}

  			return elem.selected === true;
  		},

  		// Contents
  		empty: function( elem ) {

  			// https://www.w3.org/TR/selectors/#empty-pseudo
  			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
  			//   but not by others (comment: 8; processing instruction: 7; etc.)
  			// nodeType < 6 works because attributes (2) do not appear as children
  			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
  				if ( elem.nodeType < 6 ) {
  					return false;
  				}
  			}
  			return true;
  		},

  		parent: function( elem ) {
  			return !jQuery.expr.pseudos.empty( elem );
  		},

  		// Element/input types
  		header: function( elem ) {
  			return rheader.test( elem.nodeName );
  		},

  		input: function( elem ) {
  			return rinputs.test( elem.nodeName );
  		},

  		button: function( elem ) {
  			return nodeName( elem, "input" ) && elem.type === "button" ||
  				nodeName( elem, "button" );
  		},

  		text: function( elem ) {
  			return nodeName( elem, "input" ) && elem.type === "text";
  		},

  		// Position-in-collection
  		first: createPositionalPseudo( function() {
  			return [ 0 ];
  		} ),

  		last: createPositionalPseudo( function( _matchIndexes, length ) {
  			return [ length - 1 ];
  		} ),

  		eq: createPositionalPseudo( function( _matchIndexes, length, argument ) {
  			return [ argument < 0 ? argument + length : argument ];
  		} ),

  		even: createPositionalPseudo( function( matchIndexes, length ) {
  			var i = 0;
  			for ( ; i < length; i += 2 ) {
  				matchIndexes.push( i );
  			}
  			return matchIndexes;
  		} ),

  		odd: createPositionalPseudo( function( matchIndexes, length ) {
  			var i = 1;
  			for ( ; i < length; i += 2 ) {
  				matchIndexes.push( i );
  			}
  			return matchIndexes;
  		} ),

  		lt: createPositionalPseudo( function( matchIndexes, length, argument ) {
  			var i;

  			if ( argument < 0 ) {
  				i = argument + length;
  			} else if ( argument > length ) {
  				i = length;
  			} else {
  				i = argument;
  			}

  			for ( ; --i >= 0; ) {
  				matchIndexes.push( i );
  			}
  			return matchIndexes;
  		} ),

  		gt: createPositionalPseudo( function( matchIndexes, length, argument ) {
  			var i = argument < 0 ? argument + length : argument;
  			for ( ; ++i < length; ) {
  				matchIndexes.push( i );
  			}
  			return matchIndexes;
  		} )
  	}
  };

  jQuery.expr.pseudos.nth = jQuery.expr.pseudos.eq;

  // Add button/input type pseudos
  for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
  	jQuery.expr.pseudos[ i ] = createInputPseudo( i );
  }
  for ( i in { submit: true, reset: true } ) {
  	jQuery.expr.pseudos[ i ] = createButtonPseudo( i );
  }

  // Easy API for creating new setFilters
  function setFilters() {}
  setFilters.prototype = jQuery.expr.filters = jQuery.expr.pseudos;
  jQuery.expr.setFilters = new setFilters();

  function addCombinator( matcher, combinator, base ) {
  	var dir = combinator.dir,
  		skip = combinator.next,
  		key = skip || dir,
  		checkNonElements = base && key === "parentNode",
  		doneName = done++;

  	return combinator.first ?

  		// Check against closest ancestor/preceding element
  		function( elem, context, xml ) {
  			while ( ( elem = elem[ dir ] ) ) {
  				if ( elem.nodeType === 1 || checkNonElements ) {
  					return matcher( elem, context, xml );
  				}
  			}
  			return false;
  		} :

  		// Check against all ancestor/preceding elements
  		function( elem, context, xml ) {
  			var oldCache, outerCache,
  				newCache = [ dirruns, doneName ];

  			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
  			if ( xml ) {
  				while ( ( elem = elem[ dir ] ) ) {
  					if ( elem.nodeType === 1 || checkNonElements ) {
  						if ( matcher( elem, context, xml ) ) {
  							return true;
  						}
  					}
  				}
  			} else {
  				while ( ( elem = elem[ dir ] ) ) {
  					if ( elem.nodeType === 1 || checkNonElements ) {
  						outerCache = elem[ jQuery.expando ] || ( elem[ jQuery.expando ] = {} );

  						if ( skip && nodeName( elem, skip ) ) {
  							elem = elem[ dir ] || elem;
  						} else if ( ( oldCache = outerCache[ key ] ) &&
  							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

  							// Assign to newCache so results back-propagate to previous elements
  							return ( newCache[ 2 ] = oldCache[ 2 ] );
  						} else {

  							// Reuse newcache so results back-propagate to previous elements
  							outerCache[ key ] = newCache;

  							// A match means we're done; a fail means we have to keep checking
  							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
  								return true;
  							}
  						}
  					}
  				}
  			}
  			return false;
  		};
  }

  function elementMatcher( matchers ) {
  	return matchers.length > 1 ?
  		function( elem, context, xml ) {
  			var i = matchers.length;
  			while ( i-- ) {
  				if ( !matchers[ i ]( elem, context, xml ) ) {
  					return false;
  				}
  			}
  			return true;
  		} :
  		matchers[ 0 ];
  }

  function multipleContexts( selector, contexts, results ) {
  	var i = 0,
  		len = contexts.length;
  	for ( ; i < len; i++ ) {
  		find( selector, contexts[ i ], results );
  	}
  	return results;
  }

  function condense( unmatched, map, filter, context, xml ) {
  	var elem,
  		newUnmatched = [],
  		i = 0,
  		len = unmatched.length,
  		mapped = map != null;

  	for ( ; i < len; i++ ) {
  		if ( ( elem = unmatched[ i ] ) ) {
  			if ( !filter || filter( elem, context, xml ) ) {
  				newUnmatched.push( elem );
  				if ( mapped ) {
  					map.push( i );
  				}
  			}
  		}
  	}

  	return newUnmatched;
  }

  function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
  	if ( postFilter && !postFilter[ jQuery.expando ] ) {
  		postFilter = setMatcher( postFilter );
  	}
  	if ( postFinder && !postFinder[ jQuery.expando ] ) {
  		postFinder = setMatcher( postFinder, postSelector );
  	}
  	return markFunction( function( seed, results, context, xml ) {
  		var temp, i, elem, matcherOut,
  			preMap = [],
  			postMap = [],
  			preexisting = results.length,

  			// Get initial elements from seed or context
  			elems = seed ||
  				multipleContexts( selector || "*",
  					context.nodeType ? [ context ] : context, [] ),

  			// Prefilter to get matcher input, preserving a map for seed-results synchronization
  			matcherIn = preFilter && ( seed || !selector ) ?
  				condense( elems, preMap, preFilter, context, xml ) :
  				elems;

  		if ( matcher ) {

  			// If we have a postFinder, or filtered seed, or non-seed postFilter
  			// or preexisting results,
  			matcherOut = postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

  				// ...intermediate processing is necessary
  				[] :

  				// ...otherwise use results directly
  				results;

  			// Find primary matches
  			matcher( matcherIn, matcherOut, context, xml );
  		} else {
  			matcherOut = matcherIn;
  		}

  		// Apply postFilter
  		if ( postFilter ) {
  			temp = condense( matcherOut, postMap );
  			postFilter( temp, [], context, xml );

  			// Un-match failing elements by moving them back to matcherIn
  			i = temp.length;
  			while ( i-- ) {
  				if ( ( elem = temp[ i ] ) ) {
  					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
  				}
  			}
  		}

  		if ( seed ) {
  			if ( postFinder || preFilter ) {
  				if ( postFinder ) {

  					// Get the final matcherOut by condensing this intermediate into postFinder contexts
  					temp = [];
  					i = matcherOut.length;
  					while ( i-- ) {
  						if ( ( elem = matcherOut[ i ] ) ) {

  							// Restore matcherIn since elem is not yet a final match
  							temp.push( ( matcherIn[ i ] = elem ) );
  						}
  					}
  					postFinder( null, ( matcherOut = [] ), temp, xml );
  				}

  				// Move matched elements from seed to results to keep them synchronized
  				i = matcherOut.length;
  				while ( i-- ) {
  					if ( ( elem = matcherOut[ i ] ) &&
  						( temp = postFinder ? indexOf.call( seed, elem ) : preMap[ i ] ) > -1 ) {

  						seed[ temp ] = !( results[ temp ] = elem );
  					}
  				}
  			}

  		// Add elements to results, through postFinder if defined
  		} else {
  			matcherOut = condense(
  				matcherOut === results ?
  					matcherOut.splice( preexisting, matcherOut.length ) :
  					matcherOut
  			);
  			if ( postFinder ) {
  				postFinder( null, results, matcherOut, xml );
  			} else {
  				push.apply( results, matcherOut );
  			}
  		}
  	} );
  }

  function matcherFromTokens( tokens ) {
  	var checkContext, matcher, j,
  		len = tokens.length,
  		leadingRelative = jQuery.expr.relative[ tokens[ 0 ].type ],
  		implicitRelative = leadingRelative || jQuery.expr.relative[ " " ],
  		i = leadingRelative ? 1 : 0,

  		// The foundational matcher ensures that elements are reachable from top-level context(s)
  		matchContext = addCombinator( function( elem ) {
  			return elem === checkContext;
  		}, implicitRelative, true ),
  		matchAnyContext = addCombinator( function( elem ) {
  			return indexOf.call( checkContext, elem ) > -1;
  		}, implicitRelative, true ),
  		matchers = [ function( elem, context, xml ) {

  			// Support: IE 11+
  			// IE sometimes throws a "Permission denied" error when strict-comparing
  			// two documents; shallow comparisons work.
  			// eslint-disable-next-line eqeqeq
  			var ret = ( !leadingRelative && ( xml || context != outermostContext ) ) || (
  				( checkContext = context ).nodeType ?
  					matchContext( elem, context, xml ) :
  					matchAnyContext( elem, context, xml ) );

  			// Avoid hanging onto element
  			// (see https://github.com/jquery/sizzle/issues/299)
  			checkContext = null;
  			return ret;
  		} ];

  	for ( ; i < len; i++ ) {
  		if ( ( matcher = jQuery.expr.relative[ tokens[ i ].type ] ) ) {
  			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
  		} else {
  			matcher = jQuery.expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

  			// Return special upon seeing a positional matcher
  			if ( matcher[ jQuery.expando ] ) {

  				// Find the next relative operator (if any) for proper handling
  				j = ++i;
  				for ( ; j < len; j++ ) {
  					if ( jQuery.expr.relative[ tokens[ j ].type ] ) {
  						break;
  					}
  				}
  				return setMatcher(
  					i > 1 && elementMatcher( matchers ),
  					i > 1 && toSelector(

  						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
  						tokens.slice( 0, i - 1 )
  							.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
  					).replace( rtrimCSS, "$1" ),
  					matcher,
  					i < j && matcherFromTokens( tokens.slice( i, j ) ),
  					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
  					j < len && toSelector( tokens )
  				);
  			}
  			matchers.push( matcher );
  		}
  	}

  	return elementMatcher( matchers );
  }

  function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
  	var bySet = setMatchers.length > 0,
  		byElement = elementMatchers.length > 0,
  		superMatcher = function( seed, context, xml, results, outermost ) {
  			var elem, j, matcher,
  				matchedCount = 0,
  				i = "0",
  				unmatched = seed && [],
  				setMatched = [],
  				contextBackup = outermostContext,

  				// We must always have either seed elements or outermost context
  				elems = seed || byElement && jQuery.expr.find.TAG( "*", outermost ),

  				// Use integer dirruns iff this is the outermost matcher
  				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 );

  			if ( outermost ) {

  				// Support: IE 11+
  				// IE sometimes throws a "Permission denied" error when strict-comparing
  				// two documents; shallow comparisons work.
  				// eslint-disable-next-line eqeqeq
  				outermostContext = context == document$1 || context || outermost;
  			}

  			// Add elements passing elementMatchers directly to results
  			for ( ; ( elem = elems[ i ] ) != null; i++ ) {
  				if ( byElement && elem ) {
  					j = 0;

  					// Support: IE 11+
  					// IE sometimes throws a "Permission denied" error when strict-comparing
  					// two documents; shallow comparisons work.
  					// eslint-disable-next-line eqeqeq
  					if ( !context && elem.ownerDocument != document$1 ) {
  						setDocument( elem );
  						xml = !documentIsHTML;
  					}
  					while ( ( matcher = elementMatchers[ j++ ] ) ) {
  						if ( matcher( elem, context || document$1, xml ) ) {
  							push.call( results, elem );
  							break;
  						}
  					}
  					if ( outermost ) {
  						dirruns = dirrunsUnique;
  					}
  				}

  				// Track unmatched elements for set filters
  				if ( bySet ) {

  					// They will have gone through all possible matchers
  					if ( ( elem = !matcher && elem ) ) {
  						matchedCount--;
  					}

  					// Lengthen the array for every element, matched or not
  					if ( seed ) {
  						unmatched.push( elem );
  					}
  				}
  			}

  			// `i` is now the count of elements visited above, and adding it to `matchedCount`
  			// makes the latter nonnegative.
  			matchedCount += i;

  			// Apply set filters to unmatched elements
  			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
  			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
  			// no element matchers and no seed.
  			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
  			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
  			// numerically zero.
  			if ( bySet && i !== matchedCount ) {
  				j = 0;
  				while ( ( matcher = setMatchers[ j++ ] ) ) {
  					matcher( unmatched, setMatched, context, xml );
  				}

  				if ( seed ) {

  					// Reintegrate element matches to eliminate the need for sorting
  					if ( matchedCount > 0 ) {
  						while ( i-- ) {
  							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
  								setMatched[ i ] = pop.call( results );
  							}
  						}
  					}

  					// Discard index placeholder values to get only actual matches
  					setMatched = condense( setMatched );
  				}

  				// Add matches to results
  				push.apply( results, setMatched );

  				// Seedless set matches succeeding multiple successful matchers stipulate sorting
  				if ( outermost && !seed && setMatched.length > 0 &&
  					( matchedCount + setMatchers.length ) > 1 ) {

  					jQuery.uniqueSort( results );
  				}
  			}

  			// Override manipulation of globals by nested matchers
  			if ( outermost ) {
  				dirruns = dirrunsUnique;
  				outermostContext = contextBackup;
  			}

  			return unmatched;
  		};

  	return bySet ?
  		markFunction( superMatcher ) :
  		superMatcher;
  }

  function compile( selector, match /* Internal Use Only */ ) {
  	var i,
  		setMatchers = [],
  		elementMatchers = [],
  		cached = compilerCache[ selector + " " ];

  	if ( !cached ) {

  		// Generate a function of recursive functions that can be used to check each element
  		if ( !match ) {
  			match = tokenize( selector );
  		}
  		i = match.length;
  		while ( i-- ) {
  			cached = matcherFromTokens( match[ i ] );
  			if ( cached[ jQuery.expando ] ) {
  				setMatchers.push( cached );
  			} else {
  				elementMatchers.push( cached );
  			}
  		}

  		// Cache the compiled function
  		cached = compilerCache( selector,
  			matcherFromGroupMatchers( elementMatchers, setMatchers ) );

  		// Save selector and tokenization
  		cached.selector = selector;
  	}
  	return cached;
  }

  /**
   * A low-level selection function that works with jQuery's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with jQuery selector compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
  function select( selector, context, results, seed ) {
  	var i, tokens, token, type, find,
  		compiled = typeof selector === "function" && selector,
  		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

  	results = results || [];

  	// Try to minimize operations if there is only one selector in the list and no seed
  	// (the latter of which guarantees us context)
  	if ( match.length === 1 ) {

  		// Reduce context if the leading compound selector is an ID
  		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
  		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
  				context.nodeType === 9 && documentIsHTML &&
  				jQuery.expr.relative[ tokens[ 1 ].type ] ) {

  			context = ( jQuery.expr.find.ID(
  				unescapeSelector( token.matches[ 0 ] ),
  				context
  			) || [] )[ 0 ];
  			if ( !context ) {
  				return results;

  			// Precompiled matchers will still verify ancestry, so step up a level
  			} else if ( compiled ) {
  				context = context.parentNode;
  			}

  			selector = selector.slice( tokens.shift().value.length );
  		}

  		// Fetch a seed set for right-to-left matching
  		i = matchExpr.needsContext.test( selector ) ? 0 : tokens.length;
  		while ( i-- ) {
  			token = tokens[ i ];

  			// Abort if we hit a combinator
  			if ( jQuery.expr.relative[ ( type = token.type ) ] ) {
  				break;
  			}
  			if ( ( find = jQuery.expr.find[ type ] ) ) {

  				// Search, expanding context for leading sibling combinators
  				if ( ( seed = find(
  					unescapeSelector( token.matches[ 0 ] ),
  					rsibling.test( tokens[ 0 ].type ) &&
  						testContext( context.parentNode ) || context
  				) ) ) {

  					// If seed is empty or no tokens remain, we can return early
  					tokens.splice( i, 1 );
  					selector = seed.length && toSelector( tokens );
  					if ( !selector ) {
  						push.apply( results, seed );
  						return results;
  					}

  					break;
  				}
  			}
  		}
  	}

  	// Compile and execute a filtering function if one is not provided
  	// Provide `match` to avoid retokenization if we modified the selector above
  	( compiled || compile( selector, match ) )(
  		seed,
  		context,
  		!documentIsHTML,
  		results,
  		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
  	);
  	return results;
  }

  // Initialize against the default document
  setDocument();

  jQuery.find = find;

  // These have always been private, but they used to be documented as part of
  // Sizzle so let's maintain them for now for backwards compatibility purposes.
  find.compile = compile;
  find.select = select;
  find.setDocument = setDocument;
  find.tokenize = tokenize;

  var rneedsContext = jQuery.expr.match.needsContext;

  // Implement the identical functionality for filter and not
  function winnow( elements, qualifier, not ) {
  	if ( typeof qualifier === "function" ) {
  		return jQuery.grep( elements, function( elem, i ) {
  			return !!qualifier.call( elem, i, elem ) !== not;
  		} );
  	}

  	// Single element
  	if ( qualifier.nodeType ) {
  		return jQuery.grep( elements, function( elem ) {
  			return ( elem === qualifier ) !== not;
  		} );
  	}

  	// Arraylike of elements (jQuery, arguments, Array)
  	if ( typeof qualifier !== "string" ) {
  		return jQuery.grep( elements, function( elem ) {
  			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
  		} );
  	}

  	// Filtered directly for both simple and complex selectors
  	return jQuery.filter( qualifier, elements, not );
  }

  jQuery.filter = function( expr, elems, not ) {
  	var elem = elems[ 0 ];

  	if ( not ) {
  		expr = ":not(" + expr + ")";
  	}

  	if ( elems.length === 1 && elem.nodeType === 1 ) {
  		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
  	}

  	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
  		return elem.nodeType === 1;
  	} ) );
  };

  jQuery.fn.extend( {
  	find: function( selector ) {
  		var i, ret,
  			len = this.length,
  			self = this;

  		if ( typeof selector !== "string" ) {
  			return this.pushStack( jQuery( selector ).filter( function() {
  				for ( i = 0; i < len; i++ ) {
  					if ( jQuery.contains( self[ i ], this ) ) {
  						return true;
  					}
  				}
  			} ) );
  		}

  		ret = this.pushStack( [] );

  		for ( i = 0; i < len; i++ ) {
  			jQuery.find( selector, self[ i ], ret );
  		}

  		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
  	},
  	filter: function( selector ) {
  		return this.pushStack( winnow( this, selector || [], false ) );
  	},
  	not: function( selector ) {
  		return this.pushStack( winnow( this, selector || [], true ) );
  	},
  	is: function( selector ) {
  		return !!winnow(
  			this,

  			// If this is a positional/relative selector, check membership in the returned set
  			// so $("p:first").is("p:last") won't return true for a doc with two "p".
  			typeof selector === "string" && rneedsContext.test( selector ) ?
  				jQuery( selector ) :
  				selector || [],
  			false
  		).length;
  	}
  } );

  // Initialize a jQuery object

  // A central reference to the root jQuery(document)
  var rootjQuery,

  	// A simple way to check for HTML strings
  	// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
  	// Strict HTML recognition (trac-11290: must start with <)
  	// Shortcut simple #id case for speed
  	rquickExpr$1 = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

  	init = jQuery.fn.init = function( selector, context ) {
  		var match, elem;

  		// HANDLE: $(""), $(null), $(undefined), $(false)
  		if ( !selector ) {
  			return this;
  		}

  		// HANDLE: $(DOMElement)
  		if ( selector.nodeType ) {
  			this[ 0 ] = selector;
  			this.length = 1;
  			return this;

  		// HANDLE: $(function)
  		// Shortcut for document ready
  		} else if ( typeof selector === "function" ) {
  			return rootjQuery.ready !== undefined ?
  				rootjQuery.ready( selector ) :

  				// Execute immediately if ready is not present
  				selector( jQuery );

  		} else {

  			// Handle obvious HTML strings
  			match = selector + "";
  			if ( isObviousHtml( match ) ) {

  				// Assume that strings that start and end with <> are HTML and skip
  				// the regex check. This also handles browser-supported HTML wrappers
  				// like TrustedHTML.
  				match = [ null, selector, null ];

  			// Handle HTML strings or selectors
  			} else if ( typeof selector === "string" ) {
  				match = rquickExpr$1.exec( selector );
  			} else {
  				return jQuery.makeArray( selector, this );
  			}

  			// Match html or make sure no context is specified for #id
  			// Note: match[1] may be a string or a TrustedHTML wrapper
  			if ( match && ( match[ 1 ] || !context ) ) {

  				// HANDLE: $(html) -> $(array)
  				if ( match[ 1 ] ) {
  					context = context instanceof jQuery ? context[ 0 ] : context;

  					// Option to run scripts is true for back-compat
  					// Intentionally let the error be thrown if parseHTML is not present
  					jQuery.merge( this, jQuery.parseHTML(
  						match[ 1 ],
  						context && context.nodeType ? context.ownerDocument || context : document,
  						true
  					) );

  					// HANDLE: $(html, props)
  					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
  						for ( match in context ) {

  							// Properties of context are called as methods if possible
  							if ( typeof this[ match ] === "function" ) {
  								this[ match ]( context[ match ] );

  							// ...and otherwise set as attributes
  							} else {
  								this.attr( match, context[ match ] );
  							}
  						}
  					}

  					return this;

  				// HANDLE: $(#id)
  				} else {
  					elem = document.getElementById( match[ 2 ] );

  					if ( elem ) {

  						// Inject the element directly into the jQuery object
  						this[ 0 ] = elem;
  						this.length = 1;
  					}
  					return this;
  				}

  			// HANDLE: $(expr) & $(expr, $(...))
  			} else if ( !context || context.jquery ) {
  				return ( context || rootjQuery ).find( selector );

  			// HANDLE: $(expr, context)
  			// (which is just equivalent to: $(context).find(expr)
  			} else {
  				return this.constructor( context ).find( selector );
  			}
  		}

  	};

  // Give the init function the jQuery prototype for later instantiation
  init.prototype = jQuery.fn;

  // Initialize central reference
  rootjQuery = jQuery( document );

  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  function returnTrue() {
  	return true;
  }

  function returnFalse() {
  	return false;
  }

  function on( elem, types, selector, data, fn, one ) {
  	var origFn, type;

  	// Types can be a map of types/handlers
  	if ( typeof types === "object" ) {

  		// ( types-Object, selector, data )
  		if ( typeof selector !== "string" ) {

  			// ( types-Object, data )
  			data = data || selector;
  			selector = undefined;
  		}
  		for ( type in types ) {
  			on( elem, type, selector, data, types[ type ], one );
  		}
  		return elem;
  	}

  	if ( data == null && fn == null ) {

  		// ( types, fn )
  		fn = selector;
  		data = selector = undefined;
  	} else if ( fn == null ) {
  		if ( typeof selector === "string" ) {

  			// ( types, selector, fn )
  			fn = data;
  			data = undefined;
  		} else {

  			// ( types, data, fn )
  			fn = data;
  			data = selector;
  			selector = undefined;
  		}
  	}
  	if ( fn === false ) {
  		fn = returnFalse;
  	} else if ( !fn ) {
  		return elem;
  	}

  	if ( one === 1 ) {
  		origFn = fn;
  		fn = function( event ) {

  			// Can use an empty set, since event contains the info
  			jQuery().off( event );
  			return origFn.apply( this, arguments );
  		};

  		// Use same guid so caller can remove using origFn
  		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
  	}
  	return elem.each( function() {
  		jQuery.event.add( this, types, fn, data, selector );
  	} );
  }

  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */
  jQuery.event = {

  	add: function( elem, types, handler, data, selector ) {

  		var handleObjIn, eventHandle, tmp,
  			events, t, handleObj,
  			special, handlers, type, namespaces, origType,
  			elemData = dataPriv.get( elem );

  		// Only attach events to objects that accept data
  		if ( !acceptData( elem ) ) {
  			return;
  		}

  		// Caller can pass in an object of custom data in lieu of the handler
  		if ( handler.handler ) {
  			handleObjIn = handler;
  			handler = handleObjIn.handler;
  			selector = handleObjIn.selector;
  		}

  		// Ensure that invalid selectors throw exceptions at attach time
  		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
  		if ( selector ) {
  			jQuery.find.matchesSelector( documentElement, selector );
  		}

  		// Make sure that the handler has a unique ID, used to find/remove it later
  		if ( !handler.guid ) {
  			handler.guid = jQuery.guid++;
  		}

  		// Init the element's event structure and main handler, if this is the first
  		if ( !( events = elemData.events ) ) {
  			events = elemData.events = Object.create( null );
  		}
  		if ( !( eventHandle = elemData.handle ) ) {
  			eventHandle = elemData.handle = function( e ) {

  				// Discard the second event of a jQuery.event.trigger() and
  				// when an event is called after a page has unloaded
  				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
  					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
  			};
  		}

  		// Handle multiple events separated by a space
  		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
  		t = types.length;
  		while ( t-- ) {
  			tmp = rtypenamespace.exec( types[ t ] ) || [];
  			type = origType = tmp[ 1 ];
  			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

  			// There *must* be a type, no attaching namespace-only handlers
  			if ( !type ) {
  				continue;
  			}

  			// If event changes its type, use the special event handlers for the changed type
  			special = jQuery.event.special[ type ] || {};

  			// If selector defined, determine special event api type, otherwise given type
  			type = ( selector ? special.delegateType : special.bindType ) || type;

  			// Update special based on newly reset type
  			special = jQuery.event.special[ type ] || {};

  			// handleObj is passed to all event handlers
  			handleObj = jQuery.extend( {
  				type: type,
  				origType: origType,
  				data: data,
  				handler: handler,
  				guid: handler.guid,
  				selector: selector,
  				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
  				namespace: namespaces.join( "." )
  			}, handleObjIn );

  			// Init the event handler queue if we're the first
  			if ( !( handlers = events[ type ] ) ) {
  				handlers = events[ type ] = [];
  				handlers.delegateCount = 0;

  				// Only use addEventListener if the special events handler returns false
  				if ( !special.setup ||
  					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

  					if ( elem.addEventListener ) {
  						elem.addEventListener( type, eventHandle );
  					}
  				}
  			}

  			if ( special.add ) {
  				special.add.call( elem, handleObj );

  				if ( !handleObj.handler.guid ) {
  					handleObj.handler.guid = handler.guid;
  				}
  			}

  			// Add to the element's handler list, delegates in front
  			if ( selector ) {
  				handlers.splice( handlers.delegateCount++, 0, handleObj );
  			} else {
  				handlers.push( handleObj );
  			}
  		}

  	},

  	// Detach an event or set of events from an element
  	remove: function( elem, types, handler, selector, mappedTypes ) {

  		var j, origCount, tmp,
  			events, t, handleObj,
  			special, handlers, type, namespaces, origType,
  			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

  		if ( !elemData || !( events = elemData.events ) ) {
  			return;
  		}

  		// Once for each type.namespace in types; type may be omitted
  		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
  		t = types.length;
  		while ( t-- ) {
  			tmp = rtypenamespace.exec( types[ t ] ) || [];
  			type = origType = tmp[ 1 ];
  			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

  			// Unbind all events (on this namespace, if provided) for the element
  			if ( !type ) {
  				for ( type in events ) {
  					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
  				}
  				continue;
  			}

  			special = jQuery.event.special[ type ] || {};
  			type = ( selector ? special.delegateType : special.bindType ) || type;
  			handlers = events[ type ] || [];
  			tmp = tmp[ 2 ] &&
  				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

  			// Remove matching events
  			origCount = j = handlers.length;
  			while ( j-- ) {
  				handleObj = handlers[ j ];

  				if ( ( mappedTypes || origType === handleObj.origType ) &&
  					( !handler || handler.guid === handleObj.guid ) &&
  					( !tmp || tmp.test( handleObj.namespace ) ) &&
  					( !selector || selector === handleObj.selector ||
  						selector === "**" && handleObj.selector ) ) {
  					handlers.splice( j, 1 );

  					if ( handleObj.selector ) {
  						handlers.delegateCount--;
  					}
  					if ( special.remove ) {
  						special.remove.call( elem, handleObj );
  					}
  				}
  			}

  			// Remove generic event handler if we removed something and no more handlers exist
  			// (avoids potential for endless recursion during removal of special event handlers)
  			if ( origCount && !handlers.length ) {
  				if ( !special.teardown ||
  					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

  					jQuery.removeEvent( elem, type, elemData.handle );
  				}

  				delete events[ type ];
  			}
  		}

  		// Remove data and the expando if it's no longer used
  		if ( jQuery.isEmptyObject( events ) ) {
  			dataPriv.remove( elem, "handle events" );
  		}
  	},

  	dispatch: function( nativeEvent ) {

  		var i, j, ret, matched, handleObj, handlerQueue,
  			args = new Array( arguments.length ),

  			// Make a writable jQuery.Event from the native event object
  			event = jQuery.event.fix( nativeEvent ),

  			handlers = (
  				dataPriv.get( this, "events" ) || Object.create( null )
  			)[ event.type ] || [],
  			special = jQuery.event.special[ event.type ] || {};

  		// Use the fix-ed jQuery.Event rather than the (read-only) native event
  		args[ 0 ] = event;

  		for ( i = 1; i < arguments.length; i++ ) {
  			args[ i ] = arguments[ i ];
  		}

  		event.delegateTarget = this;

  		// Call the preDispatch hook for the mapped type, and let it bail if desired
  		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
  			return;
  		}

  		// Determine handlers
  		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

  		// Run delegates first; they may want to stop propagation beneath us
  		i = 0;
  		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
  			event.currentTarget = matched.elem;

  			j = 0;
  			while ( ( handleObj = matched.handlers[ j++ ] ) &&
  				!event.isImmediatePropagationStopped() ) {

  				// If the event is namespaced, then each handler is only invoked if it is
  				// specially universal or its namespaces are a superset of the event's.
  				if ( !event.rnamespace || handleObj.namespace === false ||
  					event.rnamespace.test( handleObj.namespace ) ) {

  					event.handleObj = handleObj;
  					event.data = handleObj.data;

  					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
  						handleObj.handler ).apply( matched.elem, args );

  					if ( ret !== undefined ) {
  						if ( ( event.result = ret ) === false ) {
  							event.preventDefault();
  							event.stopPropagation();
  						}
  					}
  				}
  			}
  		}

  		// Call the postDispatch hook for the mapped type
  		if ( special.postDispatch ) {
  			special.postDispatch.call( this, event );
  		}

  		return event.result;
  	},

  	handlers: function( event, handlers ) {
  		var i, handleObj, sel, matchedHandlers, matchedSelectors,
  			handlerQueue = [],
  			delegateCount = handlers.delegateCount,
  			cur = event.target;

  		// Find delegate handlers
  		if ( delegateCount &&

  			// Support: Firefox <=42 - 66+
  			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
  			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
  			// Support: IE 11+
  			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
  			!( event.type === "click" && event.button >= 1 ) ) {

  			for ( ; cur !== this; cur = cur.parentNode || this ) {

  				// Don't check non-elements (trac-13208)
  				// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
  				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
  					matchedHandlers = [];
  					matchedSelectors = {};
  					for ( i = 0; i < delegateCount; i++ ) {
  						handleObj = handlers[ i ];

  						// Don't conflict with Object.prototype properties (trac-13203)
  						sel = handleObj.selector + " ";

  						if ( matchedSelectors[ sel ] === undefined ) {
  							matchedSelectors[ sel ] = handleObj.needsContext ?
  								jQuery( sel, this ).index( cur ) > -1 :
  								jQuery.find( sel, this, null, [ cur ] ).length;
  						}
  						if ( matchedSelectors[ sel ] ) {
  							matchedHandlers.push( handleObj );
  						}
  					}
  					if ( matchedHandlers.length ) {
  						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
  					}
  				}
  			}
  		}

  		// Add the remaining (directly-bound) handlers
  		cur = this;
  		if ( delegateCount < handlers.length ) {
  			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
  		}

  		return handlerQueue;
  	},

  	addProp: function( name, hook ) {
  		Object.defineProperty( jQuery.Event.prototype, name, {
  			enumerable: true,
  			configurable: true,

  			get: typeof hook === "function" ?
  				function() {
  					if ( this.originalEvent ) {
  						return hook( this.originalEvent );
  					}
  				} :
  				function() {
  					if ( this.originalEvent ) {
  						return this.originalEvent[ name ];
  					}
  				},

  			set: function( value ) {
  				Object.defineProperty( this, name, {
  					enumerable: true,
  					configurable: true,
  					writable: true,
  					value: value
  				} );
  			}
  		} );
  	},

  	fix: function( originalEvent ) {
  		return originalEvent[ jQuery.expando ] ?
  			originalEvent :
  			new jQuery.Event( originalEvent );
  	},

  	special: jQuery.extend( Object.create( null ), {
  		load: {

  			// Prevent triggered image.load events from bubbling to window.load
  			noBubble: true
  		},
  		click: {

  			// Utilize native event to ensure correct state for checkable inputs
  			setup: function( data ) {

  				// For mutual compressibility with _default, replace `this` access with a local var.
  				// `|| data` is dead code meant only to preserve the variable through minification.
  				var el = this || data;

  				// Claim the first handler
  				if ( rcheckableType.test( el.type ) &&
  					el.click && nodeName( el, "input" ) ) {

  					// dataPriv.set( el, "click", ... )
  					leverageNative( el, "click", true );
  				}

  				// Return false to allow normal processing in the caller
  				return false;
  			},
  			trigger: function( data ) {

  				// For mutual compressibility with _default, replace `this` access with a local var.
  				// `|| data` is dead code meant only to preserve the variable through minification.
  				var el = this || data;

  				// Force setup before triggering a click
  				if ( rcheckableType.test( el.type ) &&
  					el.click && nodeName( el, "input" ) ) {

  					leverageNative( el, "click" );
  				}

  				// Return non-false to allow normal event-path propagation
  				return true;
  			},

  			// For cross-browser consistency, suppress native .click() on links
  			// Also prevent it if we're currently inside a leveraged native-event stack
  			_default: function( event ) {
  				var target = event.target;
  				return rcheckableType.test( target.type ) &&
  					target.click && nodeName( target, "input" ) &&
  					dataPriv.get( target, "click" ) ||
  					nodeName( target, "a" );
  			}
  		},

  		beforeunload: {
  			postDispatch: function( event ) {

  				// Support: Chrome <=73+
  				// Chrome doesn't alert on `event.preventDefault()`
  				// as the standard mandates.
  				if ( event.result !== undefined && event.originalEvent ) {
  					event.originalEvent.returnValue = event.result;
  				}
  			}
  		}
  	} )
  };

  // Ensure the presence of an event listener that handles manually-triggered
  // synthetic events by interrupting progress until reinvoked in response to
  // *native* events that it fires directly, ensuring that state changes have
  // already occurred before other listeners are invoked.
  function leverageNative( el, type, isSetup ) {

  	// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
  	if ( !isSetup ) {
  		if ( dataPriv.get( el, type ) === undefined ) {
  			jQuery.event.add( el, type, returnTrue );
  		}
  		return;
  	}

  	// Register the controller as a special universal handler for all event namespaces
  	dataPriv.set( el, type, false );
  	jQuery.event.add( el, type, {
  		namespace: false,
  		handler: function( event ) {
  			var result,
  				saved = dataPriv.get( this, type );

  			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

  				// Interrupt processing of the outer synthetic .trigger()ed event
  				if ( !saved ) {

  					// Store arguments for use when handling the inner native event
  					// There will always be at least one argument (an event object), so this array
  					// will not be confused with a leftover capture object.
  					saved = slice.call( arguments );
  					dataPriv.set( this, type, saved );

  					// Trigger the native event and capture its result
  					this[ type ]();
  					result = dataPriv.get( this, type );
  					dataPriv.set( this, type, false );

  					if ( saved !== result ) {

  						// Cancel the outer synthetic event
  						event.stopImmediatePropagation();
  						event.preventDefault();

  						return result;
  					}

  				// If this is an inner synthetic event for an event with a bubbling surrogate
  				// (focus or blur), assume that the surrogate already propagated from triggering
  				// the native event and prevent that from happening again here.
  				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
  				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
  				// less bad than duplication.
  				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
  					event.stopPropagation();
  				}

  			// If this is a native event triggered above, everything is now in order
  			// Fire an inner synthetic event with the original arguments
  			} else if ( saved ) {

  				// ...and capture the result
  				dataPriv.set( this, type, jQuery.event.trigger(
  					saved[ 0 ],
  					saved.slice( 1 ),
  					this
  				) );

  				// Abort handling of the native event by all jQuery handlers while allowing
  				// native handlers on the same element to run. On target, this is achieved
  				// by stopping immediate propagation just on the jQuery event. However,
  				// the native event is re-wrapped by a jQuery one on each level of the
  				// propagation so the only way to stop it for jQuery is to stop it for
  				// everyone via native `stopPropagation()`. This is not a problem for
  				// focus/blur which don't bubble, but it does also stop click on checkboxes
  				// and radios. We accept this limitation.
  				event.stopPropagation();
  				event.isImmediatePropagationStopped = returnTrue;
  			}
  		}
  	} );
  }

  jQuery.removeEvent = function( elem, type, handle ) {

  	// This "if" is needed for plain objects
  	if ( elem.removeEventListener ) {
  		elem.removeEventListener( type, handle );
  	}
  };

  jQuery.Event = function( src, props ) {

  	// Allow instantiation without the 'new' keyword
  	if ( !( this instanceof jQuery.Event ) ) {
  		return new jQuery.Event( src, props );
  	}

  	// Event object
  	if ( src && src.type ) {
  		this.originalEvent = src;
  		this.type = src.type;

  		// Events bubbling up the document may have been marked as prevented
  		// by a handler lower down the tree; reflect the correct value.
  		this.isDefaultPrevented = src.defaultPrevented ?
  			returnTrue :
  			returnFalse;

  		// Create target properties
  		this.target = src.target;
  		this.currentTarget = src.currentTarget;
  		this.relatedTarget = src.relatedTarget;

  	// Event type
  	} else {
  		this.type = src;
  	}

  	// Put explicitly provided properties onto the event object
  	if ( props ) {
  		jQuery.extend( this, props );
  	}

  	// Create a timestamp if incoming event doesn't have one
  	this.timeStamp = src && src.timeStamp || Date.now();

  	// Mark it as fixed
  	this[ jQuery.expando ] = true;
  };

  // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
  jQuery.Event.prototype = {
  	constructor: jQuery.Event,
  	isDefaultPrevented: returnFalse,
  	isPropagationStopped: returnFalse,
  	isImmediatePropagationStopped: returnFalse,
  	isSimulated: false,

  	preventDefault: function() {
  		var e = this.originalEvent;

  		this.isDefaultPrevented = returnTrue;

  		if ( e && !this.isSimulated ) {
  			e.preventDefault();
  		}
  	},
  	stopPropagation: function() {
  		var e = this.originalEvent;

  		this.isPropagationStopped = returnTrue;

  		if ( e && !this.isSimulated ) {
  			e.stopPropagation();
  		}
  	},
  	stopImmediatePropagation: function() {
  		var e = this.originalEvent;

  		this.isImmediatePropagationStopped = returnTrue;

  		if ( e && !this.isSimulated ) {
  			e.stopImmediatePropagation();
  		}

  		this.stopPropagation();
  	}
  };

  // Includes all common event props including KeyEvent and MouseEvent specific props
  jQuery.each( {
  	altKey: true,
  	bubbles: true,
  	cancelable: true,
  	changedTouches: true,
  	ctrlKey: true,
  	detail: true,
  	eventPhase: true,
  	metaKey: true,
  	pageX: true,
  	pageY: true,
  	shiftKey: true,
  	view: true,
  	"char": true,
  	code: true,
  	charCode: true,
  	key: true,
  	keyCode: true,
  	button: true,
  	buttons: true,
  	clientX: true,
  	clientY: true,
  	offsetX: true,
  	offsetY: true,
  	pointerId: true,
  	pointerType: true,
  	screenX: true,
  	screenY: true,
  	targetTouches: true,
  	toElement: true,
  	touches: true,
  	which: true
  }, jQuery.event.addProp );

  jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

  	// Support: IE 11+
  	// Attach a single focusin/focusout handler on the document while someone wants focus/blur.
  	// This is because the former are synchronous in IE while the latter are async. In other
  	// browsers, all those handlers are invoked synchronously.
  	function focusMappedHandler( nativeEvent ) {

  		// `eventHandle` would already wrap the event, but we need to change the `type` here.
  		var event = jQuery.event.fix( nativeEvent );
  		event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
  		event.isSimulated = true;

  		// focus/blur don't bubble while focusin/focusout do; simulate the former by only
  		// invoking the handler at the lower level.
  		if ( event.target === event.currentTarget ) {

  			// The setup part calls `leverageNative`, which, in turn, calls
  			// `jQuery.event.add`, so event handle will already have been set
  			// by this point.
  			dataPriv.get( this, "handle" )( event );
  		}
  	}

  	jQuery.event.special[ type ] = {

  		// Utilize native event if possible so blur/focus sequence is correct
  		setup: function() {

  			// Claim the first handler
  			// dataPriv.set( this, "focus", ... )
  			// dataPriv.set( this, "blur", ... )
  			leverageNative( this, type, true );

  			if ( isIE ) {
  				this.addEventListener( delegateType, focusMappedHandler );
  			} else {

  				// Return false to allow normal processing in the caller
  				return false;
  			}
  		},
  		trigger: function() {

  			// Force setup before trigger
  			leverageNative( this, type );

  			// Return non-false to allow normal event-path propagation
  			return true;
  		},

  		teardown: function() {
  			if ( isIE ) {
  				this.removeEventListener( delegateType, focusMappedHandler );
  			} else {

  				// Return false to indicate standard teardown should be applied
  				return false;
  			}
  		},

  		// Suppress native focus or blur if we're currently inside
  		// a leveraged native-event stack
  		_default: function( event ) {
  			return dataPriv.get( event.target, type );
  		},

  		delegateType: delegateType
  	};
  } );

  // Create mouseenter/leave events using mouseover/out and event-time checks
  // so that event delegation works in jQuery.
  // Do the same for pointerenter/pointerleave and pointerover/pointerout
  jQuery.each( {
  	mouseenter: "mouseover",
  	mouseleave: "mouseout",
  	pointerenter: "pointerover",
  	pointerleave: "pointerout"
  }, function( orig, fix ) {
  	jQuery.event.special[ orig ] = {
  		delegateType: fix,
  		bindType: fix,

  		handle: function( event ) {
  			var ret,
  				target = this,
  				related = event.relatedTarget,
  				handleObj = event.handleObj;

  			// For mouseenter/leave call the handler if related is outside the target.
  			// NB: No relatedTarget if the mouse left/entered the browser window
  			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
  				event.type = handleObj.origType;
  				ret = handleObj.handler.apply( this, arguments );
  				event.type = fix;
  			}
  			return ret;
  		}
  	};
  } );

  jQuery.fn.extend( {

  	on: function( types, selector, data, fn ) {
  		return on( this, types, selector, data, fn );
  	},
  	one: function( types, selector, data, fn ) {
  		return on( this, types, selector, data, fn, 1 );
  	},
  	off: function( types, selector, fn ) {
  		var handleObj, type;
  		if ( types && types.preventDefault && types.handleObj ) {

  			// ( event )  dispatched jQuery.Event
  			handleObj = types.handleObj;
  			jQuery( types.delegateTarget ).off(
  				handleObj.namespace ?
  					handleObj.origType + "." + handleObj.namespace :
  					handleObj.origType,
  				handleObj.selector,
  				handleObj.handler
  			);
  			return this;
  		}
  		if ( typeof types === "object" ) {

  			// ( types-object [, selector] )
  			for ( type in types ) {
  				this.off( type, selector, types[ type ] );
  			}
  			return this;
  		}
  		if ( selector === false || typeof selector === "function" ) {

  			// ( types [, fn] )
  			fn = selector;
  			selector = undefined;
  		}
  		if ( fn === false ) {
  			fn = returnFalse;
  		}
  		return this.each( function() {
  			jQuery.event.remove( this, types, fn, selector );
  		} );
  	}
  } );

  // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function
  function access( elems, fn, key, value, chainable, emptyGet, raw ) {
  	var i = 0,
  		len = elems.length,
  		bulk = key == null;

  	// Sets many values
  	if ( toType( key ) === "object" ) {
  		chainable = true;
  		for ( i in key ) {
  			access( elems, fn, i, key[ i ], true, emptyGet, raw );
  		}

  	// Sets one value
  	} else if ( value !== undefined ) {
  		chainable = true;

  		if ( typeof value !== "function" ) {
  			raw = true;
  		}

  		if ( bulk ) {

  			// Bulk operations run against the entire set
  			if ( raw ) {
  				fn.call( elems, value );
  				fn = null;

  			// ...except when executing function values
  			} else {
  				bulk = fn;
  				fn = function( elem, _key, value ) {
  					return bulk.call( jQuery( elem ), value );
  				};
  			}
  		}

  		if ( fn ) {
  			for ( ; i < len; i++ ) {
  				fn(
  					elems[ i ], key, raw ?
  						value :
  						value.call( elems[ i ], i, fn( elems[ i ], key ) )
  				);
  			}
  		}
  	}

  	if ( chainable ) {
  		return elems;
  	}

  	// Gets
  	if ( bulk ) {
  		return fn.call( elems );
  	}

  	return len ? fn( elems[ 0 ], key ) : emptyGet;
  }

  jQuery.fn.extend( {
  	attr: function( name, value ) {
  		return access( this, jQuery.attr, name, value, arguments.length > 1 );
  	},

  	removeAttr: function( name ) {
  		return this.each( function() {
  			jQuery.removeAttr( this, name );
  		} );
  	}
  } );

  jQuery.extend( {
  	attr: function( elem, name, value ) {
  		var ret, hooks,
  			nType = elem.nodeType;

  		// Don't get/set attributes on text, comment and attribute nodes
  		if ( nType === 3 || nType === 8 || nType === 2 ) {
  			return;
  		}

  		// Fallback to prop when attributes are not supported
  		if ( typeof elem.getAttribute === "undefined" ) {
  			return jQuery.prop( elem, name, value );
  		}

  		// Attribute hooks are determined by the lowercase version
  		// Grab necessary hook if one is defined
  		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
  			hooks = jQuery.attrHooks[ name.toLowerCase() ];
  		}

  		if ( value !== undefined ) {
  			if ( value === null ) {
  				jQuery.removeAttr( elem, name );
  				return;
  			}

  			if ( hooks && "set" in hooks &&
  				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
  				return ret;
  			}

  			elem.setAttribute( name, value );
  			return value;
  		}

  		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
  			return ret;
  		}

  		ret = elem.getAttribute( name );

  		// Non-existent attributes return null, we normalize to undefined
  		return ret == null ? undefined : ret;
  	},

  	attrHooks: {},

  	removeAttr: function( elem, value ) {
  		var name,
  			i = 0,

  			// Attribute names can contain non-HTML whitespace characters
  			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
  			attrNames = value && value.match( rnothtmlwhite );

  		if ( attrNames && elem.nodeType === 1 ) {
  			while ( ( name = attrNames[ i++ ] ) ) {
  				elem.removeAttribute( name );
  			}
  		}
  	}
  } );

  // Support: IE <=11+
  // An input loses its value after becoming a radio
  if ( isIE ) {
  	jQuery.attrHooks.type = {
  		set: function( elem, value ) {
  			if ( value === "radio" && nodeName( elem, "input" ) ) {
  				var val = elem.value;
  				elem.setAttribute( "type", value );
  				if ( val ) {
  					elem.value = val;
  				}
  				return value;
  			}
  		}
  	};
  }

  jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
  	jQuery.attrHooks[ name ] = {
  		get: function( elem ) {
  			var ret,
  				isXML = jQuery.isXMLDoc( elem ),
  				lowercaseName = name.toLowerCase();

  			if ( !isXML ) {
  				ret = elem.getAttribute( name ) != null ?
  					lowercaseName :
  					null;
  			}
  			return ret;
  		},

  		set: function( elem, value, name ) {
  			if ( value === false ) {

  				// Remove boolean attributes when set to false
  				jQuery.removeAttr( elem, name );
  			} else {
  				elem.setAttribute( name, name );
  			}
  			return name;
  		}
  	};
  } );

  var rfocusable = /^(?:input|select|textarea|button)$/i,
  	rclickable = /^(?:a|area)$/i;

  jQuery.fn.extend( {
  	prop: function( name, value ) {
  		return access( this, jQuery.prop, name, value, arguments.length > 1 );
  	},

  	removeProp: function( name ) {
  		return this.each( function() {
  			delete this[ jQuery.propFix[ name ] || name ];
  		} );
  	}
  } );

  jQuery.extend( {
  	prop: function( elem, name, value ) {
  		var ret, hooks,
  			nType = elem.nodeType;

  		// Don't get/set properties on text, comment and attribute nodes
  		if ( nType === 3 || nType === 8 || nType === 2 ) {
  			return;
  		}

  		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

  			// Fix name and attach hooks
  			name = jQuery.propFix[ name ] || name;
  			hooks = jQuery.propHooks[ name ];
  		}

  		if ( value !== undefined ) {
  			if ( hooks && "set" in hooks &&
  				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
  				return ret;
  			}

  			return ( elem[ name ] = value );
  		}

  		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
  			return ret;
  		}

  		return elem[ name ];
  	},

  	propHooks: {
  		tabIndex: {
  			get: function( elem ) {

  				// Support: IE <=9 - 11+
  				// elem.tabIndex doesn't always return the
  				// correct value when it hasn't been explicitly set
  				// Use proper attribute retrieval (trac-12072)
  				var tabindex = elem.getAttribute( "tabindex" );

  				if ( tabindex ) {
  					return parseInt( tabindex, 10 );
  				}

  				if (
  					rfocusable.test( elem.nodeName ) ||

  					// href-less anchor's `tabIndex` property value is `0` and
  					// the `tabindex` attribute value: `null`. We want `-1`.
  					rclickable.test( elem.nodeName ) && elem.href
  				) {
  					return 0;
  				}

  				return -1;
  			}
  		}
  	},

  	propFix: {
  		"for": "htmlFor",
  		"class": "className"
  	}
  } );

  // Support: IE <=11+
  // Accessing the selectedIndex property forces the browser to respect
  // setting selected on the option. The getter ensures a default option
  // is selected when in an optgroup. ESLint rule "no-unused-expressions"
  // is disabled for this code since it considers such accessions noop.
  if ( isIE ) {
  	jQuery.propHooks.selected = {
  		get: function( elem ) {

  			var parent = elem.parentNode;
  			if ( parent && parent.parentNode ) {
  				// eslint-disable-next-line no-unused-expressions
  				parent.parentNode.selectedIndex;
  			}
  			return null;
  		},
  		set: function( elem ) {


  			var parent = elem.parentNode;
  			if ( parent ) {
  				// eslint-disable-next-line no-unused-expressions
  				parent.selectedIndex;

  				if ( parent.parentNode ) {
  					// eslint-disable-next-line no-unused-expressions
  					parent.parentNode.selectedIndex;
  				}
  			}
  		}
  	};
  }

  jQuery.each( [
  	"tabIndex",
  	"readOnly",
  	"maxLength",
  	"cellSpacing",
  	"cellPadding",
  	"rowSpan",
  	"colSpan",
  	"useMap",
  	"frameBorder",
  	"contentEditable"
  ], function() {
  	jQuery.propFix[ this.toLowerCase() ] = this;
  } );

  // Strip and collapse whitespace according to HTML spec
  // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
  function stripAndCollapse( value ) {
  	var tokens = value.match( rnothtmlwhite ) || [];
  	return tokens.join( " " );
  }

  function getClass( elem ) {
  	return elem.getAttribute && elem.getAttribute( "class" ) || "";
  }

  function classesToArray( value ) {
  	if ( Array.isArray( value ) ) {
  		return value;
  	}
  	if ( typeof value === "string" ) {
  		return value.match( rnothtmlwhite ) || [];
  	}
  	return [];
  }

  jQuery.fn.extend( {
  	addClass: function( value ) {
  		var classNames, cur, curValue, className, i, finalValue;

  		if ( typeof value === "function" ) {
  			return this.each( function( j ) {
  				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
  			} );
  		}

  		classNames = classesToArray( value );

  		if ( classNames.length ) {
  			return this.each( function() {
  				curValue = getClass( this );
  				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

  				if ( cur ) {
  					for ( i = 0; i < classNames.length; i++ ) {
  						className = classNames[ i ];
  						if ( cur.indexOf( " " + className + " " ) < 0 ) {
  							cur += className + " ";
  						}
  					}

  					// Only assign if different to avoid unneeded rendering.
  					finalValue = stripAndCollapse( cur );
  					if ( curValue !== finalValue ) {
  						this.setAttribute( "class", finalValue );
  					}
  				}
  			} );
  		}

  		return this;
  	},

  	removeClass: function( value ) {
  		var classNames, cur, curValue, className, i, finalValue;

  		if ( typeof value === "function" ) {
  			return this.each( function( j ) {
  				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
  			} );
  		}

  		if ( !arguments.length ) {
  			return this.attr( "class", "" );
  		}

  		classNames = classesToArray( value );

  		if ( classNames.length ) {
  			return this.each( function() {
  				curValue = getClass( this );

  				// This expression is here for better compressibility (see addClass)
  				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

  				if ( cur ) {
  					for ( i = 0; i < classNames.length; i++ ) {
  						className = classNames[ i ];

  						// Remove *all* instances
  						while ( cur.indexOf( " " + className + " " ) > -1 ) {
  							cur = cur.replace( " " + className + " ", " " );
  						}
  					}

  					// Only assign if different to avoid unneeded rendering.
  					finalValue = stripAndCollapse( cur );
  					if ( curValue !== finalValue ) {
  						this.setAttribute( "class", finalValue );
  					}
  				}
  			} );
  		}

  		return this;
  	},

  	toggleClass: function( value, stateVal ) {
  		var classNames, className, i, self;

  		if ( typeof value === "function" ) {
  			return this.each( function( i ) {
  				jQuery( this ).toggleClass(
  					value.call( this, i, getClass( this ), stateVal ),
  					stateVal
  				);
  			} );
  		}

  		if ( typeof stateVal === "boolean" ) {
  			return stateVal ? this.addClass( value ) : this.removeClass( value );
  		}

  		classNames = classesToArray( value );

  		if ( classNames.length ) {
  			return this.each( function() {

  				// Toggle individual class names
  				self = jQuery( this );

  				for ( i = 0; i < classNames.length; i++ ) {
  					className = classNames[ i ];

  					// Check each className given, space separated list
  					if ( self.hasClass( className ) ) {
  						self.removeClass( className );
  					} else {
  						self.addClass( className );
  					}
  				}
  			} );
  		}

  		return this;
  	},

  	hasClass: function( selector ) {
  		var className, elem,
  			i = 0;

  		className = " " + selector + " ";
  		while ( ( elem = this[ i++ ] ) ) {
  			if ( elem.nodeType === 1 &&
  				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
  				return true;
  			}
  		}

  		return false;
  	}
  } );

  jQuery.fn.extend( {
  	val: function( value ) {
  		var hooks, ret, valueIsFunction,
  			elem = this[ 0 ];

  		if ( !arguments.length ) {
  			if ( elem ) {
  				hooks = jQuery.valHooks[ elem.type ] ||
  					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

  				if ( hooks &&
  					"get" in hooks &&
  					( ret = hooks.get( elem, "value" ) ) !== undefined
  				) {
  					return ret;
  				}

  				ret = elem.value;

  				// Handle cases where value is null/undef or number
  				return ret == null ? "" : ret;
  			}

  			return;
  		}

  		valueIsFunction = typeof value === "function";

  		return this.each( function( i ) {
  			var val;

  			if ( this.nodeType !== 1 ) {
  				return;
  			}

  			if ( valueIsFunction ) {
  				val = value.call( this, i, jQuery( this ).val() );
  			} else {
  				val = value;
  			}

  			// Treat null/undefined as ""; convert numbers to string
  			if ( val == null ) {
  				val = "";

  			} else if ( typeof val === "number" ) {
  				val += "";

  			} else if ( Array.isArray( val ) ) {
  				val = jQuery.map( val, function( value ) {
  					return value == null ? "" : value + "";
  				} );
  			}

  			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

  			// If set returns undefined, fall back to normal setting
  			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
  				this.value = val;
  			}
  		} );
  	}
  } );

  jQuery.extend( {
  	valHooks: {
  		select: {
  			get: function( elem ) {
  				var value, option, i,
  					options = elem.options,
  					index = elem.selectedIndex,
  					one = elem.type === "select-one",
  					values = one ? null : [],
  					max = one ? index + 1 : options.length;

  				if ( index < 0 ) {
  					i = max;

  				} else {
  					i = one ? index : 0;
  				}

  				// Loop through all the selected options
  				for ( ; i < max; i++ ) {
  					option = options[ i ];

  					if ( option.selected &&

  							// Don't return options that are disabled or in a disabled optgroup
  							!option.disabled &&
  							( !option.parentNode.disabled ||
  								!nodeName( option.parentNode, "optgroup" ) ) ) {

  						// Get the specific value for the option
  						value = jQuery( option ).val();

  						// We don't need an array for one selects
  						if ( one ) {
  							return value;
  						}

  						// Multi-Selects return an array
  						values.push( value );
  					}
  				}

  				return values;
  			},

  			set: function( elem, value ) {
  				var optionSet, option,
  					options = elem.options,
  					values = jQuery.makeArray( value ),
  					i = options.length;

  				while ( i-- ) {
  					option = options[ i ];

  					if ( ( option.selected =
  						jQuery.inArray( jQuery( option ).val(), values ) > -1
  					) ) {
  						optionSet = true;
  					}
  				}

  				// Force browsers to behave consistently when non-matching value is set
  				if ( !optionSet ) {
  					elem.selectedIndex = -1;
  				}
  				return values;
  			}
  		}
  	}
  } );

  if ( isIE ) {
  	jQuery.valHooks.option = {
  		get: function( elem ) {

  			var val = elem.getAttribute( "value" );
  			return val != null ?
  				val :

  				// Support: IE <=10 - 11+
  				// option.text throws exceptions (trac-14686, trac-14858)
  				// Strip and collapse whitespace
  				// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
  				stripAndCollapse( jQuery.text( elem ) );
  		}
  	};
  }

  // Radios and checkboxes getter/setter
  jQuery.each( [ "radio", "checkbox" ], function() {
  	jQuery.valHooks[ this ] = {
  		set: function( elem, value ) {
  			if ( Array.isArray( value ) ) {
  				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
  			}
  		}
  	};
  } );

  return jQuery;

  }

  var jQuery = jQueryFactory( window);

  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const floor = Math.floor;
  const createCoords = v => ({
    x: v,
    y: v
  });
  const oppositeSideMap = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  const oppositeAlignmentMap = {
    start: 'end',
    end: 'start'
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split('-')[0];
  }
  function getAlignment(placement) {
    return placement.split('-')[1];
  }
  function getOppositeAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }
  function getAxisLength(axis) {
    return axis === 'y' ? 'height' : 'width';
  }
  function getSideAxis(placement) {
    return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
  }
  function getSideList(side, isStart, rtl) {
    const lr = ['left', 'right'];
    const rl = ['right', 'left'];
    const tb = ['top', 'bottom'];
    const bt = ['bottom', 'top'];
    switch (side) {
      case 'top':
      case 'bottom':
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case 'left':
      case 'right':
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === 'start', rtl);
    if (alignment) {
      list = list.map(side => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    return {
      ...rect,
      top: rect.y,
      left: rect.x,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    };
  }

  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === 'y';
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case 'start':
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case 'end':
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain positioning strategy.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  const computePosition$1 = async (reference, floating, config) => {
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
    let rects = await platform.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const {
        name,
        fn
      } = validMiddleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === 'object') {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
        continue;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };

  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary on each side.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = 'clippingAncestors',
      rootBoundary = 'viewport',
      elementContext = 'floating',
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform.getClippingRect({
      element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === 'floating' ? {
      ...rects.floating,
      x,
      y
    } : rects.reference;
    const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
    const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'flip',
      options,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = 'bestFit',
          fallbackAxisSideDirection = 'none',
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);

        // If a reset by the arrow was caused due to an alignment offset being
        // added, we should skip any logic now since `flip()` has already done its
        // work.
        // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides[0]], overflow[sides[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];

        // One or more sides is overflowing.
        if (!overflows.every(side => side <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }

          // First, find the candidates that fit on the mainAxis side of overflow,
          // then find the placement that fits the best on the main crossAxis side.
          let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

          // Otherwise fallback.
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case 'bestFit':
                {
                  var _overflowsData$map$so;
                  const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                  if (placement) {
                    resetPlacement = placement;
                  }
                  break;
                }
              case 'initialPlacement':
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };

  // For type backwards-compatibility, the `OffsetOptions` type was also
  // Derivable.
  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform,
      elements
    } = state;
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === 'y';
    const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);

    // eslint-disable-next-line prefer-const
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === 'number' ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: 0,
      crossAxis: 0,
      alignmentAxis: null,
      ...rawValue
    };
    if (alignment && typeof alignmentAxis === 'number') {
      crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset = function (options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: 'offset',
      options,
      async fn(state) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x,
          y,
          placement,
          middlewareData
        } = state;
        const diffCoords = await convertValueToCoords(state, options);

        // If the placement is the same and the arrow caused an alignment offset
        // then we don't need to change the positioning coordinates.
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'shift',
      options,
      async fn(state) {
        const {
          x,
          y,
          placement
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: _ref => {
              let {
                x,
                y
              } = _ref;
              return {
                x,
                y
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === 'y' ? 'top' : 'left';
          const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
          const min = mainAxisCoord + overflow[minSide];
          const max = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min, mainAxisCoord, max);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === 'y' ? 'top' : 'left';
          const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
          const min = crossAxisCoord + overflow[minSide];
          const max = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min, crossAxisCoord, max);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y
          }
        };
      }
    };
  };

  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    // Browsers without `ShadowRoot` support.
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isContainingBlock(element) {
    const webkit = isWebKit();
    const css = getComputedStyle(element);

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else {
        currentNode = getParentNode(currentNode);
      }
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
  }
  function isLastTraversableNode(node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
  }
  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
    const result =
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot ||
    // DOM Element detected.
    node.parentNode ||
    // ShadowRoot detected.
    isShadowRoot(node) && node.host ||
    // Fallback.
    getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }

  function getCssDimensions(element) {
    const css = getComputedStyle(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }

  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }

  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;

    // 0, NaN, or Infinity should always fallback to 1.

    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }

  const noOffsets = /*#__PURE__*/createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentIFrame = win.frameElement;
      while (currentIFrame && offsetParent && offsetWin !== win) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentIFrame = getWindow(currentIFrame).frameElement;
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }

  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    if (offsetParent === documentElement) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
    };
  }

  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }

  // Gets the entire size of the scrollable document area, even extending outside
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable.
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle(body).direction === 'rtl') {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // Returns the inner client rect, subtracting scrollbars if present.
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === 'viewport') {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        ...clippingAncestor,
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
  }

  // A "clipping ancestor" is an `overflow` element with the characteristic of
  // clipping (or hiding) child elements. This returns all clipping ancestors
  // of the given element up the tree.
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle(element).position === 'fixed';
    let currentNode = elementIsFixed ? getParentNode(element) : element;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        // Drop non-containing blocks.
        result = result.filter(ancestor => ancestor !== currentNode);
      } else {
        // Record last containing block for next iteration.
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }

  // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors.
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }

  function getDimensions(element) {
    return getCssDimensions(element);
  }

  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === 'fixed';
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    return element.offsetParent;
  }

  // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  function getOffsetParent(element, polyfill) {
    const window = getWindow(element);
    if (!isHTMLElement(element)) {
      return window;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
      return window;
    }
    return offsetParent || getContainingBlock(element) || window;
  }

  const getElementRects = async function (_ref) {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    return {
      reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
      floating: {
        x: 0,
        y: 0,
        ...(await getDimensionsFn(floating))
      }
    };
  };

  function isRTL(element) {
    return getComputedStyle(element).direction === 'rtl';
  }

  const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };

  // https://samthor.au/2021/observing-dom/
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
      clearTimeout(timeoutId);
      io && io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const {
        left,
        top,
        width,
        height
      } = element.getBoundingClientRect();
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 100);
          } else {
            refresh(false, ratio);
          }
        }
        isFirstUpdate = false;
      }

      // Older browsers don't support a `document` as the root and will throw an
      // error.
      try {
        io = new IntersectionObserver(handleObserve, {
          ...options,
          // Handle <iframe>s
          root: root.ownerDocument
        });
      } catch (e) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }

  /**
   * Automatically updates the position of the floating element when necessary.
   * Should only be called when the floating element is mounted on the DOM or
   * visible on the screen.
   * @returns cleanup function that should be invoked when the floating element is
   * removed from the DOM or hidden from the screen.
   * @see https://floating-ui.com/docs/autoUpdate
   */
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = typeof ResizeObserver === 'function',
      layoutShift = typeof IntersectionObserver === 'function',
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.addEventListener('scroll', update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener('resize', update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver(_ref => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
          // Prevent update loops when using the `size` middleware.
          // https://github.com/floating-ui/floating-ui/issues/1740
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            resizeObserver && resizeObserver.observe(floating);
          });
        }
        update();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      ancestors.forEach(ancestor => {
        ancestorScroll && ancestor.removeEventListener('scroll', update);
        ancestorResize && ancestor.removeEventListener('resize', update);
      });
      cleanupIo && cleanupIo();
      resizeObserver && resizeObserver.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain CSS positioning
   * strategy.
   */
  const computePosition = (reference, floating, options) => {
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    const cache = new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition$1(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

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
        console.warn(`${Constants.CLASSES.container}:Invalid element!`);
        return
      }

      this.#container = element;
      this.#options = options;

      //初始化
      this.#init();

      console.log('init');

      //静态属性存实例对象,用于子页面快速找到父级页面实例，然后添加tab等..
      // Quicktab.#instances[this.#options.id] = this

      // //初始化完毕调用init
      // typeof this.#options.onInit === 'function' &&
      //   this.#options.onInit.call(this, this)
    }

    #init() {
      this.#initOptions();

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
        console.log('启用翻译了');

        const locales = Quicktab.LANGS;

        const parts = this.#options.lang.split(/-|_/);

        console.log(locales, parts);

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
      );


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
        const attrKey = prefix + key;
        const dataVal = Utils.parseAttributeValue(
          this.#container.getAttribute(attrKey),
        );

        if (Utils.isObject(options[key])) {
          //如果是对象
          dataVal === false
            ? (options[key] = false)
            : this.#parseOptions(options[key], attrKey + '-');
        } else {
          if (dataVal !== null) {
            options[key] = dataVal;
          }
        }
      }
      return options
    }

    #initMemberVariable() {
      // 缓存的key
      this.#cacheKey = `${Constants.CLASSES.container}-${this.#options.id}`;

      //默认初始化的选项的key
      this.#cacheDefaultTabsKey = `${this.#cacheKey}-defaultTabs`;

      this.#hideItemSelector = this.#options.responsive.hideItem.map((item) => {
        return `.${Constants.CLASSES.tabBar} li.${item}`
      });
    }

    #initDragSort() {
      let that = this;

      if (
        this.#options.tabBar.hide === false &&
        this.#options.tab.dragSort === true
      ) {
        //当前拖动的元素
        let dragging = null;

        jQuery(this.#tabBarItemScrollEl).on('dragstart', function (event) {
          dragging = event.target;
        });

        //拖拽移动中
        jQuery(this.#tabBarItemScrollEl).on('dragover', function (event) {
          event.preventDefault();
          // 默认无法将数据/元素放置到其他元素中。如果需要设置允许放置，必须阻止对元素的默认处理方式

          let target = event.target;

          //当前拖动的元素是li 且不等于
          if (target.nodeName === 'BUTTON' && target !== dragging) {
            // 获取初始位置
            let targetRect = target.getBoundingClientRect();
            let draggingRect = dragging.getBoundingClientRect();

            if (target) {
              // 判断是否动画元素
              if (target.animated) {
                return
              }
            }

            if (that.#index(dragging) < that.#index(target)) {
              // 目标比元素大，插到其后面
              // extSibling下一个兄弟元素
              target.parentNode.insertBefore(dragging, target.nextSibling);
            } else {
              // 目标比元素小，插到其前面
              target.parentNode.insertBefore(dragging, target);
            }
            that.#animate(draggingRect, dragging);
            that.#animate(targetRect, target);
          }
        });

        //拖拽结束
        jQuery(this.#tabBarItemScrollEl).on('dragend', function () {
          dragging = null;
        });
      }
    }

    #initCache() {
      this.#cacheHandle = new QuickCache({
        type: this.#options.cache.type,
      });
    }

    #initEvent() {
      let that = this;

      //启动通过html属性注册tab的能力
      jQuery(document.body).on(
        'click',
        `[${Constants.DATAKEYS.singleTab}][${Constants.DATAKEYS.singleTabTarget}]`,
        function (event) {
          event.preventDefault();

          if (
            this.getAttribute(Constants.DATAKEYS.singleTabTarget) ===
            that.#options.selector
          ) {
            const tab = Utils.extend(
              {},
              Constants.TABDEFAULTS,
              JSON.parse(this.getAttribute(Constants.DATAKEYS.singleTab)),
            );

            that.addTab(tab);
          }
        },
      );

      //事件委托监听loading过渡完毕
      jQuery(this.#container).on(
        'transitionend',
        `.${Constants.CLASSES.tabBody} .${Constants.CLASSES.overlays}`,
        function (event) {
          if (event.target === event.currentTarget) {
            event.target.remove();
            //tab过渡完毕事件回调
            typeof that.#options.onTabLoadingTransitionend === 'function' &&
              that.#options.onTabLoadingTransitionend.call(that, that);
          }
        },
      );

      if (this.#options.tabBar.hide === false) {
        //判断工具栏是否显示,如果都不显示，没必要绑定这些事件了。

        //tab的单击事件
        jQuery(this.#tabBarItemScrollEl).on(
          //单击和双击
          'click',
          'button',
          Utils.handleSingleAndDoubleClick(
            {
              click: {
                handle: function () {
                  that.#tabClickHandle(that.#getTabUrl(this));
                },
              },
              dbclick: {
                handle: function () {
                  that.refreshTabByUrl(that.#getTabUrl(this));
                },
              },
            },
            {
              enableDbClick: that.#options.tab.dbClickRefresh === true,
            },
          ),
        );

        //tab关闭事件
        if (this.#options.tab.closeBtn.enable === true) {
          jQuery(this.#tabBarItemScrollEl).on(
            'click',
            `button > svg`,
            function (event) {
              event.stopPropagation(); //必须要阻止事件的冒泡

              let tab = this.parentNode;
              that.closeTabByUrl(that.#getTabUrl(tab));
            },
          );
        }

        //prev滑动事件
        if (this.#options.tabBar.prev.enable === true) {
          jQuery(this.#tabBarEl).on(
            'click',
            `li.${Constants.CLASSES.tabBarPrevItem} > button`,
            function (event) {
              that.prevScroll();
            },
          );
        }

        //next滑动事件
        if (this.#options.tabBar.next.enable === true) {
          jQuery(this.#tabBarEl).on(
            'click',
            `li.${Constants.CLASSES.tabBarNextItem} > button`,
            function (event) {
              that.nextScroll();
            },
          );
        }

        // 刷新按钮事件
        if (this.#options.tabBar.refresh.enable === true) {
          jQuery(this.#tabBarEl).on(
            'click',
            `li.${Constants.CLASSES.tabBarRefreshItem} > button`,
            function () {
              that.refreshTabByUrl(that.#getTabUrl(that.getActiveTab()));
            },
          );
        }

        if (this.#options.tab.mouseWheelSwitch.enable === true) {
          //鼠标滚轮切换tab功能启用

          const { onlyScroll, centerActive } = this.#options.tab.mouseWheelSwitch;

          let centerTabEl;
          const withTabPaneDebounce = Utils.debounce(function (event) {
            const activeTab = that.getActiveTab();
            const prev = activeTab.previousElementSibling;
            const next = activeTab.nextElementSibling;

            // 判断滚轮方向，负值表示向上滚动，正值表示向下滚动
            const direction = Math.sign(event.deltaY);

            if (direction === -1 && prev) {
              that.activeTabByUrl(that.#getTabUrl(prev));
              centerTabEl = prev;
            } else if (direction === 1 && next) {
              that.activeTabByUrl(that.#getTabUrl(next));
              centerTabEl = next;
            }

            if (centerActive === true && centerTabEl) {
              //是否启动居中,且将要激活的tab是否存在
              that.scrollToTabByUrl(that.#getTabUrl(centerTabEl));
            }
          }, 200);

          this.#tabBarItemScrollEl.addEventListener(
            'wheel',
            function (event) {
              event.preventDefault(); //阻止默认事件，否则它会被外部的滚动条影响

              //判断是否启用右键菜单，如果启用就要关闭
              if (that.#options.tab.contextmenu.enable === true) {
                that.#closeContextmenu();
              }

              if (onlyScroll === true) {
                //如果只是滚动
                that.#tabBarItemScrollEl.scrollLeft +=
                  (event.deltaY || event.detail || -event.wheelDelta) / 2;
              } else {
                withTabPaneDebounce(event);
              }
            },
            { passive: false },
          ); //{ passive: false }解决控制台的警告错误
        }

        //是否启用右键菜单功能
        if (this.#options.tab.contextmenu.enable === true) {
          //tab右键的事件委托
          jQuery(this.#tabBarItemScrollEl).on(
            'contextmenu',
            'button',
            function (event) {
              let tabEl = this;

              event.preventDefault();
              event.stopPropagation(); //必须要防止冒泡,防止和外部的右键事件冲突

              //显示右键菜单
              that.#showContextmenuByUrl(that.#getTabUrl(tabEl));
            },
          );

          jQuery(document).on(
            'click contextmenu touchstart scroll dragstart',
            function () {
              that.#closeContextmenu();
            },
          );

          //绑定事件
          that.#bindMenuItemAction.call(
            this,
            Constants.CLASSES.listGroupRefreshItem,
            'refresh',
          );
          that.#bindMenuItemAction.call(
            this,
            Constants.CLASSES.listGroupCloseOtherItem,
            'closeOthers',
          );
          that.#bindMenuItemAction.call(
            this,
            Constants.CLASSES.listGroupClosePrevItem,
            'closePrev',
          );
          that.#bindMenuItemAction.call(
            this,
            Constants.CLASSES.listGroupCloseNextItem,
            'closeNext',
          );
          that.#bindMenuItemAction.call(
            this,
            Constants.CLASSES.listGroupCloseAllItem,
            'closeAll',
          );
          that.#bindMenuItemAction.call(
            this,
            Constants.CLASSES.listGroupNewBlankItem,
            'newBlank',
          );
          that.#bindMenuItemAction.call(
            this,
            Constants.CLASSES.listGroupFullscreenItem,
            'fullscreen',
          );
          that.#bindMenuItemAction.call(
            this,
            Constants.CLASSES.listGroupCenterActiveItem,
            'centerActive',
          );
          that.#bindMenuItemAction.call(
            this,
            Constants.CLASSES.listGroupCloseItem,
            'close',
          );
        }

        //全屏
        if (this.#options.tabBar.fullscreen.enable === true) {
          jQuery(this.#tabBarEl).on(
            'click',
            `li.${Constants.CLASSES.tabBarFullscreenItem} > button`,
            function () {
              that
                .getTabPaneByUrl(that.#getTabUrl(that.getActiveTab()))
                ?.requestFullscreen();
            },
          );
        }
      }
    }

    //给列表菜单项绑定事件
    #bindMenuItemAction(itemClass, action) {
      if (this.#options.tab.contextmenu[action].enable === true) {
        let that = this;
        jQuery(this.#contextmenuEl).on(
          'click contextmenu touchstart',
          `.${itemClass}`,
          function (event) {
            if (event.type === 'contextmenu') {
              event.preventDefault();
            }

            const url = that.#getTabUrl(this);

            switch (action) {
              case 'refresh':
                that.refreshTabByUrl(url);
                break
              case 'closeOthers':
                that.closeTabsExceptByUrl(that.getTabs(), url);
                break
              case 'closePrev':
                that.closeTabsExceptByUrl(that.getTabPrevAllByUrl(url), url);
                break
              case 'closeNext':
                that.closeTabsExceptByUrl(that.getTabNextAllByUrl(url), url);
                break
              case 'closeAll':
                that.closeAllTabs();
                break
              case 'newBlank':
                window.open(url, '_blank');
                break
              case 'fullscreen':
                that.activeTabByUrl(url);
                that.getTabPaneByUrl(url).requestFullscreen();
                break
              case 'centerActive':
                that.scrollToTabByUrl(that.#getTabUrl(that.getActiveTab()));
                break
              case 'close':
                that.closeTabByUrl(url);
                break
              // 添加其他菜单项的处理逻辑
            }
          },
        );
      }
    }

    //关闭所有的tabs
    closeAllTabs() {
      this.getTabs()?.forEach((tab) => {
        const tabUrl = this.#getTabUrl(tab);
        if (this.isTabClosableByUrl(tabUrl)) {
          this.closeTabByUrl(tabUrl);
        }
      });
    }

    /**
     * 除了指定的tab,其它的tab都关闭
     * @param {Array|NodeList} tabs  纯数组、或者是nodelist可以被forEach的包含dom对象的数组
     * @param {String} url
     */
    closeTabsExceptByUrl(tabs, url) {
      tabs?.forEach((tab) => {
        const tabUrl = this.#getTabUrl(tab);
        if (
          tabUrl !== url &&
          this.isTabClosableByUrl(tabUrl) &&
          this.isTabClosableByUrl(url)
        ) {
          this.closeTabByUrl(tabUrl);
        }
      });
    }

    // 从元素的data属性上获取Url
    #getTabUrl(element) {
      return element?.getAttribute(Constants.DATAKEYS.tabUrl)
    }

    //显示右键菜单
    #showContextmenuByUrl(url) {
      const listGroupCloseItemEl = this.#contextmenuEl.querySelector(
        `.${Constants.CLASSES.listGroupCloseItem}`,
      );
      if (this.isTabClosableByUrl(url)) {
        //判断是否需要显示关闭当前的列表项
        listGroupCloseItemEl?.style.setProperty('display', 'block');
      } else {
        listGroupCloseItemEl?.style.setProperty('display', 'none');
      }

      let tabEl = this.getTabByUrl(url);

      this.#contextmenuCleanup?.();

      // 注册菜单自动更新位置
      this.#contextmenuCleanup = autoUpdate(
        tabEl,
        this.#contextmenuEl,
        this.#updatePosition.bind(this, tabEl, this.#contextmenuEl),
      );

      //添加显示右键菜单的类
      this.#contextmenuEl.classList.add(Constants.CLASSES.listGroupShow);

      //给iframe添加防止鼠标事件穿透的class效果,增加用户体验
      this.#addPenClass();

      //把url属性也给每一个列表项目设置一遍，方便后续事件的处理
      this.#contextmenuEl.querySelectorAll('li').forEach(function (li) {
        li.setAttribute(Constants.DATAKEYS.tabUrl, url);
      });
    }

    //关闭右键菜单
    #closeContextmenu() {
      this.#contextmenuCleanup?.();
      this.#contextmenuEl.classList.remove(Constants.CLASSES.listGroupShow);
      this.#removePenClass();
    }

    #addPenClass() {
      //添加防止鼠标事件失效的类名称
      this.#container.classList.add(Constants.CLASSES.pointerEventsNnoe);
      if (
        !this.#contextmenuEl.classList.contains(Constants.CLASSES.listGroupShow)
      ) {
        this.#canRemovePenClass++;
      }
    }

    #removePenClass() {
      if (this.#canRemovePenClass > 0) {
        this.#canRemovePenClass--;
      }

      if (this.#canRemovePenClass === 0) {
        this.#container.classList.remove(Constants.CLASSES.pointerEventsNnoe);
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
        });
      });
    }

    #initContainer() {
      //给容器挂载类名
      this.#container.classList.add(Constants.CLASSES.container);

      //设置容器的尺寸
      const { height, width, minHeight } = this.#options;
      this.#container.style.setProperty('height', height);
      this.#container.style.setProperty('width', width);
      this.#container.style.setProperty('min-height', minHeight);

      let tabBarItemClassMap = {
        prev: Constants.CLASSES.tabBarPrevItem,
        refresh: Constants.CLASSES.tabBarRefreshItem,
        next: Constants.CLASSES.tabBarNextItem,
        dropdown: Constants.CLASSES.tabBarDropdownItem,
        fullscreen: Constants.CLASSES.tabBarFullscreenItem,
      };

      let tabBarScrollItemKey = 'scroll';

      let html = [
        Utils.sprintf(
          Constants.HTML.tabBar[0],
          this.#options.tabBar.hide === true ? Constants.CLASSES.tabBarHide : '',
        ),
      ];

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
            );
          } else {
            html.push(
              Utils.sprintf(
                Constants.HTML.tabBarItem,
                tabBarItemClassMap[key],
                this.#options.tabBar[key].icon,
              ),
            );
          }
        });

      //加入工具栏的结尾
      html.push(Constants.HTML.tabBar[1]);

      //排序实现
      if (this.#options.tabBar.position === 'bottom') {
        html.unshift(Constants.HTML.tabBody);
      } else if (this.#options.tabBar.position === 'top') {
        html.push(Constants.HTML.tabBody);
      }

      html = html.join(''); //转换成字符串

      const { enable, breakpoint } = this.#options.responsive; //判断是否应该启用响应式功能
      if (
        this.#options.tabBar.hide === false &&
        enable === true &&
        this.#container.parentNode.getBoundingClientRect().width < breakpoint
      ) {
        html = Utils.setProperty(html, this.#hideItemSelector, 'display', 'none');
      }

      //插入到容器内部
      this.#container.insertAdjacentHTML('beforeEnd', html);

      //查找一些需要的dom
      this.#tabBarEl = this.#container.querySelector(
        `.${Constants.CLASSES.tabBar}`,
      );
      this.#tabBarItemScrollEl = this.#container.querySelector(
        `.${Constants.CLASSES.tabBar} li.scroll`,
      );
      this.#tabBodyEl = this.#container.querySelector(
        `.${Constants.CLASSES.tabBody}`,
      );
    }

    #initResizeObserver() {
      // resizeCenterActive

      let resizeCenterActiveDebounce;
      if (
        this.#options.tabBar.hide === false &&
        this.#options.tab.resizeCenterActive === true
      ) {
        resizeCenterActiveDebounce = Utils.debounce(() => {
          this.scrollToTabByUrl(this.#getTabUrl(this.getActiveTab()));
        }, 500);
      }

      //使用ResizeObserver来监听dom的大小变化
      const resizeObserver = new ResizeObserver((entries) => {
        // 处理大小变化的回调函数
        entries.forEach((entry) => {
          // entry.target 是发生大小变化的元素 entry.contentRect 包含元素的新大小信息

          if (!entry.target.firstResize) {
            //优化:第一次不执行
            entry.target.firstResize = true;
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
            );
          }

          if (
            this.#options.tabBar.hide === false &&
            this.#options.tab.contextmenu.enable === true
          ) {
            //关闭tab的右键菜单
            this.#closeContextmenu();
          }

          if (
            this.#options.tabBar.hide === false &&
            this.#options.tab.resizeCenterActive === true
          ) {
            resizeCenterActiveDebounce();
          }
        });
      });
      //监听pc
      resizeObserver.observe(this.#container.parentNode);
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
        };

        const html = [
          Utils.sprintf(
            Constants.HTML.listGroup[0],
            Constants.DATAKEYS.contextmenu,
            this.#options.id,
          ),
        ];

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
            const { text, separator } = this.#options.tab.contextmenu[key];

            html.push(
              Utils.sprintf(
                Constants.HTML.listGroupItem,
                listGroupItemClassMap[key],
                text,
              ) + (separator ? Constants.HTML.listGroupSeparatorItem : ''),
            );
          });

        html.push(Constants.HTML.listGroup[1]);
        let contextmenuHtml = html.join('');

        //插入到body中去
        document.body.insertAdjacentHTML('beforeEnd', contextmenuHtml);

        //查找右键菜单
        this.#contextmenuEl = document.querySelector(
          `[${Constants.DATAKEYS.contextmenu}="${this.#options.id}"]`,
        );
      }
    }

    #initDropdown() { }

    #initTabs() {
      if (this.#options.cache.enable === true) {
        const cacheTabs = this.#cacheHandle.get(this.#cacheKey); //获取缓存中的tab

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
          );
        } else {
          this.#cacheHandle.delete(this.#cacheKey);
          this.#restoreTabs(
            this.#options.defaultTabs,
            this.#options.defaultTabs?.slice(-1)[0]?.url,
            true,
          );
          this.#cacheHandle.set(
            this.#cacheDefaultTabsKey,
            this.#options.defaultTabs,
          );
        }
      } else {
        //删除缓存
        this.#cacheHandle.store('local').delete(this.#cacheKey);
        this.#cacheHandle.store('session').delete(this.#cacheKey);
        this.#cacheHandle.store('local').delete(this.#cacheDefaultTabsKey);
        this.#cacheHandle.store('session').delete(this.#cacheDefaultTabsKey);

        //直接恢复选项提供的默认tab
        this.#restoreTabs(
          this.#options.defaultTabs,
          this.#options.defaultTabs.slice(-1)[0]?.url,
        );
      }
    }

    //检测缓存中的tab的合法性
    #cacheTabsCheck(tabs) {
      //要检查的键数组
      let targetKeys = [
        ...Object.keys(Constants.TABDEFAULTS),
        Constants.CLASSES.tabActive,
      ];

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
        const extendTabs = [];
        tabArr.forEach((item) => {
          extendTabs.push(
            Utils.extend({}, Constants.TABDEFAULTS, item, {
              [Constants.CLASSES.tabActive]: false,
            }),
          );
        });
        tabArr = Utils.arrUnique(extendTabs, 'url'); //去重
      }

      //创建两个虚拟节点
      const tabFrag = document.createDocumentFragment();

      //这里只添加所有的tab，不添加iframe,否则全部加载iframe将会卡爆(重点优化)
      tabArr.forEach((tab) =>
        tabFrag.appendChild(Utils.createNode(this.#generateTabHtml(tab))),
      );

      //是否设置换成
      pushCache && this.#cacheHandle.set(this.#cacheKey, tabArr);

      //添加虚拟节点到tab的容器里面
      this.#tabBarItemScrollEl.appendChild(tabFrag);

      //激活最后一个
      this.activeTabByUrl(url);

      //滚动到激活tab所在位置
      this.scrollToTabByUrl(url, 'auto');
    }

    addTab(option) {
      //参数合并
      option = Utils.extend({}, Constants.TABDEFAULTS, option, {
        [Constants.CLASSES.tabActive]: false,
      });

      const url = option.url;

      if (!this.getTabByUrl(url)) {
        //如果这个tab不存在
        if (
          Number.isInteger(this.#options.tab.maxNum) &&
          this.#options.tab.maxNum > 0
        ) {
          //如果是大于0的整数才生效
          //获取所有的可删除的tab

          let tabs = this.getClosableTabs();

          if (this.#options.tab.maxNum === 1) {
            //如果只保留一个，那么就把所有的tab给删除掉,因为添加的当前tab将会作为最新的1个tab

            for (let tab of tabs) {
              this.#removeTabByUrl(this.#getTabUrl(tab));
            }
          } else {
            if (tabs.length >= this.#options.tab.maxNum) {
              //判断是否已经达到了最大的tab数量,把第一个给移除

              //得到需要排除的tab
              tabs.slice(0, -(this.#options.tab.maxNum - 1)).forEach((tab) => {
                this.#removeTabByUrl(this.#getTabUrl(tab));
              });
            }
          }
        }

        //如果没有该tab则添加这个tab
        this.#tabBarItemScrollEl.insertAdjacentHTML(
          'beforeEnd',
          this.#generateTabHtml(option),
        );

        //添加进缓存
        this.#addCacheTab(option);
      }

      //激活这个被添加的tab
      this.activeTabByUrl(url, true);

      //滚动到tab所在位置
      this.scrollToTabByUrl(url);
    }

    closeTabByUrl(url) {
      if (this.isTabActiveByUrl(url)) {
        //判断是否是激活的tab

        //下一个即将激活的tab
        let nextTab;
        let tab = this.getTabByUrl(url);
        if (tab?.nextElementSibling) {
          //如果后面有就激活后面的
          nextTab = tab.nextElementSibling;
        } else if (tab?.previousElementSibling) {
          nextTab = tab.previousElementSibling;
        }

        //删除tab
        this.#removeTabByUrl(url);

        //激活tab
        this.activeTabByUrl(this.#getTabUrl(nextTab));
      } else {
        this.#removeTabByUrl(url);
      }
    }

    //单纯的只做删除的工作
    #removeTabByUrl(url) {
      //删除tab
      this.getTabByUrl(url)?.remove();

      //删除面板
      this.#removeTabPaneByUrl(url);

      //删除缓存里的tab
      this.#removeCacheTabByUrl(url);
    }

    // 删除面板
    #removeTabPaneByUrl(url) {
      //先删除iframe
      this.#removeIFrameByUrl(url);
      //删除tab面板最外层的容器
      this.getTabPaneByUrl(url)?.remove();
    }

    //根据url删除缓存里的tab
    #removeCacheTabByUrl(url) {
      let tabs = this.#cacheHandle.get(this.#cacheKey);

      tabs.forEach((tab, index) => {
        if (tab.url === url) {
          tabs.splice(index, 1);
        }
      });
      this.#cacheHandle.set(this.#cacheKey, tabs);
    }

    activeTabByUrl(url, fromAddTabMethod = false) {
      //过滤掉不存在的tab,或者已经激活的tab
      if (!this.getTabByUrl(url) || this.isTabActiveByUrl(url)) {
        return
      }

      //把之前激活的tab的激活状态类给删掉
      this.getActiveTab()?.classList.remove(Constants.CLASSES.tabActive);

      //添加上激活的类
      this.getTabByUrl(url)?.classList.add(Constants.CLASSES.tabActive);

      //激活缓存中的tab
      this.#activeCacheTabByUrl(url);

      //判断tab面板是否已经存在,不存在则添加
      if (!this.getTabPaneByUrl(url)) {
        this.#addTabPaneByUrl(url);
      }

      //激活面板
      //把之前激活的面板给移除掉
      this.getActiveTabPane()?.classList.remove(Constants.CLASSES.tabPaneActive);
      //把当前的tab面板给添加激活类
      this.getTabPaneByUrl(url)?.classList.add(Constants.CLASSES.tabPaneActive);

      //激活逻辑完成调用激活事件
      if (fromAddTabMethod) {
        typeof this.#options.onTabAddActivated === 'function' &&
          this.#options.onTabAddActivated.call(this, this);
      } else {
        typeof this.#options.onTabActivated === 'function' &&
          this.#options.onTabActivated.call(this, this);
      }
    }

    //根据url来添加面板
    #addTabPaneByUrl(url) {
      //添加tab面板的容器li元素
      this.#tabBodyEl.insertAdjacentHTML(
        'beforeEnd',
        Utils.sprintf(Constants.HTML.tabBodyItem, url),
      );

      //加载层逻辑
      this.#addLoadingByUrl(url);

      //加载iframe
      this.#addIFrameByUrl(url);
    }

    //往tab容器里插入iframe
    #addIFrameByUrl(url) {
      //创建iframe
      const iframe = document.createElement('iframe');

      //超时逻辑
      this.#iFrameTimeoutHandle(url, iframe);

      iframe.src = url;

      iframe.onload = () => {
        //销毁定时器
        this.#clearIFrameTimeout(iframe);

        const canAccessIFrame = Utils.canAccessIFrame(iframe);

        //当右键菜单点击重新加载此框架的情况
        if (canAccessIFrame) {
          //如果不是跨域的iframe才给刷新,因为跨域的iframe访问contentWindow属性会报错
          // localStorage.setItem('ff',Math.random())
          iframe.contentWindow.onbeforeunload = () => {
            //遮罩
            this.#addLoadingByUrl(url);
            //清理掉iframe的状态
            delete iframe[Constants.DATAKEYS.iframeLoaded];
            //超时处理
            this.#iFrameTimeoutHandle(url, iframe);
          };
        }

        //设置iframe状态完毕
        iframe[Constants.DATAKEYS.iframeLoaded] = true;

        //判断是否有loading 有的话就执行过渡
        this.#getTabLoadingByUrl(url)?.style.setProperty('opacity', 0);

        typeof this.#options.onTabLoaded === 'function' &&
          this.#options.onTabLoaded.call(this, iframe, url, this);

        this.#tabFinallyAndAll();

        if (!canAccessIFrame) {
          //如果是跨域的iframe,所有的逻辑执行完毕后清空onload,因为跨域的iframe,被用户点击重新加载此框架时,无法控制它
          iframe.onload = null;
        }
      };

      //插入iframe
      this.getTabPaneByUrl(url)?.appendChild(iframe);
    }

    //iframe的超时处理逻辑
    #iFrameTimeoutHandle(url, iframeEl) {
      //超时设置
      const timeout =
        this.#options.tab.timeout.enable === true
          ? this.#options.tab.timeout.second
          : null;

      if (Number.isInteger(timeout) && timeout >= 0) {
        //可能默认就已经存在这个定时
        this.#clearIFrameTimeout(iframeEl);

        iframeEl[Constants.DATAKEYS.iframeTimeoutTimer] = setTimeout(() => {
          this.#removeIFrameByUrl(url); //直接移除iframe停止加载

          //如果超时的话，就应该立即移除这个loading层
          this.#getTabLoadingByUrl(url)?.remove();

          let timeoutHtml = '';
          if (Utils.isStr(this.#options.tab.timeout.template)) {
            //如果是字符串说明是有自己设计超时界面
            timeoutHtml = this.#options.tab.timeout.template;
          } else {
            timeoutHtml = Utils.sprintf(
              Constants.HTML.maskWrapper,
              Utils.sprintf(
                Constants.HTML.timeout,
                this.#options.tab.timeout.text,
              ),
            );
          }

          this.getTabPaneByUrl(url)?.insertAdjacentHTML('beforeEnd', timeoutHtml);

          typeof this.#options.onTabTimeout === 'function' &&
            this.#options.onTabTimeout.call(this, url, this);

          this.#tabFinallyAndAll();
        }, timeout);
      }
    }

    //刷新iframe
    #refreshIFrameByUrl(url) {
      //先找到iframe
      const iframe = this.#getIFrameByUrl(url);

      if (
        Utils.canAccessIFrame(iframe) &&
        iframe[Constants.DATAKEYS.iframeLoaded] === true
      ) {
        //iframe加载完毕时且非跨域的情况

        //超时逻辑
        this.#iFrameTimeoutHandle(url, iframe);
        //清理掉iframe的状态
        delete iframe[Constants.DATAKEYS.iframeLoaded];
        iframe.contentWindow.location.reload();
      } else {
        this.#removeIFrameByUrl(url);
        this.#addIFrameByUrl(url);
      }
    }

    // 移除tab面板里面的iframe
    #removeIFrameByUrl(url) {
      const iframe = this.#getIFrameByUrl(url);
      if (iframe) {
        this.#clearIFrameTimeout(iframe);
        iframe.onload = null;
        iframe.remove();
      }
    }

    #clearIFrameTimeout(iframeEl) {
      clearTimeout(iframeEl[Constants.DATAKEYS.iframeTimeoutTimer]);
    }

    #tabFinallyAndAll() {
      typeof this.#options.onTabFinally === 'function' &&
        this.#options.onTabFinally.call(this, this);

      // 判断所有的tab是否都完成
      const allCompleted = Array.from(this.#getIFrames()).every((iframe) => {
        return iframe[Constants.DATAKEYS.iframeLoaded] === true
      });

      if (allCompleted) {
        typeof this.#options.onTabAll === 'function' &&
          this.#options.onTabAll.call(this, this);
      }
    }

    // 生产tab的html字符串
    #generateTabHtml(option) {
      //是否启用
      const enable =
        this.#options.tab.closeBtn.enable === true && option.closable === true;

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
          this.#cacheHandle.push(this.#cacheKey, option);
        } else {
          this.#cacheHandle.set(this.#cacheKey, [option]);
        }
      }
    }

    #activeCacheTabByUrl(url) {
      if (this.#options.cache.enable === true) {
        let tabs = this.#cacheHandle.get(this.#cacheKey);

        tabs.forEach((item) => {
          item.active = item.url === url;
        });
        this.#cacheHandle.set(this.#cacheKey, tabs);
      }
    }

    scrollToTabByUrl(url, behavior = 'smooth') {
      const tab = this.getTabByUrl(url);

      //需要父元素设置postion(relative、absolute、fixed)
      // 获取到当前点击元素的 offsetLeft  - 包裹盒子 offsetWidth 的一半 + 当前点击元素 offsetWidth 的一半
      this.#tabBarItemScrollEl.scrollTo({
        left:
          tab.offsetLeft -
          this.#tabBarItemScrollEl.offsetWidth / 2 +
          tab.offsetWidth / 2,
        behavior,
      });
    }

    //tab被单击时的事件处理
    #tabClickHandle(url) {
      //tab被单击的回调
      typeof this.#options.onTabClick === 'function' &&
        this.#options.onTabClick.call(this, url, this);

      //激活
      this.activeTabByUrl(url);

      //滚动到tab所在位置
      if (this.#options.tab.clickCenterActive === true) {
        this.scrollToTabByUrl(url);
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
      this.clsoeLoadingByUrl(url);

      let enableLoading =
        typeof this.#options.tab.loading.enable === 'function'
          ? this.#options.tab.loading.enable.call(this, url, this)
          : this.#options.tab.loading.enable;

      if (enableLoading) {
        //判断用户是否开启遮罩层

        let loadingHtml = '';
        let loading = Constants.HTML.loading;
        if (Utils.isStr(this.#options.tab.loading.template)) {
          //判断用户是否自己传入字符串
          loading = this.#options.tab.loading.template;
        }
        loadingHtml = Utils.sprintf(Constants.HTML.maskWrapper, loading);

        //插入面板
        this.getTabPaneByUrl(url)?.insertAdjacentHTML('beforeEnd', loadingHtml);
      }
    }

    // 关闭loading层
    clsoeLoadingByUrl(url) {
      this.getTabPaneByUrl(url)
        ?.querySelector(`.${Constants.CLASSES.overlays}`)
        ?.remove();
    }

    getTabPaneByUrl(url) {
      return this.#tabBodyEl.querySelector(`[data-tab-url="${url}"]`)
    }

    //获取tab的左边的所有的tabs
    getTabPrevAllByUrl(url) {
      return jQuery(this.getTabByUrl(url)).prevAll().toArray()
    }

    //获取tab的右边的所有的tabs
    getTabNextAllByUrl(url) {
      return jQuery(this.getTabByUrl(url)).nextAll().toArray()
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
      });
    }

    //下滑动
    nextScroll() {
      this.#tabBarItemScrollEl.scrollTo({
        left:
          this.#tabBarItemScrollEl.scrollLeft +
          this.#tabBarItemScrollEl.offsetWidth,
        behavior: 'smooth',
      });
    }

    // 通过url刷新tab
    refreshTabByUrl(url) {
      //判断tab是否存在，不存在则不执行
      if (!(this.getTabByUrl(url) instanceof Element)) {
        return
      }

      if (!this.getTabPaneByUrl(url)) {
        this.#addTabPaneByUrl(url);
      } else {
        //首先必须尝试添加loading层
        this.#addLoadingByUrl(url);

        // 刷新逻辑
        !this.#getIFrameByUrl(url)
          ? this.#addIFrameByUrl(url)
          : this.#refreshIFrameByUrl(url);
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
      let index = 0;
      if (!el || !el.parentNode) {
        return -1
      }
      // previousElementSibling：上一个兄弟元素
      while (el && (el = el.previousElementSibling)) {
        index++;
      }
      return index
    }

    // 触发动画
    #animate(prevRect, target) {
      let ms = 300;
      {
        let currentRect = target.getBoundingClientRect();
        if (prevRect.nodeType === 1) {
          prevRect = prevRect.getBoundingClientRect();
        }

        target.style.setProperty('transition', 'none');
        target.style.setProperty(
          'transform',
          `translate3d(${prevRect.left - currentRect.left}px,${prevRect.top - currentRect.top
        }px,0)`,
        );

        target.offsetWidth; // 触发重绘

        target.style.setProperty('transition', `transform ${ms}ms`);
        target.style.setProperty('transform', 'translate3d(0,0,0)');

        // 时间到了之后把transition和transform清空
        clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          target.style.setProperty('transition', '');
          target.style.setProperty('transform', '');
          target.animated = false;
        }, ms);
      }
    }

    static get(selector) {
      return Quicktab.#instances[selector]
    }
  }

  Quicktab.VERSION = Constants.VERSION;
  Quicktab.DEFAULTS = Constants.DEFAULTS;
  Quicktab.LANGS = Constants.LANGS;

  /**
   * ------------------------------------------------------------------------
   * Data Api
   * ------------------------------------------------------------------------
   */
  Utils.ready(() => {
    const pluginElements = document.querySelectorAll(
      Constants.SELECTOR_DATA_TOGGLE,
    );

    pluginElements.forEach((element) => {
      new Quicktab(element);
    });
  });

  return Quicktab;

}));
//# sourceMappingURL=quicktab.js.map
