import * as React from 'react';
import { mount } from 'enzyme';
import { DrawToolBar } from '../../src/components/draw-toolbar/DrawToolBar';

describe('DrawToolBar', () => {

  let toolBar: any;
  let onColorChangeSpy = jest.fn();

  beforeAll(() => {
    toolBar = mount(<DrawToolBar onColorChange={onColorChangeSpy} />);
  });

  it('should render ToolBar', () => {
    expect(toolBar.find('.draw-toolbar').html());
  });

  it('should render switch-slider on toolbar', () => {
    expect(toolBar.find('.switch-slider').html());
  });

  it('should render 6 buttons', () => {
    const buttons = toolBar.find('button').length;
    expect(buttons).toBe(6);
  });

  it('should call function on buttonClick', () => {
    const red = toolBar.find('#red');
    const green = toolBar.find('#green');
    const blue = toolBar.find('#blue');
    const yellow = toolBar.find('#yellow');
    red.prop('onClick')();
    green.prop('onClick')();
    blue.prop('onClick')();
    yellow.prop('onClick')();
    expect(onColorChangeSpy).toHaveBeenCalledTimes(4)
  });

});
