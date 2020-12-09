/** @jsxRuntime classic */
import { Noract } from './noract';

/** @jsx Noract.createElement */
const element = (
  <div id="foo">
    <p>bar</p>
    <b />
  </div>
)

const container = document.getElementById('root');
Noract.render(element, container);