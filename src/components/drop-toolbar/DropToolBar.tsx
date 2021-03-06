import * as React from 'react';
import { CheckBoxSwitcher } from '../checkbox-switcher/CheckBoxSwitcher';
import { DropActive } from '../../containers/canvas/Canvas';
import './DropToolBar.css';

interface DropToolBarProps {
  isDropActive: boolean;
  setActiveToolBar: (toolbar: string | boolean) => void;
  onImageDrag: (url: string) => void;
  onImageDrop: (evt: React.DragEvent<HTMLImageElement>) => void;
}

export class DropToolBar extends React.Component<DropToolBarProps> {

  private setImage = (evt: any) => {
    this.props.onImageDrag(evt.target.src);
  }

  private drawImage = (evt: React.DragEvent<HTMLImageElement>) => {
    this.props.onImageDrop(evt);
  }

  public render(): React.ReactNode {
    const DropActiveOnOff = this.props.isDropActive ? false : DropActive;
    return (
      <div className="drop-toolbar">
        <CheckBoxSwitcher
          switchID='idrop'
          isChecked={this.props.isDropActive}
          onChange={() => this.props.setActiveToolBar(DropActiveOnOff)}
        />
        <img className="stuff-image firstimage" onDragStart={this.setImage} onDragEnd={this.drawImage} src="/src/images/anarchy.png" draggable alt="anarchy" />
        <img className="stuff-image" onMouseDown={this.setImage} onDragEnd={this.drawImage} src="/src/images/born-to-kill.png" draggable alt="born-to-kill" />
      </div>
    );
  }

}
