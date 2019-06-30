import Taro from '@tarojs/taro'
import config from './../config'
import { isH5 } from './../utils/getClientType'
import isPlainObject from './../utils/isPlainObject'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

/**
 * 获取用户 Token 如果有的话
 * @returns {string | null}
 */
function getUserToken() {
  return Taro.getStorageSync('token')
}

/**
 * 生成默认 请求 header
 * @returns {Object.<>}
 */
function genHeader() {
  const defaultHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  if (getUserToken()) {
    return Object.assign({}, defaultHeader, { Authorization: getUserToken() })
  }
  return defaultHeader
}

/**
 * 生成请求参数
 * @param {object | string} opt - 用户输入的 opt
 * @returns {object}
 */
function mergeOpt(opt) {
  /**
   * 请求 opt 参数默认值
   */
  const request_opt_preset = {
    data: {},
    header: genHeader(),
    method: 'GET'
  }
  /**
   * @param {string | boolean} jsonp - 使用 jsonp，且使用此值作为回调函数名
   * @param {string='same-origin' } mode - 是否允许跨域请求。有效值：no-cors, cors, same-origin
   * @param {string='omit'} credentials - 是否携带 Cookie。有效值：include, same-origin, omit
   * @param {string='default'} cache - 缓存模式。有效值：default, no-cache, reload, force-cache, only-if-cached
   *
   */
  const request_opt_preset_h5 = {
    credentials: 'include'
  }

  // 当参数只是一个字符串的时候，我们就认为是使用 'GET' 请求
  if (typeof opt === 'string') {
    const data = Object.assign({}, request_opt_preset, {
      url: `${config.url_base}${opt}`
    })
    if (isH5()) {
      return Object.assign({}, request_opt_preset_h5, data)
    }
    return data
  }

  // 如果是对象形式的参数
  let { url } = opt
  url = `${config.url_base}${url}`
  if (isH5()) {        
    return Object.assign({}, request_opt_preset, request_opt_preset_h5, opt, {
      url
    })
  }
  return Object.assign({}, request_opt_preset, opt, { url })
}

function isShowLoading(opt) {
  if (typeof opt === 'string') return false
  if (isPlainObject(opt) && opt && opt.isShowLoading) return true
  return false
}

/**
 * 用 Taro.request 封装的请求数据的接口
 * @tutorial <https://nervjs.github.io/taro/docs/apis/network/request/request.html>
 * @param {{url: string}} opt - 请求参数, 如果是 "GET" 请求，可以只传一个字符串路径
 * @property {string} opt.url - 请求路径 'uer/list'
 * @property {object | string | arrayBuffer} [opt.data] - 请求数据
 * @property {object} [header] - 请求附加 header
 * @property {string='GET'} method - 请求方法, （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
 * @property {boolean=false} isShowLoading - 请求数据的时候是否显示 Lodaing
 */
export default function request(opt) {
  if (isShowLoading(opt)) {
    Taro.showLoading({ title: '数据加载中...' })
  }
  console.log(mergeOpt(opt), 'merged opt.................')
  return Taro.request(mergeOpt(opt))
    .then(res => {
      if (isShowLoading(opt)) {
        Taro.hideLoading()
      }

      let { statusCode, data } = res
      if (statusCode >= 200 && statusCode < 300) {
        return data
      } else if (statusCode) {
        Taro.showToast({ title: `${codeMessage[statusCode]}`, icon: 'none' })
      } else {
        Taro.showToast({ title: `获取数据失败`, icon: 'none' })
      }
    })
    .catch(e => {
      Taro.showToast({ title: `获取数据失败`, icon: 'none' })
    })
}
