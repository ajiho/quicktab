import Icons from './icons'

// 该配置项目是全部启用的列表
export default {
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
    // 小设备时隐藏的工具栏上的项目
    hideToolbarItem: ['prev', 'refresh', 'next', 'fullscreen'],
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
      icon: Icons.caretLeft,
      order: 10,
    },

    // 刷新
    refresh: {
      icon: Icons.arrowClockwise,
      order: 20,
    },

    // tab包裹区域
    tabWrapper: {
      order: 30,
    },

    // 右滚动
    next: {
      icon: Icons.caretRight,
      order: 40,
    },

    // 搜索tab、打开的标签、最近关闭的标签
    dropdown: {
      icon: Icons.caretDown,
      order: 50,
      searchInput: {
        placeholder: '',
        prefixIcon: Icons.search
      },
      openedTabs: {
        text: '',
        itemIcon: Icons.x
      },
      recentlyClosedTabs: {
        text: '',
        showIcon: Icons.caretDownFill,
        hideIcon: Icons.caretUpFill,
      },
      timeFormat: {
        year: '',
        months: '',
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
      },
      //没有搜索结果时的提示文本
      searchNoResultsText: ''
    },

    // 全屏
    fullscreen: {
      //图标
      icon: Icons.fullscreen,
      //排序
      order: 60,
    },
  },

  //tab配置
  tab: {
    //记忆(刷新tab不丢失)
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
    //最大数量  -1:表示无限制
    maxNum: -1,
    //关闭按钮  false:表示禁用该功能
    closeBtn: {
      //关闭按钮是否鼠标移入时才显示 true:启用 false:一直显示
      showOnHover: false,
      icon: Icons.x,
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
      template: '',
    },
    //tab加载时的模板 false:表示禁用该功能
    loading: {
      //过滤器 func 可以对于一些特定的tab不启用loading
      filter(url) {
        return true
      },
      //自定义加载模板
      template: '',
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
