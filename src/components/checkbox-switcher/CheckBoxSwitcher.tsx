import * as React from 'react';
import './CheckBoxSwitcher.css';

interface CheckBoxSwitcherProps {

}

export class CheckBoxSwitcher extends React.Component<CheckBoxSwitcherProps> {

  public render(): React.ReactNode {

    return (
      <label className="switch-label">
        <input className="switch-checkbox" type="checkbox" />
        <span className="switch-slider"></span>
      </label>
    );
  }

}
