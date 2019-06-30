import Taro, { useState, useEffect } from '@tarojs/taro'

/**
 * 这个hook允许你轻易的检测一个元素是否在屏幕上可见，以及指定有多少元素应该被显示在屏幕上。
 * 当用户滚动到某个特定区域，非常适合懒加载图片或者触发动画。
 * @example
 * //  // 用来储存我们想要检测是否在屏幕中的元素
 * //  const ref = useRef();
 * // // 调用hook并传入ref和root margin
 * // // 在这种情况下，只有当元素多大于300px的元素才会在屏幕上显示
 *  //   const onScreen = useOnScreen(ref, '-300px');
 * @param {Element} ref - dom 元素引用
 * @param {string} rootMargin - 距离
 */
function useOnScreen(ref, rootMargin = '0px') {
    // 存储元素是否可见的状态
    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // 当 observer 回调出发时更新状态
                setIntersecting(entry.isIntersecting)
            },
            {
                rootMargin
            }
        )
        if(ref.current) {
            observer.observe(ref.current)
        }
        return () => {
            observer.unobserve(ref.current)
        }
    }, [])

    return isIntersecting
}

export default useOnScreen