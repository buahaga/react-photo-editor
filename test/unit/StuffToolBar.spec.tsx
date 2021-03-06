import * as React from 'react';
import { mount } from 'enzyme';
import { DropToolBar } from '../../src/components/drop-toolbar/DropToolBar';

describe('DropToolBar', () => {

  let toolBar: any;

  beforeAll(() => {
    toolBar = mount(<DropToolBar />);
  });

  it('should render DropToolBar', () => {
    expect(toolBar.find('.drop-toolbar').html())
  });

  it('should render 2 images', () => {
    const buttons = toolBar.find('.stuff-image').length;
    expect(buttons).toBe(2);
  });

});
