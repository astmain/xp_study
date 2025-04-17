# React + Vite


## 函数组件
React 组件是常规的 JavaScript 函数，但 组件的名称必须以**大写字母**开头，否则它们将无法运行！

如果你的标签和 return 关键字不在同一行，则必须把它包裹在一对括号中，如下所示：
```jsx
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

> 没有括号包裹的话，任何在 return 下一行的代码都 将被忽略！

> 为什么React推荐使用函数组件？
> 1. 代码简洁性
> 类组件需要继承 React.Component、定义构造函数、 render() 方法、处理 this 绑定等冗余代码；而函数组件通过 Hooks 简化逻辑，省去 this 和生命周期方法。
> 2. 逻辑复用
> 函数组件的Hooks（如 useState, useEffect） 替代类组件的高阶组件（HOC）和 Render Props，解决嵌套地狱问题。
> 3. 性能优化
> 函数组件更利于 React 编译时优化（如自动缓存、死代码删除），且 React.memo 优化更直观。
> 4. 心智模型
> 函数组件基于闭包，直接访问最新状态和 props，无需处理 this 绑定，降低理解成本。
> 5. 未来趋势
> React 官方更倾向函数组件，新特性多优先适配，类组件维护进入冻结状态。

## JSX 规则
1. 只能返回一个根元素 
如果想要在一个组件中包含多个元素，需要用一个父标签把它们包裹起来。
如果你不想在标签中增加一个额外的 `<div>`，可以用 `<>` 和 `</>` 元素来代替：
这个空标签被称作 Fragment。React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点。
> 为什么多个 JSX 标签需要被一个父元素包裹？ 
> JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。
> 渲染列表时：Fragment 语法的简写形式 <> </> 无法接受 key 值，所以你只能要么把生成的节点用一个 `<div>` 标签包裹起来，要么使用长一点但更明确的 `<Fragment>` 写法：

2. 标签必须闭合 
JSX 要求标签必须正确闭合。像 `<img>` 这样的自闭合标签必须书写成 `<img />`，而像 `<li>oranges` 这样只有开始标签的元素必须带有闭合标签，需要改为 `<li>oranges</li>`。

3. 使用驼峰式命名法给 所有 大部分属性命名！

### 将 JSX 作为子组件传递 
当你将内容嵌套在 JSX 标签中时，父组件将在名为 children 的 prop 中接收到该内容。


## Hooks

### State Hook

* 使用 useState 声明可以直接更新的状态变量。
* 使用 useReducer 在 reducer 函数 中声明带有更新逻辑的 state 变量。

### Context Hook

* 使用 useContext 读取订阅上下文。

### Ref Hook 

* 使用 useRef 声明 ref。你可以在其中保存任何值，但最常用于保存 DOM 节点。
* 使用 useImperativeHandle 自定义从组件中暴露的 ref，**获取子组件的ref**。

### Effect Hook 

* 使用 useEffect 将组件连接到外部系统，在页面渲染完毕后会执行内部回调。
* useLayoutEffect 在浏览器重新绘制屏幕前执行，可以在此处测量布局。
* useInsertionEffect 在 React 对 DOM 进行更改之前触发，库可以在此处插入动态 CSS。
> useLayoutEffect 可能会影响性能。尽可能使用 useEffect。
> useInsertionEffect 是为 CSS-in-JS 库的作者特意打造的。除非你正在使用 CSS-in-JS 库并且需要注入样式，否则你应该使用 useEffect 或者 useLayoutEffect。

### 性能 Hook

* 使用 useMemo 缓存计算代价昂贵的计算结果。
* 使用 useCallback 将函数传递给优化组件之前缓存函数定义。
> 可以结合React.memo使用

* useTransition 允许将状态转换标记为非阻塞，并允许其他更新中断它。
* useDeferredValue 允许延迟更新 UI 的非关键部分，以让其他部分先更新。

### 其他 Hook
* 使用 useDebugValue 自定义 React 开发者工具为自定义 Hook 添加的标签。
* 使用 useId 将唯一的 ID 与组件相关联，其通常与可访问性 API 一起使用。
* 使用 useSyncExternalStore 订阅外部 store。
* 使用 useActionState 允许你管理动作的状态.
* 使用 useOptimistic，它可以帮助你更乐观地更新用户界面。