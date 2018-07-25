import * as React from 'react';
import { CropAreaHandler } from '../crop-area-handler/CropAreaHandler';
import { CropToolBar } from '../crop-toolbar/CropToolBar';
import { Draggable } from '../draggable/Draggable';
import { DraggableEvent } from '../../interfaces/draggable-event';
import './CropArea.css';

interface CropAreaProps {
  isCropActive: boolean;
  setActiveToolBar: (toolbar: string | boolean) => void;
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
      top: 0,
      left: 0,
    };
  }

  public componentDidUpdate(prevProps: CropAreaProps) {
    //TODO maybe display here
    this.props.isCropActive ? this.croparea.removeAttribute('hidden') : this.croparea.setAttribute('hidden', 'true');
    if (this.props.size.width !== prevProps.size.width || this.props.size.height !== prevProps.size.height) {
      this.setState({
        width: this.props.size.width,
        height: this.props.size.height,
      });
    }
  }

  private onCropAreaDrag = (draggableEvent: DraggableEvent) => {
    const currentWidth = draggableEvent.deltaX + this.state.width;
    const currentHeight = draggableEvent.deltaY + this.state.height;
    if (currentWidth < this.props.size.width &&
      currentHeight < this.props.size.height &&
      draggableEvent.deltaX > 0 && draggableEvent.deltaY > 0) {
      this.setState({
        top: draggableEvent.deltaY,
        left: draggableEvent.deltaX,
      });
    }
  }

  private onHandlerDragTopLeft = (draggableEvent: DraggableEvent) => {
    const topLeftInArea = draggableEvent.x >= 0 && draggableEvent.y >= 0;
    const bottomRightInArea = draggableEvent.x <= this.props.size.width && draggableEvent.y <= this.props.size.height;
    if (topLeftInArea && bottomRightInArea) {
      this.setState({
        width: this.currentWidth - draggableEvent.deltaX,
        height: this.currentHeight - draggableEvent.y,
        top: draggableEvent.y,
        left: draggableEvent.x,
      });
    }
  }

  private onHandlerDragTopRight = (draggableEvent: DraggableEvent) => {
    const topLeftInArea = draggableEvent.x >= 0 && draggableEvent.y >= 0;
    const bottomRightInArea = draggableEvent.x <= this.props.size.width && draggableEvent.y <= this.props.size.height;
    if (topLeftInArea && bottomRightInArea) {
      this.setState({
        width: draggableEvent.x - this.state.left,
        height: this.currentHeight - draggableEvent.y,
        top: draggableEvent.y,
      });
    }
  }

  private onHandlerDragBottomRight = (draggableEvent: DraggableEvent) => {
    const topLeftInArea = draggableEvent.x >= 0 && draggableEvent.y >= 0;
    const bottomRightInArea = draggableEvent.x <= this.props.size.width && draggableEvent.y <= this.props.size.height;
    if (topLeftInArea && bottomRightInArea) {
      this.setState({
        width: draggableEvent.x - this.state.left,
        height: draggableEvent.y - this.state.top,
      });
    }
  }

  private onHandlerDragBottomLeft = (draggableEvent: DraggableEvent) => {
    const topLeftInArea = draggableEvent.x >= 0 && draggableEvent.y >= 0;
    const bottomRightInArea = draggableEvent.x <= this.props.size.width && draggableEvent.y <= this.props.size.height;
    if (topLeftInArea && bottomRightInArea) {
      this.setState({
        width: this.currentWidth - draggableEvent.deltaX,
        height: draggableEvent.y - this.state.top,
        left: draggableEvent.x,
      });
    }
  }

  private getAreaCurrentSize = () => {
    this.currentWidth = this.state.width;
    this.currentHeight = this.state.height;
  }

  private cropImage = () => {
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
      top: 0,
      left: 0,
    });
  }

  public render(): React.ReactNode {

    const handlerSize = 10;
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
      left: this.state.width - handlerSize,
    };
    const bottomRight = {
      top: this.state.height - handlerSize,
      left: this.state.width - handlerSize,
    };
    const bottomLeft = {
      top: this.state.height - handlerSize,
      left: 0,
    };

    return (
      <React.Fragment>

        <Draggable
          onDrag={this.onCropAreaDrag}>
          <div className="crop-area"
            ref={(croparea) => this.croparea = croparea}
            role="presentation" hidden
            style={areaStyle}>
            <CropAreaHandler
              style={topLeft}
              onMouseDown={this.getAreaCurrentSize}
              onDrag={this.onHandlerDragTopLeft}
            />
            <CropAreaHandler
              style={topRight}
              onMouseDown={this.getAreaCurrentSize}
              onDrag={this.onHandlerDragTopRight}
            />
            <CropAreaHandler
              style={bottomLeft}
              onMouseDown={this.getAreaCurrentSize}
              onDrag={this.onHandlerDragBottomLeft}
            />
            <CropAreaHandler
              style={bottomRight}
              onDrag={this.onHandlerDragBottomRight}
            />
          </div>
        </Draggable>

        <CropToolBar
          onImageCrop={this.cropImage}
          isCropActive={this.props.isCropActive}
          setActiveToolbar={this.props.setActiveToolBar}
        />

      </React.Fragment>
    );
  }

}
