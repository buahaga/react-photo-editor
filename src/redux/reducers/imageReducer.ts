import { IMAGE_ACTION } from '../actions/actionTypes';

interface ImageAction {
  type: string;
  payload: string;
}

const initState = {
  imgUrl: ''
};

export function imageReducer(state = initState, action: ImageAction) {
  switch (action.type) {
    case IMAGE_ACTION:
      return {
        ...state,
        imgUrl: action.payload
      };
    default:
      return state;
  }
}
