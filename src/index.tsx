import * as React from 'react';
import * as ReactDOM from 'react-dom';
declare let module: any;
import { App } from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
