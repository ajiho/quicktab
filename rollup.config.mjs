import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import buildpath from "./build.path.mjs";
import outputCommonConfig from './config/rollup.output.common.config.mjs'


export default {
    input: buildpath.js.input,
    output: [
        {
            ...outputCommonConfig,
            file: buildpath.js.file,
        },
        {
            ...outputCommonConfig,
            file: buildpath.js.file.replace(/\.js$/, '.min.js'), // 压缩版本的输出路径
            plugins: [terser({compress: {drop_console: false}})],
        }
    ],
    external: ['jquery'],
    plugins: [
        resolve(),
        commonjs(),
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
