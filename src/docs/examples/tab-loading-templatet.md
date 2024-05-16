

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../dist/css/quicktab.css">
    <style>
        .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body>

    <div id="qtab"></div>
    <script src="../dist/js/quicktab.js"></script>
    <script>
        const qtab = new Quicktab('qtab', {
            defaultTabs: [
                { url: 'welcome.html?page=1', title: '页面1' },
            ],
            toolbar: {
                refresh: {
                    enable: true
                }
            },
            tab: {
                loading: {
                    enable: true,
                    template: '<div class="loader"></div>'
                }
            }
        })

    </script>
</body>

</html>
```
<ShowCase text="Run"  src="Quicktab/demo/tab-loading-templatet.html"/>

