import { IMAGE_ACTION } from './actionTypes';

export function imageAction(url: string) {
  console.log('IMAGE_ACTION_COMPLETE');
  return {
    type: IMAGE_ACTION,
    payload: url
  };
}
