import * as React from 'react';
import { CropAreaHandler } from '../crop-area-handler/CropAreaHandler';
import { CropToolBar } from '../crop-toolbar/CropToolBar';
import { Draggable } from '../draggable/Draggable';
import { DraggableEvent } from '../../interfaces/draggable-event';
import { clamp } from '../../helpers/canvas-helpers';
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
  private position: CropAreaState;

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
    if (this.props.size.width !== prevProps.size.width || this.props.size.height !== prevProps.size.height) {
      this.setState({
        width: this.props.size.width,
        height: this.props.size.height,
      });
    }
    if (this.props.isCropActive !== prevProps.isCropActive) {
      this.croparea.classList.toggle('crop-area--hidden');
    }
  }

  private onCropAreaDrag = (drag: DraggableEvent) => {
    const newTop = clamp(drag.deltaY + this.state.height, 0, this.props.size.height) - this.state.height;
    const newLeft = clamp(drag.deltaX + this.state.width, 0, this.props.size.width) - this.state.width;
    this.setState({
      top: newTop,
      left: newLeft,
    });
  }

  private onHandlerDragTopLeft = (drag: DraggableEvent) => {
    this.setState({
      width: this.position.width - drag.deltaX,
      height: this.position.height - drag.deltaY,
      left: this.position.left + drag.deltaX,
      top: this.position.top + drag.deltaY,
    });
  }

  private onHandlerDragTopRight = (drag: DraggableEvent) => {
    this.setState({
      width: this.position.width + drag.deltaX,
      height: this.position.height - drag.deltaY,
      top: this.position.top + drag.deltaY,
    });
  }

  private onHandlerDragBottomRight = (drag: DraggableEvent) => {
    this.setState({
      width: this.position.width + drag.deltaX,
      height: this.position.height + drag.deltaY,
    });
  }

  private onHandlerDragBottomLeft = (drag: DraggableEvent) => {
    this.setState({
      width: this.position.width - drag.deltaX,
      height: this.position.height + drag.deltaY,
      left: this.position.left + drag.deltaX,
    });
  }

  private setAreaPosition = () => {
    this.position = this.state;
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
      top: this.state.top,
      left: this.state.left,
    };
    const topRight = {
      top: this.state.top,
      left: this.state.left + this.state.width - handlerSize,
    };
    const bottomRight = {
      top: this.state.top + this.state.height - handlerSize,
      left: this.state.left + this.state.width - handlerSize,
    };
    const bottomLeft = {
      top: this.state.top + this.state.height - handlerSize,
      left: this.state.left,
    };

    return (
      <React.Fragment>

        <div className="crop-area--hidden"
          role="presentation"
          ref={(croparea) => this.croparea = croparea}>
          <Draggable onDrag={this.onCropAreaDrag}>
            <div className="crop-area" style={areaStyle}></div>
          </Draggable>
          <CropAreaHandler
            style={topLeft}
            onMouseDown={this.setAreaPosition}
            onDrag={this.onHandlerDragTopLeft}
          />
          <CropAreaHandler
            style={topRight}
            onMouseDown={this.setAreaPosition}
            onDrag={this.onHandlerDragTopRight}
          />
          <CropAreaHandler
            style={bottomLeft}
            onMouseDown={this.setAreaPosition}
            onDrag={this.onHandlerDragBottomLeft}
          />
          <CropAreaHandler
            style={bottomRight}
            onMouseDown={this.setAreaPosition}
            onDrag={this.onHandlerDragBottomRight}
          />
        </div>

        <CropToolBar
          onImageCrop={this.cropImage}
          isCropActive={this.props.isCropActive}
          setActiveToolbar={this.props.setActiveToolBar}
        />

      </React.Fragment>
    );
  }

}
