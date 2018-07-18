import * as React from 'react';
import './ToolBarButton.css';

interface ToolBarButtonProps {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  buttonStyle?: {
    display?: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
  };
  selector?: string;
}

export class ToolBarButton extends React.Component<Partial<ToolBarButtonProps>> {

  public render(): React.ReactNode {
    const buttonClass = `toolbar-btn ${this.props.selector}`;
    return (
      <button className={buttonClass}
        disabled={!this.props.disabled}
        onClick={this.props.onClick}
        style={this.props.buttonStyle}>
        {this.props.children}
      </button>
    );
  }

}
