import {getBanner} from "../build.utils.mjs";
import buildpath from "../build.path.mjs";

export default {
    banner: getBanner(),
    format: 'umd',
    name: buildpath.js.name,
    globals: {
        'jquery': 'jQuery'
    },
    sourcemap: true
}
