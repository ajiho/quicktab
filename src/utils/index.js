export default {
  /**
   * 通过字符串创建节点
   * @param htmlStr
   * @returns {Element}
   */
  createNode(htmlStr) {
    const node = document.createElement('div')
    node.innerHTML = htmlStr
    return node.firstChild
  },

  //防抖
  debounce(func, wait = 500) {
    let timeout

    return function () {
      const context = this
      const args = arguments

      clearTimeout(timeout)
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  },

  // 判断iframe是否跨域
  canAccessIFrame(iframe) {
    if (!iframe.contentWindow || !iframe.contentDocument) {
      return false
    }
    return true
  },

  /**
   * 给一个元素的某些特定后代元素设置属性
   * @param {Element|String} element  需要设置样式的元素,可以是dom对象也可以是dom字符串
   * @param {Array} selectorArr
   */
  setProperty(element, selectorArr, name, value) {
    if (!Array.isArray(selectorArr)) {
      console.error('Invalid arguments')
      return
    }

    const type = !(element instanceof Element)

    if (type) {
      const tempElement = document.createElement('div')
      tempElement.innerHTML = element
      element = tempElement
    }

    element.querySelectorAll(selectorArr).forEach((tabBarItem) => {
      tabBarItem.style.setProperty(name, value)
    })

    return type ? element.innerHTML : element
  },

  sprintf(_str, ...args) {
    let flag = true
    let i = 0

    const str = _str.replace(/%s/g, () => {
      const arg = args[i++]

      if (typeof arg === 'undefined') {
        flag = false
        return ''
      }
      return arg
    })

    return flag ? str : ''
  },

  isStr(str) {
    return Object.prototype.toString.call(str) === '[object String]'
  },

  //数组对象去重
  arrUnique(arr, objKey) {
    //临时数组
    let temp = []
    return arr.reduce(function (prev, curr) {
      if (temp.indexOf(curr[objKey]) === -1) {
        temp.push(curr[objKey])
        prev.push(curr)
      }
      return prev
    }, [])
  },

  // 类似jQuery的$(document).ready(function () {});
  ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback)
    } else {
      callback()
    }
  },

  //可以让单击事件具备双击的能力
  handleSingleAndDoubleClick(
    callbacks,
    { enableDbClick = true, delay = 200 } = {},
  ) {
    let clicks = 0
    let timer = null
    const { click, dbclick } = callbacks

    return function (event) {
      const preventAndstop = (type) => {
        const { preventDefault = true, stopPropagation = true } = type
        if (preventDefault) event.preventDefault()
        if (stopPropagation) event.stopPropagation()
      }

      const callBack = (type) => {
        const { handle } = type
        if (typeof handle === 'function') {
          handle.call(this, event)
        }
      }

      if (enableDbClick === true) {
        clicks++
        if (clicks === 1) {
          //单击

          preventAndstop(click)

          timer = setTimeout(() => {
            callBack(click)
            clicks = 0
          }, delay)
        } else {
          preventAndstop(dbclick)
          clearTimeout(timer)
          callBack(dbclick)
          clicks = 0
        }
      } else {
        preventAndstop(click)
        callBack(click)
      }
    }
  },

  extend() {
    let options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {}, //第一个参数
      i = 1,
      length = arguments.length,
      deep = false

    // 处理深度复制情况
    if (typeof target === 'boolean') {
      deep = target

      // 跳过布尔值和目标
      target = arguments[i] || {}
      i++
    }

    // 当目标是字符串或其他东西时处理大小写（可能在深度复制中）
    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {}
    }

    // 如果只传递一个参数，则扩展jQuery本身
    if (i === length) {
      target = this
      i--
    }

    for (; i < length; i++) {
      // 仅处理非null/未定义的值
      if ((options = arguments[i]) != null) {
        // 延伸基础对象
        for (name in options) {
          copy = options[name]

          // 防止Object.prototype污染
          // 防止无休止的循环
          if (name === '__proto__' || target === copy) {
            continue
          }

          // 如果我们正在合并普通对象或数组，则重复出现
          if (
            deep &&
            copy &&
            (this.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
          ) {
            src = target[name]

            // 确保源值的类型正确
            if (copyIsArray && !Array.isArray(src)) {
              clone = []
            } else if (!copyIsArray && !this.isPlainObject(src)) {
              clone = {}
            } else {
              clone = src
            }
            copyIsArray = false

            // 从不移动原始对象，而是克隆它们
            target[name] = this.extend(deep, clone, copy)

            // 不要引入未定义的值
            // } else if (copy !== undefined) {
          } else {
            target[name] = copy
          }
        }
      }
    }

    // 返回修改后的对象
    return target
  },

  //用于判断一个对象是否是纯粹的 JavaScript 对象（即不是 DOM 对象、函数、数组等）。具体作用是检查对象是否通过对象字面量或 new Object() 创建，且其原型链上只包含标准的 Object 原型
  isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null || obj instanceof Array) {
      return false
    }

    const prototype = Object.getPrototypeOf(obj)
    return prototype === Object.prototype || prototype === null
  },

  isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]'
  },

  isJSONString(str) {
    try {
      const result = JSON.parse(str)
      return (
        Object.prototype.toString.call(result) === '[object Object]' ||
        Array.isArray(result)
      )
    } catch (e) {
      return false
    }
  },

  parseAttributeValue(value) {
    try {
      return JSON.parse(value)
    } catch (error) {
      // 尝试获取全局函数
      const globalFunction = window[value]
      if (typeof globalFunction === 'function') {
        return globalFunction
      }
      return value
    }
  },

  updateObjDataByKey(obj, objKey, newValue) {
    const keyList = objKey.split('.')
    const lastKey = keyList[keyList.length - 1]
    keyList.reduce((pre, item) => {
      if (item === lastKey) pre[item] = newValue
      return pre[item]
    }, obj)
    return obj
  },

  getObjDataByKey(obj, objKey) {
    const keyList = objKey.split('.')
    return keyList.reduce((currentObj, key) => {
      if (currentObj && typeof currentObj === 'object' && key in currentObj) {
        return currentObj[key]
      } else {
        return undefined // 返回 undefined 表示未找到相应的值
      }
    }, obj)
  },

  //对几个需要转换成字符串属性进行处理
  stringTypeOptions(obj) {
    const objKey = ['minHeight', 'height', 'width']
    objKey.forEach((item) => {
      this.updateObjDataByKey(
        obj,
        item,
        this.getObjDataByKey(obj, item).toString(),
      )
    })
    return obj
  },

  parseOptions(element, options, prefix = '') {
    for (const key in options) {
      const attrKey = prefix + key
      const dataVal = this.parseAttributeValue(element.getAttribute(attrKey))
      if (this.isObject(options[key])) {
        //如果是对象
        dataVal === false
          ? (options[key] = false)
          : this.parseOptions(element, options[key], attrKey + '-')
      } else {
        if (dataVal !== null) {
          options[key] = dataVal
        }
      }
    }
    return options
  },
  hasDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
      if (array.indexOf(array[i]) !== i) {
        return true
      }
    }
    return false
  },

  onResize(element, callback) {
    const resizeObserver = new ResizeObserver((entries) => {
      // 处理大小变化的回调函数
      entries.forEach((entry) => {
        // entry.target 是发生大小变化的元素 entry.contentRect 包含元素的新大小信息
        if (!entry.target.firstResize) {
          //优化:第一次不执行
          entry.target.firstResize = true
          return
        }
        callback.call(element, entry.contentRect)
      })
    })
    resizeObserver.observe(element)
  },
  // 获取开启和激活的选项
  getEnabledAndSortedOpsKey(options, keyClassMap) {
    return Object.keys(options)
      .filter((key) => {
        if (Object.keys(keyClassMap).includes(key) && options[key] !== false) {
          return true
        }
        return false
      })
      .sort((a, b) => options[a].order - options[b].order)
  },
  //实现类似jquery的prevAll
  prevAll(element) {
    const result = []
    let currentElement = element.previousElementSibling

    while (currentElement) {
      result.push(currentElement)
      currentElement = currentElement.previousElementSibling
    }

    return result
  },
  //实现类似jquery的nextAll
  nextAll(element) {
    const result = []
    let currentElement = element.nextElementSibling

    while (currentElement) {
      result.push(currentElement)
      currentElement = currentElement.nextElementSibling
    }

    return result
  },

  // 获取元素在父元素中的index
  index(el) {
    let index = 0
    if (!el || !el.parentNode) {
      return -1
    }
    // previousElementSibling：上一个兄弟元素
    while (el && (el = el.previousElementSibling)) {
      index++
    }
    return index
  },

  // 触发动画
  animate(prevRect, target) {
    let ms = 300
    if (ms) {
      let currentRect = target.getBoundingClientRect()
      if (prevRect.nodeType === 1) {
        prevRect = prevRect.getBoundingClientRect()
      }

      target.style.setProperty('transition', 'none')
      target.style.setProperty(
        'transform',
        `translate3d(${prevRect.left - currentRect.left}px,${
          prevRect.top - currentRect.top
        }px,0)`,
      )

      target.offsetWidth // 触发重绘

      target.style.setProperty('transition', `transform ${ms}ms`)
      target.style.setProperty('transform', 'translate3d(0,0,0)')

      // 时间到了之后把transition和transform清空
      clearTimeout(target.animated)
      target.animated = setTimeout(function () {
        target.style.setProperty('transition', '')
        target.style.setProperty('transform', '')
        target.animated = false
      }, ms)
    }
  },
}
