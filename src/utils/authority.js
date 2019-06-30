/**
 * 权限验证
 * @param {string | string[]} authority - 权限类型
 */
export function getAuthority(authority) {
  // TODO 根据真实的权限配置表，判断权限
  if (typeof authority !== 'string' && !Array.isArray(authority)) {
    return false
  }

  // const authoritys = typeof authority === 'string' ? [authority] : authority

  // return authoritys.find(i => true)
  return true
}

export default {
  getAuthority
}
