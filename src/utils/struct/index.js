import { type, define, validate, array, refine, number } from 'superstruct'
import Utils from '../index'

export default {
  validateOptions2(struct, options) {
    const [error] = validate(options, struct)
    if (error) {
      console.log({ error })
      let reason = `期望类型是${error.type}`
      if (error.myMessage) {
        reason = error.myMessage
      }
      return `options [${error.path.join(
        '-',
      )}] : ${reason},但接收的是${JSON.stringify(error.value)}`
    }
    return true
  },
  _validate(value, context, struct) {
    const [error] = validate(value, struct)
    if (error) {
      error.path = [...context.path, ...error.path]
      return error
    }
    return true
  },

  enums(param) {
    return define('enums', (value, context) => {
      if (!param.includes(value)) {
        return { myMessage: `值必须是${JSON.stringify(param)}其中之一` }
      }
      return true
    })
  },

  uniqueArray(param) {
    return refine(array(param), 'uniqueArray', (value) => {
      if (Utils.hasDuplicates(value)) {
        return { myMessage: `数组的值不能重复` }
      }
      return true
    })
  },

  //正数
  positive() {
    return refine(number(), 'positive', (value) => {
      if (value <= 0) return { myMessage: `必须是正数` }
      return true
    })
  },

  integer() {
    return refine(number(), 'integer', (value) => {
      if (!Number.isInteger(value)) return { myMessage: `必须是整数` }
      return true
    })
  },

  //正整数
  positiveInteger() {
    return refine(number(), 'positiveInteger', (value) => {
      if (!(Number.isInteger(value) && value > 0))
        return { myMessage: `必须是正整数` }
      return true
    })
  },

  validateObject(value, context, struct, errorMessage) {
    if (!Utils.isObject(value)) {
      return { myMessage: errorMessage }
    }
    return this._validate(value, context, type(struct))
  },

  object(struct) {
    return define('object', (value, context) => {
      return this.validateObject(value, context, struct, '必须是对象')
    })
  },

  falseOrObject(struct) {
    return define('false|Object', (value, context) => {
      if (value === false) {
        return true
      }
      return this.validateObject(value, context, struct, '必须是false|对象')
    })
  },
}
