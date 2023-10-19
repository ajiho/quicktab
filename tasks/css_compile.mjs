import buildpath from "../build.path.mjs";
import gulp from "gulp";
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import header from "gulp-header";
import {getBanner} from "../build.utils.mjs";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cmq from "node-css-mqpacker";
import sourcemaps from "gulp-sourcemaps";
import cleanCss from "gulp-clean-css";
import rename from "gulp-rename";
import filter from "gulp-filter";


export const css_compile = () => {
    return gulp.src(buildpath.css.src)
        .pipe(header(getBanner()))
        .pipe(sass.sync({
            outputStyle: "expanded"
        }).on('error', sass.logError))
        .pipe(postcss([
            //给css添加前缀
            autoprefixer(),
            //合并媒体查询
            cmq({
                sort: function (a, b) {//按照从@media max-width 高到低排列
                    let aMax = a.match(/\d+/)[0];
                    let bMax = b.match(/\d+/)[0];
                    return bMax - aMax;
                }
            })
        ]))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildpath.css.dest))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(filter(['**/*.css']))//只处理css文件，解决多余的.map文件生成
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildpath.css.dest))
}
