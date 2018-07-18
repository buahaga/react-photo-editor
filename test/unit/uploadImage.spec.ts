import { uploadImage } from '../../src/redux/actions/uploadImage';
import { UPLOAD_IMAGE } from '../../src/redux/actions/actionTypes';

describe('uploadImageAction', () => {

  it('should return type and payload', () => {
    expect(uploadImage(new Image())).toEqual({ type: UPLOAD_IMAGE, payload: new Image(), });
  });

});
