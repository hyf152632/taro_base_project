import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import { connect } from '@tarojs/redux'
import Authorized from '@/components/Authorized'
import {isH5, isWeapp} from '@/utils/getClientType'
import FormattedMessage from '@/components/FormattedMessage'
import {setLocale} from '@/utils/locale'
import Counter from './components/Counter'

// @ts-ignore
import styles from './index.module.scss'

@connect(({home, global: {locale}}) => ({home, locale}))
class Index extends Component {
  state = {
    isShouldChangeColor: false,
  }
    config = {
    navigationBarTitleText: '首页'
  }

  componentDidShow () { 

    this.testDispatch()    
  }
  
  testDispatch(){
    const {dispatch} = this.props
        
    Promise.resolve(dispatch({
      type: 'index/updateStateFieldsByExpand',
      payload: {
        shouldBeExpend: [4,5,6],
        shouldBeExpendToo: {c: 3, d: 4}
      },
      desc: 'updateStateByReplace'
    })).catch(e => console.error(e))
  }
  jumpTo(e) {
    if(e) e.stopPropagation()

    const locale = 'en-US'

    if(isH5()) {      
      window.location.href = `/#/pages/helpCenter/index?locale=${locale}`      
    }

    if(isWeapp()) {      
      Taro.navigateTo({
        url: 'pages/helpCenter/index'
    })     
    }    
  }
  changeLocale = () => {
    
    let {locale} = this.props

    setLocale(locale === 'zh-CN' ? 'en-US' : 'zh-CN')
  }
  toggleCounterColor = () => {
    this.setState({
      isShouldChangeColor: !this.state.isShouldChangeColor
    })
  }
  renderHeader = () => {
    return <View>Header</View>
  }
  render () {
    const {isShouldChangeColor} = this.state

    const footer = <View>Footer</View>

    return (
      <View className={styles.wrapper}>        
        <View>{this.renderHeader()}</View>                
        <Button  onClick={this.jumpTo}>帮助中心</Button>
        <Button onClick={this.toggleCounterColor}>change counter color</Button>        
        <Counter isShouldChangeColor={isShouldChangeColor} />
        <FormattedMessage localeId='menu.welcome' defaultMessage='huanying' style={{color: 'blue'}} />
        <Button onClick={this.changeLocale}>切换语言</Button>
        <View><AtRate value={3.1} /></View>
        <Authorized noMatch={<View>没有权限</View>}></Authorized>
        <View>{footer}</View>
      </View>
    )
  }
}

export default Index
