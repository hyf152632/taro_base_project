import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import styles from './Counter.module.scss'


function Counter({ initialCount, isShouldChangeColor }) {
  const [count, setCount] = useState(initialCount)
  
  return (
    <View>
      <View className={`${isShouldChangeColor ? styles.counter : ''}`}>Count: {count}</View>
      <Button onClick={() => setCount(initialCount)}>reset</Button>
      <Button onClick={() => setCount(prevCount => prevCount - 1)}>-</Button>
      <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
    </View>
  )
}

Counter.defaultProps = {
  initialCount: 0,
  isShouldChangeColor: false
}
export default Counter
