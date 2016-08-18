import { configure } from '@kadira/storybook';
import '../src/global/global.css';

// Use require.context to load dynamically: https://webpack.github.io/docs/context.html
const req = require.context('./', true, /story\.js$/);
const srcReq = require.context('../src/', true, /story\.js$/);

function loadStories() {
  req.keys().forEach(req);
  srcReq.keys().forEach(srcReq);
}

configure(loadStories, module);