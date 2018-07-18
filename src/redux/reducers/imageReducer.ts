import { UPLOAD_IMAGE } from '../actions/actionTypes';
import { Image } from '../../interfaces/image';

interface ImageAction {
  type: string;
  payload: Image;
}

const initState = {
  image: {},
};

export function imageReducer(state = initState, action: Partial<ImageAction>) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    default:
      return state;
  }
}
