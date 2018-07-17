import * as React from 'react';
import { ToolBar } from '../toolbar/ToolBar';
import { CropAreaRuler } from '../crop-area-ruler/CropAreaRuler';
import { Draggable } from '../../HOC/draggable/Draggable';
import { Coords } from '../../interfaces/coords';
import './CropArea.css';

interface CropAreaProps {
  onImageBlur: () => void;
  onImageGreyScale: () => void;
  onImageColor: () => void;
  onImageCrop: (rectangle: CropAreaState) => void;
  onImageReset: () => void;
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

  public componentDidUpdate(prevProps: CropAreaProps) {
    if (this.props.size.width !== prevProps.size.width || this.props.size.height !== prevProps.size.height) {
      this.setState({
        width: `${this.props.size.width}px`,
        height: `${this.props.size.height}px`
      });
    }
  }

  private onCropAreaDrag = (coords: Coords) => {
    const currentWidth = coords.deltaX + parseInt(this.state.width);
    const currentHeight = coords.deltaY + parseInt(this.state.height);
    if (currentWidth < this.props.size.width + 10 &&
      currentHeight < this.props.size.height + 10 &&
      coords.deltaX > 10 && coords.deltaY > 10) {
      this.setState({
        top: coords.deltaY,
        left: coords.deltaX
      });
    }
  }

  private onRulerDrag = (coords: Coords) => {
    const offsetX = coords.x - this.state.left;
    const offsetY = coords.y - this.state.top;
    if (offsetX < this.props.size.width &&
      offsetY < this.props.size.height &&
      offsetX > 10 && offsetY > 10) {
      this.setState({
        width: `${coords.x - this.state.left}px`,
        height: `${coords.y - this.state.top}px`
      });
    }
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

    const areaClassName = this.props.isToolBarActive ? 'crop-area' : 'crop-area hidden';
    const rulerClassName = this.props.isToolBarActive ? 'crop-ruler' : 'crop-ruler hidden';
    const rulerStyle = {
      top: parseInt(this.state.height) + this.state.top,
      left: parseInt(this.state.width) + this.state.left
    };

    return (
      <React.Fragment>
        <Draggable
          onDrag={(coords: Coords) => this.onCropAreaDrag(coords)}>
          <div className={areaClassName} role="presentation" style={this.state}></div>
        </Draggable>

        <CropAreaRuler
          rulerClassName={rulerClassName} style={rulerStyle}
          onDrag={(coords: Coords) => this.onRulerDrag(coords)} />

        <ToolBar isButtonActive={this.props.isToolBarActive}
          blurImage={this.props.onImageBlur}
          greyScaleImage={this.props.onImageGreyScale}
          colorImage={this.props.onImageColor}
          cropImage={this.cropImage}
          resetImage={this.props.onImageReset}
          saveImage={this.props.onImageSave} />
      </React.Fragment>
    );
  }

}
