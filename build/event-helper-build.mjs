import { execa } from 'execa';
import fs from 'fs-extra'
import chalk from 'chalk';

const path = '.temp/jquery'
const node_modules_path = path + '/node_modules'
const filename = "event.js"

const copyForm = `${path}/dist/${filename}`
const output = 'src/utils'
const copyTo = `${output}/${filename}`

try {

    if (fs.existsSync(path)) {
        console.log(chalk.blue(`${path}目录已存在，跳过克隆操作`))
    } else {
        console.log(chalk.blue(`${path}目录不存在执行克隆操作`))
        await execa('git', ['clone', 'https://github.com/jquery/jquery.git', path], {
            stdio: 'inherit'
        })
    }


    //安装依赖
    if (fs.existsSync(node_modules_path)) {
        console.log(chalk.blue(`node_modules依赖已经安装跳过npm install 操作`));
    } else {
        console.log('node_modules依赖没有安装，执行 npm install 操作')
        await execa('npm', ['install'], {
            cwd: "./" + path,
            stdio: 'inherit'
        })
    }


    //定制jQuery,只是需要单纯用到jquery的事件委托，目前没有比这个更好用的开源库,但是定制后的jquery体积还是很大。等到时候有更好的替代品再替换
    await execa('npm', [
        'run',
        'build',
        '--',
        '--esm',
        '--include=event',
        `--filename="${filename}"`
    ], {
        cwd: "./" + path,
        stdio: 'inherit'
    })


    //先复制
    fs.copySync(copyForm, copyTo);

} catch (error) {
    console.log(chalk.red(error));
}
