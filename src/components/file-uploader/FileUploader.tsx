import * as React from 'react';
import { Image } from '../../interfaces/image';
import './FileUploader.css';

interface FileUploaderProps {
  uploadToCanvas: (url: Partial<Image>) => void;
}

interface FileUploaderState {
  selectedFile: Partial<{ name: string }>;
  uploadProgress: number;
}

export class FileUploader extends React.Component<FileUploaderProps, FileUploaderState> {

  private dropZone: HTMLInputElement;

  public constructor(props: FileUploaderProps) {
    super(props);
    this.state = {
      selectedFile: {},
      uploadProgress: 1
    };
  }

  private onFileChange = (fileList: FileList) => {
    this.setState({
      selectedFile: fileList[0]
    }, () => {
      this.uploadFile();
    });
  }

  private uploadFile = () => {
    if (this.state.selectedFile.name) {
      this.props.uploadToCanvas(this.state.selectedFile);
    }
  }

  private isAreaHighLighted = () => {
    this.dropZone.classList.add('active');
    this.dropZone.addEventListener('dragleave', () => {
      this.dropZone.classList.remove('active');
    });
    this.dropZone.addEventListener('drop', () => {
      this.dropZone.classList.remove('active');
    });
  }

  public render() {
    return (
      <form className="file-uploader">
        <label>
          <div>Choose file or just drop it here:</div>
          <div className="upload-progress">
            <div style={{ width: `${this.state.uploadProgress}%` }} className="upload-progress-bar"></div>
          </div>
          <input className="drop-area" ref={(dropzone) => this.dropZone = dropzone}
            type="file" accept="image/jpg,image/jpeg,image/png"
            onDragEnter={this.isAreaHighLighted}
            onChange={(evt) => this.onFileChange(evt.target.files)} />
        </label>
      </form>
    );
  }

}
