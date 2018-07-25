import * as React from 'react';
import { shallow } from 'enzyme';
import { CropAreaHandler } from '../../src/components/crop-area-handler/CropAreaHandler';

describe('ToolBar', () => {

  it('should render CropAreaHandler', () => {
    const wrapper = shallow(<CropAreaHandler />)
    expect(wrapper.find('.crop-handler').html())
  });

});
