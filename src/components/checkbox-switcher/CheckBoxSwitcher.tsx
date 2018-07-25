import * as React from 'react';
import './CheckBoxSwitcher.css';

interface CheckBoxSwitcherProps {
  isChecked: boolean;
  switchID?: string;
  onChange: () => void;
}

export class CheckBoxSwitcher extends React.Component<CheckBoxSwitcherProps> {

  public render(): React.ReactNode {
    return (
      <label className="switch-label">
        <input className="switch-checkbox" type="checkbox" checked={this.props.isChecked} onChange={this.props.onChange}/>
        <span id={this.props.switchID} className="switch-slider"></span>
      </label>
    );
  }

}
