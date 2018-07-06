import * as React from 'react';

interface DraggableProps {
  onDragStart?: (obj: Partial<Coords>) => void;
  onDrag?: (obj: Coords) => void;
  onDragEnd?: (obj: Coords) => void;
  children: JSX.Element;
}

export interface Coords {
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
}

export class Draggable extends React.Component<Partial<DraggableProps>> {
  elem: HTMLElement;
  start: Partial<Coords>;

  static defaultProps: Partial<DraggableProps> = {
    onDragStart: () => {},
    onDrag: () => {},
    onDragEnd: () => {},
  };

  constructor(props: DraggableProps) {
    super(props);
    this.start = {
      x: 0,
      y: 0
    };
  }

  componentDidMount() {
    this.elem.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount() {
    this.elem.removeEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown = (evt: MouseEvent) => {
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.onMouseUp);
    this.start = {
      x: evt.clientX,
      y: evt.clientY
    };
    this.props.onDragStart(this.start);
  };

  onDrag = (evt: MouseEvent) => {
    evt.preventDefault();
    const currentPosition = {
      x: evt.clientX,
      y: evt.clientY,
      deltaX: evt.clientX - this.start.x,
      deltaY: evt.clientY - this.start.y
    };
    this.props.onDrag(currentPosition);
  };

  onMouseUp = () => {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  render() {
    return (
      <div className="draggable" ref={elem => this.elem = elem}>
        {this.props.children}
      </div>
    );
  }
}
