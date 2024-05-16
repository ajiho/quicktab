# 方法

目前只提供以下API,且api的命名基本上都是见名知义,且大多都在例子中有使用过。


如果无法满足您的需求，您需要一些特别的api,可以直接提[issues](https://gitee.com/ajiho/quicktab/issues),一起讨论。



## 静态方法



### get(id)

可以根据id得到`Quicktab`的实例

```html
<!-- 直接通过data属性初始化的 -->
<div id="qtab4" data-qt-toggle="quicktab"></div>

<!-- 下面通过js初始化 -->
<div id="qtab3"></div>
<script>
    const qtab3 = new Quicktab('qtab3',{})
    console.log(qtab3 === Quicktab.get('qtab3')) //true
    

    const qtab4 = Quicktab.get('qtab4')
</script>
```


## 实例方法

### addTab(option)



这是最核心的方法,添加Tab,参数是一个[单tab对象](options.html#单tab默认选项)其中只有url是必填的，其它都走默认值


```js
const qtab = new Quicktab('qtab')
qtab.addTab({
    url:'xxx',
    title:'xxx'
})
```



### closeTabByUrl(url)

根据url来关闭tab

### activeTabByUrl(url)

根据url来激活tab

### scrollToTabByUrl(url)

滚动到指定url对应的tab的位置

### prevScroll()

向左滚动一个tab容器可视单位

### nextScroll()

向右滚动一个tab容器可视单位

### refreshTabByUrl()
根据url来刷新tab
### fullscreenTabByUrl()
根据url全屏显示tab
### refreshActiveTab()
刷新当前激活的tab
### fullscreenActiveTab()
当前激活的tab全屏显示
### scrollToActiveTab()
滚动到当前激活的tab所在位置
### openNewTabByUrl()
在浏览器新选项卡打开指定url的tab
### closeAllTabsExceptByUrl()
关闭所有的除了指定url的选项卡
### closePrevAllTabsByUrl()
关闭除了指定url的tab前面所有的选项卡
### closeNextAllTabsByUrl()
关闭除了指定url的tab后面所有的选项卡
### getTabWindowByUrl()
获取指定url的tab的contentWindow对象

