# 在子页面内打开一个新的Tab

## 父模板

我们主要记住在父模板中实例化`Quicktab`时的`id`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../dist/css/quicktab.css">
    <style>
        .container {
            display: flex;
            align-items: center;
        }
    </style>
</head>

<body>

    <div class="container">
        <div id="qtab2"></div>
        <div id="qtab3"></div>
    </div>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        const qtab2 = new Quicktab('qtab2', {
            defaultTabs: [
                { url: 'welcome.html', title: '首页' },
                { url: 'child.html?random=1', title: '我是#qtab2' },
            ]
        })

        const qtab3 = new Quicktab('qtab3', {
            defaultTabs: [
                { url: 'welcome.html', title: '首页' },
                { url: 'child.html?random=1', title: '我是#qtab3' },
            ]
        })
    </script>
</body>

</html>
```

## 子模板中

在子模板中添加tab实际上和[添加tab](./tab-add)示例原理是一样的,只不过在子页面中需要先找到`Quicktab`的实例,然后再调用`addTab()`方法即可,不过在子页面中针对data属性方式添加进行了优化,你只需要通过属性`data-qt-parent-target="#qtab2"`快速指定实例即可添加




```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <button data-qt-tab-url='welcome.html?page=child' data-qt-tab-title='添加用户信息'
        data-qt-parent-target="#qtab2">给#qtab2添加Tab</button>
    <button data-qt-tab-url='welcome.html?page=child' data-qt-tab-title='添加用户信息'
        data-qt-parent-target="#qtab3">给#qtab3添加Tab</button>
</body>

</html>
```


## 运行示例

<ShowCase text="Run"  src="demo/add-tab-in-childPage.html"/>

