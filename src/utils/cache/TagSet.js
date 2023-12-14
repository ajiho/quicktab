/**
 *  标签集合
 */
class TagSet {
  constructor(tag, cache) {
    //标签的缓存Key
    this.tag = Array.isArray(tag) ? tag : [tag]

    //缓存句柄
    this.handler = cache
  }

  set(key, value, expire = null) {
    this.handler.set(key, value, expire)

    this.append(key)
  }

  append(key) {
    for (const tag of this.tag) {
      //读取标签
      const tagItems = this.handler.getTagItems(tag)

      //判断标签是否在数组里,不再就直接加入
      if (!tagItems.includes(key)) {
        //加入数组
        tagItems.push(key)

        //重新设置回去
        this.handler.set(tag, tagItems)
      }
    }
  }

  clear() {
    for (const tag of this.tag) {
      const tagItems = this.handler.getTagItems(tag)

      //分别遍历删除所有的缓存
      for (const cacheKey of tagItems) {
        this.handler.delete(cacheKey)
      }
      //再删除标签
      this.handler.delete(tag)
    }
  }
}

export default TagSet
