import * as React from 'react';
import { mount } from 'enzyme';
import { CropToolBar } from '../../src/components/crop-toolbar/CropToolBar';

describe('CropToolBar', () => {

  let toolBar: any;

  beforeAll(() => {
    toolBar = mount(<CropToolBar />);
  });

  it('should render CropToolBar', () => {
    expect(toolBar.find('.crop-toolbar').html());
  });

  it('should render switch-slider on toolbar', () => {
    expect(toolBar.find('.switch-slider').html());
  });

  it('should render 1 button', () => {
    const buttons = toolBar.find('button').length;
    expect(buttons).toBe(1);
  });

});
