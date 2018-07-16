import * as React from 'react';
import { mount } from 'enzyme';
import { ToolBar } from '../src/components/toolbar/ToolBar';

describe('ToolBar', () => {
  
  let toolBar: any;

  beforeAll(() => {
    toolBar = mount(<ToolBar />);
  });

  it('should render ToolBar', () => {
    expect(toolBar.find('div').html())
  });

  it('should render 6 buttons', () => {
    const buttons = toolBar.find('button').length;
    expect(buttons).toBe(6);
  });

});
