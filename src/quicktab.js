/* global bootstrap */
import {on} from 'jquery/src/event';


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

        on(document.querySelector('.box1'), 'click', function () {
            console.log('www')
        });

    }


}

export default Quicktab
