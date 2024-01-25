


# 什么是Quicktab？


Quicktab是一个可以快速搭建符合国情的IFrame多tab的响应式选项卡JavaScript插件,Quicktab是[bootstrap-quicktab](https://gitee.com/ajiho/bootstrap-quicktab)的继承者,相对于`bootstrap-quicktab`它不再需要bootstrap作为依赖了,且修复了所有遇到的问题以及强化了对一些新需求的支持。


## Quicktab存在的原因？

- 从开发者角度,一个强大的能快速集成还能复用的IFrame多Tab选项卡开发项目时可以更得心应手
- 从用户角度,一个美观易用的TAB选项卡插件,可以心情愉悦



## 主要解决了什么痛点？

- 目前国内很多的iframe+多tab效果的后台管理系统/模板有很多用户体验上的不足,其中最大的问题就是，当切换/刷新tab时原本滚动条的高度竟然又回到顶部
- 目前国内很多开源的后台管理系统/模板很多这种iframe+多tab的效果是杂糅在它们的全局js文件中且零零散散的,而且熟悉了其中一个iframe+多tab的模板，下次更换到另外一个也有类似iframe+多tab的后台时，因为实现方式可能不太一样，因此难以迁移，如果您是独立开发者，你只需要一次学习Quicktab，那么在您的客户的多个项目中,可以随时升级Quicktab,且用法相同。
- 目前国内很多的iframe+多tab效果的后台管理系统/模板很多它只提供了基本的使用方式,没有提供一些个性化的api、没有具体的文档，有时候比较独特的需求没有办法实现和没有具体的文档和例子来查阅
- 还有一个比较残酷的事实是,现在Vue大行其道,但是大部分的后端开发人员开发一个中小型后台管理系统的时候还是想利用后台静态HTML模板+模板引擎时,需要实现这种iframe+多tab效果，但开源的同类型插件已经特别稀缺且几乎已经不更新了，就让Quicktab来弥补这个狭小空缺吧


## 工作原理

Quicktab识别是不是同一个tab的方法就是看`url`是否相同


## 浏览器兼容

不支持IE浏览器,具体可以在源码文件中查阅[.browserslistrc](https://gitee.com/ajiho/quicktab/blob/master/.browserslistrc)

## 请我喝杯咖啡

我并不喜欢喝咖啡,只不过觉得这种说法很酷，因为很多开源项目作者都说请我喝杯咖啡

<div style="display: flex;flex-wrap: wrap">
    <img src="/ali_pay.png">
    <img src="/wechat_pay.png">
</div>
