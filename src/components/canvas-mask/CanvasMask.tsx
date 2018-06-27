import * as React from 'react';
import './CanvasMask.css';

interface CanvasMaskProps {
  maskStyles: {
    width: string;
    height: string;
    top: number;
    left: number;
  }
}

export class CanvasMask extends React.Component<CanvasMaskProps> {

  state = {
    maskTopLeft: {
      top: 50,
      left: 50,
    }
  }

  onMouseDown = (evt: any) => {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onDrag);
  }

  onMouseUp = (evt: any) => {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mousedown', this.onMouseDown);
  }

  onDrag = (evt: any) => {
    const maskTopLeft = {
      top: evt.clientY - (parseInt(this.props.maskStyles.width)/2),
      left: evt.clientX - (parseInt(this.props.maskStyles.height)/2)
    }
    this.setState({ maskTopLeft: maskTopLeft });
  }

  render() {
    const maskStyles = {
      top: this.state.maskTopLeft.top,
      left: this.state.maskTopLeft.left,
      width: this.props.maskStyles.width,
      height: this.props.maskStyles.height,
    }

    return (
      <div
        onMouseDown={(evt) => this.onMouseDown(evt)}
        onMouseUp={(evt) => this.onMouseUp(evt)}
        style={maskStyles}
        className="canvas-mask"></div>
    )
  }

}
