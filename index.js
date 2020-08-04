import { ToyReact, Component } from './ToyReact'

class MyComponent extends Component {
  render() {
    return (
      <div>
        <div>balabala</div>
        {this.children}
      </div>
    )
  }
}

const test = (
  <MyComponent name="a">
    <div class="wrapper">123</div>
    <div>345</div>
    <div>
      <span>child</span>
    </div>
  </MyComponent>
)
// document.body.appendChild(test)
ToyReact.render(test, document.body)
