/* global bootstrap */


import CONST from './constants'


class Quicktab {

    //实例对象
    static instances = [];


    constructor(element, config) {

        //当前传递的元素
        this.element = element

        //参数合并
        this.config = {
            ...CONST.DEFAULTS,
            ...config,
        }

        //初始化
        this._init();
    }


    _init() {
        const self = this;

    }





}

export default Quicktab
