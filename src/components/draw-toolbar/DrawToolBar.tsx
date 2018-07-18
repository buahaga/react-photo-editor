import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import './DrawToolBar.css';

interface DrawToolBarProps {
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onClearCanvas: () => void;
  onSaveCanvas: () => void;
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
    const clearStyle = {
      display: 'block',
      width: '80px',
      backgroundColor: 'lightcoral',
    };
    const saveStyle = {
      display: 'block',
      width: '80px',
      backgroundColor: 'lightblue',
    };

    return (
      <div className="draw-toolbar">
        <ToolBarButton buttonStyle={buttonStyle} disabled={true} onClick={() => this.props.onColorChange('red')}>Red</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} disabled={true} onClick={() => this.props.onColorChange('green')}>Green</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} disabled={true} onClick={() => this.props.onColorChange('blue')}>Blue</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} disabled={true} onClick={() => this.props.onColorChange('yellow')}>Yellow</ToolBarButton>
        <div style={divStyle}>
          <ToolBarButton buttonStyle={sizeStyle} disabled={true} onClick={() => this.props.onSizeChange(-1)}>-</ToolBarButton>
          <ToolBarButton buttonStyle={sizeStyle} disabled={true} onClick={() => this.props.onSizeChange(1)}>+</ToolBarButton>
        </div>
        <ToolBarButton buttonStyle={clearStyle} disabled={true} onClick={this.props.onClearCanvas}>Clear</ToolBarButton>
        <ToolBarButton buttonStyle={saveStyle} disabled={true} onClick={this.props.onSaveCanvas}>Save</ToolBarButton>
      </div>
    );
  }

}
