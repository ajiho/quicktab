import * as v from 'valibot'

export default {
  /**
   * 通过字符串创建节点
   * @param htmlStr
   * @returns {Element}
   */
  createNode(htmlStr) {
    const node = document.createElement('div')
    node.innerHTML = htmlStr.trim() // 去除字符串两端的空白
    return node.firstElementChild
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

  /**
   * 判断是否是同源的、可以操作 contentWindow 对象的 iframe
   * @param {HTMLIFrameElement} iframe - 要检查的 iframe 元素
   * @returns {boolean} - 如果是同源且可以操作 contentWindow 返回 true，否则返回 false
   */
  isSameOriginIframe(iframe) {
    try {
      // 尝试获取 iframe 的 contentWindow
      const contentWindow = iframe.contentWindow

      // 检查是否有跨域安全性限制
      return contentWindow.location.origin === window.location.origin
    } catch (error) {
      // 处理可能的异常，比如跨域安全性限制
      return false
    }
  },

  /**
   * 给一个元素的某些特定后代元素设置属性
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

  isJSON(str) {
    try {
      JSON.parse(str)
      return true
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

  //解析data上的选项
  parseDataOptions(element, defaultOption, prefix = '', options = {}) {
    for (const key in defaultOption) {
      const attrKey = prefix + key

      let attrVal = element.getAttribute(attrKey)
      let parseVal = this.parseAttributeValue(attrVal)

      if (typeof defaultOption[key] !== 'object') {
        if (attrVal !== null) {
          //如果获取到值了
          options[key] = parseVal
        }
      } else {
        this.parseDataOptions(
          element,
          defaultOption[key],
          attrKey + '-',
          (options[key] = {}),
        )

        if (this.isEmptyObject(options[key])) {
          delete options[key]
        }
      }
    }
    return options
  },

  isEmptyObject(obj) {
    for (let key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        return false
      }
    }
    return true
  },

  //判断数组的对象元素中的某个key是否具有唯一值
  hasDuplicateValues(arr, key) {
    const valueSet = new Set()

    for (const obj of arr) {
      const value = obj[key]

      if (valueSet.has(value)) {
        // 发现重复的值
        return true
      }

      valueSet.add(value)
    }

    // 没有重复的值
    return false
  },

  onResize(element, callback, options) {
    const Default = {
      //是否立即执行
      immediate: false,
      //监听变化类型 width height both
      type: 'both',
    }

    options = Object.assign(Default, typeof options === 'object' && options)

    const resizeObserver = new ResizeObserver((entries) => {
      // 处理大小变化的回调函数
      entries.forEach((entry) => {
        if (options.immediate === false) {
          // entry.target 是发生大小变化的元素 entry.contentRect 包含元素的新大小信息
          if (!entry.target.firstResize) {
            //优化:第一次不执行
            entry.target.firstResize = true
            return
          }
        }
        // 获取当前元素的宽度和高度
        const newWidth = entry.contentRect.width
        const newHeight = entry.contentRect.height

        // 获取之前保存的宽度和高度，如果没有保存过则设置为初始值0
        const oldWidth = entry.target.__resizeObserverLastWidth || 0
        const oldHeight = entry.target.__resizeObserverLastHeight || 0

        // 保存当前宽度和高度以备下次比较
        entry.target.__resizeObserverLastWidth = newWidth
        entry.target.__resizeObserverLastHeight = newHeight

        // 只在宽度变化时触发处理逻辑
        if (newWidth !== oldWidth && newHeight === oldHeight) {
          options.type === 'width' && callback.call(element, entry)
        }

        if (newHeight !== oldHeight && newWidth === oldWidth) {
          options.type === 'height' && callback.call(element, entry)
        }

        options.type === 'both' && callback.call(element, entry)
      })
    })
    resizeObserver.observe(element)
    return resizeObserver
  },

  // 获取开启和激活的选项
  getEnabledAndSortedOpsKey(options, keyClassMap) {
    return Object.keys(options)
      .filter((key) => {
        return (
          Object.keys(keyClassMap).includes(key) &&
          options[key].enable !== false
        )
      })
      .sort((a, b) => options[a].order - options[b].order)
  },

  isDOMElement(obj) {
    return obj instanceof Element || obj instanceof Document
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

  timeAgo(
    timestamp,
    customText = {
      second: '秒前',
      minutes: '分钟前',
      hours: '小时前',
      days: '天前',
      months: '月前',
      years: '年前',
    },
  ) {
    const seconds = Math.floor((Date.now() - Math.floor(timestamp)) / 1000)

    const minute = 60
    const hour = 60 * minute
    const day = 24 * hour
    const month = 30 * day
    const year = 365 * day

    if (seconds < minute) {
      return `${seconds} ${customText.second}`
    } else if (seconds < hour) {
      const minutes = Math.floor(seconds / minute)
      return `${minutes} ${customText.minutes}`
    } else if (seconds < day) {
      const hours = Math.floor(seconds / hour)
      return `${hours} ${customText.hours}`
    } else if (seconds < month) {
      const days = Math.floor(seconds / day)
      return `${days} ${customText.days}`
    } else if (seconds < year) {
      const months = Math.floor(seconds / month)
      return `${months} ${customText.months}`
    } else {
      const years = Math.floor(seconds / year)
      return `${years} ${customText.years}`
    }
  },
  //判断数字是否有小数点
  hasDecimal(number) {
    return !Number.isInteger(number)
  },

  // 通知程序
  notify(msg, type = 'error') {
    console[type](`Quicktab:${msg}`)
  },

  validate(Schema, input) {
    // #https://valibot.dev/guides/parse-data/
    const result = v.safeParse(Schema, input, {
      abortEarly: true,
      lang: 'zh-CN',
    })

    if (result.success) {
      return true
    } else {
      const flatErrors = v.flatten(result.issues).nested

      let error = ''

      Object.keys(flatErrors).forEach((key) => {
        error += `option: [${key}] ${flatErrors[key]}`
      })

      return error
    }
  },
}
