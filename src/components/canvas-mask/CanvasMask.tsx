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
    const prevWidth = parseInt(this.state.width);
    const prevHeight = parseInt(this.state.height);
    const prevTop = this.state.top;
    const prevLeft = this.state.left;

    let newWidth, newHeight, newTop, newLeft;
    if (evt.clientX - prevTop < 15) {
      newWidth = prevWidth - (evt.clientX - prevTop);
      newHeight = prevHeight - (evt.clientY - prevLeft);
      newTop = prevTop + prevWidth - newWidth;
      newLeft = prevLeft + prevHeight - newHeight;
    } else if (evt.clientX - prevTop > 15) {
      newWidth = prevWidth - (prevWidth + prevLeft - evt.clientX);
      newHeight = prevHeight - (prevHeight + prevTop - evt.clientY);
      newTop = prevTop;
      newLeft = prevLeft;
    }

    this.setState({
      width: `${newWidth}px`,
      height: `${newHeight}px`,
      top: newTop,
      left: newLeft
    })
  }

  render() {
    const { width, height, top, left } = this.state;
    const topLeft = {
      top: top,
      left: left,
    };
    const bottomRight = {
      top: top + parseInt(height),
      left: left + parseInt(width),
    };

    return (
      <React.Fragment>
        <div className="canvas-mask"
          onMouseDown={(evt) => this.onMouseDown(evt)}
          onChange={this.props.canvasMaskCurrentState(this.state)}
          role="presentation"
          style={this.state}></div>

        <CanvasMaskRuler rulerStyle={topLeft} rulerPosition={this.onRulerMove} />
        <CanvasMaskRuler rulerStyle={bottomRight} rulerPosition={this.onRulerMove} />

      </React.Fragment>
    )
  }

}
