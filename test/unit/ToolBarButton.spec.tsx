import * as React from 'react';
import { shallow } from 'enzyme';
import { ToolBarButton } from '../../src/components/toolbar-button/ToolBarButton';

describe('ToolBarButton', () => {

  it('should render ToolBarButton', () => {
    const toolBarButton = shallow(<ToolBarButton />)
    expect(toolBarButton.find('button').html())
  });

});
