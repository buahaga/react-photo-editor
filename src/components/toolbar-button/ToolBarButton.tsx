import * as React from 'react';
import './ToolBarButton.css';

interface ToolBarButtonProps {
  children: string;
  onClick: () => void;
  disabled: boolean;
  buttonID: string;
}

export class ToolBarButton extends React.Component<Partial<ToolBarButtonProps>> {

  public render(): React.ReactNode {
    const buttonID = this.props.buttonID ? this.props.buttonID : this.props.children.toLowerCase();
    const isDisabled = this.props.disabled ? true : false;

    return (
      <button id={buttonID}
        className="toolbar-btn"
        disabled={isDisabled}
        onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }

}
