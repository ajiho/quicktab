
可以方便的设置尺寸，让高度占满父容器`.parent-wrapper`


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>尺寸设置-高度占满全屏</title>
    <link rel="stylesheet" href="../dist/css/quicktab.css">
    <style>
        .parent-wrapper {
            height: 500px;
        }
    </style>
</head>

<body>
    <div class="parent-wrapper">
        <div id="qtab"></div>
    </div>

    <script src="../dist/js/quicktab.js"></script>
    <script>
        new Quicktab('qtab', {
            defaultTabs: [
                { title: '欢迎页面', url: 'welcome.html' }
            ],
            height: '100%',
            // width: '600px', 也可以设置其它尺寸的属性
            // minHeight: '300px'
        })
    </script>
</body>

</html>
```

<ShowCase text="Run"  src="Quicktab/demo/height.html"/>