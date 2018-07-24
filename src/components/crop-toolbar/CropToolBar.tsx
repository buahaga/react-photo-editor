import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import { CheckBoxSwitcher } from '../checkbox-switcher/CheckBoxSwitcher';
import './CropToolBar.css';

interface CropToolBarProps {
  onImageCrop: () => void;
}

export class CropToolBar extends React.Component<CropToolBarProps> {

  public render(): React.ReactNode {

    const buttonStyle = {
      display: 'block',
      width: '80px',
    };

    return (
      <div className="crop-toolbar">
        <CheckBoxSwitcher />
        <ToolBarButton buttonStyle={buttonStyle} onClick={this.props.onImageCrop}>Crop</ToolBarButton>
      </div>
    );
  }

}
