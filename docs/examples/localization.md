主要是Tab右键菜单和下拉菜单部分以及超时时的提示文本信息,这些提示文本可以使用选项强制覆盖。

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
    <!-- <script src="../dist/js/langs/en_US.js"></script> -->
    <script src="../dist/js/langs/all.js"></script>
    <script>
        new Quicktab('qtab', {
            lang: 'en',//en-US都可以
            defaultTabs: [
                { url: 'welcome.html' },
                { url: 'welcome.html?page=1', title: '欢迎页面' },
            ],
            toolbar: {
                dropdown: {
                    enable: true
                }
            },
            tab: {
                contextmenu: {
                    enable: true
                }
            }
        })
    </script>
</body>

</html>
```

<ShowCase text="Run" title="本土化" src="Quicktab/demo/localization.html"/>