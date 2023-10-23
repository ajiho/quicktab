import gulp from 'gulp';
import buildpath from "../path.mjs";
import gulpESLintNew from 'gulp-eslint-new'
import eslintConfig from '../config/eslint.common.config.mjs'

export const js_lint = () => {
    return gulp.src(buildpath.js.src)
        .pipe(gulpESLintNew({
            ...eslintConfig,
            fix:false,
        }))
        .pipe(gulpESLintNew.format())
        //检测到错误后立马退出
        .pipe(gulpESLintNew.failAfterError())
}
