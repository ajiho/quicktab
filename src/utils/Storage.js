/**
 * --------------------------------------------
 * BSA Storage.js
 * License MIT
 * --------------------------------------------
 */

class Storage {
    constructor(type = 1) {//type:1 则是sessionStorage type:2
        this.type = type;
    }

    /**
     * 设置缓存
     * @param name 缓存的key
     * @param data 缓存数据
     */
    set(name, data) {
        this.remove(name);
        if (this.type === 1) {
            sessionStorage.setItem(name, JSON.stringify(data));
        } else if (this.type === 2) {
            localStorage.setItem(name, JSON.stringify(data));
        }
    }


    /**
     * 获取缓存
     * @param name 缓存的key
     * @returns {any}
     */
    get(name) {
        if (this.type === 1) {
            return JSON.parse(sessionStorage.getItem(name))
        } else if (this.type === 2) {
            return JSON.parse(localStorage.getItem(name))
        }
    }

    /**
     * 删除缓存
     * @param name
     */
    remove(name) {
        if (this.type === 1) {
            sessionStorage.removeItem(name);
        } else if (this.type === 2) {
            localStorage.removeItem(name);
        }
    }



    /**
     * 同时删除 sessionStorage和localStorage缓存
     * @param name
     */
    static removeBoth(name) {
        sessionStorage.removeItem(name);
        localStorage.removeItem(name);
    }

}

export default Storage
