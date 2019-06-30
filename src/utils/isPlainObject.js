/**
 * 判断是否是一个普通的对象
 * @param {any} param
 * @returns {boolean}
 */
export default function(param) {
    return typeof param === 'object' && param !== null && !Array.isArray(param)
}