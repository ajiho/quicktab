import TagSet from './TagSet'

class QuickCache {
  constructor(options = {}) {
    this.type = options.type || 'local' //默认驱动是 localStorage
    this.expire = options.expire || 0
    this.prefix = options.prefix || ''
    this.serialize = options.serialize || JSON.stringify
    this.deserialize = options.deserialize || JSON.parse
    this.storage = window[`${this.type}Storage`]
  }

  getKey(key) {
    return this.prefix + key
  }

  set(key, value, expire = null) {
    const cacheValue = {
      value,
      expire:
        expire || this.expire !== 0
          ? Date.now() + (expire || this.expire) * 1000
          : 0,
    }
    try {
      this.storage.setItem(this.getKey(key), this.serialize(cacheValue))
      return true
    } catch (error) {
      return false
    }
  }

  has(key) {
    return this.storage.getItem(this.getKey(key)) !== null
  }

  get(key, defaultValue = null) {
    const cacheValue = this.storage.getItem(this.getKey(key))
    if (cacheValue) {
      const parsedValue = this.deserialize(cacheValue)
      if (parsedValue.expire === 0 || parsedValue.expire >= Date.now()) {
        return parsedValue.value
      }
      this.delete(key)
    }
    return defaultValue
  }

  delete(key) {
    this.storage.removeItem(this.getKey(key))
  }

  clear() {
    this.storage.clear()
  }

  remember(key, value, expire = null) {
    const cachedValue = this.get(key)
    if (cachedValue !== null) {
      return cachedValue
    }

    if (typeof value === 'function') {
      //允许第二个参数是一个函数
      const computedValue = value()
      this.set(key, computedValue, expire)
      return computedValue
    }
    this.set(key, value, expire)
    return value
  }

  inc(key, step = 1) {
    const cachedValue = this.get(key, 0)
    if (typeof cachedValue === 'number') {
      this.set(key, cachedValue + step)
    }
  }

  tag(tag) {
    return new TagSet(tag, this)
  }

  dec(key, step = 1) {
    this.inc(key, -step)
  }

  //获取并删除缓存
  pull(key) {
    let value = this.get(key)
    this.delete(key)
    return value
  }

  push(key, value) {
    const cachedValue = this.get(key, [])
    if (Array.isArray(cachedValue)) {
      cachedValue.push(value)
      this.set(key, cachedValue)
    }
  }

  store(type) {
    return new this.constructor({
      type,
      expire: this.expire,
      prefix: this.prefix,
      serialize: this.serialize,
      deserialize: this.deserialize,
    })
  }

  getTagItems(tag) {
    return this.get(tag, [])
  }
}

export default QuickCache
