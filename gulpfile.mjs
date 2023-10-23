import gulp from 'gulp';

const {task, series} = gulp;
import {js_compile} from "./build/tasks/js_compile.mjs";
import {css_compile} from "./build/tasks/css_compile.mjs";
import {css_lint} from "./build/tasks/css_lint.mjs";
import {css_fix} from "./build/tasks/css_fix.mjs";
import {css_clean} from "./build/tasks/css_clean.mjs";
import {js_clean} from "./build/tasks/js_clean.mjs";
import {js_lint} from "./build/tasks/js_lint.mjs";
import {js_fix} from "./build/tasks/js_fix.mjs";


task('css', series(css_lint, css_clean, css_compile));

//用于在可能的情况下自动修复规则报告的问题
task('css:fix', css_fix);


//打包js
task('js', series(js_lint, js_clean, js_compile))
//用于在可能的情况下自动修复规则报告的问题
task('js:fix', js_fix);







