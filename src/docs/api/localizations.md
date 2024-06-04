# 本地化

Quicktab的本地化API

可以导入所需要的语言,点击查看可用的[语言列表](https://github.com/ajiho/quicktab/tree/master/src/js/langs)

```html
<script src="dist/js/langs/en_US.js"></script>
<script src="dist/js/langs/ru_RU.js"></script>
```

然后您可以使用JavaScript切换语言

```js
Object.assign(Quicktab.DEFAULTS, Quicktab.LANGS['en-US'])
//Object.assign(Quicktab.DEFAULTS, Quicktab.LANGS['ru_RU'])
```

或者使用data属性设置语言

```html
<div data-qt-toggle="quicktab" data-qt-id="qtab" data-qt-langs="en-US"></div>
```

或者初始化时通过langs选项

```js
new Quicktab('#qtab', {
    lang: 'en-US',
    //...
})

```
也可以使用短代码
```js
new Quicktab('#qtab', {
    lang: 'en',
    //...
})
```

您也可以自定义本地化,调用语法如下

```js
new Quicktab('#qtab', {
    formatTimeoutMessage:function () {
       return '请求超时'
    }
    //...
})
```

## formatTimeoutMessage

- **Parameter:** `undefined`

- **默认:** `'请求超时'`


## formatContextmenuClose

- **Parameter:** `undefined`

- **默认:** `'关闭当前'`


## formatContextmenuCloseOthers

- **Parameter:** `undefined`

- **默认:** `'关闭其它'`


## formatContextmenuClosePrev

- **Parameter:** `undefined`

- **默认:** `'关闭左侧'`

## formatContextmenuCloseNext

- **Parameter:** `undefined`

- **默认:** `'关闭右侧'`

## formatContextmenuCloseAll

- **Parameter:** `undefined`

- **默认:** `'关闭所有'`

## formatContextmenuFullscreen

- **Parameter:** `undefined`

- **默认:** `'全屏显示'`


## formatContextmenuRefresh

- **Parameter:** `undefined`

- **默认:** `'重新加载'`

## formatContextmenuCenterActive

- **Parameter:** `undefined`

- **默认:** `'回到当前'`

## formatContextmenuNewBlank

- **Parameter:** `undefined`

- **默认:** `'新窗口打开'`

## formatSearchInputPlaceholder

- **Parameter:** `undefined`

- **默认:** `'搜索标签页'`


## formatOpenedTabs

- **Parameter:** `undefined`

- **默认:** `'打开的标签页'`

## formatRecentlyClosedTabs

- **Parameter:** `undefined`

- **默认:** `'最近关闭的标签页'`


## formatSearchNoResults

- **Parameter:** `undefined`

- **默认:** `'找不到任何结果'`

## formatTimeYear

- **Parameter:** `undefined`

- **默认:** `'年前'`

## formatTimeMonths

- **Parameter:** `undefined`

- **默认:** `'个月前'`

## formatTimeDays

- **Parameter:** `undefined`

- **默认:** `'天前'`

## formatTimeHours

- **Parameter:** `undefined`

- **默认:** `'小时前'`

## formatTimeMinutes

- **Parameter:** `undefined`

- **默认:** `'分钟前'`

## formatTimeSeconds

- **Parameter:** `undefined`

- **默认:** `'秒前'`