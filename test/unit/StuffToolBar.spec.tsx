import * as React from 'react';
import { mount } from 'enzyme';
import { StuffToolBar } from '../../src/components/stuff-toolbar/StuffToolBar';

describe('StuffToolBar', () => {

  let toolBar: any;

  beforeAll(() => {
    toolBar = mount(<StuffToolBar />);
  });

  it('should render StuffToolBar', () => {
    expect(toolBar.find('.stuff-toolbar').html())
  });

  it('should render 2 images', () => {
    const buttons = toolBar.find('.stuff-image').length;
    expect(buttons).toBe(2);
  });

});
