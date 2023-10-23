import {getBanner} from "../utils.mjs";
import buildpath from "../path.mjs";

export default {
    banner: getBanner(),
    format: 'umd',
    name: buildpath.js.name,
    globals: {
        'jquery': 'jQuery'
    },
    sourcemap: true
}
