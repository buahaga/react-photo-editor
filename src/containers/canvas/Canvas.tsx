import * as React from 'react';
import { CropArea } from '../../components/crop-area/CropArea';
import { Image } from '../../interfaces/image';
import './Canvas.css';

interface CanvasProps {
  image: Partial<Image>;
}

interface CanvasSize {
  width: number;
  height: number;
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
  private isToolBarActive: boolean = false;
  private canvasSize: CanvasSize = {
    width: 600,
    height: 500
  }

  public componentDidMount() {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.fillStyle = 'lightgrey';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public componentDidUpdate(prevProps: CanvasProps) {
    this.isToolBarActive = true;
    if (this.props.image.name !== prevProps.image.name) {
      const image = new Image();
      image.src = URL.createObjectURL(this.props.image);
      this.image = image;
      const drawImage = () => this.ctx.drawImage(image, 0, 0);
      image.onload = drawImage;
    }
  }

  private handleImageBlur = () => {
    const blur = 5;
    this.ctx.globalAlpha = 0.5;
    for (let y = -blur; y <= blur; y += 2) {
      for (let x = -blur; x <= blur; x += 2) {
        this.ctx.drawImage(this.image, x, y);
        if (x >= 0 && y >= 0) {
          this.ctx.drawImage(this.image, -(x - 1), -(y - 1));
        }
      }
    }
    this.ctx.globalAlpha = 1.0;
  }

  private handleImageGreyScale = () => {
    const imgData = this.ctx.getImageData(0, 0, this.canvasSize.width, this.canvasSize.height);
    const pixels = imgData.data;
    for (let i = 0, n = pixels.length; i < n; i += 4) {
      const grayscale = pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11;
      pixels[i] = grayscale;
      pixels[i + 1] = grayscale;
      pixels[i + 2] = grayscale;
    }
    this.ctx.putImageData(imgData, 0, 0);
  }

  private handleImageCrop = (cropAreaPosition: CropAreaPosition) => {
    const imgParams = {
      startTop: cropAreaPosition.top - 10,
      startLeft: cropAreaPosition.left - 10,
      imgWidth: parseInt(cropAreaPosition.width),
      imgHeight: parseInt(cropAreaPosition.height),
    };
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.image,
      imgParams.startLeft, imgParams.startTop, // start drowing image from top left
      imgParams.imgWidth, imgParams.imgHeight, // new image size
      0, 0, // top left position of new image
      this.canvasSize.width, this.canvasSize.height); // size of new image
  }

  private handleImageSave = () => {
    this.canvas.toBlob((blob) => {
      const newImg = document.createElement('img'),
        url = URL.createObjectURL(blob);
      newImg.onload = () => {
        URL.revokeObjectURL(url);
      };
      newImg.src = url;
      document.body.appendChild(newImg);
    });
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <canvas className="canvas" ref={(canvas) => this.canvas = canvas}
          width={this.canvasSize.width} height={this.canvasSize.height} />
        <CropArea
          isToolBarActive={this.isToolBarActive}
          onImageBlur={this.handleImageBlur}
          onImageGreyScale={this.handleImageGreyScale}
          onImageCrop={this.handleImageCrop}
          onImageSave={this.handleImageSave}
          size={this.canvasSize} />
      </React.Fragment>
    );
  }

}
