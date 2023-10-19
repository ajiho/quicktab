import gulp from 'gulp';

const {task, series, watch} = gulp;
import {js_compile} from "./tasks/js_compile.mjs";
import {css_compile} from "./tasks/css_compile.mjs";
import {css_lint} from "./tasks/css_lint.mjs";
import {css_fix} from "./tasks/css_fix.mjs";
import {css_clean} from "./tasks/css_clean.mjs";
import {js_clean} from "./tasks/js_clean.mjs";
import {js_lint} from "./tasks/js_lint.mjs";
import {js_fix} from "./tasks/js_fix.mjs";




task('css', series(css_lint, css_clean, css_compile));

//用于在可能的情况下自动修复规则报告的问题
task('css:fix', css_fix);


//打包js
task('js', series(js_lint, js_clean, js_compile))
//用于在可能的情况下自动修复规则报告的问题
task('js:fix', js_fix);







