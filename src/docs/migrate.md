# 迁移到v0.0.4

在之前的版本中，初始化时必须在dom上提供id属性进行初始化，新版本中id参数改成了通过选项传递


## 初始化

```html
<div id="qtab" data-qt-toggle="quicktab"></div>
```
变成

```html
<div data-qt-toggle="quicktab" data-qt-id="qtab"></div>
```


```html
<div id="qtab"></div>
<script>
    new Quicktab('qtab', {
        //...
    })
</script>
```

变成

```html
<div id="qtab"></div>
<script>
    new Quicktab('#qtab', {
        id:'qtab',
        //...
    })
</script>
```

## 事件api变化

- `onTabAddActivated`这个api已经被移除
- 新增`onTabCloseAll`