import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import './ToolBar.css';

interface ToolBarProps {
  cropImage: Function;
}

export class ToolBar extends React.Component<ToolBarProps> {

  greyScaleImage() {
    const canvas = document.querySelector('canvas');
    canvas.classList.toggle('greyscale');
  }

  blurImage() {
    const canvas = document.querySelector('canvas');
    canvas.classList.toggle('blur');
  }

  render(): React.ReactNode {
    return (
      <div className="toolbar">
        <ToolBarButton onClick={this.blurImage}>Blur</ToolBarButton>
        <ToolBarButton onClick={this.greyScaleImage}>Black&White</ToolBarButton>
        <ToolBarButton onClick={this.props.cropImage}>Start/Crop</ToolBarButton>
      </div>
    );
  }

}
