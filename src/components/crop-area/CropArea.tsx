import * as React from 'react';
import { ToolBar } from '../toolbar/ToolBar';
import { CropAreaRuler } from '../crop-area-ruler/CropAreaRuler';
import { Draggable, Coords } from '../draggable/Draggable';
import './CropArea.css';

interface CropAreaProps {
  onImageCrop: (rectangle: Rectangle) => void;
}

interface Rectangle {
  top: number;
  left: number;
  width: string;
  height: string;
}

export class CropArea extends React.Component<CropAreaProps> {

  constructor(props: CropAreaProps) {
    super(props);
    this.cropImage = this.cropImage.bind(this);
  }

  state = {
    width: '600px',
    height: '500px',
    top: 10,
    left: 10,
  }

  onCropAreaDrag = (coords: Coords) => {
    this.setState({
      top: coords.deltaY,
      left: coords.deltaX
    });
  }

  onCropAreaDragEnd = (coords: Coords) => {
    this.setState({
      top: coords.deltaY,
      left: coords.deltaX
    });
  }

  onRulerDrag = (coords: Coords) => {
    this.setState({
      width: `${coords.x - this.state.left}px`,
      height: `${coords.y - this.state.top}px`
    });
  }

  onRulerDragEnd = (coords: Coords) => {
    this.setState({
      width: `${coords.x - this.state.left}px`,
      height: `${coords.y - this.state.top}px`
    });
  }

  cropImage = () => {
    this.props.onImageCrop(this.state);
    this.setState({
      width: '600px',
      height: '500px',
      top: 10,
      left: 10,
    });
  }

  render() {
    const rulerStyle = {
      top: parseInt(this.state.height) + this.state.top,
      left: parseInt(this.state.width) + this.state.left
    };

    return (
      <React.Fragment>
        <Draggable
          onDrag={(coords: Coords) => this.onCropAreaDrag(coords)}>
          <div className="canvas-mask" role="presentation" style={this.state}></div>
        </Draggable>

        <CropAreaRuler
          style={rulerStyle}
          onDrag={(coords: Coords) => this.onRulerDrag(coords)} />

        <ToolBar cropImage={this.cropImage} />
      </React.Fragment>
    );
  }

}
