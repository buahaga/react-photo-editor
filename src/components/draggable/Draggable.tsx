import * as React from 'react';
import { DraggableEvent } from '../../interfaces/draggable-event';

interface DraggableProps {
  onDragStart: (draggableEvent: Partial<DraggableEvent>) => void;
  onDrag: (draggableEvent: DraggableEvent) => void;
  onDragEnd: (draggableEvent: DraggableEvent) => void;
  children: JSX.Element;
}

export class Draggable extends React.Component<Partial<DraggableProps>> {

  private elem: HTMLElement;
  private start: Partial<DraggableEvent>;

  public static defaultProps: Partial<DraggableProps> = {
    onDragStart: () => { },
    onDrag: () => { },
    onDragEnd: () => { },
  };

  public constructor(props: DraggableProps) {
    super(props);
    this.start = {
      x: 0,
      y: 0,
    };
  }

  public componentDidMount() {
    this.elem.addEventListener('mousedown', this.onMouseDown);
  }

  public componentWillUnmount() {
    this.elem.removeEventListener('mousedown', this.onMouseDown);
  }

  private onMouseDown = (evt: MouseEvent) => {
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.onMouseUp);
    this.start = {
      x: evt.clientX,
      y: evt.clientY,
    };
    this.props.onDragStart(this.start);
  };

  private onDrag = (evt: MouseEvent) => {
    evt.preventDefault();
    const currentPosition = {
      x: evt.clientX,
      y: evt.clientY,
      deltaX: evt.clientX - this.start.x,
      deltaY: evt.clientY - this.start.y,
    };
    this.props.onDrag(currentPosition);
  };

  private onMouseUp = () => {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  public render(): React.ReactNode {
    return (
      <div className="draggable" ref={elem => this.elem = elem}>
        {this.props.children}
      </div>
    );
  }
}
