# title

## 项目说明

基于 [taro 1.3](https://taro.aotu.io/), [taro-ui](https://taro-ui.aotu.io/#/docs/introduction), [dva](https://dvajs.com/) 的统一 H5 端和 各个小程序端的项目。

## h5 端打包与发布前本地验证

打包：
$ yarn build:h5
  or
$ npm run build:h5

发布前本地验证：
可以通过 serve 做本地验证，
$ yarn global add serve
$ serve ./dist


### Taro 1.3

- [官网](https://nervjs.github.io/taro/docs/GETTING-STARTED.html)

#### Taro 的特性与坑

- 如果安装过程出现 sass 相关的安装错误，请在安装[mirror-config-china](https://www.npmjs.com/package/mirror-config-china)后重试。
- 选择微信小程序模式，需要自行下载并打开微信开发者工具，然后选择项目根目录进行预览。

- 节点元素高度的过渡(CSS3),就是让展开和收起有个过渡效果, 经过 N 多次的尝试(不能给元素设置 height!!), 把元素初始化的高度设置 max-height:0,其他过渡设置合适的 max-height 即可解决

- 样式上对齐短板，也就是 RN, 主要就是三点：

  - 使用 Flex 布局
  - 基于 BEM 写样式
  - 采用 style 属性覆盖组件样式

- 入口文件 app.js 里面引入的样式就是全局样式，本地样式会覆盖全局样式。

- 使用 微信/支付宝支付时，假如有一个 支付页面 存在微信小程序、百度小程序和 H5 三个不同版本，那么就可以像如下组织代码
  Pay.js 文件，这是 Test 组件默认的形式，编译到微信小程序、百度小程序和 H5 三端之外的端使用的版本

  - test.h5.js 文件，这是 Pay 组件的 H5 版本
  - test.weapp.js 文件，这是 Pay 组件的 微信小程序 版本
  - test.rn.js 文件，这是 Pay 组件的 RN 版本

- 在 H5 模式下，tabBar 可能会挡住页面 fixed 元素问题：这是因为与小程序的 tabBar 不同，在 H5 下 tabBar 是一个普通的组件，当页面中存在 fixed(bottom) 定位的元素时，其表现会与小程序中不一致。Taro 提供了一个适配的方法：

  ```scss
  .fixed {
    bottom: 0;
    /* 在 H5 模式下将会编译成 margin-bottom: 50px，在小程序模式下则会忽略 */
    margin-bottom: taro-tabbar-height;
  }
  ```

- [Taro 中书写 JavaScript 规范](https://nervjs.github.io/taro/docs/spec-for-taro.html)

  - 不要以 class/id/style 作为自定义组件的属性名
  - 不要使用 HTML 标签
  - 不要在调用 this.setState 时使用 this.state ,由于 this.setState 异步的缘故，这样的做法会导致一些错误，可以通过给 this.setState 传入函数来避免
    ```js
    this.setState(prevState => ({ value: prevState.value + 1 }))
    ```
  - 不要在 componentWillUpdate/componentDidUpdate/render 中调用 this.setState
  - 组件最好定义 defaultProps
  - render 方法必须有返回值
  - 事件绑定均以 on 开头
  - 子组件传入函数时属性名需要以 on 开头

- Taro.getApp(Object) 可以用来获取到程序 App 实例，在各个端均有实现, 微信小程序端可以传入一个 Object 参数.

- 小程序 page 页面 config：navigationBarTitleText，backgroundColor， disableScroll, enablePullDownRefresh

- 路由功能，在 Taro 中，路由功能是默认自带的，不需要开发者进行额外的路由配置。我们只需要在入口文件的 config 配置中指定好 pages，然后就可以在代码中通过 Taro 提供的 API 来跳转到目的页面

- 路由传参， 在跳转成功的目标页的生命周期方法里就能通过 this.\$router.params 获取到传入的参数，例如上述跳转，在目标页的 componentWillMount 生命周期里获取入参

- 建议使用 Taro 时，设计稿以 iPhone 6 750px 作为设计尺寸标准。在 Taro 中尺寸单位建议使用 px、 百分比 %，Taro 默认会对所有单位进行转换。在 Taro 中书写尺寸按照 1:1 的关系来进行书写，即从设计稿上量的长度 100px，那么尺寸书写就是 100px，当转成微信小程序的时候，尺寸将默认转换为 100rpx，当转成 **H5** 时将 **默认转换为以 rem 为单位的值。**

- 如果是在 JS 中书写了行内样式，那么编译时就无法做替换了，针对这种情况，Taro 提供了 API Taro.pxTransform 来做运行时的尺寸转换。`Taro.pxTransform(10) // 小程序：rpx，H5：rem`

- 默认配置会对所有的 px 单位进行转换，有大写字母的 Px 或 PX 则会被忽略。

- 在 Taro 中可以像使用 Webpack 那样自由地引用静态资源，而且不需要安装任何 Loaders。

- false、null、undefined 和 true 都是有效的 children，但它们不会直接被渲染。

- 在 v1.3.0-beta.0 之后，自定义组件间的事件传递可以不用 on 开头，但内置组件的事件依然是以 on 开头的，为了一致性我们仍然推荐你以 on 开头命名你的事件。

- 在微信小程序中，可能你会看到像 bindTap 这样的用法，但在 Taro 中，事件参数(props)都以 on 开头

- 普通函数式组件, 自 v1.3.0-beta.0 起支持
  在 Taro 中使用函数式组件有以下限制：  
   - 函数的命名需要遵循帕斯卡式命名法； - 一个文件中只能定义一个普通函数式组件或一个 Class 组件
- 类函数式组件(在 class 组件中，定义以 render 开头的返回元素的函数属性), 自 v1.3.0-beta.0 起支持
  在 renderHeader 或 renderFooter 函数中，我们可以访问类的 this，也可以传入不限量的参数，这类型的函数也可以调用无限次数。但这样的写法也存在一些限制： 1. 函数的 **命名必须以 render 开头**，render 后的 **第一个字母需要大写** 2. 函数的 **参数不得传入** JSX 元素或 JSX 元素引用 3. 函数 **不能递归地调用自身**
  形如 renderHeader 这样的函数在小程序中会编译成 template，而小程序的 template 是无法做到递归调用自身的。当你有这样的需求时，可以新建两个一模一样的组件和文件：ComponentA 和 ComponentB，在 ComponentA 中调用 ComponentB，在 ComponentB 中调用 ComponnetA。
- 闭包函数式组件，自 v1.3.0-beta.2 起支持， 闭包函数式组件遵循所有类函数式的限制，包括命名，传参，调用，并且它只能在一个普通函数式组件或类函数式组件以及 Taro.Component 的 render 函数中定义及调用。

- 使用 hooks 的页面及组件中相关属性设置， 使用 Hooks 时，你需要将 config 或 options 等配置直接挂载在 Hooks 函数上，即可以达到想要的效果

- children 请不要对 this.props.children 进行任何操作。Taro 在小程序中实现这个功能使用的是小程序的 slot 功能，也就是说你可以把 this.props.children 理解为 slot 的语法糖，this.props.children 在 Taro 中并不是 React 的 ReactElement 对象，因此形如 this.props.children && this.props.children、this.props.children[0] 在 Taro 中都是非法的。

- 组件的所有组合都必须用 render 开头，且遵守驼峰式命名法。和我们的事件规范以 on 开头一样，组件组合使用 render 开头。

- 组合只能传入单个 JSX 元素，不能传入其它任何类型。

- 可以通过 `createRef` 创建 ref, 自 v1.3.0-beta.0 起 支持

- 跨平台开发

  - 内置环境变量： process.env.TARO_ENV (取值： 目前有 weapp / swan / alipay / h5 / rn / tt 六个取值)
    例如想在微信小程序和 H5 端分别引用不同资源：
    ```js
    if (process.env.TARO_ENV === 'weapp') {
      require('path/to/weapp/name')
    } else if (process.env.TARO_ENV === 'h5') {
      require('path/to/h5/name')
    }
    ```
    同时也可以在 JSX 中使用，决定不同端要加载的组件
  - 统一接口的多端文件：
    针对一项功能，如果多个端之间都有差异，那么开发者可以通过将文件修改成 原文件名 + 端类型 的命名形式，不同端的文件代码对外保持统一接口，而引用的时候仍然是 import 原文件名的文件，Taro 在编译时，会跟根据需要编译平台类型，将加载的文件变更为带有对应端类型文件名的文件，从而达到不同的端加载对应文件的目的。
  - 多端脚本逻辑：
    与多端组件类似，假如有需要针对不同的端写不同的脚本逻辑代码，我们也可以类似的进行处理，遵守的唯一原则就是多端文件对外的接口保持一致。
    例如微信小程序上使用 Taro.setNavigationBarTitle 来设置页面标题，H5 使用 document.title，那么可以封装一个 setTitle 方法来抹平两个平台的差异。

  - 不能使用 Array#map 之外的方法操作 JSX 数组

  - 支持 props 传入 JSX，但是元素传入 JSX 的属性名必须以 render 开头

  - JS 编码必须用单引号， 在 Taro 中，JS 代码里必须书写单引号，特别是 JSX 中，如果出现双引号，可能会导致编译错误。

  - 不要以解构的方式来获取通过 env 配置的 process.env 环境变量，请直接以完整书写的方式 process.env.NODE_ENV 来进行使用

  - 使用 this.$componentType 来判断当前 Taro.Component 是页面还是组件， this.$componentType 可能取值分别为 PAGE 和 COMPONENT，开发者可以根据此变量的取值分别采取不同逻辑。

  - 当你清楚在某些情况下组件不需要被重新渲染时，可以通过在 shouldComponentUpdate 钩子里返回 false 来跳过本次渲染流程。
    ```js
    shouldComponentUpdate (nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true
    }
    if (this.state.count !== nextState.count) {
      return true
    }
    return false
    }
    ```
  - Taro.PureComponent

  - 调试的时候，当遇到问题的时候，一个快速起步的沙盒工具，你可以直接在这个工具里编辑、调试、复现问题：[addr](https://codesandbox.io/s/50nzv622z4?fontsize=14)

  - 可以在 config 中配置 h5 的路由 [参考](https://nervjs.github.io/taro/docs/config-detail.html)

  - 在 Redux 中使用 Hooks:

    ```js
    import { useSelector } from 'taro-redux'
    const counter = useSelector(state => state.counter)
    const todo = useSelector(state => state.todos[props.id])

    import { useDispatch } from 'taro-redux'
    const dispatch = useDispatch()

    //当我们使用 dispatch 传递回调到一个子组件时，推荐使用 useCallback 把回调缓存起来，因为组件可能因为引用改变而重新渲染。
    const incrementCounter = useCallback(
      () => dispatch({ type: 'increment-counter' }),
      [dispatch]
    )

    // <MyIncrementButton onIncrement={incrementCounter} />

    import { useStore } from 'taro-redux'
    const store = useStore()
    store.getState()
    ```
  - 内置 CSS Modules

  - [组件库](https://nervjs.github.io/taro/docs/components/base/icon.html)

  - [api](https://nervjs.github.io/taro/docs/apis/about/desc.html)
  
#### Taro 1.3 新特性

- https://mp.weixin.qq.com/s/StC_7F-7glPdPAJq1ZB22g

- 支持快应用和 QQ 小程序的开发
- 全面支持 JSX 语法和 React Hooks
  在 Taro 1.3 我们还实现了 React 16 的新生命周期函数 static getDerivedStateFromProps() 和 getSnapshotBeforeUpdate()。
  Taro 1.3 还实现了 React 16 的 createContext、contextType 和 useContext API。  
   同时，例如 react-redux 这样的热门库也正在基于 Context 和 Hooks 进行重构，我们也非常期待与社区一起探索 React/Taro 新的开发与设计模式。
- 关于 H5
  在 Taro 1.3 中，我们优化了编译代码的方式，实现了资源最小引入和按需引入，将原有最小项目的编译大小降低了 80% 左右。这对于网络状况不佳的 H5 端无疑是巨大的提升。
  H5 端的 API 数量和质量也得到了大幅地增长，Taro 1.3 新增了 28 个 H5 API，解决了上百个 H5 相关的 issue。
- Taro Doctor
  我们还从 Flutter Doctor 中得到启发，开发了 Taro Doctor。 Taro Doctor 就像一个医生一样，可以诊断项目的依赖、设置、结构，以及代码的规范是否存在问题，并尝试给出解决方案。
  只需要在终端运行命令：`taro doctor`
- more
  支持开发小程序插件， 支持小程序云开发

## H5 与 NA 通信

NA 和 H5 分别将方法挂载在 window 上，供对方使用

```js
if (window.WebViewJavascriptBridge) {
  //do your work here
} else {
  document.addEventListener(
    'WebViewJavascriptBridgeReady',
    function() {
      //do your work here
    },
    false
  )
}
```

- 参考资料

1. https://github.com/lzyzsd/JsBridge
2. https://mp.weixin.qq.com/s/L4VzJGcO4PRs7YXxjKdusA
3. https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651226235&idx=1&sn=cb3de8dc262916290b7b319d832966f2&chksm=bd4959ff8a3ed0e9e5ffb3eb470cbe3461c977ce87baf4cadf1b2cb6214671f7c62294dc63d1&scene=21#wechat_redirect
4. https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651220654&idx=1&sn=af0c3cf40f5408214debdec8cb1c6359&chksm=bd49b32a8a3e3a3c643907a15e4588b389c0ffc8c13d1691fc12c697c0db0cde1703ae2f58ba&scene=21#wechat_redirect

## js 类型注释

利用标准 JSDoc 可以在某些编辑器下(例如：vs code)获取到高度智能化的提示，有助于开发和重构。

类型为我们提供了一系列有关代码性质的有价值信息，还能识别拼写错误，方便重构等。目前，大多数编辑器都能根据从代码中收集到的类型信息，提供某种类型的智能感知（IntelliSense）。

为了代码的健壮性，提前获取类型是一方面，另一方面要在代码的内部逻辑中添加适当的防御。比如类型检查等。

编写 JavaScript 时，这将为你提供一些基本的智能感知，在类型错误下面会有红色波浪线标记。

将鼠标悬停在已标记的类型错误上将弹出对该错误的解释。

直接在文件顶部添加 // @ts-check，这相当于告诉 VS Code 检查某一单个文件。

可以通过在文件顶部添加 // @ts-nocheck 来选择不检查某个文件。

如果是一行代码的类型或者从该行开始的代码块在处理上遇到了麻烦，
可以在该行的上方添加 // @ts-ignore，这样便能绕过检查。

- 参考资料：

1. https://mp.weixin.qq.com/s/PcHu-DeZDQCdtWjzb-QkBA
2. https://www.tslang.cn/docs/handbook/type-checking-javascript-files.html
3. https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript

- 引入类型

通过从类型最初定义的位置引入自定义类型，可以实现在文件中重复使用自定义类型。假设我们有一个文件，其中有一个创建虚拟节点的函数。在该文件中，我们使用 JSDoc 注释定义的虚拟节点类型，然后在其他文件中引入该函数以创建虚拟节点。如下：

```js
/**
 * @param {string} [p4="test"] - An optional param with a default value
 **/

/** @type {Window} */
var win

/** @type {PromiseLike<string>} */
var promisedString

// You can specify an HTML Element with DOM properties
/** @type {HTMLElement} */
var myElement = document.querySelector(selector)
element.dataset.myData = ''

// 有多种方式来指定数组类型：

/** @type {number[]} */
var ns
/** @type {Array.<number>} */
var nds
/** @type {Array<number>} */
var nas

// 可以使用字符串和数字索引签名来指定map-like和array-like的对象，使用标准的JSDoc语法或者TypeScript语法。
/**
 * A map-like object that maps arbitrary `string` properties to `number`s.
 *
 * @type {Object.<string, number>}
 */
var stringToNumber

/** @type {Object.<number, object>} */
var arrayLike

// 可以使用TypeScript或Closure语法指定函数类型。

/** @type {function(string, boolean): number} Closure syntax */
var sbn
/** @type {(s: string, b: boolean) => number} Typescript syntax */
var sbn2

// 或者直接使用未指定的Function类型：
/** @type {Function} */
var fn7
/** @type {function} */
var fn6

// @callback与@typedef相似，但它指定函数类型而不是对象类型：

/**
 * @callback Predicate
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */
/** @type {Predicate} */
const ok = s => !(s.length % 2)

// 当然，所有这些类型都可以使用TypeScript的语法@typedef在一行上声明：
/** @typedef {{ prop1: string, prop2: string, prop3?: number }} SpecialType */
/** @typedef {(data: string, index?: number) => boolean} Predicate */

/**
 * Props define attributes on a virtual node.
 * @typedef {Object.<string, any> | {}} Props
 * @property {Children} Props.children
 */
/**
 * The vnode children of a virtual node.
 * @typedef {VNode[]} Children
 */
/**
 * Define a custom type for virtual nodes:
 * @typedef {string | number | Function} Type
 * @typedef {Object.<string, any>} VNode
 * @property {Type} VNode.type
 * @property {Props} VNode.props
 * @property {Children} VNode.children
 * @property {Key} [VNode.key]
 */
```

假设我们在另一个文件中引入了 createVirtualNode 函数，为了显示类型信息，可以从另一个文件（自定义类型定义的位置）引入类型，如下所示：

```js
import { createVNode } from '../vnode'
/**
 * @typedef {import('./vnode').VNode} VNode
 */

// Some code that create options for createVNode to use.
const options = ...
/**
 * @param {Object<string, any>} options
 * @return {VNode} VNode
 */
const vnode = createVNode(options)
```

注意上面是如何从 vnode.js 引入自定义类型的，我们也可以使用相同的方式来定义函数的返回值。

- example:

```js
// 定义对象类型

// 定义简单对象类型

/**
 *  Object literal with properties:
 * @type {{name: string, age: number, job: string}} - employee
 */

const person_4 = {
  name: 'andy',
  age: 18,
  job: 'programmer'
}

// 定义对象最灵活的方式
/**
 * A person object with a name and age.
 * @typedef {Object.<string, any>} Person
 * @property {string} name The name of the person
 * @property {number} age The age of the person.
 * @property {string} [gender] the gender of the person
 * @property {Function} sayName a function that alert the person's name
 */

/**
 * @type {Person} person
 */
const person = {
  name: 'andy',
  age: 25,
  gender: 'man',
  sayName: function() {
    alert(this.name)
  }
}

// 如果要处理可扩展对象的动态属性，唯一的方法是使用中括号和引号：

// 将自定义属性添加到 Element 类型的节点：
const btn = document.createElement('button')
btn.nodeValue = 'A Button'

btn.isButton = true

// 将产生 属性不存在 的错误，见下图:

btn['isButton'] = true

// 中括号和引号的写法可以避免类型报错

// 如果是返回 dom 节点

/**
 * @returns {Node} H1 element
 **/
```
