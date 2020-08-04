export class Component {
  constructor() {
    this.children = []
  }

  setAttribute(name, value) {
    this[name] = value
  }

  mountTo(parent) {
    const vdom = this.render()
    // 不同类型元素调用自己的 appendChild 方法
    vdom.mountTo(parent)
  }

  appendChild(vchild) {
    this.children.push(vchild)
  }
}

// 创建元素节点
class ElementWrapper {
  constructor(type) {
    this.element = document.createElement(type)
  }

  setAttribute(name, value) {
    this.element.setAttribute(name, value)
  }

  appendChild(vchild) {
    vchild.mountTo(this.element)
  }

  mountTo(parent) {
    parent.appendChild(this.element)
  }
}

// 文本节点
class TextWrapper {
  constructor(content) {
    this.element = document.createTextNode(content)
  }

  mountTo(parent) {
    parent.appendChild(this.element)
  }
}

export const ToyReact = {
  createElement(type, attributes, ...children) {
    let element
    //创建节点
    if (typeof type === 'string') {
      element = new ElementWrapper(type)
    } else {
      element = new type()
    }

    // 设置属性
    for (let name in attributes) {
      element.setAttribute(name, attributes[name])
    }

    // 插入子节点
    function insertChildDom(children) {
      for (let child of children) {
        // 如果还有子节点,继续递归
        if (typeof child === 'object' && child instanceof Array) {
          insertChildDom(child)
          return
        }
        // 是文本节点时,new TextWrapper
        if (typeof child === 'string') {
          child = new TextWrapper(child)
        }

        element.appendChild(child)
      }
    }

    insertChildDom(children)
    return element
  },
  render(vdom, element) {
    vdom.mountTo(element)
  },
}
