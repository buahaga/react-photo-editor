import * as React from 'react';
import { ToolBar } from '../toolbar/ToolBar';
import { CropAreaRuler } from '../crop-area-ruler/CropAreaRuler';
import { Draggable } from '../draggable/Draggable';
import { Coords } from '../../interfaces/coords';
import './CropArea.css';

interface CropAreaProps {
  onImageBlur: () => void;
  onImageGreyScale: () => void;
  onImageCrop: (rectangle: CropAreaState) => void;
  onImageSave: () => void;
  size: {
    width: number;
    height: number;
  };
  isToolBarActive: boolean;
}

interface CropAreaState {
  top: number;
  left: number;
  width: string;
  height: string;
}

export class CropArea extends React.Component<CropAreaProps, CropAreaState> {

  public state: CropAreaState;

  public constructor(props: CropAreaProps) {
    super(props);
    this.cropImage = this.cropImage.bind(this);
    this.state = {
      width: `${this.props.size.width}px`,
      height: `${this.props.size.height}px`,
      top: 10,
      left: 10,
    };
  }

  private onCropAreaDrag = (coords: Coords) => {
    this.setState({
      top: coords.deltaY,
      left: coords.deltaX
    });
  }

  private onRulerDrag = (coords: Coords) => {
    this.setState({
      width: `${coords.x - this.state.left}px`,
      height: `${coords.y - this.state.top}px`
    });
  }

  private cropImage = () => {
    this.props.onImageCrop(this.state);
    this.setState({
      width: `${this.props.size.width}px`,
      height: `${this.props.size.height}px`,
      top: 10,
      left: 10,
    });
  }

  public render() {
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

        <ToolBar isButtonActive={this.props.isToolBarActive}
          blurImage={this.props.onImageBlur}
          greyScaleImage={this.props.onImageGreyScale}
          cropImage={this.cropImage}
          saveImage={this.props.onImageSave} />
      </React.Fragment>
    );
  }

}
