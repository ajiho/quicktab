import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import multiEntry from '@rollup/plugin-multi-entry'
import babel from '@rollup/plugin-babel';
import stripBanner from 'rollup-plugin-strip-banner';
import {globSync} from 'glob'
import {getBanner} from "./build/banner.mjs"

const files = globSync('src/js/langs/*.js')


const plugins = [
    resolve(),
    commonjs(),
    json(),
    stripBanner({
        include: '**/*.js',
        exclude: 'node_modules/**'
    }),
    babel({
        babelHelpers: 'bundled'
    })
]

if (process.env.NODE_ENV === 'production') {
    plugins.push(terser({
        output: {
            comments() {
                return false
            }
        }
    }))
}


let file = 'dist/js/quicktab.js'
if (process.env.NODE_ENV === 'production') {
    file = file.replace(/\.js$/, '.min.js')
}

const config = [{
    input: 'src/js/quicktab.js',
    output: {
        banner: getBanner(),
        format: 'umd',
        name: 'Quicktab',
        sourcemap: true,//方便调试
        file
    },
    plugins
}]


// 所有的js文件合并成一个js文件
file = 'dist/js/langs/all.js'
if (process.env.NODE_ENV === 'production') {
    file = file.replace(/\.js$/, '.min.js')
}

config.push({
    input: 'src/js/langs/**/*.js',
    output: {
        name: 'Quicktab',
        file,
        format: 'umd'
    },
    plugins: [
        multiEntry(),
        ...plugins
    ]
})


for (const input of files) {

    let file = `dist/${input.replace(/\\/g, '/').replace('src/', '')}`;

    if (process.env.NODE_ENV === 'production') {
        file = file.replace(/\.js$/, '.min.js')
    }

    config.push({
        input,
        output: {
            name: 'Quicktab',
            file,
            format: 'umd',
        },
        plugins
    })
}


export default config;
