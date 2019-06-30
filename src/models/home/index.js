import Taro from '@tarojs/taro'
import {
  updateStateByReplace,
  updateStateFieldsByCover,
  updateStateFieldsByExpand
} from '../../utils/commonReducers'

export default {
  namespace: 'home',
  state: {
    index: 'hello',
    shouldBeCover: 'beforeCover',
    shouldBeExpend: [1, 2, 3],
    shouldBeExpendToo: { a: 1, b: 2 }
  },
  effects: {
    *init({ payload }, { all, call, put, select }) {}
  },
  reducers: {
    updateStateByReplace,
    updateStateFieldsByCover,
    updateStateFieldsByExpand
  },
  subscriptions: {
    setup({dispatch, history}, done) {
      
    }
  }
}
