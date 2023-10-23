import buildpath from "../path.mjs";
import {emptyDir} from "../utils.mjs"


export const js_clean =  async () => {
    return emptyDir(buildpath.js.dest);
}
