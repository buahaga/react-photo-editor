import * as React from 'react';
import { mount } from 'enzyme';
import { CropArea } from '../../src/components/crop-area/CropArea';

describe('CropArea', () => {

  let cropArea: any;

  beforeAll(() => {
    const mockSize = {
      top: 10,
      left: 10,
      width: '600px',
      height: '500px'
    };
    cropArea = mount(<CropArea size={mockSize} />);
  });

  it('should render CropArea', () => {
    expect(cropArea.find('.crop-area').exists()).toBe(true)
  });

  it('should have CropAreaRuler inside', () => {
    expect(cropArea.find('.crop-ruler').exists()).toBe(true)
  });

  it('should have ToolaBar inside', () => {
    expect(cropArea.find('.toolbar').exists()).toBe(true)
  });

});
