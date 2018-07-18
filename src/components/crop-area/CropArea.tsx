import * as React from 'react';
import { ToolBar } from '../toolbar/ToolBar';
import { CropAreaRuler } from '../crop-area-ruler/CropAreaRuler';
import { Draggable } from '../draggable/Draggable';
import { Coords } from '../../interfaces/coords';
import './CropArea.css';

interface CropAreaProps {
  onImageBlur: () => void;
  onImageGreyScale: () => void;
  onImageHighLight: () => void;
  onImageCrop: (rectangle: CropAreaState) => void;
  onImageReset: () => void;
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

  private croparea: HTMLElement;

  public constructor(props: CropAreaProps) {
    super(props);
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
        height: `${this.props.size.height}px`,
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
        left: coords.deltaX,
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
        height: `${coords.y - this.state.top}px`,
      });
    }
  }

  private cropImage = () => {
    this.croparea.removeAttribute('hidden');
    this.props.onImageCrop(this.state);
    this.setState({
      width: `${this.props.size.width}px`,
      height: `${this.props.size.height}px`,
      top: 10,
      left: 10,
    });
  }

  public render(): React.ReactNode {

    const rulerStyle = {
      top: parseInt(this.state.height),
      left: parseInt(this.state.width),
    };

    return (
      <React.Fragment>
        <Draggable
          onDrag={this.onCropAreaDrag}>
          <div className="crop-area"
            ref={(croparea) => this.croparea = croparea}
            role="presentation" hidden
            style={this.state}>
            <CropAreaRuler
              style={rulerStyle}
              onDrag={this.onRulerDrag} />
          </div>
        </Draggable>



        <ToolBar isButtonActive={this.props.isToolBarActive}
          blurImage={this.props.onImageBlur}
          greyScaleImage={this.props.onImageGreyScale}
          highlightImage={this.props.onImageHighLight}
          cropImage={this.cropImage}
          resetImage={this.props.onImageReset} />
      </React.Fragment>
    );
  }

}
