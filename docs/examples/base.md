
只需要提供一个空的div(可以是任意元素)和一个id即可快速得到一个选项卡插件

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../dist/css/quicktab.css">
</head>

<body>
    <div id="qtab"></div>
    <script src="../dist/js/quicktab.min.js"></script>
    <script>
        new Quicktab('qtab')
    </script>
</body>
</html>
```


<ShowCase text="Run"  src="demo/base.html"/>
