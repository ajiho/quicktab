import buildpath from "../build.path.mjs";
import {emptyDir} from "../build.utils.mjs"


export const js_clean =  async () => {
    return emptyDir(buildpath.js.dest);
}
