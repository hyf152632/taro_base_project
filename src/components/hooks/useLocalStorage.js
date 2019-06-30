import Taro, {useState} from '@tarojs/taro'
import { interval } from 'rxjs';

/**
 * 将state中的数据同步到localstorage，以便页面刷新的时候保存状态。
 * 使用方法和useState类似，我们只要传入一个localstorage的值，以便在页面加载时默认使用该值，而不是指定的初始值。
 * @example
 * // 与useState相似，但是第一个参数是localstorage中的key值
 * //  const [name, setName] = useLocalStorage('name', 'Bob');
 *@param {string} key - localStorage 中对应的 key
 * @param {any} initialValue - 对应的初始值
 * @returns 值和设置值的方法
 */

function useLocalStorage(key, initialValue) {
    // State to store our value
    // 将初始状态传给 useState, 这样的逻辑指挥执行一次

    const [storedValue, setStoredValue] = useState(() => {
        try {
            // 通过 key 从localstorage中获取值
            const item = window.localStorage.getItem(key)
            // 如果没有返回初始值则解析存储的 json
            return item ? JSON.parse(item) : initialValue
        } catch(error) {
            // 如果报错了依旧返回初始值
            console.log(error)
            return initialValue
        }
    })

    // 返回 useState 的 setter 函数的包装版本，该函数将新的值保存到 localstorage 中
    const setValue = value => {
        try {
            // 允许值是一个函数，这样我们就有了和 useState 一样的 api
            const valueToStore = value instanceof Function ? value(storedValue) : value

            // 保存 state
            setStoredValue(valueToStore)

            // 保存到 localStorage
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            // 更高级实现的处理将会处理错误的情况
            console.log(error)
        }
    }

    return [storedValue, setValue]
}

export default useLocalStorage