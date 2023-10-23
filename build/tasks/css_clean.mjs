import buildpath from "../path.mjs";
import {emptyDir} from "../utils.mjs"


export const css_clean =  async () => {
    return emptyDir(buildpath.css.dest);
}
