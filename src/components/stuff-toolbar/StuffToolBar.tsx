import * as React from 'react';
import { CheckBoxSwitcher } from '../checkbox-switcher/CheckBoxSwitcher';
import './StuffToolBar.css';

interface StuffToolBarProps {
  onImageDrag: (url: string) => void;
  onImageDrop: (evt: DragEvent) => void;
}

export class StuffToolBar extends React.Component<StuffToolBarProps> {

  private setImage = (evt: any) => {
    this.props.onImageDrag(evt.target.src);
  }

  private drawImage = (evt: any) => {
    this.props.onImageDrop(evt);
  }

  public render(): React.ReactNode {

    return (
      <div className="stuff-toolbar">
        <CheckBoxSwitcher />
        <img className="stuff-image firstimage" onDragStart={this.setImage} onDragEnd={this.drawImage} src="/src/images/anarchy.png" draggable alt="anarchy"/>
        <img className="stuff-image" onMouseDown={this.setImage} onDragEnd={this.drawImage} src="/src/images/born-to-kill.png" draggable alt="born-to-kill"/>
      </div>
    );
  }

}
