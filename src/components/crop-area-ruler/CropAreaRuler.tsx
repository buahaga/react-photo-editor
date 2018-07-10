import * as React from 'react';
import { Draggable } from '../../HOC/draggable/Draggable';
import { Coords } from '../../interfaces/coords';
import './CropAreaRuler.css';

interface CropAreaRulerProps {
  onDrag: (coords: Coords) => void;
  style: {
    top: number;
    left: number;
  };
}

export class CropAreaRuler extends React.Component<CropAreaRulerProps> {

  public render() {
    return (
      <Draggable onDrag={this.props.onDrag}>
        <div className="test-ruler" style={this.props.style}></div>
      </Draggable>
    );
  }

}
