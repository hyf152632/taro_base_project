/**
 * 获取当前并返回当前的客户端类型
 * @returns {string} weapp | swan | alipay | h5 | rn | tt
 */
export default function getClientType() {
    return process.env.TARO_ENV
}

/**
 * 判断当前的客户端类型是否为 H5
 * @return {boolean}  true | false
 */
export function isH5(){
    return getClientType() === 'h5'
}

/**
 * 判断当前的客户端类型是否为 weapp
 * @return {boolean} true | false
 */
export function isWeapp() {
    return getClientType() === 'weapp'
}

/**
 * 判断当前的客户端类型是否为 alipay
 * @return {boolean} true | false
 */
export function isAlipay() {
    return getClientType() === 'alipay'
}


