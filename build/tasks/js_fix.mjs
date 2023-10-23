import gulp from "gulp";
import buildpath from "../path.mjs";
import gulpESLintNew from "gulp-eslint-new";
import eslintConfig from "../config/eslint.common.config.mjs";


export const js_fix = async () => {
    return gulp
        .src([buildpath.js.src])
        .pipe(gulpESLintNew({
            ...eslintConfig,
            //尽可能的修复
            fix: true,
        }))
        .pipe(gulpESLintNew.fix());
}
