import buildpath from "../build.path.mjs";
import {emptyDir} from "../build.utils.mjs"


export const css_clean =  async () => {
    return emptyDir(buildpath.css.dest);
}
