import * as React from 'react';
import { mount } from 'enzyme';
import { Draggable } from '../../src/components/draggable/Draggable';

describe('Draggable', () => {

  it('should render', () => {
    const draggable = mount(<Draggable />);
    expect(draggable.find('div').exists()).toBe(true);
  });

});
