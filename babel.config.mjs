export default {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: { version: "3.35", proposals: false },
                //禁止转换成其它格式
                modules: false,
                //要移除的垫片
                exclude: [
                    'transform-typeof-symbol',
                    'es.promise',
                ]
            }
        ]
    ]
}
