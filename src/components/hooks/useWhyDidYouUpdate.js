import Taro, {useRef, useEffect} from '@tarojs/taro'

/**
 * 这个hook让你更加容易观察到是哪一个prop的改变导致了一个组件的重新渲染。
 * @example
 * // useWhyDidYouUpdate('Counter', props)
 * @param {string} name - componentName
 * @param {Object.<string,any>} props - component props
 * @returns {void}
 */
function useWhyDidYouUpdate(name, props) {
    // 获取一个可变的 ref 对象,我们可以用来存储 props 并且在下一次 hook 运行的时候比较
    const previousProps = useRef()

    useEffect(() => {
        if(previousProps.current) {
            // 获取改变前后所有的 props 的 key 值
            const allKeys = Object.keys({...previousProps.current, ...props})
            
            // 使用这个对象去跟踪改变的 props
            const changesObj = {}

            // 通过key值进行循环

            allKeys.forEach(key => {
                if(previousProps.current[key] !== props[key]) {
                    changesObj[key] = {
                        from: previousProps.current[key],
                        to: props[key]
                    }
                }
            })

            if(Object.keys(changesObj).length) {
                console.log('[Why-did-you-update]', name, changesObj)
            }
        }

        // 将当前的 props 值保存在 previousProps 中， 以供下一次 hook 进行的时候使用
        previousProps.current = props
    })
}


export default useWhyDidYouUpdate