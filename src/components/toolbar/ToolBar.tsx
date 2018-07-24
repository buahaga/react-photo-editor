import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import './ToolBar.css';

interface ToolBarProps {
  onImageBlur: () => void;
  onImageGreyScale: () => void;
  onImageHighLight: () => void;
  onImageReset: () => void;
  onClearCanvas: () => void;
  onSaveCanvas: () => void;
}

export class ToolBar extends React.Component<ToolBarProps> {

  public render(): React.ReactNode {
    const buttonStyle = {
      width: '90px',
    };
    const resetStyle = {
      width: '30px',
    };
    const clearStyle = {
      width: '90px',
      backgroundColor: 'lightcoral',
    };
    const saveStyle = {
      width: '90px',
      backgroundColor: 'lightblue',
    };

    return (
      <div className="toolbar">
        <ToolBarButton buttonStyle={buttonStyle} onClick={this.props.onImageBlur}>Blur</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} onClick={this.props.onImageGreyScale}>Greyscale</ToolBarButton>
        <ToolBarButton buttonStyle={buttonStyle} onClick={this.props.onImageHighLight}>Highlight</ToolBarButton>
        <ToolBarButton buttonStyle={resetStyle} onClick={this.props.onImageReset}>&#10227;</ToolBarButton>
        <ToolBarButton buttonStyle={clearStyle} onClick={this.props.onClearCanvas}>Clear</ToolBarButton>
        <ToolBarButton buttonStyle={saveStyle} onClick={this.props.onSaveCanvas}>Save</ToolBarButton>
      </div>
    );
  }

}
