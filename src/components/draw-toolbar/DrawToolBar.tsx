import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import { CheckBoxSwitcher } from '../checkbox-switcher/CheckBoxSwitcher';
import './DrawToolBar.css';

interface DrawToolBarProps {
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
}

export class DrawToolBar extends React.Component<DrawToolBarProps> {

  public render(): React.ReactNode {

    const buttonStyle = {
      display: 'block',
      width: '80px',
    };
    const divStyle = {
      width: '80px',
      margin: '10px 10px 20px',
    };
    const sizeStyle = {
      width: '40px',
      margin: '0px',
    };

    return (
      <div className="draw-toolbar">
        <CheckBoxSwitcher />
        <ToolBarButton buttonStyle={buttonStyle} onClick={() => this.props.onColorChange('red')}>Red</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} onClick={() => this.props.onColorChange('green')}>Green</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} onClick={() => this.props.onColorChange('blue')}>Blue</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} onClick={() => this.props.onColorChange('yellow')}>Yellow</ToolBarButton>
        <div style={divStyle}>
          <ToolBarButton buttonStyle={sizeStyle} onClick={() => this.props.onSizeChange(-1)}>-</ToolBarButton>
          <ToolBarButton buttonStyle={sizeStyle} onClick={() => this.props.onSizeChange(1)}>+</ToolBarButton>
        </div>
      </div>
    );
  }

}
