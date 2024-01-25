可以符合个性化需求的你，至少哪怕都是用了`Quicktab`插件,你也可以弄点不一样的效果和别人区分开来

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
            height: '400px',
            defaultTabs: [
                { title: '欢迎页面', url: 'welcome.html' }
            ],
            toolbar: {
                prev: {
                    enable: true,
                    order: 1,
                },
                refresh: {
                    enable: true,
                    order: 5,
                },
                tabWrapper: {
                    order: 4,
                },
                next: {
                    enable: true,
                    order: 6,
                },
                fullscreen: {
                    enable: true,
                    order: 2,
                },
                dropdown: {
                    enable: true,
                    order: 1,
                }
            }
        })
    </script>
</body>

</html>
```

<ShowCase text="Run" title="工具栏功能按钮可以排序" src="Quicktab/demo/toolbar-sort.html"/>