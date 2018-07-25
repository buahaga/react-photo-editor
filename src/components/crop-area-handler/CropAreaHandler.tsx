import * as React from 'react';
import { Draggable } from '../draggable/Draggable';
import { DraggableEvent } from '../../interfaces/draggable-event';
import './CropAreaHandler.css';

interface CropAreaHandlerProps {
  onMouseDown?: () => void;
  onDrag: (draggableEvent: DraggableEvent) => void;
  style: {
    top: number;
    left: number;
  };
}

export class CropAreaHandler extends React.Component<CropAreaHandlerProps> {

  public render() {
    return (
      <Draggable onDrag={this.props.onDrag}>
        <div className="crop-handler" style={this.props.style} onMouseDown={this.props.onMouseDown}></div>
      </Draggable>
    );
  }

}
