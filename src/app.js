import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
// 此文件中定义的变量可以覆盖 taro-ui 中定义的默认变量
import './styles/themes/custom-taro-ui-variables.scss'
import store from './store'
import Index from './pages/home/index'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
    
  // @ts-ignore
  config = {
    // pages 数组的第一项代表小程序的初始页面（首页）。
    // 小程序中新增/减少页面，都需要对 pages 数组进行修改
    pages: [
      'pages/home/index',      
      'pages/helpCenter/index',
      'pages/cate/index',
      'pages/cart/index',
      'pages/user/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#CB263F",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "./assets/img/tab-bar/home.png",
        selectedIconPath: "./assets/img/tab-bar/home-active.png"
      }, {
        pagePath: "pages/cate/index",
        text: "商城",
        iconPath: "./assets/img/tab-bar/cate.png",
        selectedIconPath: "./assets/img/tab-bar/cate-active.png"
      },
        {
          pagePath: "pages/cart/index",
          text: "购物车",
          iconPath: "./assets/img/tab-bar/cart.png",
          selectedIconPath: "./assets/img/tab-bar/cart-active.png"
        },
        {
          pagePath: "pages/user/index",
          text: "我的",
          iconPath: "./assets/img/tab-bar/user.png",
          selectedIconPath: "./assets/img/tab-bar/user-active.png"
        }
      ]
    }
  }
  globalData =  {
    store
  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
