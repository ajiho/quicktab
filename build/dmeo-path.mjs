import { glob } from "glob";
import fs from "fs-extra";


const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const cssfiles = await glob('src/docs/public/demo/*.html')
cssfiles.forEach((filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        //写入文件
        fs.writeFile(filePath, data.replaceAll('dist/', `https://cdn.jsdelivr.net/npm/quicktab@${pkg.version}/dist/`), 'utf8');
    });
});