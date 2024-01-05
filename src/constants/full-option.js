// 该配置项目是全部启用的列表
export default {
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
}
