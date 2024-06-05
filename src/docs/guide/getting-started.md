# 入门



## CDN


```html
<link rel="stylesheet" href="https://unpkg.com/quicktab@latest/dist/css/quicktab.min.css"/>
<script src="https://unpkg.com/quicktab@latest/dist/js/quicktab.min.js"></script>
<!-- or -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quicktab@latest/dist/css/quicktab.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/quicktab@latest/dist/js/quicktab.min.js"></script>
```

::: tip
如果你想锁定到特定版本，你应该更换@latest到指定版本(例如@0.0.1),您可以在[unpkg](https://unpkg.com/quicktab@latest/dist/),[jsdelivr](https://cdn.jsdelivr.net/npm/quicktab@latest/dist/)找到可用模块的完整列表
:::


## 本地安装

::: code-group

```sh [npm]
$ npm add -D quicktab
```

```sh [pnpm]
$ pnpm add -D quicktab
```

```sh [yarn]
$ yarn add -D quicktab
```

```sh [bun]
$ bun add -D quicktab
```

:::

> npm add和npm install(npm i)等效、npm add是npm@7.0.0引入

## 使用

::: warning
由于该插件的特殊性,因此不管您使用那种方式初始化都必须在选项中提供`id`参数,
:::

### 使用 data attributes

```html
<div data-qt-toggle="quicktab" data-qt-id="qtab"></div>
```

### 使用 JavaScript




```html

<div class="myElement"></div>

<script>
    //选择器或者dom都可以
    new Quicktab(选择器|element, {
        id:'qtab',
        //...
    });
    

    //例子
    new Quicktab(document.querySelector('.myElement'), {
        id:'qtab',//唯一标志:必填项,重要参数,后期很多操作都是和这个有关联
    });
    new Quicktab('.myElement', {
        id:'qtab'
    });
</script>
```





## 下一步

接下来,查看具体用法和功能请导航至 [例子](/examples).
