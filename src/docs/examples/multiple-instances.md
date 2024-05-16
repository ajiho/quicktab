同一个页面中多个`Quicktab`实例之间不会产生任何冲突

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
    <div id="qtab2"></div>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        new Quicktab('qtab', {
            width: "400px",
            defaultTabs: [
                { title: '欢迎页面', url: 'welcome.html' }
            ]
        })
        new Quicktab('qtab2', {
            width: "600px",
            defaultTabs: [
                { title: '欢迎页面', url: 'welcome.html' }
            ]
        })
    </script>
</body>

</html>
```

<ShowCase text="Run" title="同一页面可共存多个实例" src="Quicktab/demo/multiple-instances.html"/>