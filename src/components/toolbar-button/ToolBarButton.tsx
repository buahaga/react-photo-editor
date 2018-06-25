import * as React from 'react';
import './ToolBarButton.css';

interface ToolBarButtonProps {
    checked: boolean,
    name: string
}

export class ToolBarButton extends React.Component<Partial<ToolBarButtonProps>> {
    render() {
        return <label><input type="checkbox" />{this.props.name}</label>
    }
}
