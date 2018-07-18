import * as React from 'react';
import { mount } from 'enzyme';
import { App } from '../../src/containers/App';

describe('App', () => {

  it('should render App correctly', () => {
    const app = mount(<App />);
    expect(app.find('.canvas').exists()).toBe(true)
  });

});
