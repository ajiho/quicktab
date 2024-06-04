---
layout: doc
---



# 例子

这里包含一些基本的示例以及一些常用场景的示例

## 入门实例

只需要提供一个空的div(可以是任意元素)和一个id即可快速得到一个选项卡插件


<ShowCase text="Run"  src="demo/base.html"/>

## 通过data属性初始化

Quicktab所有选项都支持data属性绑定，如果选项是数组使用json字符串表示,如果是函数则绑定全局函数字符串,如果是对象则使用`-`连接
,示例中只提供了部分参数,具体需要选项可以查阅[选项](/options).

<ShowCase text="Run"  src="demo/attribute.html"/>


## 设置默认页面

默认页面可以一次性初始化多个，但是只会激活最后一项,其它的Tab则是惰性的,这样可以避免页面一次性多个IFrame加载导致浏览器卡顿,
很多时候后台是需要加载一个默认首页的，这很有用。

<ShowCase text="Run" title="默认首页" src="demo/default-page.html"/>


## 尺寸设置

可以方便的设置尺寸，让高度占满父容器

<ShowCase text="Run"  src="demo/height.html"/>


## 同一个页面可存在多个实例

同一个页面中多个`Quicktab`实例之间不会产生任何冲突

<ShowCase text="Run"  src="demo/multiple-instances.html"/>

## 启用工具栏的刷新和全屏按钮

<ShowCase text="Run"  src="demo/toolbar-refresh-fullscreen.html"/>

## 启用工具栏的下拉菜单

<ShowCase text="Run"  src="demo/toolbar-dropdown.html"/>

## 工具栏的位置和显隐设置

<ShowCase text="Run"  src="demo/toolbar-position-hide.html"/>


## 工具栏按钮自定义排序

<ShowCase text="Run"  src="demo/toolbar-sort.html"/>


## 响应式配置

<ShowCase text="Run"  src="demo/responsive.html"/>


## Tab可以缓存

<ShowCase text="Run"  src="demo/tab-remember.html"/>

## 启用Tab的右键菜单功能

<ShowCase text="Run"  src="demo/tab-contextmenu.html"/>

## 本土化设置

<ShowCase text="Run"  src="demo/localization.html"/>

## 自定义右键菜单

<ShowCase text="Run"  src="demo/tab-contextmenu-custom.html"/>

## 添加Tab

可以通过实例方法`addTab()`以及`data属性`方式添加

其中`data属性`方式必须要同时存在以下属性才会生效
- data-qt-target:值为`#`开头加实例化时提供的`id`
- data-qt-tab-url:tab的url是必填的

下面的选项是可选的

- data-qt-tab-closable:true
- data-qt-tab-title:"添加用户"

<ShowCase text="Run"  src="demo/tab-add.html"/>

## 控制Tab的最大数量

<ShowCase text="Run"  src="demo/tab-maxNum.html"/>


## 启用Tab拖动排序

<ShowCase text="Run"  src="demo/tab-dragSort.html"/>

## Tab可通过鼠标滚轮切换

<ShowCase text="Run"  src="demo/tab-mouseWheelSwitch.html"/>

## Tab点击自动居中

<ShowCase text="Run"  src="demo/tab-click-centerActive.html"/>

## Tab双击刷新

<ShowCase text="Run"  src="demo/tab-dbclick.html"/>

## Tab的loading层

<ShowCase text="Run"  src="demo/tab-loading.html"/>

## 自定义loading层

<ShowCase text="Run"  src="demo/tab-loading-templatet.html"/>

## Tab超时

<ShowCase text="Run"  src="demo/tab-timeout.html"/>


## 在子页面内打开一个新的Tab

<ShowCase text="Run"  src="demo/add-tab-in-childPage.html"/>

## 自定义图标

<ShowCase text="Run"  src="demo/icon-custom.html"/>

## 超长标题支持

<ShowCase text="Run"  src="demo/tab-longTitle.html"/>

## 实现单Tab(IFrame)实现

<ShowCase text="Run"  src="demo/single-iframe.html"/>


## 在bootstrap栅格系统上工作良好

<ShowCase text="Run"  src="demo/work-in-grid-system-of-bootstrap.html"/>




