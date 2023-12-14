import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import stripBanner from 'rollup-plugin-strip-banner';

import { getBanner } from "./build/banner.mjs"




const commonConfig = {
    banner: getBanner(),
    format: 'umd',
    name: 'Quicktab',
    sourcemap: true
};


let file = 'dist/js/quicktab.js';

export default {
    input: 'src/quicktab.js',
    output: [
        {
            ...commonConfig,
            file: file,
        },
        {
            ...commonConfig,
            file: file.replace(/\.js$/, '.min.js'), // 压缩版本的输出路径
            plugins: [terser()],
        }
    ],
    external: ['jquery'],
    plugins: [
        resolve(),
        commonjs(),
        stripBanner({
            include: '**/*.js',
            exclude: 'node_modules/**/*'
        }),
        babel({
            //排除node_modules下的文件，其它都处理
            exclude: 'node_modules/**',
            //只处理src下的文件，其它文件都处理
            // include:path.resolve(__dirname,''),
            //将辅助函数内联到每个使用它们的模块
            babelHelpers: 'bundled'
        }),

    ]
};
