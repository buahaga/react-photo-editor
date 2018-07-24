import * as React from 'react';
import { ToolBar } from '../../components/toolbar/ToolBar';
import { DrawToolBar } from '../../components/draw-toolbar/DrawToolBar';
import { StuffToolBar } from '../../components/stuff-toolbar/StuffToolBar';
import { CropArea } from '../../components/crop-area/CropArea';
import { blur, greyscale, highlight } from '../../helpers/canvas-helpers';
import { Image } from '../../interfaces/image';
import './Canvas.css';

interface CanvasProps {
  image: Partial<Image>;
}

interface CanvasState {
  width: number;
  height: number;
  iDraw: boolean;
  lastX: number;
  lastY: number;
  color: string;
  size: number;
  iCrop: boolean;
  iDrop: boolean;
  dropImageSrc: string;
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
  public state: CanvasState;

  public constructor(props: CanvasProps) {
    super(props);
    this.state = {
      width: 600,
      height: 500,
      iDraw: false,
      lastX: 0,
      lastY: 0,
      color: 'red',
      size: 5,
      iCrop: false,
      iDrop: false,
      dropImageSrc: '',
    };
  }

  public componentDidMount() {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.addEventListener('mousedown', (evt: MouseEvent) => {
      this.setState({ lastX: evt.offsetX, lastY: evt.offsetY, iDraw: true, });
    });
    this.canvas.addEventListener('mousemove', this.drawOnCanvas);
    this.canvas.addEventListener('mouseup', () => this.setState({ iDraw: false, }));
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

  private drawOnCanvas = (evt: MouseEvent, ) => {
    if (!this.state.iDraw) return;
    this.ctx.beginPath();
    this.ctx.moveTo(this.state.lastX, this.state.lastY);
    this.ctx.lineTo(evt.offsetX, evt.offsetY);
    this.ctx.stroke();
    this.setState({ lastX: evt.offsetX, lastY: evt.offsetY, });
  }

  private clearCanvas = () => {
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.setState({ dropImageSrc: '', });
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
    //TODO CHANGE TO SAVE ON PAGE/DRIVE
    // const imgData = this.canvas.toDataURL();
    // const image = new Image();
    // const link = document.createElement('a');
    // image.src = imgData;
    // link.setAttribute('href', image.src);
    // link.setAttribute('download', 'canvasImage');
    // link.click();
  }

  private setActiveToolbar = (toolBarName: string) => {
    const toolbars = ['iDraw', 'iCrop', 'iDrop'];
    this.setState({
      iDraw: true,
      iCrop: false,
      iDrop: false,
    });
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
    this.setState({ dropImageSrc: '', });
  }

  //DRAW TOOLBAR HANDLERS
  private handleColorChange = (color: string) => {
    this.setState({ color: color, });
  }

  private handleSizeChange = (size: number) => {
    if (this.state.size + size !== 0 && this.state.size + size !== 10) {
      this.setState({ size: this.state.size + size, });
    }
  }

  //STUFF TOOLBAR HANDLERS
  private handleImageDrag = (evt: string) => {
    const imgData = this.canvas.toDataURL();
    this.setState({ dropImageSrc: evt, });
    this.canvas.toBlob(() => {
      const newImg = new Image();
      newImg.src = imgData;
      this.imageBackUp = newImg;
    });
  }

  private handleImageDrop = (evt: DragEvent) => {
    const image = new Image;
    image.src = this.state.dropImageSrc;
    this.ctx.drawImage(image, evt.clientX - image.width / 2, evt.clientY - image.height / 2);
  }

  //HANDLE DROPPEDIMAGE MOVE
  private handleMouseDown = () => {
    if (this.state.iDrop) {
      this.ctx.drawImage(this.image, 0, 0, this.state.width, this.state.height);
    }
    //TODO CHANGE ACTIVE TOOLBAR BY CHECKBOX-SLIDER (iDraw, iCrop, iDrop)
    this.setState({ iDraw: true, iDrop: true, });
  }

  private handleMouseUp = () => {
    this.setState({ iDraw: false, iDrop: false, });
  }

  private handleMouseMove = (evt: any) => {
    if (this.state.iDrop && this.state.dropImageSrc) {
      const image = new Image;
      image.src = this.state.dropImageSrc;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.imageBackUp, 0, 0);
      this.ctx.drawImage(image, evt.clientX - image.width / 2, evt.clientY - image.height / 2);
    }
  }


  public render(): React.ReactNode {
    return (
      <React.Fragment>

        <canvas className="canvas"
          ref={(canvas) => this.canvas = canvas}
          width={this.state.width}
          height={this.state.height}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp} />

        <div className="rigth-toolbar">
          <DrawToolBar
            onColorChange={this.handleColorChange}
            onSizeChange={this.handleSizeChange} />

          <CropArea
            onImageCrop={this.handleImageCrop}
            size={this.state} />

          <StuffToolBar
            onImageDrag={this.handleImageDrag}
            onImageDrop={this.handleImageDrop} />
        </div>

        <ToolBar
          onImageBlur={this.handleImageBlur}
          onImageGreyScale={this.handleImageGreyScale}
          onImageHighLight={this.handleImageHighlight}
          onImageReset={this.handleImageReset}
          onClearCanvas={this.clearCanvas}
          onSaveCanvas={this.saveCanvasToImage} />

      </React.Fragment>
    );
  }

}
