import * as React from 'react';
import './ToolBarButton.css';

interface ToolBarButtonProps {
  children: string;
  onClick: Function;
}

export class ToolBarButton extends React.Component<Partial<ToolBarButtonProps>> {

  render() {
    return (
      <button onClick={() => {this.props.onClick()}} className="toolbar-btn">{this.props.children}</button>
    )
  }

}
