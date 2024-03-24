# 学习 实现简单的React框架（Didact）

学习来自Didact（https://pomb.us/build-your-own-react/）

### 教程中封装useState的问题

```javascript
function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex]
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  }
​
  const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    /**
     * 此处action只能为function,也就是说setState只支持传入function
     * 例如const [count, setCount] = Didact.useState(0)
     * setCount只能setCount(count => count + 1)而不能setCount(count + 1)
     */
    hook.state = action(hook.state)
    // 修改后
    if (typeof action === "function") {
      hook.state = action(hook.state)
    } else {
      hook.state = action
    }
  })
​
  const setState = action => {
    hook.queue.push(action)
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }
​
  wipFiber.hooks.push(hook)
  hookIndex++
  return [hook.state, setState]
}
```
