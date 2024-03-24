/** @jsx Didact.createElement */
import { Didact } from "./Didact"
function Counter() {
  const [state, setState] = Didact.useState(1)
  const [state2, setState2] = Didact.useState(2)
  return (
    <h1 onClick={() => {
      setState(2)
      setState2(1)
    }}>
      Count: {state}
      Count: {state2}
    </h1>
  )
}
const element = <Counter />
const container = document.getElementById("root")
Didact.render(element, container)