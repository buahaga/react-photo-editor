import { UPLOAD_IMAGE } from './actionTypes';
import { Image } from '../../interfaces/image';

export function uploadImage(image: Partial<Image>) {
  return {
    type: UPLOAD_IMAGE,
    payload: image
  };
}
