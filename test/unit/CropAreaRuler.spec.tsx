import * as React from 'react';
import { shallow } from 'enzyme';
import { CropAreaRuler } from '../../src/components/crop-area-ruler/CropAreaRuler';

describe('ToolBar', () => {

  it('should render CropAreaRuler', () => {
    const wrapper = shallow(<CropAreaRuler />)
    expect(wrapper.find('.crop-ruler').html())
  });

});
