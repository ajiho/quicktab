# 事件

Quicktab的事件API

事件的绑定有多种方式

- 通过初始化选项对象
- 通过DOM的事件处理
- 通过data属性
- 通过实例的`on`方法


通过初始化选项绑定

```js
const qtab = new Quicktab(el, {
    onEventName: function (arg1, arg2, ...) {
        //....
    }
})

```

通过DOM的事件处理

```html

<div class="qtab"></div>

<script>
    //事件监听
    document.querySelector('.qtab').addEventListener('event-name', function (event) {
        console.log(event.detail[0]);//当前quicktab对象
        console.log(event.detail[1]);//arg1
        console.log(event.detail[2]);//arg2
    })

    new Quicktab('.qtab',{
        //...
    })

</script>

```

通过data属性来绑定事件

```html
<div data-qt-toggle="quicktab" data-qt-id="qtab" data-qt-onInit="init" data-qt-onTabLoaded="tabLoad"></div>
<script>

    function tabLoad(arg1,arg2,...) {
        //this:当前quicktab对象
    }

    // init事件
    function init() {
      
    }

</script>
```

通过实例的`on`方法

```js
const qtab = new Quicktab(el, {
    //...
})

qtab.on('event-name',function(evt){
        console.log(evt[0]);//当前quicktab对象
        console.log(evt[1]);//arg1
        console.log(evt[2]);//arg2
})
```

::: tip
如果您使用DOM事件处理程序，请确保在执行事件之前绑定事件监听器,on方式监听事件由于它是必须在实例化之后才能监听,因此部分事件通过on方法是无法监听的,下面会说明哪些方法使用on的方式无法监听。
:::





## onTabActivated

- **DOM/on Event:** `tab-activated`

- **参数:** `url`

- **详情:**

  当Tab被激活时触发,该事件不支持on方式绑定,参数包含:

  * `url`: 当前Tab的url




## onTabLoaded

- **DOM/on Event:** `tab-loaded`

- **参数:** `url`

- **详情:**

  当Tab加载完毕时触发:

  * `url`: 当前Tab的url




## onTabTimeout



- **DOM/on Event:** `tab-timeout`

- **参数:** `url`

- **详情:**

  当Tab加载超时时触发(需要启用超时功能),参数包含:

  * `url`: 当前Tab的url


## onTabFinally


- **DOM/on Event:** `tab-finally`

- **参数:** `url`

- **详情:**

  Tab加载完毕或超时都会触发,参数包含:

  * `url`: 当前Tab的url




## onTabAll


- **DOM/on Event:** `tab-all`

- **参数:** `undefined`

- **详情:**

  页面上所有的Tab都完成时(它会等待所有的Tab都进入Finally阶段后触发)触发







## onTabLoadingTransitionend



- **DOM/on Event:** `tab-loading-transitionend`

- **参数:** `url`

- **详情:**

  Tab加载层过渡完毕时触发(需要启用loading加载层效果),参数包含:

  * `url`: 当前Tab的url





## onTabClick

- **DOM/on Event:** `tab-click`

- **参数:** `url`

- **详情:**

  Tab被点击时触发,参数包含:

  * `url`: 当前Tab的url



## onTabDoubleClick


- **DOM/on Event:** `tab-double-click`

- **参数:** `url`

- **详情:**

  Tab被双击时触发(需要启用Tab双击功能),参数包含:

  * `url`: 当前Tab的url



## onTabClose


- **DOM/on Event:** `tab-close`

- **参数:** `url`

- **详情:**

  Tab关闭时触发,参数包含:

  * `url`: 当前Tab的url



## onTabCloseAll


- **DOM/on Event:** `tab-close`

- **参数:** `undefined`

- **详情:**

  所有的可被关闭Tab都被关闭的时候触发



## onInit

- **DOM/on Event:** `init`

- **参数:** `undefined`

- **详情:**

  `Quicktab`初始化完毕回调



## 事件触发顺序总览

<ShowCase text="Run"  src="demo/events.html"/>
