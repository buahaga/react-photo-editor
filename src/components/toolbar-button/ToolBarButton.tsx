import * as React from 'react';
import './ToolBarButton.css';

interface ToolBarButtonProps {
  children: string;
  onClick: () => void;
  disabled: boolean;
}

export class ToolBarButton extends React.Component<Partial<ToolBarButtonProps>> {

  public render() {
    return (
      <button disabled={!this.props.disabled} onClick={() => {this.props.onClick()}} className="toolbar-btn">{this.props.children}</button>
    );
  }

}
