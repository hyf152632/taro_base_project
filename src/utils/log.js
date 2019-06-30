import isPlainObject from './isPlainObject'

/**
 * @typedef {Object.<string, any>} logOpt - log 函数参数
 * @property {string} [type="log"] - log 类型 可选的值包括： log | info | error | dir
 * @property {any} content - log 内容
 */

/**
 * 统一的打印日志函数， 只在开发环境下打印 log 类型的日志，生产环境下屏蔽 log 类型日志，只保留 error 类型日志
 * @param {logOpt} opt - log 参数
 */
export default function log(opt) {
  if (!isPlainObject(opt)) {
    console.error('log fun get inValid param.')
    return
  }

  const isDevMode = process.env.NODE_ENV === 'development'

  const { type = 'log', content = '' } = opt

  const validLogType = ['log', 'info', 'error', 'dir']
  const isValidLogType = type && validLogType.find(i => i === type)

  if (isDevMode) {
    if (isValidLogType) {
      return console[type](content)
    }
    console.error('log fun get inValid param.')
    return
  }

  if (type === 'error') {
    console[type](content)
  }
}
