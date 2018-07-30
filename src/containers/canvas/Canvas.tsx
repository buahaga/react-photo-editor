import * as React from 'react';
import { ToolBar } from '../../components/toolbar/ToolBar';
import { DrawToolBar } from '../../components/draw-toolbar/DrawToolBar';
import { DropToolBar } from '../../components/drop-toolbar/DropToolBar';
import { CropArea } from '../../components/crop-area/CropArea';
import { blur, greyscale, highlight, clamp } from '../../helpers/canvas-helpers';
import { Image } from '../../interfaces/image';
import './Canvas.css';

export const DrawActive = 'DrawActive', CropActive = 'CropActive', DropActive = 'DropActive';

interface CanvasProps {
  image: Partial<Image>;
}

interface CanvasState {
  width: number;
  height: number;
  motionOn: boolean;
  DrawActive: boolean;
  startX: number;
  startY: number;
  color: string;
  size: number;
  CropActive: boolean;
  DropActive: boolean;
  dropImageSrc: string | null;
}

interface CropAreaPosition {
  top: number;
  left: number;
  width: string;
  height: string;
}

export class Canvas extends React.Component<CanvasProps, CanvasState> {

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private imageBackUp: HTMLImageElement;
  public state: CanvasState;

  public constructor(props: CanvasProps) {
    super(props);
    this.state = {
      width: 600,
      height: 500,
      motionOn: false,
      DrawActive: false,
      startX: 0,
      startY: 0,
      color: 'red',
      size: 5,
      CropActive: false,
      DropActive: false,
      dropImageSrc: null,
    };
  }

  public componentDidMount() {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public componentDidUpdate(prevProps: CanvasProps) {
    this.ctx.lineWidth = this.state.size;
    this.ctx.strokeStyle = this.state.color;
    if (this.props.image.name !== prevProps.image.name) {
      this.drawUploadedImage();
    }
  }

  private drawUploadedImage = () => {
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
    image.onload = drawImage;
  }

  private clearCanvas = () => {
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.setState({ dropImageSrc: null, });
  }

  private saveChanges = (imgData: ImageData) => {
    this.ctx.putImageData(imgData, 0, 0);
    this.canvas.toBlob(() => {
      const newImg = new Image();
      this.image = newImg;
    });
  }

  private saveCanvasToImage = () => {
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

  private setActiveToolbar = (activeToolBar: string | boolean) => {
    switch (activeToolBar) {
      case DrawActive:
        this.setState({ DrawActive: true, CropActive: false, DropActive: false, });
        break;
      case CropActive:
        this.setState({ DrawActive: false, CropActive: true, DropActive: false, });
        break;
      case DropActive:
        this.setState({ DrawActive: false, CropActive: false, DropActive: true, });
        break;
      default:
        this.setState({ DrawActive: false, CropActive: false, DropActive: false, });
    }
  }

  //BOTTOM TOOLBAR HANDLERS
  private handleImageBlur = () => {
    const imgData = this.ctx.getImageData(0, 0, this.state.width, this.state.height);
    blur(imgData, 5);
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

  private handleImageReset = () => {
    this.ctx.drawImage(this.imageBackUp, 0, 0, this.state.width, this.state.height);
    this.image = this.imageBackUp;
    this.setState({ dropImageSrc: '', });
  }

  //DRAW TOOLBAR HANDLERS
  private drawOnCanvas = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    this.ctx.beginPath();
    this.ctx.moveTo(this.state.startX, this.state.startY);
    this.ctx.lineTo(evt.clientX, evt.clientY);
    this.ctx.stroke();
    this.setState({ startX: evt.clientX, startY: evt.clientY, });
  }

  private handleColorChange = (color: string) => {
    this.setState({ color: color, });
  }

  private handleSizeChange = (size: number) => {
    const value = this.state.size + size;
    this.setState({ size: clamp(value, 1, 10), });
  }

  //CROP TOOLBAR HANLDERS
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

  //DROP TOOLBAR HANDLERS
  private handleImageDrag = (evt: string) => {
    if (this.state.DropActive) {
      const imgData = this.canvas.toDataURL();
      this.setState({ dropImageSrc: evt, });
      this.canvas.toBlob(() => {
        const newImg = new Image();
        newImg.src = imgData;
        this.imageBackUp = newImg;
      });
    }
  }

  private handleImageDrop = (evt: React.DragEvent<HTMLImageElement>) => {
    if (this.state.DropActive) {
      const image = new Image;
      image.src = this.state.dropImageSrc;
      this.ctx.drawImage(image, evt.clientX - image.width / 2, evt.clientY - image.height / 2);
    }
  }

  private handleImageMove = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.state.dropImageSrc) {
      const image = new Image;
      image.src = this.state.dropImageSrc;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.imageBackUp, 0, 0);
      this.ctx.drawImage(image, evt.clientX - image.width / 2, evt.clientY - image.height / 2);
    }
  }

  //MOUSE EVENTS HANLDERS
  private handleMouseDown = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    this.setState({ motionOn: true, startX: evt.clientX, startY: evt.clientY, });
  }

  private handleMouseMove = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    if (this.state.motionOn) {
      if (this.state.DropActive) {
        this.handleImageMove(evt);
      } else if (this.state.DrawActive) {
        this.drawOnCanvas(evt);
      } else {
        return;
      }
    }
  }

  private handleMouseUp = () => {
    this.setState({ motionOn: false, });
  }

  public render(): React.ReactNode {
    return (
      <div className="canvas-relative">

        <canvas className="canvas"
          ref={(canvas) => this.canvas = canvas}
          width={this.state.width}
          height={this.state.height}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        />

        <div className="rigth-toolbar">
          <DrawToolBar
            isDrawActive={this.state.DrawActive}
            setActiveToolBar={this.setActiveToolbar}
            crayonSize={this.state.size}
            onColorChange={this.handleColorChange}
            onSizeChange={this.handleSizeChange}
          />
          <CropArea
            isCropActive={this.state.CropActive}
            setActiveToolBar={this.setActiveToolbar}
            onImageCrop={this.handleImageCrop}
            size={this.state}
          />
          <DropToolBar
            isDropActive={this.state.DropActive}
            setActiveToolBar={this.setActiveToolbar}
            onImageDrag={this.handleImageDrag}
            onImageDrop={this.handleImageDrop}
          />
        </div>

        <ToolBar
          onImageBlur={this.handleImageBlur}
          onImageGreyScale={this.handleImageGreyScale}
          onImageHighLight={this.handleImageHighlight}
          isResetActive={Boolean(this.imageBackUp)}
          onImageReset={this.handleImageReset}
          onClearCanvas={this.clearCanvas}
          onSaveCanvas={this.saveCanvasToImage}
        />

      </div>
    );
  }

}
