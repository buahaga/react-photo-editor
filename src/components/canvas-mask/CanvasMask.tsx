import * as React from 'react';
import { CanvasMaskRuler } from '../canvas-mask-ruler/CanvasMaskRuler';
import './CanvasMask.css';

interface CanvasMaskProps {
  canvasMaskCurrentState: Function;
}

export class CanvasMask extends React.Component<CanvasMaskProps> {

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
    //TODO should I specify ruler with argument?
    const newWidth = `${parseInt(this.state.width) - 10}px`;
    const newHeight = `${parseInt(this.state.height) - 10}px`;
    const newTop = this.state.top + 10;
    const newLeft = this.state.left + 10;

    this.setState({
      width: newWidth,
      height: newHeight,
      top: newTop,
      left: newLeft
    })
  }

  render() {
    const MASK_BORDER = 10;
    const topLeft = {
      top: this.state.top,
      left: this.state.left,
    };
    const topRight = {
      top: this.state.top,
      left: this.state.left + parseInt(this.state.width) - MASK_BORDER,
    };
    const bottomRight = {
      top: this.state.top + parseInt(this.state.height) - MASK_BORDER,
      left: this.state.left + parseInt(this.state.width) - MASK_BORDER,
    };
    const bottomLeft = {
      top: this.state.top + parseInt(this.state.height) - MASK_BORDER,
      left: this.state.left,
    };

    return (
      <React.Fragment>

        <div className="canvas-mask"
          onMouseDown={(evt) => this.onMouseDown(evt)}
          onChange={this.props.canvasMaskCurrentState(this.state)}
          style={this.state}></div>

        <CanvasMaskRuler rulerStyle={topLeft} rulerPosition={this.onRulerMove} />
        <CanvasMaskRuler rulerStyle={topRight} rulerPosition={this.onRulerMove} />
        <CanvasMaskRuler rulerStyle={bottomLeft} rulerPosition={this.onRulerMove} />
        <CanvasMaskRuler rulerStyle={bottomRight} rulerPosition={this.onRulerMove} />

      </React.Fragment>
    )
  }

}
