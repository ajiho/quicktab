启用tab记忆后,现在也能再次修改默认主页了🎉


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
    </p>
    <div id="qtab"></div>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        const qtab = new Quicktab('qtab', {
            defaultTabs: [
                { url: 'welcome.html?page=1', title: '欢迎页面' },
            ],
            tab: {
                remember: true
            }
        })

        let index = 2
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

<ShowCase text="Run" title="tab记忆" src="Quicktab/demo/tab-remember.html"/>