export default {
    css: {
        base: `src`,
        get src() {
            return `${this.base}/**/*.scss`;
        },
        dest: `dist/css`
    },
    js: {
        // 源码位置,用于监听变化重新打包
        src: 'src/**/*.js',
        //最终打包的文件名称
        destName: 'bootstrap-quicktab',
        //入口文件
        get input() {
            return `src/${this.destName}.js`;
        },
        //全局变量名称
        name: 'BootstrapQuicktab',
        //输出路径
        dest: `dist/js`,
        //输出路径
        get file() {
            return `${this.dest}/${this.destName}.js`;
        }
    }
}
