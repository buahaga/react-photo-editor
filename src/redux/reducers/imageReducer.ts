import { IMAGE_ACTION } from '../actions/actionTypes';
import { Image } from '../../interfaces/image';

interface ImageAction {
  type: string;
  payload: Image;
}

const initState = {
  image: {}
};

export function imageReducer(state = initState, action: Partial<ImageAction>) {
  switch (action.type) {
    case IMAGE_ACTION:
      return {
        ...state,
        image: action.payload
      };
    default:
      return state;
  }
}
