import gulp from 'gulp';
import buildpath from "../build.path.mjs";
import gulpStylelint from "@ronilaukkarinen/gulp-stylelint";
import stylelintConfig from "../config/stylelint.common.config.mjs";


export const css_fix = () => {
    return gulp
        .src([buildpath.css.src])
        .pipe(gulpStylelint({
            ...stylelintConfig,
            //自动尽可能的修复
            fix: true,
        }))
        .pipe(gulp.dest(buildpath.css.base));
}
