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

  saveImage() {
    const canvas = document.querySelector('canvas');
    canvas.toBlob((blob) => {
      const newImg = document.createElement('img'),
      url = URL.createObjectURL(blob);
      newImg.onload = () => {
        URL.revokeObjectURL(url);
      };
      newImg.src = url;
      document.body.appendChild(newImg);
    });
  }

  render(): React.ReactNode {
    return (
      <div className="toolbar">
        <ToolBarButton onClick={this.blurImage}>Blur</ToolBarButton>
        <ToolBarButton onClick={this.greyScaleImage}>Black&White</ToolBarButton>
        <ToolBarButton onClick={this.props.cropImage}>Crop</ToolBarButton>
        <ToolBarButton onClick={this.saveImage}>Save</ToolBarButton>
      </div>
    );
  }

}
