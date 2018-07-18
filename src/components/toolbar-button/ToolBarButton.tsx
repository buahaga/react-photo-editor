import * as React from 'react';
import './ToolBarButton.css';

interface ToolBarButtonProps {
  children: string;
  onClick: () => void;
  disabled: boolean;
  buttonStyle: {
    display?: string;
    width?: string;
    height?: string;
    margin?: string;
    backgroundColor?: string;
  };
}

export class ToolBarButton extends React.Component<Partial<ToolBarButtonProps>> {

  public render(): React.ReactNode {
    return (
      <button id={this.props.children}
        className="toolbar-btn"
        disabled={!this.props.disabled}
        onClick={this.props.onClick}
        style={this.props.buttonStyle}>
        {this.props.children}
      </button>
    );
  }

}
