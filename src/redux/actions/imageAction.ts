import { IMAGE_ACTION } from './actionTypes';

export function imageAction(url: string) {
  return {
    type: IMAGE_ACTION,
    payload: url
  };
}
