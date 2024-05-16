

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../dist/css/quicktab.css">
    <style>
        .error-container {
            padding: 20px;
            border-radius: 8px;
            background-color: #f9f9f9;
        }

        .error-message {
            color: #e74c3c;
            font-size: 18px;
            margin-bottom: 15px;
        }

        .reload-button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #3498db;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .reload-button:hover {
            background-color: #2980b9;
        }
    </style>
</head>

<body>

    <button data-qt-tab-url="https://getbootstrap.com" data-qt-target="#qtab">添加Tab(https://getbootstrap.com)</button>
    <hr>
    <div id="qtab"></div>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        const qtab = new Quicktab('qtab', {
            defaultTabs: [
                { url: 'welcome.html?page=welcome', title: '欢迎页面' },
            ],
            tab: {
                timeout: {
                    enable: true,
                    second: 300,

                    
                    filter(url) {
                        return url.startsWith("http");//如果是http开头的Tab会启用超时逻辑
                    },
                    //只是定义超时的提示文本
                    text: '请求时间太长了哦~',

                    //该选项是直接自定义整个超时显示的提示页面,会覆盖上面的text选项
                    template: `<div class="error-container">
    <p class="error-message">加载失败，请重试。</p>
    <button class="reload-button" onclick="reloadPage()">重新加载</button>
  </div>`
                }
            }
        })


        function reloadPage() {
            console.log('refresh');
        }

    </script>
</body>

</html>
```
<ShowCase text="Run"  src="Quicktab/demo/tab-timeout.html"/>

