import { ROOT_ACTION } from '../actions/actionTypes';

const initState = {
  number: 12
};

export default function rootReducer(state = initState, action: any) {
  switch (action.type) {
    case ROOT_ACTION:
      console.log('ROOT_ACTION in rootReducer');
      return {
        ...state,
        number: action.payload
      };
    default:
      console.log('SOME_ACTION in rootReducer');
      return state;
  }
}
