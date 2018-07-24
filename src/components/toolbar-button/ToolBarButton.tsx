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
    const buttonID = this.props.children.charCodeAt(0) < 1000 ?
      this.props.children.toLowerCase() :
      btoa(this.props.children.charCodeAt(0).toString()).slice(0, -1).toLowerCase();
    const isDisabled = this.props.disabled ? this.props.disabled : false;

    return (
      <button id={buttonID}
        className="toolbar-btn"
        disabled={isDisabled}
        onClick={this.props.onClick}
        style={this.props.buttonStyle}>
        {this.props.children}
      </button>
    );
  }

}
