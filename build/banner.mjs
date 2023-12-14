import fs from "fs-extra";

function getBanner() {
    
    const year = new Date().getFullYear();
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

    return `/*!
 * ${pkg.name} v${pkg.version} (${pkg.homepage})
 * Copyright 2023-${year} ${pkg.author}
 * license ${pkg.license} (https://gitee.com/ajiho/quicktab/blob/master/LICENSE)
 */\n`;
}

export {
    getBanner
}
