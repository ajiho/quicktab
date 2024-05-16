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
                { url: 'welcome.html?page=1', title: '页面1' },
                { url: 'welcome.html?page=2', title: '页面2' },
                { url: 'welcome.html?page=3', title: '页面3' },
                { url: 'welcome.html?page=4', title: '页面4' },
            ],
            tab: {
                dragSort: true
            }
        })
    </script>
</body>

</html>
```

<ShowCase text="Run" title="tab可以拖动排序" src="Quicktab/demo/tab-dragSort.html"/>