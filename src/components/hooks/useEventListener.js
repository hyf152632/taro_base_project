import Taro, {useEffect, useRef} from '@tarojs/taro'
import {isH5} from './../../utils/getClientType'

/**
 * 通用的事件监听 hook
 * @example
 * // useEventListener('mousemove', handler)
 * @param {string} eventName - 事件名称
 * @param {Function} handler - 事件回调
 * @param {Element} element - 被注册事件的 ele 元素
 * 
 */
function useEventListener(eventName, handler, element = global) {
    if(!isH5()) {
        return 
    }    
    // 创建一个存储处理方法的 ref
    const savedHandler = useRef()

    // 当处理函数改变的时候更新 ref.current 的属性
    // 这样可以使我们总是获取到最新的处理函数
    // 并且不需要在它的effect以来数组中传递
    // 并且避免有可能每次渲染重新引起 effect 方法

    useEffect(() => {        
        // @ts-ignore
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {

        // 确认是否支持 addEventListener
        const isSupported = element && element.addEventListener
        if(!isSupported) return 

        // 创建一个调用存储在 ref 中函数的e事件监听
        const eventListener = event => savedHandler.current(event)

        // 添加事件监听
        element.addEventListener(eventName, eventListener)

        // 在 cleanup 的回调中，清除事件监听
        return () => {
            
            element.removeEventListener(eventName, eventListener)
        }
    }, [eventName, element]) // 当元素或者绑定事件改变时， 重新运行
}

export default useEventListener
