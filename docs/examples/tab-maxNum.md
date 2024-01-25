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
    <button id="btn">通过实例方法addTab()添加tab</button>

    <hr>
    <div id="qtab"></div>
    <script src="../dist/js/quicktab.js"></script>
    <script>

        const qtab = new Quicktab('qtab', {
            defaultTabs: [
                { url: 'welcome.html', title: '首页' }
            ],
            tab: {
                maxNum: 1
            }
        })

        let index = 1
        document.getElementById('btn').addEventListener('click', function () {
            qtab.addTab({
                url: 'welcome.html?page=' + index,
                title: '新选项卡' + index
            })
            index++
        })

    </script>
</body>

</html>
```

<ShowCase text="Run" title="控制tab的最大数量" src="Quicktab/demo/tab-maxNum.html"/>