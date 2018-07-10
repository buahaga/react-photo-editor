import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configStore } from './redux/store/configStore';
import App from './containers/App';

declare let module: any;
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Provider store={configStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
