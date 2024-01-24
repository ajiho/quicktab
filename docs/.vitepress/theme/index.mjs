// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import {enhanceAppWithTabs} from 'vitepress-plugin-tabs/client'
import MLayout from './Layout.vue'
import ShowCase from "./components/ShowCase.vue";

import './custom.scss'


export default {
    ...DefaultTheme,
    Layout: MLayout,
    enhanceApp({app}) {
        enhanceAppWithTabs(app)
        //注册自己的全局组件
        app.component('ShowCase', ShowCase)
    }
}
