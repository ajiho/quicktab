可以通过实例方法`addTab()`以及`data属性`方式添加

其中`data属性`方式必须要同时存在以下属性才会生效
- data-qt-target:值为`#`开头加实例化时提供的`id`
- data-qt-tab-url:tab的url是必填的

下面的选项是可选的

- data-qt-tab-closable:true
- data-qt-tab-title:"添加用户"


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../dist/css/quicktab.css">
</head>

<body>
    <p>
        <button id="btn">通过实例方法addTab()添加tab</button>

        <button data-qt-tab-url='welcome.html?page=dataPage2222' data-qt-tab-title='欢迎页面' data-qt-tab-closable='true'
            data-qt-target="#qtab">属性快速添加tab</button>
    </p>

    <div id="qtab"></div>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        const qtab = new Quicktab('qtab', {
            defaultTabs: [
                { url: 'welcome.html', title: '首页' }
            ]
        })

        let index = 1
        document.getElementById('btn').addEventListener('click', function () {
            qtab.addTab({
                url: 'welcome.html?page=' + index,
                title: '新选项卡' + index
            })
            index++
        })

    </script>
</body>

</html>
```

<ShowCase text="Run" title="添加tab" src="Quicktab/demo/tab-add.html"/>