import { execa } from 'execa';
import fs from 'fs-extra'
import chalk from 'chalk';
import {deleteSync} from 'del'

const path = '.cache/jquery'
const node_modules_path = path + '/node_modules'
const filename = "index.js"

const copyForm = `${path}/dist/${filename}`
const output = 'src/utils/query'
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


    //定制jQuery，只要event和traversing这两个部分，打包成功后会在dist目录下生成打包后的文件
    await execa('npm', [
        'run',
        'build',
        '--',
        '--esm',
        '--include=event',
        '--include=traversing',
        `--filename="${filename}"`
    ], {
        cwd: "./" + path,
        stdio: 'inherit'
    })



    //清空目录
    deleteSync(output)

    //先复制
    fs.copySync(copyForm,copyTo);



} catch (error) {
    console.log(chalk.red(error));
}
