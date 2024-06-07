


# 什么是Quicktab？


Quicktab是一个可以快速搭建符合国情的IFrame多tab的响应式选项卡JavaScript插件,Quicktab是[bootstrap-quicktab](https://gitee.com/ajiho/bootstrap-quicktab)的继承者,相对于`bootstrap-quicktab`它不再需要bootstrap作为依赖了,且修复了所有遇到的问题以及强化了对一些新需求的支持。强烈建议您把`Quicktab`集成进您的后台管理系统中


## Quicktab存在的原因？

- 从开发者角度,一个强大的能快速集成还能复用的IFrame多Tab选项卡开发项目时可以更得心应手
- 从用户角度,一个美观易用的TAB选项卡插件,可以心情愉悦



## 主要解决了什么痛点？


### 市面上IFrame+多Tab选项卡后台普遍存在的问题

- 切换/刷新Tab时原本滚动条的高度竟然又回到顶部，严重影响用户体验(不管是对开发者还是用户)
- 有些后台管理系统可以支持刷新页面保持Tab不丢失,但刷新页面它竟然会让所有的IFrame同时激活导致浏览器卡顿,如果打开的Tab数量较多，有时候会高达几百次的请求,而且大部分都是相同的静态资源
- IFrame+多Tab的效果是杂糅在它们的全局js文件中且零零散散的,且实现方式各不相同，因此多个项目难以迁移，学习成本增大,如果您是独立开发者，你只需要一次学习Quicktab，那么在您的客户的多个项目中,可以随时升级Quicktab,且用法相同。
- 只提供了基本的使用方式,没有提供一些个性化的api、没有具体的文档，有时候比较独特的需求没有办法实现和没有具体的文档和例子来查阅

### 关于VUE

还有一个比较残酷的事实是,现在Vue大行其道,但是大部分的后端开发人员,对于前端那一套开发流程并不熟悉,在开发一个中小型后台管理系统的时候还是想利用后台静态HTML模板+模板引擎这种自己熟悉的MVC模式时,需要在后台管理系统中实现这种IFrame+多Tab效果，但开源的同类型插件已经特别稀缺且几乎已经不更新了，就让Quicktab来弥补这个狭小空缺吧


## 工作原理

Quicktab识别是不是同一个tab的方法就是看`url`是否相同


## 浏览器兼容

不支持IE浏览器,具体可以在源码文件中查阅[.browserslistrc](https://github.com/ajiho/quicktab/blob/master/.browserslistrc)

## 请我喝杯咖啡

我并不喜欢喝咖啡,只不过觉得这种说法很酷，如果您觉得此项目的发展对您日会后所有帮助，或是此时已经帮助到了您，请鼓励我继续前行！❤️


<div style="display: flex;flex-wrap: wrap">
    <img src="https://ajiho.github.io/assets/img/ali_pay.png">
    <img src="https://ajiho.github.io/assets/img/wechat_pay.png">
</div>
