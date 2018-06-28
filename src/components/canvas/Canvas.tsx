import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CanvasMask } from '../canvas-mask/CanvasMask';
import './Canvas.css';

interface CanvasProps {
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
}

export class Canvas extends React.Component<CanvasProps> {

  componentDidMount() {
    const canvas = (ReactDOM.findDOMNode(this.refs.canvas) as HTMLCanvasElement);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    const image = (ReactDOM.findDOMNode(this.refs.image) as HTMLImageElement);

    image.onload = () => {
      ctx.drawImage(image,
        0, 0, // start drowing image from top left
        this.props.imgWidth, this.props.imgHeight, // new image size
        0, 0, // top left of new image
        this.props.imgWidth, this.props.imgHeight) // better equal to new image size
    }
  }

  handleDataFromMask(state: any) {
    //TODO change your imageSize in here
  }

  handleDataFromRuler(size: any) {
    console.log(size)
  }

  render(): React.ReactNode {

    return (
      <div>
        <canvas  className="canvas" ref="canvas" width={600} height={500} />
        <CanvasMask canvasMaskCurrentState={this.handleDataFromMask} />
        <img className="hidden-image" alt="" ref="image" src={this.props.imgSrc} />
      </div>
    )
  }

}
