import Taro from '@tarojs/taro'
import config from './../config'
import isPlainObject from './isPlainObject'
import log from './log'
import enus from './../locales/en-US'
import zhcn from './../locales/zh-CN'

/**
 * @type {Object.<string, any>} - 所有多语言对象数组
 */
const localeStore = { ['en-US']: enus, ['zh-CN']: zhcn }

/**
 * 获取系统语言
 * @returns {string} 系统语言字符串
 */
export function getSystemLanguage() {
  const { locale_default } = config
  let systemInfo
  try {
    systemInfo = Taro.getSystemInfoSync()
  } catch (e) {
    return locale_default
  }
  if (!systemInfo) {
    return locale_default
  }
  return systemInfo.language
}

/**
 * 获取多语言文本
 * @param {{id: string, defaultMessage?: string}} obj - 多语言参数
 * @returns {string}
 *
 */
export function formatMessage(obj) {
  const defaultErrorReturnStr = '获取文本错误'

  if (!isPlainObject(obj)) {
    return defaultErrorReturnStr
  }

  try {
    const { id, defaultMessage } = obj

    const currentLocale = getLocale()

    const isGetMessage = localeStore[currentLocale]
      ? localeStore[currentLocale][id]
      : false

    if (isGetMessage) return isGetMessage

    if (defaultMessage) return defaultMessage

    return defaultErrorReturnStr
  } catch (e) {
    log({ type: 'error', content: `获取多语言 item 失败：${e}` })
    return defaultErrorReturnStr
  }
}

/**
 * 获取当前的多语言类型
 * @returns {string}
 */
export function getLocale() {
  const {
    globalData: {
      store: { getState }
    }
  } = Taro.getApp()
  const {
    global: { locale }
  } = getState()

  return locale
}

/**
 * 设置 locale
 * @param {string} locale - 多语言 item
 */
export function setLocale(locale) {
  const {
    globalData: {
      store: { dispatch }
    }
  } = Taro.getApp()
  dispatch({
    type: 'global/updateStateFieldsByCover',
    payload: {
      locale
    },
    desc: 'change locale'
  })
}


export default {
  getSystemLanguage,
  formatMessage,
  getLocale,
  setLocale  
}
