import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import './ToolBar.css';

interface ToolBarProps {
  isButtonActive: boolean;
  blurImage: () => void;
  greyScaleImage: () => void;
  highlightImage: () => void;
  cropImage: () => void;
  resetImage: () => void;
}

export class ToolBar extends React.Component<ToolBarProps> {

  public render(): React.ReactNode {
    return (
      <div className="toolbar">
        <ToolBarButton disabled={this.props.isButtonActive} onClick={this.props.blurImage}>Blur</ToolBarButton>
        <ToolBarButton disabled={this.props.isButtonActive} onClick={this.props.greyScaleImage}>Greyscale</ToolBarButton>
        <ToolBarButton disabled={this.props.isButtonActive} onClick={this.props.highlightImage}>Highlight</ToolBarButton>
        <ToolBarButton disabled={true} onClick={this.props.cropImage}>Crop</ToolBarButton>
        <ToolBarButton disabled={this.props.isButtonActive} onClick={this.props.resetImage}>&#10227;</ToolBarButton>
      </div>
    );
  }

}
