import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ToolBarButton } from './components/toolbar-button/ToolBarButton';
declare let module: any

ReactDOM.render(
  <div>
    <ToolBarButton name="Crop" />
    <ToolBarButton name="Black&White" />
    <ToolBarButton name="Blur" />
  </div>,
  document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
