import * as React from 'react';
import { CropAreaRuler } from '../crop-area-ruler/CropAreaRuler';
import { CropToolBar } from '../crop-toolbar/CropToolBar';
import { Draggable } from '../draggable/Draggable';
import { Coords } from '../../interfaces/coords';
import './CropArea.css';

interface CropAreaProps {
  onImageCrop: (rectangle: CropAreaPosition) => void;
  size: {
    width: number;
    height: number;
  };
}

interface CropAreaPosition {
  top: number;
  left: number;
  width: string;
  height: string;
}

interface CropAreaState {
  top: number;
  left: number;
  width: number;
  height: number;
}

export class CropArea extends React.Component<CropAreaProps, CropAreaState> {

  private croparea: HTMLElement;
  private currentWidth: number = this.props.size.width;
  private currentHeight: number = this.props.size.height;

  public constructor(props: CropAreaProps) {
    super(props);
    this.state = {
      width: this.props.size.width,
      height: this.props.size.height,
      top: 10,
      left: 10,
    };
  }

  public componentDidUpdate(prevProps: CropAreaProps) {
    if (this.props.size.width !== prevProps.size.width || this.props.size.height !== prevProps.size.height) {
      this.setState({
        width: this.props.size.width,
        height: this.props.size.height,
      });
    }
  }

  private onCropAreaDrag = (coords: Coords) => {
    const currentWidth = coords.deltaX + this.state.width;
    const currentHeight = coords.deltaY + this.state.height;
    if (currentWidth < this.props.size.width + 10 &&
      currentHeight < this.props.size.height + 10 &&
      coords.deltaX > 10 && coords.deltaY > 10) {
      this.setState({
        top: coords.deltaY,
        left: coords.deltaX,
      });
    }
  }

  private setCurrentWidthAndHeght = () => {
    this.croparea.addEventListener('mousedown', () => {
      this.currentWidth = this.state.width;
      this.currentHeight = this.state.height;
    }, true);
  }

  private onRulerDragTopLeft = (coords: Coords) => {
    const topLeftInArea = coords.x >= 10 && coords.y >= 10;
    const bottomRightInArea = coords.x <= this.props.size.width && coords.y <= this.props.size.height;
    if (topLeftInArea && bottomRightInArea) {
      this.setState({
        width: this.currentWidth - coords.deltaX - 10,
        height: this.currentHeight - coords.y + 10,
        top: coords.y,
        left: coords.x,
      });
    }
  }

  private onRulerDragTopRight = (coords: Coords) => {
    const topLeftInArea = coords.x >= 10 && coords.y >= 10;
    const bottomRightInArea = coords.x <= this.props.size.width + 10 && coords.y <= this.props.size.height + 10;
    if (topLeftInArea && bottomRightInArea) {
      this.setState({
        width: coords.x - this.state.left,
        height: this.currentHeight - coords.y + 10,
        top: coords.y,
      });
    }
  }

  private onRulerDragBottomRight = (coords: Coords) => {
    const topLeftInArea = coords.x >= 10 && coords.y >= 10;
    const bottomRightInArea = coords.x <= this.props.size.width + 10 && coords.y <= this.props.size.height + 10;
    if (topLeftInArea && bottomRightInArea) {
      this.setState({
        width: coords.x - this.state.left,
        height: coords.y - this.state.top,
      });
    }
  }

  private onRulerDragBottomLeft = (coords: Coords) => {
    const topLeftInArea = coords.x >= 10 && coords.y >= 10;
    const bottomRightInArea = coords.x <= this.props.size.width + 10 && coords.y <= this.props.size.height + 10;
    if (topLeftInArea && bottomRightInArea) {
      this.setState({
        width: this.currentWidth - coords.deltaX - 10,
        height: coords.y - this.state.top,
        left: coords.x,
      });
    }
  }

  private cropImage = () => {
    this.croparea.removeAttribute('hidden');
    const areaPosition = {
      width: `${this.state.width}px`,
      height: `${this.state.height}px`,
      top: this.state.top,
      left: this.state.left,
    };
    this.props.onImageCrop(areaPosition);
    this.setState({
      width: this.props.size.width,
      height: this.props.size.height,
      top: 10,
      left: 10,
    });
  }

  public render(): React.ReactNode {

    const areaStyle = {
      width: `${this.state.width}px`,
      height: `${this.state.height}px`,
      top: this.state.top,
      left: this.state.left,
    };
    const topLeft = {
      top: 0,
      left: 0,
    };
    const topRight = {
      top: 0,
      left: this.state.width - 10,
    };
    const bottomRight = {
      top: this.state.height - 10,
      left: this.state.width - 10,
    };
    const bottomLeft = {
      top: this.state.height - 10,
      left: 0,
    };

    return (
      <React.Fragment>
        <Draggable
          onDrag={this.onCropAreaDrag}>
          <div className="crop-area"
            ref={(croparea) => this.croparea = croparea}
            role="presentation" hidden
            style={areaStyle}
            onMouseDown={this.setCurrentWidthAndHeght}>
            <CropAreaRuler
              style={topLeft}
              onDrag={this.onRulerDragTopLeft} />
            <CropAreaRuler
              style={topRight}
              onDrag={this.onRulerDragTopRight} />
            <CropAreaRuler
              style={bottomLeft}
              onDrag={this.onRulerDragBottomLeft} />
            <CropAreaRuler
              style={bottomRight}
              onDrag={this.onRulerDragBottomRight} />
          </div>
        </Draggable>

        <CropToolBar onImageCrop={this.cropImage}/>


      </React.Fragment>
    );
  }

}
