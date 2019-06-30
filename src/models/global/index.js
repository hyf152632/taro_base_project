import { getSystemLanguage } from './../../utils/locale'
import {
  updateStateByReplace,
  updateStateFieldsByCover,
  updateStateFieldsByExpand
} from '../../utils/commonReducers'

export default {
  namespace: 'global',
  state: {
    locale: getSystemLanguage() //默认的多语言
  },
  reducers: {
    updateStateByReplace,
    updateStateFieldsByCover,
    updateStateFieldsByExpand
  },
  subscriptions: {
    setup({dispatch, history}, done) {
      console.log(window.history, window.location)      
    }
  }
}
