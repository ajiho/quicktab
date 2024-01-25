
对于很长的标题,一样可以放心,后端不必做任何处理,因为css已经防御性处理了

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
                { url: 'welcome.html', title: '这是一个超长超长超长超长超长超长的标题哦' },
                { url: 'welcome.html?page=1', title: '欢迎欢迎欢迎欢迎欢迎欢迎你呀' },
            ]
        })
    </script>
</body>

</html>
```

<ShowCase text="Run" src="Quicktab/demo/tab-longTitle.html"/>