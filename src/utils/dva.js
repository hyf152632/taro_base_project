import { create } from 'dva-core'
import { createLogger } from 'redux-logger'
import createLoading from 'dva-loading'
import { isH5 } from './../utils/getClientType'

// 数据持久化，存储在 seesionStorage 中， 可以配置为 localStorage
// https://www.npmjs.com/package/dva-model-persist
// import {persistEnhancer} from "dva-model-persist"

let registered

function createApp(opt) {
  opt.onAction = opt.onAction || []
  // redux日志
  if (process.env.NODE_ENV === 'development') {
    opt.onAction.push(createLogger())
  }
  //   opt.onAction = [createLogger()]
  const app = create(opt)

  if (isH5()) {
    // app.use({
    //   extraEnhancers: [persistEnhancer()]
    // })
  }

  app.use(createLoading({}))

  if (!registered) opt.models.forEach(model => app.model(model))
  registered = true
  app.start()

  const store = app._store
  app.getStore = () => store
  app.use({
    onError(err) {
      console.log(err)
    }
  })

  return app
}

export default {
  createApp
}
