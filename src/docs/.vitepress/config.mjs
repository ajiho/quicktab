import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'


const year = new Date().getFullYear();

export default defineConfig({
    // vite: {
    //     server: {
    //         open: true // 这将会在启动开发服务器时自动打开浏览器,有bug，会导致每次都重新打开一个实例
    //     }
    // },
    // 整个网页的标题
    title: 'Quicktab-文档',
    //网页的语言,研究发现，如果配置了 locales: {root:{lang: 'zh',}}, 那么它会优先使用下面那个配置
    lang: 'zh',
    base: '/quicktab/',
    // 输出目录
    // outDir: '../docs/dist',
    //网页的描述
    description: "一秒构建后台管理系统IFrame多tab选项卡效果",

    //主题相关的配置
    themeConfig: {
        //网站标题 设置为false则不显示标题，siteTitle设置化后会覆盖外层的title siteTitle不设置则会使用上面的title
        siteTitle: 'Quicktab',
        // 图标
        // logo: '/favicon-32x32.png',
        //右边的toc上面的标题
        outlineTitle: '文章目录',
        //deep显示h1-h6
        outline: 'deep',
        //页面未找到配置
        notFound: {
            title: '页面未找到',
            quote: '您可以联系管理员返回问题,在完全修复之前,请到处看看吧',
            linkLabel: '回到首页',
            linkText: '回到首页'
        },
        //主题切换到黑暗模式的提示文本
        darkModeSwitchLabel: '暗黑模式',
        //回到顶部的提示文本
        returnToTopLabel: '回到顶部',
        //搜索的设置
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件q',
                                displayDetails: '显示详情视图',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                    closeText: '关闭',
                                    searchByText: '搜索提供者'
                                }
                            }
                        }
                    },
                    en: {
                        translations: {
                            button: {
                                buttonText: 'Search',
                                buttonAriaLabel: 'Search'
                            },
                            modal: {
                                noResultsText: 'noResults',
                                resetButtonTitle: 'reset',
                                displayDetails: 'details',
                                footer: {
                                    selectText: 'select',
                                    navigateText: 'toggle',
                                    closeText: 'close',
                                    searchByText: 'searchBy'
                                }
                            }
                        }
                    }
                }
            }
        },

        //顶部导航配置
        nav: [
            { text: '指南', link: '/guide/what-is-quicktab', activeMatch: '/guide/' },
            { text: 'API', link: '/api/methods' },
            { text: '例子', link: '/examples' },
            { text: '迁移', link: '/migrate' },
        ],


        // 侧边栏配置(如果是只有一个侧边栏，配置成一个数组就好了)
        sidebar: {
            '/guide/': [
                {
                    text: '介绍',
                    items: [
                        { text: '是什么？', link: '/guide/what-is-quicktab' },
                        { text: '入门', link: '/guide/getting-started' },
                        { text: '常见问题', link: '/guide/faq' },
                    ],
                }
            ],
            '/api/': [
                {
                    text: 'API',
                    items: [
                        { text: '方法', link: '/api/methods' },
                        { text: '事件', link: '/api/events' },
                        { text: '选项', link: '/api/options' },
                        { text: '本土化', link: '/api/localizations' },
                    ],
                }
            ],
        },

        // 封面底部的版权
        footer: {
            message: '该文档根据MIT协议发布',
            copyright: `Copyright © ${year}. All right reserved`
        },

        //社交链接配置
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/ajiho/quicktab'
            }
        ],
        //页面底部的编辑此页面
        editLink: {
            pattern: 'https://github.com/ajiho/quicktab/tree/master/docs/:path',
            text: '在GitHub上编辑此页面'
        },

        //最后更新时间
        lastUpdated: {
            text: '最后更新',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },

        // 文档底部设置
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        //侧边栏的Label
        sidebarMenuLabel: '菜单',

    },
    //头部配置
    head: [
        // [
        //     'link',
        //     { rel: 'alternate icon', href: 'favicon.png', type: 'image/png' }
        // ],
        [
            'link',
            { rel: 'icon', href: 'favicon.svg', type: 'image/svg+xml' }
        ]
    ],

    markdown: {
        image: {
            lazyLoading: true
        },
        lineNumbers: true,
        // theme: 'material-theme-palenight',
        config(md) {
            md.use(tabsMarkdownPlugin)
        },
        container: {
            tipLabel: '提示',
            warningLabel: '警告',
            dangerLabel: '危险',
            infoLabel: '信息',
            detailsLabel: '详细信息'
        }
    }
})
