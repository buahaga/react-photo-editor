import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import { CheckBoxSwitcher } from '../checkbox-switcher/CheckBoxSwitcher';
import { iCrop } from '../../containers/canvas/Canvas';
import './CropToolBar.css';

interface CropToolBarProps {
  isCropActive: boolean;
  setActiveToolbar: (toolbar: string | boolean) => void;
  onImageCrop: () => void;
}

export class CropToolBar extends React.Component<CropToolBarProps> {

  public render(): React.ReactNode {

    const iCropOnOff = this.props.isCropActive ? false : iCrop;

    return (
      <div className="crop-toolbar">
        <CheckBoxSwitcher
          switchID='icrop'
          isChecked={this.props.isCropActive}
          onChange={() => this.props.setActiveToolbar(iCropOnOff)}
        />
        <ToolBarButton disabled={!this.props.isCropActive} onClick={this.props.onImageCrop}>Crop</ToolBarButton>
      </div>
    );
  }

}
