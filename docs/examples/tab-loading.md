有的时候想要加载一个外部的tab,此时它已经自己带有加载效果了，我们想禁用掉自己的加载效果，该配置就很有用。

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
    <p>
        <button data-qt-tab='{"url":"welcome.html?page=2"}' data-qt-target="#qtab">添加welcome.html?page=2</button>
        <button data-qt-tab='{"url":"https://getbootstrap.com"}'
            data-qt-target="#qtab">添加https://getbootstrap.com</button>

    </p>
    <div id="qtab"></div>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        const qtab = new Quicktab('qtab', {
            defaultTabs: [
                { url: 'welcome.html?page=1', title: '页面1' },
            ],
            tab: {
                doubleClickRefresh: true,
                loading: {
                    //false:则直接禁用掉这个加载层效果
                    enable: true,
                    filter(url) {
                        return !url.startsWith("http");//不是http开头的则会添加加载层效果
                    }

                }
            }
        })

    </script>
</body>

</html>
```

<ShowCase text="Run" title="tab的加载层" src="Quicktab/demo/tab-loading.html"/>