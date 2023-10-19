export default {
    //事件委托
    delegate(element, type, selector, fn, exceptSelector) {
        element.addEventListener(type, function (e) {
            let target = e.target;
            let currTarget = e.currentTarget;
            while (target !== currTarget && (target instanceof HTMLElement)) {
                if (target.matches(selector)) {
                    fn.call(target, e);
                    break;
                } else if (target.matches(exceptSelector)) {
                    break;
                }
                target = target.parentNode;
            }
        }, false);
    },


    /**
     * 原生js实现jq的siblings()方法
     * @param element
     * @param selector
     * @returns {*[]}
     */
    siblings(element, selector) {
        selector = selector || false;
        //先获取到当前传入的元素的所有父元素的子集
        let pChildren = element.parentNode.children;
        let eleMatch = [];
        //遍历把自己干掉
        for (let children of pChildren) {
            if (children instanceof HTMLElement) {
                if (selector) {//如果为真，说明传入选择器
                    if (children !== element && children.matches(selector)) {
                        eleMatch.push(children);
                    }
                } else {//没有传入
                    if (children !== element) {
                        eleMatch.push(children);
                    }
                }
            }
        }
        return eleMatch;
    },


    /**
     * 通过字符串创建节点
     * @param htmlStr
     * @returns {Element}
     */
    createNode(htmlStr) {
        let div = document.createElement('div');
        div.innerHTML = htmlStr;
        return div.children[0];
    },


    /**
     * 节流函数
     * @param func
     * @param wait
     * @returns {(function(...[*]): void)|*}
     */
    debounce(func, wait = 500) {
        let timeID;
        return function (...args) {
            if (timeID) clearTimeout(timeID);
            timeID = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        }
    },

    // 判断iframe是否跨域
    canAccessIFrame(iframe) {
        let html = null;
        try {
            // 浏览器兼容
            let doc = iframe.contentDocument || iframe.contentWindow.document;
            html = doc.body.innerHTML;
        } catch (err) {
            // do nothing
        }
        return (html !== null);
    },


    //判断是否为字符串
    isString(str) {
        return (typeof str == 'string') && str.constructor === String
    },


    deepExtend(out, ...arguments_) {
        if (!out) {
            return {};
        }

        for (const obj of arguments_) {
            if (!obj) {
                continue;
            }

            for (const [key, value] of Object.entries(obj)) {
                switch (Object.prototype.toString.call(value)) {
                    case '[object Object]':
                        out[key] = this.deepExtend(out[key], value);
                        break;
                    case '[object Array]':
                        out[key] = this.deepExtend(new Array(value.length), value);
                        break;
                    default:
                        out[key] = value;
                }
            }
        }

        return out;
    },

    //数组对象去重
    arrUnique(arr, objKey) {
        //临时数组
        let temp = [];
        return arr.reduce(function (prev, curr) {
            if (temp.indexOf(curr[objKey]) === -1) {
                temp.push(curr[objKey]);
                prev.push(curr);
            }
            return prev;
        }, []);
    },

    /**
     * 通过key更新obj中的指定数据
     * @param obj 更新值的对象
     * @param objKey 拼接后的key数据，string ‘.’符号拼接
     * @param newValue 更新的值
     * @returns {*} 返回更新后的数据
     */
    updateObjDataByKey(obj, objKey, newValue) {
        const keyList = objKey.split('.');
        const lastKey = keyList[keyList.length - 1];
        keyList.reduce((pre, item) => {
            if (item === lastKey) pre[item] = newValue;
            return pre[item];
        }, obj);
        return obj;
    }


}
