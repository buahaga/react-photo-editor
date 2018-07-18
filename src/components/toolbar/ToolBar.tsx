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
  saveImage: () => void;
}

export class ToolBar extends React.Component<ToolBarProps> {

  public render(): React.ReactNode {
    const resetButtonStyle = {
      width: '30px',
    };
    const saveButtonStyle = {
      width: '60px',
      backgroundColor: 'lightblue',
    };

    return (
      <div className="toolbar">
        <ToolBarButton selector={'blur'} disabled={this.props.isButtonActive} onClick={this.props.blurImage}>Blur</ToolBarButton>
        <ToolBarButton selector={'greyscale'} disabled={this.props.isButtonActive} onClick={this.props.greyScaleImage}>Greyscale</ToolBarButton>
        <ToolBarButton selector={'highlight'} disabled={this.props.isButtonActive} onClick={this.props.highlightImage}>Highlight</ToolBarButton>
        <ToolBarButton selector={'crop'} disabled={this.props.isButtonActive} onClick={this.props.cropImage}>Crop</ToolBarButton>
        <ToolBarButton selector={'reset'} disabled={this.props.isButtonActive} onClick={this.props.resetImage} buttonStyle={resetButtonStyle}>&#10227;</ToolBarButton>
        <ToolBarButton selector={'save'} disabled={this.props.isButtonActive} onClick={this.props.saveImage} buttonStyle={saveButtonStyle}>Save</ToolBarButton>
      </div>
    );
  }

}
