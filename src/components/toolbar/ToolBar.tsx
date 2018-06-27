import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import './ToolBar.css';

export class ToolBar extends React.Component {

  render(): React.ReactNode {
    return (
      <div className="toolbar">
        <ToolBarButton>Blur</ToolBarButton>
        <ToolBarButton>Black&White</ToolBarButton>
        <ToolBarButton>Crop</ToolBarButton>
      </div>
    )
  }

}
