# 新的Tab添加数据的经典问题

这是一个很高频率被问到的问题

## 假设这是最外层index.html

> 初始化了一个Quicktab、重点是id`qtab2`

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

    <div id="qtab2"></div>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        const qtab2 = new Quicktab('qtab2', {
            height: '400px',
            defaultTabs: [
                { url: 'page-list.html', title: '用户列表页' },
            ],
            tab: {
                remember: true
            }
        })


    </script>
</body>

</html>
```

## 用户列表页

> 用户列表页里是对用户数据的一些展示，头部是有操作按钮，有一个新增用户的按钮,点击要新开一个Tab对用户数据进行新增

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <p>当前页面url:page-list.html</p>

    <p>页面随机标志(用于方便查看页面是否被刷新过): <span id="num"></span></p>


    <button data-qt-tab-url='page-add.html' data-qt-tab-title='添加用户'
        data-qt-parent-target="#qtab2">新开一个Tab添加用户(page-add.html)</button>


    <p>列表展示部分忽略(多半是bootstrap-table等类似的数据表格插件)...</p>


    <script>

        document.getElementById('num').innerText = Math.random()

    </script>

</body>

</html>
```

## 用户新增页面


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <p>当前页面url:page-add.html</p>
    <p>添加用户的表单忽略..</p>

    <p>1.新增用户成功后我想要刷新用户列表页(page-list.html)</p>
    <button id="btn1">运行</button><span>(运行后可以手动切换到用户列表页查看页面随机标志查看是否刷新成功)</span>


    <p>2.新增用户成功后我想要刷新且切回用户列表页</p>
    <button id="btn2">运行</button>


    <p>3.新增用户成功后我想要刷新且切回用户列表页,同时要关闭当前页面</p>
    <button id="btn3">运行</button>

    <p>4.新增用户成功后我想要切回用户列表页,并且只修改部分内容、或者只想调用数据表格bootstrap-table插件的刷新方法</p>
    <button id="btn4">运行</button>


    <script>


        const userListUrl = 'page-list.html'
        const currUrl = 'page-add.html'

        //找到父级页面的Quicktab实例
        const qtab = parent.Quicktab.get('qtab2')

        document.getElementById('btn1').addEventListener('click', function () {
            qtab.refreshTabByUrl(userListUrl)
        })


        document.getElementById('btn2').addEventListener('click', function () {
            qtab.refreshTabByUrl(userListUrl)

            qtab.activeTabByUrl(userListUrl)

        })


        document.getElementById('btn3').addEventListener('click', function () {
            qtab.refreshTabByUrl(userListUrl)

            qtab.activeTabByUrl(userListUrl)

            qtab.closeTabByUrl(currUrl)

        })


        document.getElementById('btn4').addEventListener('click', function () {
            //需要先获取到tab的Window对象
            const userListTabWindow = qtab.getTabWindowByUrl(userListUrl)


            //修改部分内容
            userListTabWindow && (userListTabWindow.document.getElementById('num').innerText = '~~~值被改成固定内容啦~~')


            //如果单纯的想调用bootstrap-table数据表格插件的刷新方法
            // userListTabWindow && userListTabWindow.$('#table').bootstrapTable('refresh')

        })

    </script>
</body>

</html>
```

## 运行示例

<ShowCase text="Run"  src="Quicktab/demo/add-tab-in-childPage2.html"/>