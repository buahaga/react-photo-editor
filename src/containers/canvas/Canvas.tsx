import * as React from 'react';
import { DrawToolBar } from '../../components/draw-toolbar/DrawToolBar';
import { CropArea } from '../../components/crop-area/CropArea';
import { blur, greyscale, highlight } from '../../helpers/canvas-helpers';
import { Image } from '../../interfaces/image';
import './Canvas.css';

interface CanvasProps {
  image: Partial<Image>;
}

interface CanvasSize {
  width: number;
  height: number;
  isToolBarActive: boolean;
}

interface CropAreaPosition {
  top: number;
  left: number;
  width: string;
  height: string;
}

export class Canvas extends React.Component<CanvasProps> {

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private imageBackUp: HTMLImageElement;
  public state: CanvasSize;

  public constructor(props: CanvasProps) {
    super(props);
    this.state = {
      width: 600,
      height: 500,
      isToolBarActive: false,
    };
  }

  public componentDidMount() {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.fillStyle = 'lightgrey';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public componentDidUpdate(prevProps: CanvasProps) {
    if (this.props.image.name !== prevProps.image.name) {
      const image = new Image();
      image.src = URL.createObjectURL(this.props.image);
      const drawImage = () => {
        const imageWidth = (image.width > 600) ? 600 : image.width;
        const imageHeight = (image.height > 100) ? Math.round(image.height / (image.width / imageWidth)) : image.height;
        this.setState({
          width: imageWidth,
          height: imageHeight,
        });
        this.ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
      };
      this.image = image;
      this.imageBackUp = image;
      this.setState({ isToolBarActive: true, });
      image.onload = drawImage;
    }
  }

  private handleImageBlur = () => {
    const imgData = this.ctx.getImageData(0, 0, this.state.width, this.state.height);
    blur(imgData, 3, 3);
    this.saveChanges(imgData);
  }

  private handleImageGreyScale = () => {
    const imgData = this.ctx.getImageData(0, 0, this.state.width, this.state.height);
    greyscale(imgData);
    this.saveChanges(imgData);
  }

  private handleImageHighlight = () => {
    const imgData = this.ctx.getImageData(0, 0, this.state.width, this.state.height);
    highlight(imgData);
    this.saveChanges(imgData);
  }

  private handleImageCrop = (cropAreaPosition: CropAreaPosition) => {
    const imgParams = {
      startTop: cropAreaPosition.top - 10,
      startLeft: cropAreaPosition.left - 10,
      imgWidth: parseInt(cropAreaPosition.width),
      imgHeight: parseInt(cropAreaPosition.height),
    };
    this.ctx.drawImage(this.canvas, imgParams.startLeft, imgParams.startTop,
      imgParams.imgWidth, imgParams.imgHeight, 0, 0, this.state.width, this.state.height);
  }

  private handleImageReset = () => {
    this.ctx.drawImage(this.imageBackUp, 0, 0, this.state.width, this.state.height);
    this.image = this.imageBackUp;
  }

  private handleImageSave = () => {
    this.canvas.toBlob((blob) => {
      const newImg = document.createElement('img');
      const url = URL.createObjectURL(blob);
      newImg.onload = () => {
        URL.revokeObjectURL(url);
      };
      newImg.src = url;
      document.body.appendChild(newImg);
    });
  }

  private saveChanges = (imgData: ImageData) => {
    this.ctx.putImageData(imgData, 0, 0);
    this.canvas.toBlob(() => {
      const newImg = new Image();
      this.image = newImg;
    });
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <canvas className="canvas"
          ref={(canvas) => this.canvas = canvas}
          width={this.state.width}
          height={this.state.height} />
        <DrawToolBar />
        <CropArea
          isToolBarActive={this.state.isToolBarActive}
          onImageBlur={this.handleImageBlur}
          onImageGreyScale={this.handleImageGreyScale}
          onImageHighLight={this.handleImageHighlight}
          onImageCrop={this.handleImageCrop}
          onImageReset={this.handleImageReset}
          onImageSave={this.handleImageSave}
          size={this.state} />
      </React.Fragment>
    );
  }

}
