必须同时携带`id属性`和`data-qt-toggle="quicktab"`才能初始化,如果选项是数组使用json字符串表示,如果是事件则绑定全局函数字符串,如果是对象则使用`-`连接

Quicktab所有选项都支持data属性绑定,示例中只提供了部分参数,具体需要选项可以查阅[选项](/options).

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

    <div id="qtabx" data-qt-toggle="quicktab" data-qt-defaultTabs='[{"url":"welcome.html","title":"首页"}]'
        data-qt-responsive-enable="true" data-qt-responsive-breakpoint="576" data-qt-onInit="init">
    </div>

    <script src="../dist/js/quicktab.js"></script>

    <script>
        // init事件
        function init(quicktab) {
            console.log('quicktab实例化完毕,this指向的是当前的Quicktab实例:', this);
        }
    </script>
</body>

</html>
```

<ShowCase text="Run"  src="Quicktab/demo/attribute.html"/>