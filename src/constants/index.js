const TAB_ID_KEY = 'data-tab-id';
const TAB_URL_KEY = 'data-tab-url';
//命名空间
const TAB_NAMESPACE = 'quicktab';
// tab激活的类名
const TAB_ACTIVE_CLASS_NAME = 'active';
// tab滚动区域的类名
const TAB_SCROLL_AREA_CLASS_NAME = 'scroll_area';
// tab全屏类
const TAB_FULLSCREEN_CLASS_NAME = 'qt-fullscreen';
// tab隐藏类
const TAB_PANE_HIDE_CLASS_NAME = 'outing';
// tab关闭图标挂载类名
const TAB_CLOSE_BTN_ICON_CLASS_NAME = 'qt-close';

// 用于更多下拉菜单展开时给容器挂载的阻止鼠标事件的类
const TAB_MORE_ACTION_DROPDOWNS_POINTER_EVENTS_CLASS_NAME = 'more-menu-pen';
// 全屏触发class
const TAB_FULLSCREEN_TRIGGER_CLASS_NAME = 'fullscreen';
//刷新触发class
const TAB_REFRESH_TRIGGER_CLASS_NAME = 'refresh-toolbar-btn';
// 顶部菜单左滚动
const TAB_TOOLBAR_MOVE_LEFT_BTN_CLASS_NAME = 'move-left-btn';
//顶部菜单 右滚动 按钮
const TAB_TOOLBAR_MOVE_RIGHT_BTN_CLASS_NAME = 'move-right-btn';
// 顶部下拉菜单回到当前按钮
const TAB_TOOLBAR_DROPDOWN_ROLLBACK_CURRENT_CLASS_NAME = 'dropdown-rollback-current-btn';
// 顶部下拉菜单刷新当前按钮
const TAB_TOOLBAR_DROPDOWN_REFRESH_CURRENT_CLASS_NAME = 'dropdown-refresh-current-btn';
// 顶部下拉菜单关闭当前按钮
const TAB_TOOLBAR_DROPDOWN_CLOSE_CURRENT_CLASS_NAME = 'dropdown-close-current-btn';
// 顶部下拉菜单关闭当前按钮
const TAB_TOOLBAR_DROPDOWN_CLOSE_OTHER_CLASS_NAME = 'dropdown-close-other-btn';
// 顶部下拉菜单关闭全部按钮
const TAB_TOOLBAR_DROPDOWN_CLOSE_ALL_CLASS_NAME = 'dropdown-close-all-btn';

//右键菜单容器类
const TAB_CONTEXTMENU_CONTAINER_CLASS_NAME = `${TAB_NAMESPACE}-contextmenu`;

// 用于tab右键菜单时给容器挂载的阻止鼠标事件的类
const TAB_CONTEXTMENU_POINTER_EVENTS_CLASS_NAME = 'pen';
// 右键菜单刷新的类名
const TAB_CONTEXTMENU_REFRESH_CLASS_NAME = 'contextmenu-refresh-btn';
// 右键菜单关闭的类名
const TAB_CONTEXTMENU_CLOSE_CLASS_NAME = 'contextmenu-close-btn';
// 右键菜单关闭其它的类名
const TAB_CONTEXTMENU_CLOSE_OTHER_CLASS_NAME = 'contextmenu-close-other-btn';
// 固定宽度nav-link
const TAB_FIXED_WIDTH_NAV_LINK_CLASS_NAME = 'iconbtn';
// tab鼠标移入才展示关闭按钮类名
const TAB_SHOWONHOVER_CLASS_NAME = 'showOnHover';


const DEFAULTS = {
    //dom选择器
    selector: false,
    //最小高度
    minHeight: undefined,
    //高度
    height:undefined,
    //宽
    width:undefined,
    //缓存  false:不缓存  "sessionStorage"  "localStorage"
    cache: false,
    //初始tab
    tabs: [],
    //工具栏配置项
    toolbar: {
        //是否显示工具栏
        show: true,
        //向左滚动
        leftScroll: {
            enable: true,
            icon: 'bi bi-caret-left',
        },
        //刷新按钮
        refresh: {
            enable: false,
            icon: 'bi bi-arrow-clockwise',
        },
        //向右边滚动
        rightScroll: {
            enable: true,
            icon: 'bi bi-caret-right',
        },
        //全屏功能配置
        fullscreen: {
            //是否开启全屏, true:开启全屏 false:关闭该功能
            enable: false,
            //图标
            icon: 'bi bi-arrows-fullscreen',
            //退出全屏的图标
            exitIcon: 'bi bi-fullscreen-exit',
            //全屏自定义函数
            fullscreen: null,
            //退出全屏自定义函数
            exitFullscreen: null,
        },
        //是否启用更多操作下拉菜单
        moreDropdowns: {
            enable: true,
            icon: 'bi bi-caret-down',
            items: {
                //回到当前
                rollback: {
                    enable: true,
                    text: '回到当前'
                },
                reload: {
                    enable: true,
                    text: '刷新当前'
                },
                close: {
                    enable: true,
                    text: '关闭当前'
                },
                closeOthers: {
                    enable: true,
                    text: '关闭其它'
                },
                closeAll: {
                    enable: true,
                    text: '关闭所有'
                }
            }
        },
    },
    //tab配置
    tabConfig: {
        //右键菜单是否开启
        contextmenu: {
            enable: false,
            items: {
                reload: {
                    enable: true,
                    text: '刷新'
                },
                close: {
                    enable: true,
                    text: '关闭'
                },
                closeOthers: {
                    enable: true,
                    text: '关闭其它'
                }
            }
        },
        //true: 鼠标滚动切换tab  false:关闭该功能
        mouseWheelToggleTab: false,
        //最大数量 >=1 时生效, null:表示无限制, 注意：提供的初始化tabs中有close:false的tab除外
        maxNum: null,
        //关闭按钮
        closeBtn: {
            enable: true,
            icon: 'bi bi-x',
            showOnHover: true,
        },
        //当浏览器窗口大小改变时是否自动回到当前激活的tab的所在位置(居中)
        windowResizeRollback: true,
        //tab单击时滚动到当前所在位置(自动居中)  false:不启用 true:启用
        clickRollback: false,
        //可拖动排序 false:不启用 true:启用
        dragSort: false,
    },
    //tab被激活的事件
    onTabActivated: null,
    //tab加载完毕事件
    onTabLoaded: null,
    //tab遮罩层加载完毕的事件
    onTabMaskTransitionend: null,
    //实例化完毕回调
    onInit: null,
    //tab被点击回调事件
    onTabClick: null
}

const CONSTANTS = {
    classes: {},
    html: {}
}

export default {
    CONSTANTS,
    DEFAULTS
}
