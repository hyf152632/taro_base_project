import isPlainObject from './isPlainObject'

// reducer 函数
// 采用 “轻reducer, 重action" 的形式
// 这里的 reducer 基本上只是对 state 的简单替换和字段的更新扩展。

/**
 * @typedef {Object.<string, any>} Action - dispatch action, 实际上就是一个 object
 * @property {string} type - action 对象必须有一个 type 属性
 * @property {any} payload - action 携带的数据
 * @property {string} desc - action 描述, 用来说明 action 的作用，方便查看 redux devtool 打印日志
 */

/**
 * 用整体替换的方式更新 state
 * @param {any} state - store 对应的单个 state
 * @param {Action} action - 发起的 action
 */
export function updateStateByReplace(state, action) {
  const { payload } = action
  return payload
}

/**
 * 覆盖 state 的某些字段
 * @param {*} state - store 对应的单个 state
 * @param {Action} action - 发起的 action
 */
export function updateStateFieldsByCover(state, action) {
  const { payload } = action

  if (!isPlainObject(payload)) return state

  return Object.entries(payload).reduce((acc, curr) => {
    const [key, value] = curr
    return Object.assign({}, acc, { [key]: value })
  }, state)
}

/**
 * 扩展 state 的某些字段， 如果可以扩展的话(比如对象类型和数组类型)
 * @param {*} state - store 对应的单个 state
 * @param {Action} action - 发起的 action
 */
export function updateStateFieldsByExpand(state, action) {
  const { payload } = action

  if (!isPlainObject(payload)) return state

  return Object.entries(payload).reduce((acc, curr) => {
    const [key, value] = curr

    /**
     * 判断是否为可扩展的对象，也就是是否为数组或者对象
     * @param  {array | Object.<string, any>} param 参数
     * @returns {boolean}
     */
    const isExtendable = param => isPlainObject(param) || Array.isArray(param)
    const isValueExtendable = isExtendable(value)
    const isStateFieldExtendable = isExtendable(acc[key])
    if (isValueExtendable && isStateFieldExtendable) {
      if (Array.isArray(acc[key]) && Array.isArray(value)) {
        return Object.assign({}, state, { [key]: [...acc[key], ...value] })
      }

      return Object.assign({}, acc, { [key]: { ...acc[key], ...value } })
    }
    return acc
  }, state)
}

export default {
  updateStateByReplace,
  updateStateFieldsByCover,
  updateStateFieldsByExpand
}
