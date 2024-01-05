import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import multiEntry from '@rollup/plugin-multi-entry'
import babel from '@rollup/plugin-babel';
import stripBanner from 'rollup-plugin-strip-banner';
import { globSync } from 'glob'

import { getBanner } from "./build/banner.mjs"

const files = globSync('src/langs/*.js')



const plugins = [
    resolve(),
    commonjs(),
    json(),
    stripBanner({
        include: '**/*.js',
        exclude: 'node_modules/**'
    }),
    // babel({
    //     babelHelpers: 'bundled',
    //     exclude: 'node_modules/**'
    // })
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
    input: 'src/quicktab.js',
    output: {
        banner: getBanner(),
        format: 'umd',
        name: 'Quicktab',
        sourcemap: true,//方便调试
        file
    },
    plugins
}]



file = 'dist/js/langs/all.js'
if (process.env.NODE_ENV === 'production') {
    file = file.replace(/\.js$/, '.min.js')
}
config.push({
    input: 'src/langs/**/*.js',
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


for (const file of files) {

    let out = file.replace(/\\/g, '/')
    out = `dist/js/${out.replace('src/', '')}`

    if (process.env.NODE_ENV === 'production') {
        out = out.replace(/\.js$/, '.min.js')
    }

    config.push({
        input: file,
        output: {
            name: 'Quicktab',
            file: out,
            format: 'umd',
        },
        plugins
    })
}










export default config;