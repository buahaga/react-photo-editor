import * as React from 'react';
import './ToolBarButton.css';

interface ToolBarButtonProps {
  children: string;
  onClick: () => void;
  disabled: boolean;
  buttonStyle?: {
    backgroundColor: string;
  };
}

export class ToolBarButton extends React.Component<Partial<ToolBarButtonProps>> {

  public render() {
    return (
      <button className="toolbar-btn"
        disabled={!this.props.disabled}
        onClick={() => { this.props.onClick() }}
        style={this.props.buttonStyle}>
        {this.props.children}
      </button>
    );
  }

}
