import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CropArea } from '../crop-area/CropArea';
import './Canvas.css';

interface CanvasProps {
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
}

interface ImgParams {
  startTop: number;
  startLeft: number;
  imgWidth: number;
  imgHeight: number;
  newTop: number;
  newLeft: number;
}

interface CropAreaPosition {
  top: number;
  left: number;
  width: string;
  height: string;
}

export class Canvas extends React.Component<CanvasProps> {

  canvas: HTMLCanvasElement;
  image: HTMLImageElement;

  componentDidMount() {
    this.canvas = ReactDOM.findDOMNode(this.refs.canvas) as HTMLCanvasElement;
    this.image = ReactDOM.findDOMNode(this.refs.image) as HTMLImageElement;
    const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  componentDidUpdate(prevProps: CanvasProps) {
    if (this.props.imgSrc !== prevProps.imgSrc) {
      const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
      const drawImage = () => ctx.drawImage(this.image, 0, 0);
      this.image.onload = drawImage;
    }
  }

  paintCanvas = (imgParams: ImgParams) => {
    const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.image,
      imgParams.startLeft, imgParams.startTop, // start drowing image from top left
      imgParams.imgWidth, imgParams.imgHeight, // new image size
      imgParams.newLeft, imgParams.newTop, // top left of new image
      this.canvas.width, this.canvas.height); // better equal to canvas size
  }

  handleDataFromMask = (cropAreaPosition: CropAreaPosition) => {
    const newImageParams = {
      startTop: cropAreaPosition.top - 10,
      startLeft: cropAreaPosition.left - 10,
      imgWidth: parseInt(cropAreaPosition.width),
      imgHeight: parseInt(cropAreaPosition.height),
      newTop: 0,
      newLeft: 0,
    };
    this.paintCanvas(newImageParams);
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <canvas className="canvas" ref="canvas" width={600} height={500} />
        <CropArea onImageCrop={this.handleDataFromMask} />
        <img className="hidden-image" ref="image" crossOrigin="anonymous" src={this.props.imgSrc} alt="" />
      </React.Fragment>
    );
  }

}
