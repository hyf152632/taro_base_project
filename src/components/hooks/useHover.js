import Taro, {useState, useRef, useEffect} from '@tarojs/taro'

/**
 * 监测一个鼠标是否移动到某个元素上。这个hook返回一个ref和一个布尔值，
 * 改值表示当前具有该ref的元素是否被hover。
 * 因此只需要将返回的ref添加到你想要监听hover状态的任何元素。
 * @example 
 * // const [hoverRef, isHovered] = useHover()
 * //
 * //return (
 * // <div ref={hoverRef}>
 * // {isHovered ? 'hover' : 'unHover'}
 * // </div>
 * )
 */
function useHover() {
    const [value, setValue] = useState(false);
  
    const ref = useRef(null);
  
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
  
    useEffect(
      () => {
        const node = ref.current;
        if (node) {
          node.addEventListener('mouseover', handleMouseOver);
          node.addEventListener('mouseout', handleMouseOut);
  
          return () => {
            node.removeEventListener('mouseover', handleMouseOver);
            node.removeEventListener('mouseout', handleMouseOut);
          };
        }
      },
      [ref.current] // 只有当ref改变时才会重新调用
    );
  
    return [ref, value];
  }

  export default useHover