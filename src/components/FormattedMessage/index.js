import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { Text } from '@tarojs/components'
import { formatMessage } from './../../utils/locale'

// @ts-ignore
@connect(({ global: { locale } }) => ({ locale }))
class FormattedMessage extends Component {
  render() {
    const { localeId: id, defaultMessage, style } = this.props
    const text = formatMessage({ id, defaultMessage })
    return <Text style={style}>{text}</Text>
  }
}

FormattedMessage.defaultProps = {
  localeId: '',
  defaultMessage: '',
  style: {}
}

export default FormattedMessage
