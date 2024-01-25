默认的tab右键菜单还是比较丰富的,您可以禁用某些项目、添加分隔符、排序、自定义文本

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
                dropdown: {
                    enable: true
                }
            },
            tab: {
                contextmenu: {
                    enable: true,
                    //给条目增加分隔符separator: true
                    close: {
                        enable: true,
                        order: 10,
                        separator: true,
                    },

                    //自定义文本(优先级高于本土化翻译)
                    closeOthers: {
                        enable: true,
                        text: '其它统统消失',
                        order: 20,
                        separator: false,
                    },
                    // 禁用掉某些项目
                    closePrev: {
                        enable: false,
                    },
                    closeNext: {
                        enable: false,
                    },
                    closeAll: {
                        enable: false,
                    },
                    fullscreen: {
                        enable: false,
                    },
                    refresh: {
                        enable: false,
                    },
                    centerActive: {
                        enable: false,
                    },
                    //自定义排序到第一位
                    newBlank: {
                        enable: true,
                        text: '',
                        order: 1
                    },
                }
            }
        })
    </script>
</body>

</html>
```

<ShowCase text="Run" title="右键菜单定制" src="Quicktab/demo/tab-contextmenu-custom.html"/>