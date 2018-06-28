import * as React from 'react';
import { ToolBar } from '../toolbar/ToolBar';
import { CanvasMaskRuler } from '../canvas-mask-ruler/CanvasMaskRuler';
import './CanvasMask.css';

interface CanvasMaskProps {
  canvasMaskCurrentState: Function;
}

export class CanvasMask extends React.Component<CanvasMaskProps> {

  constructor(props: any) {
    super(props);
    this.cropImage = this.cropImage.bind(this)
  }

  state = {
    width: '600px',
    height: '500px',
    top: 5,
    left: 5,
  }

  onMouseDown = (evt: any) => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp = (evt: any) => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (evt: any) => {
    const maskStyles = {
      top: evt.clientY - (parseInt(this.state.width) / 2),
      left: evt.clientX - (parseInt(this.state.height) / 2)
    }
    this.setState({ top: maskStyles.top, left: maskStyles.left });
  }

  onRulerMove = (evt: any) => {
    const prevWidth = parseInt(this.state.width);
    const prevHeight = parseInt(this.state.height);
    const prevTop = this.state.top;
    const prevLeft = this.state.left;

    const newWidth = prevWidth - (prevWidth + prevLeft - evt.clientX);
    const newHeight = prevHeight - (prevHeight + prevTop - evt.clientY);
    const newTop = prevTop;
    const newLeft = prevLeft;

    this.setState({
      width: `${newWidth}px`,
      height: `${newHeight}px`,
      top: newTop,
      left: newLeft
    })
  }

  cropImage() {
    this.props.canvasMaskCurrentState(this.state)
    this.setState({
      width: '600px',
      height: '500px',
      top: 5,
      left: 5,
    })
  }

  render() {
    const { width, height, top, left } = this.state;
    const bottomRight = {
      top: top + parseInt(height),
      left: left + parseInt(width),
    };

    return (
      <React.Fragment>
        <div className="canvas-mask"
          onMouseDown={(evt) => this.onMouseDown(evt)}
          role="presentation"
          style={this.state}></div>

        <CanvasMaskRuler rulerStyle={bottomRight} rulerPosition={this.onRulerMove} />

        <ToolBar cropImage={this.cropImage} />

      </React.Fragment>
    )
  }

}
