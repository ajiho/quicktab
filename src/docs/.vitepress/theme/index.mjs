// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import MLayout from './Layout.vue'
import ShowCase from "./components/ShowCase.vue";
import { createApp } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'


import './custom.scss'


// 自定义指令
const vFocus = {
    mounted(el, binding) {
        

        const {stop} = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                if(isIntersecting){
                    el.src = binding.value
                    stop()
                }
            },
        )

    }
}


export default {
    ...DefaultTheme,
    Layout: MLayout,
    enhanceApp({ app }) {
        enhanceAppWithTabs(app)
        //注册自己的全局组件
        app.component('ShowCase', ShowCase)
        app.directive('iframe-lazy', vFocus)
    }
}
