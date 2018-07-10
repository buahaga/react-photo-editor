import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import './ToolBar.css';

interface ToolBarProps {
  isButtonActive: boolean;
  blurImage: () => void;
  greyScaleImage: () => void;
  colorImage: () => void;
  cropImage: () => void;
  saveImage: () => void;
}

export class ToolBar extends React.Component<ToolBarProps> {

  public render(): React.ReactNode {
    const saveButtonStyle = {
      backgroundColor: 'lightblue'
    };
    return (
      <div className="toolbar">
        <ToolBarButton disabled={this.props.isButtonActive} onClick={this.props.blurImage}>Blur</ToolBarButton>
        <ToolBarButton disabled={this.props.isButtonActive} onClick={this.props.greyScaleImage}>Black&White</ToolBarButton>
        <ToolBarButton disabled={this.props.isButtonActive} onClick={this.props.colorImage}>Color</ToolBarButton>
        <ToolBarButton disabled={this.props.isButtonActive} onClick={this.props.cropImage}>Crop</ToolBarButton>
        <ToolBarButton disabled={this.props.isButtonActive} onClick={this.props.saveImage} buttonStyle={saveButtonStyle}>Save</ToolBarButton>
      </div>
    );
  }

}
