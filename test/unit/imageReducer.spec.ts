import { imageReducer } from '../../src/redux/reducers/imageReducer';
import { UPLOAD_IMAGE } from '../../src/redux/actions/actionTypes';

describe('imageReducer', () => {

  it('should return the initial state', () => {
    expect(imageReducer(undefined, {})).toEqual({ image: {} });
  });

  it('should handle UPLOAD_IMAGE', () => {
    const action = {
      type: UPLOAD_IMAGE,
      payload: 42
    }
    expect(imageReducer({image: 12}, action)).toEqual({image: 42});
  });

});
