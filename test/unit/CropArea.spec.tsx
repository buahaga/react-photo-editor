import * as React from 'react';
import { mount } from 'enzyme';
import { CropArea } from '../../src/components/crop-area/CropArea';

describe('CropArea', () => {

  let cropArea: any;

  beforeAll(() => {
    const mockSize = {
      width: 600,
      height: 500,
    };
    cropArea = mount(<CropArea size={mockSize} isCropActive={false} />);
  });

  it('should render CropArea', () => {
    expect(cropArea.find('.crop-area').exists()).toBe(true)
  });

  it('should have CropAreaHandler inside', () => {
    expect(cropArea.find('.crop-handler').exists()).toBe(true)
  });

  it('should have ToolaBar inside', () => {
    expect(cropArea.find('.crop-toolbar').exists()).toBe(true)
  });

  it('should display area after isCropAcrive set', () => {
    cropArea.setProps({ isCropActive: false });
    expect(cropArea.find('.crop-area--hidden').exists()).toBe(true);
  });

});
