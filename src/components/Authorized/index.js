import Taro from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {getAuthority} from './../../utils/authority'

/**
 * @typedef {Object.<string,any>} Props - 权限组件 props
 * @property {any} [children] - 被包裹的组件
 * @property {string[] | string} [authority] - 权限类型或权限类型列表
 * @property {any} [noMatch] - 权限类型不匹配时的组件
 * @returns {any} 
 */

 /**
  *  权限验证组件， 如果权限不匹配，则显示 noMath 组件 
  * @param {Props} props - 权限组件 props 
  */
function Authorized(props){
    const {children, authority, noMatch} = props

    if(!children) {
        return noMatch
    }
    
    const isValidAuth = getAuthority(authority)

    if(isValidAuth) {
        return <View>{children}</View>
    }

    return noMatch
}

Authorized.defaultProps = {
    children: null, //被包裹的组件
    authority: null,  //权限类型
    noMatch: null, // 权限不匹配时显示的内容
}

export default Authorized