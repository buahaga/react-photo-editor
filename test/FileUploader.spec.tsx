import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { FileUploader } from '../src/components/file-uploader/FileUploader';

describe('FileUploader', () => {

  let fileUploader: any;
  let component: any;

  beforeAll(() => {
    fileUploader = shallow(<FileUploader />);
    component = fileUploader.get(0);
  });

  it('should render FileUploader', () => {
    expect(fileUploader.find('.file-uploader').html())
  });

  it('should contain message inside', () => {
    expect(fileUploader.find('.file-uploader-txt').html())
  });

  it('should contain progress-bar inside', () => {
    expect(fileUploader.find('.upload-progress').html())
  });

  it('should contain file-input inside', () => {
    expect(fileUploader.find('.drop-area').html())
  });

  it('should call mock function when file is uploaded', () => {
    const spyOnFileChange = jest.spyOn(FileUploader.prototype, 'onFileChange');
    const blobImage = new Blob(['foo'], { type: 'image/jpg' });
    fileUploader.find('.drop-area').simulate('change', { target: { files: [blobImage] } });
    expect(spyOnFileChange).toHaveBeenCalled();
    spyOnFileChange.mockClear();
  });

});
