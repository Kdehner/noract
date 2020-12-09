// React.createElement >> An element is an object with type and props.
// We need a function to create an object from JSX.


export const Noract = {
  createElement,
  render,
}

// Using the spread operator for props and
// the rest parameter syntax for children
// we ensure the children prop is always an array.
function createElement(type, props, ...children) {
  return {
    type, 
    props: {
      ...props,
      children: children.map(child => 
        typeof child === "object" 
          ? child
          : createTextElement(child)),
    },
  }
}

// The children array can also cantain primitives
// so we will wrap those in its own object with
// a custom type of TEXT_ELEMENT
function createTextElement(text){
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

// React.render >> We need to create our elements
// from our object and add them to the DOM.

// We need to create the domNode using the element type, 
// recursivly create the children, and handle
// if its a TEXT_ELEMENT or normal node.
function render(element, container) {
  const dom = 
    element.type === "TEXT_ELEMENT" 
      ? document.createTextNode("")
      : document.createElement(element.type);

  element.props.children.forEach(child => {
    render(child, dom)
  });

  // We need to assign the element props to the node
  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

  container.appendChild(dom);
}