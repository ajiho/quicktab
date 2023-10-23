//stylelint公共配置提取
export default {
    //直接指定配置文件,避免stylelint去查找配置文件
    configFile: "./stylelint.config.mjs",
    //打印错误堆栈跟踪
    debug: true,
    //报错后是否直接终止程序,必须设置true:否则报错也会执行下面的任务
    failAfterError: true,
    //报错类型和格式处理
    reporters: [
        {formatter: 'string', console: true}
    ]
}
