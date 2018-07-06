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

interface MaskPosition {
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
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // const startImageParams = {
    //   startTop: 0,
    //   startLeft: 0,
    //   imgWidth: parseInt('600px'),
    //   imgHeight: parseInt('500px'),
    //   newTop: 0,
    //   newLeft: 0,
    // };
    // this.paintCanvas(startImageParams);
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

  handleDataFromMask = (maskPosition: MaskPosition) => {
    const newImageParams = {
      startTop: maskPosition.top - 5,
      startLeft: maskPosition.left - 5,
      imgWidth: parseInt(maskPosition.width),
      imgHeight: parseInt(maskPosition.height),
      newTop: 0,
      newLeft: 0,
    };
    this.paintCanvas(newImageParams);
  }

  render(): React.ReactNode {

    return (
      <React.Fragment>
        <canvas  className="canvas" ref="canvas" width={600} height={500} />
        <CropArea onImageCrop={this.handleDataFromMask} />
        <img className="hidden-image" alt="" ref="image" src={this.props.imgSrc} />
      </React.Fragment>
    );
  }

}
