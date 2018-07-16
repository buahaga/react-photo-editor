import * as React from 'react';
import { mount } from 'enzyme';
import { Canvas } from '../src/containers/canvas/Canvas';

describe('Canvas', () => {

  it('should render canvas', () => {
    const canvas = mount(<Canvas />);
    expect(canvas.find('.canvas').exists()).toBe(true)
  });
  
});
