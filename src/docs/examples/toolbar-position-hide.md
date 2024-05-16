

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

    <h3>#qtab工具栏在底部</h3>
    <div id="qtab"></div>

    <h3>#qtab2没有工具栏</h3>
    <div id="qtab2"></div>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        new Quicktab('qtab', {
            defaultTabs: [
                { url: 'welcome.html?page=1', title: '#qtab欢迎页面' },
            ],
            toolbar: {
                position: 'bottom'
            }
        })

        new Quicktab('qtab2', {
            defaultTabs: [
                { url: 'welcome.html?page=1', title: '#qtab2欢迎页面' },
            ],
            toolbar: {
                hide: true
            }
        })
    </script>
</body>

</html>
```

<ShowCase text="Run" title="工具栏的位置和隐藏设置" src="Quicktab/demo/toolbar-position-hide.html"/>