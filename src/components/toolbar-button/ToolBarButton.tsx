import * as React from 'react';
import './ToolBarButton.css';

interface ToolBarButtonProps {
  children: string
}

export class ToolBarButton extends React.Component<ToolBarButtonProps> {

  render() {
    return (
      <label className="toolbar-btn-label">
        <input className="toolbar-btn-checkbox" type="checkbox" />
        {this.props.children}
      </label>
    )
  }
  
}
