import { imageReducer } from '../src/redux/reducers/imageReducer';
import { IMAGE_ACTION } from '../src/redux/actions/actionTypes';

describe('imageReducer', () => {

  it('should return the initial state', () => {
    expect(imageReducer(undefined, {})).toEqual({ image: {} });
  });

  it('should handle IMAGE_ACTION', () => {
    const action = {
      type: IMAGE_ACTION,
      payload: 42
    }
    expect(imageReducer({image: 12}, action)).toEqual({image: 42});
  });

});
