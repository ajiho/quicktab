import gulp from 'gulp';
import buildpath from "../path.mjs";
import gulpStylelint from "@ronilaukkarinen/gulp-stylelint";
import stylelintConfig from "../config/stylelint.common.config.mjs";


export const css_lint = () => {
    return gulp.src(buildpath.css.src)
        .pipe(gulpStylelint({
            ...stylelintConfig,
            fix: false,
        }))
}
