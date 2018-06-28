import * as React from 'react';
import './CanvasMaskRuler.css';

interface CanvasMaskRulerProps {
  rulerStyle: {
    //eslint-disable-next-line
    top: number;
    left: number;
  };
  rulerPosition: Function;
}

export class CanvasMaskRuler extends React.Component<CanvasMaskRulerProps> {

  element: any;

  constructor(props: any) {
    super(props);
    this.element = React.createRef();
  }

  componentDidMount() {
    this.element.current.addEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown = (evt: any) => {
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onDrag);
  }

  onMouseUp = (evt: any) => {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.onMouseDown);
  }

  onDrag = (evt: any) => {
    this.props.rulerPosition(evt);
  }

  render() {
    return (
      <div className="canvas-mask-ruler"
        ref={this.element}
        style={this.props.rulerStyle}>
      </div>
    )
  }

}
