import { ROOT_ACTION } from './actionTypes';

export function rootAction(number: number) {
  return {
    type: ROOT_ACTION,
    payload: number
  };
}
