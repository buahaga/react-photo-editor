import { IMAGE_ACTION } from './actionTypes';
import { Image } from '../../interfaces/image';

export function imageAction(image: Partial<Image>) {
  return {
    type: IMAGE_ACTION,
    payload: image
  };
}
