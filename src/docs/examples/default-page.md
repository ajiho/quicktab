
默认页面可以一次性初始化多个，但是只会激活最后一项,其它的Tab则是惰性的,这样可以避免页面一次性多个IFrame加载导致浏览器卡顿,
很多时候后台是需要加载一个默认首页的，这很有用。

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
    <div id="qtab"></div>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        new Quicktab('qtab', {
            defaultTabs: [
                { url: 'welcome.html' },
                { url: 'welcome.html?page=1', title: '欢迎页面' },
            ]
        })
    </script>
</body>

</html>
```

<ShowCase text="Run" title="默认首页" src="Quicktab/demo/default-page.html"/>