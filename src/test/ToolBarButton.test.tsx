import * as React from 'react';
import { shallow } from 'enzyme';
import { ToolBarButton } from '../components/toolbar-button/ToolBarButton';

describe('Hello, Enzyme!', () => {
  it('should render ToolBarButton', () => {
    const wrapper = shallow(<ToolBarButton />)
    expect(wrapper.find('button').html())
  })
})
