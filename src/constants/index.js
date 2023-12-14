const VERSION = '0.0.1'

// 默认选项
const DEFAULTS = {
  //dom选择器
  selector: false,
  //最小高度
  minHeight: undefined,
  //高度
  height: undefined,
  //宽
  width: undefined,
  //缓存
  cache: {
    //false:不启用 true:启用
    enable: true,
    //缓存类型  当cache:true时生效  可用值:"sessionStorage"  "localStorage"
    type: 'localStorage',
  },
  //初始tab
  tabs: [],
  //tab工具栏和内容区域反转
  reverse: false,
  //tab工具栏配置
  tabBarConfig: {
    //是否显示工具栏
    enable: true,

    prev: {
      enable: true,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-caret-left" viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                </svg>`,
      order: false,
    },

    refresh: {
      enable: true,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                    </svg>`,
      order: false,
    },

    scroll: {
      order: false,
    },

    next: {
      enable: true,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-caret-right" viewBox="0 0 16 16">
                        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                    </svg>`,
      order: false,
    },

    dropdown: {
      enable: true,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-caret-down" viewBox="0 0 16 16">
                        <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                    </svg>`,
      order: false,

      close: {
        enable: true,
        text: '关闭',
        order: false,
        separator: false,
      },

      closeActive: {
        enable: true,
        text: '关闭当前',
        order: false,
        separator: false,
      },
      closeOthers: {
        enable: true,
        text: '关闭其它',
        order: false,
        separator: false,
      },
      closePrev: {
        enable: true,
        text: '关闭左侧',
        order: false,
        separator: false,
      },
      closeNext: {
        enable: true,
        text: '关闭右侧',
        order: false,
        separator: false,
      },
      closeAll: {
        enable: true,
        text: '关闭所有',
        order: false,
        separator: false,
      },
      refresh: {
        enable: true,
        text: '重新加载',
        order: false,
        separator: false,
      },
      center: {
        enable: true,
        text: '回到当前',
        order: false,
        separator: false,
      },
      blank: {
        enable: true,
        text: '新窗口打开',
        order: false,
        separator: false,
      },
    },

    fullscreen: {
      enable: true,
      //图标
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-fullscreen" viewBox="0 0 16 16">
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                    </svg>`,
      //退出全屏的图标
      exitIcon: 'bi bi-fullscreen-exit',
      //全屏自定义函数
      fullscreen: null,
      //退出全屏自定义函数
      exitFullscreen: null,
      order: false,
    },
  },

  //tab配置
  tabConfig: {
    //右键菜单配置
    contextmenu: {
      enable: false,
      close: {
        enable: true,
        text: '关闭',
        order: false,
        separator: false,
      },
      closeActive: {
        enable: true,
        text: '关闭当前',
        order: false,
        separator: false,
      },
      closeOthers: {
        enable: true,
        text: '关闭其它',
        order: false,
        separator: false,
      },
      closePrev: {
        enable: true,
        text: '关闭左侧',
        order: false,
        separator: false,
      },
      closeNext: {
        enable: true,
        text: '关闭右侧',
        order: false,
        separator: false,
      },
      closeAll: {
        enable: true,
        text: '关闭所有',
        order: false,
        separator: false,
      },
      refresh: {
        enable: true,
        text: '重新加载',
        order: false,
        separator: false,
      },
      center: {
        enable: true,
        text: '回到当前',
        order: false,
        separator: false,
      },
      blank: {
        enable: true,
        text: '新窗口打开',
        order: false,
        separator: false,
      },
    },
    //鼠标滚轮切换tab   false:不启用 true:启用
    mouseWheelToggleTab: false,
    //最大数量 >=1 时生效, null:表示无限制
    maxNum: null,
    //关闭按钮
    closeBtn: {
      enable: true,
      icon: 'bi bi-x',
    },
    //当浏览器窗口大小改变时,当前激活的tab是否居中 false:不启用 true:启用
    windowResizeCenter: true,
    //tab单击时自动居中 false:不启用 true:启用
    clickCenter: false,
    //tab是否可以拖动排序  false:不启用 true:启用
    dragSort: false,
  },
  //tab被激活的事件,这里应该再细分两个事件
  onTabActivated: null,
  //通过tab的add方法添加时产生的tab激活事件
  onTabAddActivated: null,
  //tab加载完毕事件
  onTabLoaded: null,
  //tab遮罩层加载完毕的事件
  onTabMaskTransitionend: null,
  //tab被点击回调事件
  onTabClick: null,
  //实例化完毕回调
  onInit: null,
}

const CONSTANTS = {
  classes: {
    container: 'quicktab',
  },
  html: {
    //选项卡栏
    tabBar: ['<ul class="tab-bar">', '</ul>'],
    //左滚动
    tabBarPrevItem: '<li class="prev"><button>%s</button></li>',
    //刷新
    tabBarRefreshItem: '<li class="refresh"><button>%s</button></li>',
    // 滚动区域
    tabBarScrollItem: '<li class="scroll"></li>',

    //右滚动
    tabBarNextItem: '<li class="next"><button>%s</button></li>',
    //下拉菜单
    tabBarDropdownItem: '<li class="dropdown"><button>%s</button></li>',
    //全屏菜单
    tabBarFullscreenItem: '<li class="fullscreen"><button>%s</button></li>',

    //选项卡body部分
    tabBody: '<div class="tab-body"></div>',
    tabBodyItem: '<div class="tab-body-item">%s</div>',
    //遮罩层
    mask: `<div class="mask">
                    <div class="mask-inner">
                        <div class="quicktab-loaders">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>`,
    iframe: '<iframe src="%s"></iframe>',
  },
}

export default {
  VERSION,
  CONSTANTS,
  DEFAULTS,
}
