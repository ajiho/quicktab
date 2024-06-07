# 方法

目前只提供以下API,且api的命名基本上都是见名知义,且大多都在例子中有使用过。


如果无法满足您的需求，您需要一些特别的api,可以直接提[issues](https://gitee.com/ajiho/quicktab/issues),一起讨论。



## 静态方法



### get

- **参数:** `id`


- **详情:**

  可以根据初始化时的id快速得到`Quicktab`的实例

- **示例:** 

```html
<div class="my-tab"></div>


<script>

    const qtab = new Quicktab('.my-tab',{
        id:'qtab1'//唯一标志
    })

    console.log(qtab === Quicktab.get('qtab1')) //true
    
</script>
```


## 实例方法

### addTab

- **参数:** `option`


- **详情:**


这是最核心的方法,添加Tab,参数是一个[单tab对象](options.html#单tab默认选项)其中只有url是必填的，其它都走默认值

- **示例:** 

[添加Tab](/examples.html#添加tab)

```js
const qtab = new Quicktab('#qtab')
qtab.addTab({
    url:'/user/add',
    title:'添加用户'
})
```


### closeActiveTab()

- **参数:** `undefined`

- **返回:** `Quicktab`

- **详情:**

  关闭当前激活的Tab,这个api特别有用,使用的频率还算比较频繁

### closeTabByUrl


- **参数:** `url`


- **详情:**

  根据url来关闭Tab

### activeTabByUrl

- **参数:** 
    - `url`
    - `scrollToTab - 一个boolean值,是否滚动到Tab所在位置`
    默认: `false`

- **详情:**

  根据url来激活Tab



### scrollToTabByUrl

- **参数:** `url`


- **详情:**

  滚动到指定url对应的Tab的位置



### prevScroll

- **参数:** `undefined`


- **详情:**

  向左滚动一个Tab容器可视单位



### nextScroll

- **参数:** `undefined`


- **详情:**

  向右滚动一个Tab容器可视单位



### refreshTabByUrl

- **参数:** `url`


- **详情:**

  根据url来刷新Tab


### fullscreenTabByUrl

- **参数:** `url`


- **详情:**

  根据url全屏显示Tab


### refreshActiveTab

- **参数:** `undefined`


- **详情:**

  刷新当前激活的Tab


### fullscreenActiveTab

- **参数:** `undefined`


- **详情:**

  全屏显示当前激活的Tab


### scrollToActiveTab

- **参数:** `undefined`


- **详情:**

  滚动到当前激活的Tab所在位置


### openNewTabByUrl

- **参数:** `url`


- **详情:**

  在浏览器新选项卡打开指定url的Tab


### closeAllTabsExceptByUrl

- **参数:** `url`


- **详情:**

  关闭所有的除了指定url的Tab


### closePrevAllTabsByUrl

- **参数:** `url`


- **详情:**

  关闭除了指定url的Tab前面所有的选项卡


### closeNextAllTabsByUrl

- **参数:** `url`


- **详情:**

  关闭除了指定url的Tab后面所有的选项卡


### getTabWindowByUrl

- **参数:** `url`

- **详情:**

  获取指定url的Tab的contentWindow对象



