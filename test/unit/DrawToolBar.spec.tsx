import * as React from 'react';
import { mount } from 'enzyme';
import { DrawToolBar } from '../../src/components/draw-toolbar/DrawToolBar';

describe('DrawToolBar', () => {

  let toolBar: any;

  beforeAll(() => {
    toolBar = mount(<DrawToolBar />);
  });

  it('should render ToolBar', () => {
    expect(toolBar.find('.draw-toolbar').html())
  });

  it('should render 8 buttons', () => {
    const buttons = toolBar.find('button').length;
    expect(buttons).toBe(8);
  });

});
