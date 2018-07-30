import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import { CheckBoxSwitcher } from '../checkbox-switcher/CheckBoxSwitcher';
import { CropActive } from '../../containers/canvas/Canvas';
import './CropToolBar.css';

interface CropToolBarProps {
  isCropActive: boolean;
  setActiveToolbar: (toolbar: string | boolean) => void;
  onImageCrop: () => void;
}

export class CropToolBar extends React.Component<CropToolBarProps> {

  public render(): React.ReactNode {

    const CropActiveOnOff = this.props.isCropActive ? false : CropActive;

    return (
      <div className="crop-toolbar">
        <CheckBoxSwitcher
          switchID='icrop'
          isChecked={this.props.isCropActive}
          onChange={() => this.props.setActiveToolbar(CropActiveOnOff)}
        />
        <ToolBarButton disabled={!this.props.isCropActive} onClick={this.props.onImageCrop}>Crop</ToolBarButton>
      </div>
    );
  }

}
