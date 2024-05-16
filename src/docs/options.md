# 选项

## Quicktab插件默认全部选项

```js
const DEFAULT = {
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

  // 响应式设置(是针对的父容器)
  responsive: {
    enable: true,
    // 断点视口
    breakpoint: 576,
    // 小设备时想要隐藏的工具栏上的按钮 值是prev、refresh、next、fullscreen、dropdown
    hide: ['prev', 'refresh', 'next', 'fullscreen'],
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
      enable: true,
      icon: Icons.caretLeft,
      order: 10,
    },

    // 刷新
    refresh: {
      enable: false,
      icon: Icons.arrowClockwise,
      order: 20,
    },

    // tab包裹区域
    tabWrapper: {
      order: 30,
    },

    // 右滚动
    next: {
      enable: true,
      icon: Icons.caretRight,
      order: 40,
    },

    // 搜索tab、打开的标签、最近关闭的标签
    dropdown: {
      enable: false,
      icon: Icons.caretDown,
      order: 50,
      // 搜索框部分的配置
      searchInput: {
        placeholder: '',
        prefixIcon: Icons.search,
      },
      //打开tab部分的配置
      openedTabs: {
        text: '',
        //每个tab条目右边的关闭按钮图标
        closeIcon: Icons.x,
      },
      // 最近关闭的tab部分的配置
      recentlyClosedTabs: {
        text: '',
        showIcon: Icons.caretDownFill,
        hideIcon: Icons.caretUpFill,
      },
      //每个tab条目时间格式化
      timeFormat: {
        year: '',
        months: '',
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
      },
      //没有搜索结果时的提示文本
      emptyText: '',
    },

    // 全屏
    fullscreen: {
      enable: false,
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
      enable: false,

      // 关闭当前
      close: {
        enable: true,
        text: '',
        order: 10,
        separator: false,
      },
      // 关闭其它
      closeOthers: {
        enable: true,
        text: '',
        order: 20,
        separator: false,
      },
      // 关闭左侧
      closePrev: {
        enable: true,
        text: '',
        order: 30,
        separator: false,
      },

      // 关闭右侧
      closeNext: {
        enable: true,
        text: '',
        order: 40,
        separator: false,
      },

      // 关闭全部
      closeAll: {
        enable: true,
        text: '',
        order: 50,
        separator: false,
      },

      // 全屏显示
      fullscreen: {
        enable: true,
        text: '',
        order: 60,
        separator: true,
      },

      // 重新加载
      refresh: {
        enable: true,
        text: '',
        order: 70,
        separator: false,
      },

      // 激活居中
      centerActive: {
        enable: true,
        text: '',
        order: 80,
        separator: false,
      },

      // 新选项卡打开
      newBlank: {
        enable: true,
        text: '',
        order: 90,
        separator: false,
      },
    },

    //鼠标滚轮切换tab
    mouseWheelSwitch: {
      enable: false,
      // 只是滚动tab的包裹区域 true:启用 false:不启用
      onlyScroll: false,
    },
    //最大数量  -1:表示无限制
    maxNum: -1,
    //关闭按钮
    closeBtn: {
      enable: true,
      //关闭按钮是否鼠标移入时才显示 true:启用 false:始终显示
      showOnHover: false,
      icon: Icons.x,
    },
    //当插件宽高改变时,当前激活的tab是否居中 false:不启用 true:启用
    resizeCenterActive: false,
    //tab单击时自动居中 false:不启用 true:启用
    clickCenterActive: false,

    //双击功能
    doubleClick: {
      enable: false,
      //默认tab双击是刷新功能,您也可以关闭刷新,在onTabDoubleClick事件中执行自己的逻辑
      refresh: true
    },

    //tab是否可以拖动排序  false:不启用 true:启用
    dragSort: false,
    //超时设置
    timeout: {
      enable: true,
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
    //tab加载层效果
    loading: {
      enable: true,
      //过滤器,可以对于一些特定的tab不启用loading
      filter(url) {
        return true
      },
      //自定义加载模板
      template: '',
    },
  },
  //tab被激活的事件(这里是比如关闭tab时，会自动激活别的tab时的事件回调)
  onTabActivated(url) {
    return false
  },
  //通过tab的add方法添加时产生的tab激活事件(比如左侧菜单需要通过添加tab的方法产生的激活事件)
  onTabAddActivated(url) {
    return false
  },
  //tab加载完毕事件
  onTabLoaded(url) {
    return false
  },
  //tab加载超时事件
  onTabTimeout(url) {
    return false
  },
  //tab加载完毕或超时都会触发的事件
  onTabFinally(url) {
    return false
  },
  //页面上所有的tab都完成事件(假如此时网速较慢,当前面一个tab还没有到Finally阶段的时候又重新开了一个tab，它会等待所有的tab都加载完毕或者超时后触发)
  onTabAll() {
    return false
  },
  //tab加载层过渡完毕的事件,该事件需要tab配置项loading被启用才会执行回调。
  onTabLoadingTransitionend(url) {
    return false
  },
  //tab被点击回调事件
  onTabClick(url) {
    return false
  },
  //tab被双击回调事件
  onTabDoubleClick(url) {
    return false
  },
  //tab被关闭的事件
  onTabClose(url) {
    return false
  },
  //实例化完毕回调
  onInit() {
    return false
  },
}
```


## 单Tab默认选项

```js
const tabDefault = {
  //标题
  title: '新标签页',
  // 地址
  url: '',
  //可否关闭
  closable: true
}
```