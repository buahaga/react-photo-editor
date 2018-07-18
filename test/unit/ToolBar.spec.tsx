import * as React from 'react';
import { mount } from 'enzyme';
import { ToolBar } from '../../src/components/toolbar/ToolBar';

describe('ToolBar', () => {

  let toolBar: any;

  beforeAll(() => {
    toolBar = mount(<ToolBar />);
  });

  it('should render ToolBar', () => {
    expect(toolBar.find('.toolbar').html())
  });

  it('should render 5 buttons', () => {
    const buttons = toolBar.find('button').length;
    expect(buttons).toBe(5);
  });

});
