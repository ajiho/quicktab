有时候,可能不需要多tab只需要单独的一个没有任何工具栏的IFrame,实现一个单页面即可，对于这个需求Quicktab也可以轻松实现，这样设置后您可以享受到
- addTab()方法快速添加tab
- 漂亮的加载层
- iframe的事件监听等

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
            ],
            toolbar: {
                hide: true
            },
            tab: {
                maxNum: 1
            }
        })
    </script>
</body>

</html>
```

<ShowCase text="Run"  src="Quicktab/demo/single-iframe.html"/>