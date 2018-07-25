import * as React from 'react';
import { ToolBarButton } from '../toolbar-button/ToolBarButton';
import { CheckBoxSwitcher } from '../checkbox-switcher/CheckBoxSwitcher';
import { iDraw } from '../../containers/canvas/Canvas';
import './DrawToolBar.css';

interface DrawToolBarProps {
  isDrawActive: boolean;
  setActiveToolBar: (toolbar: string | boolean) => void;
  crayonSize: number;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
}

export class DrawToolBar extends React.Component<DrawToolBarProps> {

  public render(): React.ReactNode {

    const iDrawOnOff = this.props.isDrawActive ? false : iDraw;
    const reduceOnOff = (this.props.crayonSize > 1 && this.props.isDrawActive) ? false : true;
    const increaseOnOff = (this.props.crayonSize < 10 && this.props.isDrawActive) ? false : true;

    return (
      <div className="draw-toolbar">
        <CheckBoxSwitcher
          isChecked={this.props.isDrawActive}
          onChange={() => this.props.setActiveToolBar(iDrawOnOff)}
        />
        <ToolBarButton disabled={!this.props.isDrawActive} onClick={() => this.props.onColorChange('red')}>Red</ToolBarButton>
        <ToolBarButton disabled={!this.props.isDrawActive} onClick={() => this.props.onColorChange('green')}>Green</ToolBarButton>
        <ToolBarButton disabled={!this.props.isDrawActive} onClick={() => this.props.onColorChange('blue')}>Blue</ToolBarButton>
        <ToolBarButton disabled={!this.props.isDrawActive} onClick={() => this.props.onColorChange('yellow')}>Yellow</ToolBarButton>
        <div>
          <ToolBarButton buttonID='crayon-reduce' disabled={reduceOnOff} onClick={() => this.props.onSizeChange(-1)}>-</ToolBarButton>
          <ToolBarButton buttonID='crayon-increase' disabled={increaseOnOff} onClick={() => this.props.onSizeChange(1)}>+</ToolBarButton>
        </div>
      </div>
    );
  }

}
