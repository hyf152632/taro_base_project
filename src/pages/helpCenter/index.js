import Taro, {Component} from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {View} from '@tarojs/components'
import {formatMessage, setLocale} from '@/utils/locale'

@connect(({global: {locale}}) => ({ locale}))
class HelpCenter extends Component {
    config = {
        navigationBarTitleText: '帮助中心'
      }        
    componentWillMount() {
        const {locale} = this.$router.params
        if(locale) {
            setLocale(locale)
        } else {
            
        }
    }
    render() {
        return (
            <View>{formatMessage({id: 'layout.help'})}</View>
        )
    }
}

export default HelpCenter