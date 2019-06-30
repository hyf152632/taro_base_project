import Taro, {useEffect, useRef} from '@tarojs/taro'

/**
 * 获取 state 或者 props 的前一个值
 * @example
 * // const [count, setCount] = useState(0)
 * // const prevCount = usePrevious(count)
 * 
 * @param {any} value - 需要保存的值 
 */

 function usePrevious(value) {
     const ref = useRef()

     useEffect(() => {
         ref.current = value
     }, [value])

     return ref.current
 }

 export default usePrevious