import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import './DrawToolBar.css';

interface DrawToolBarProps {

}

export class DrawToolBar extends React.Component<DrawToolBarProps> {

  public render(): React.ReactNode {

    const buttonStyle = {
      display: 'block',
      width: '80px',
    };

    return (
      <div className="draw-toolbar">
        <ToolBarButton buttonStyle={buttonStyle} disabled={true}>Red</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} disabled={true}>Green</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} disabled={true}>Blue</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} disabled={true}>Black</ToolBarButton>
      </div>
    );
  }

}
