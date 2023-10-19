import shell from 'gulp-shell'


export const js_compile =  shell.task("rollup --config rollup.config.mjs")
