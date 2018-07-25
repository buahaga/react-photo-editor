import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import './ToolBar.css';

interface ToolBarProps {
  onImageBlur: () => void;
  onImageGreyScale: () => void;
  onImageHighLight: () => void;
  isResetActive: boolean;
  onImageReset: () => void;
  onClearCanvas: () => void;
  onSaveCanvas: () => void;
}

export class ToolBar extends React.Component<ToolBarProps> {

  public render(): React.ReactNode {
    return (
      <div className="toolbar">
        <ToolBarButton onClick={this.props.onImageBlur}>Blur</ToolBarButton>
        <ToolBarButton onClick={this.props.onImageGreyScale}>Greyscale</ToolBarButton>
        <ToolBarButton onClick={this.props.onImageHighLight}>Highlight</ToolBarButton>
        <ToolBarButton onClick={this.props.onImageReset} buttonID="reset" disabled={!this.props.isResetActive}>&#10227;</ToolBarButton>
        <ToolBarButton onClick={this.props.onClearCanvas}>Clear</ToolBarButton>
        <ToolBarButton onClick={this.props.onSaveCanvas}>Save</ToolBarButton>
      </div>
    );
  }

}
