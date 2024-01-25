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
            toolbar:{
                dropdown:{
                    enable:true
                }
            },
            tab:{
                contextmenu:{
                    enable:true
                }
            }
        })
    </script>
</body>

</html>
```

<ShowCase text="Run" title="启用tab的右键菜单" src="Quicktab/demo/tab-contextmenu.html"/>