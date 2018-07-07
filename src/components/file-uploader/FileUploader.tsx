import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fireBase } from '../../firebase/firebaseConfig';
import './FileUploader.css';

interface FileUploaderProps {
  uploadToCanvas: (url: string) => void;
}

interface FileUploaderState {
  selectedFile: Partial<{ name: string }>;
  uploadProgress: number;
}

export class FileUploader extends React.Component<FileUploaderProps, FileUploaderState> {
  constructor(props: FileUploaderProps) {
    super(props);
    this.state = {
      selectedFile: {},
      uploadProgress: 1
    };
  }

  dragOverHandeler = () => {
    const dropZone = ReactDOM.findDOMNode(this.refs.dropzone) as HTMLDivElement;
    const dropZoneUnActive = () => dropZone.classList.remove('active');
    dropZone.classList.add('active');
    dropZone.addEventListener('dragleave', dropZoneUnActive, false);
  }

  onFileChange = (fileList: FileList) => {
    this.setState({
      selectedFile: fileList[0]
    }, () => {
      this.uploadFile();
    });
  }

  uploadFile = () => {
    if (this.state.selectedFile) {
      const storageRef: any = fireBase.storage().ref(`/${this.state.selectedFile.name}`);
      storageRef.put(this.state.selectedFile).on('state_changed',
        (snapshot: any) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({ uploadProgress: progress });
        }, (err: any) => {
          throw new Error(err);
        }, () => {
          storageRef.getDownloadURL().then((url: string) => this.props.uploadToCanvas(url));
        });
    }
  }

  render() {
    return (
      <form className="file-uploader">
        <label>
          <div>Choose file or just drop it here:</div>
          <div className="upload-progress">
            <div style={{ width: `${this.state.uploadProgress}%` }} className="upload-progress-bar"></div>
          </div>
          <input className="drop-area" ref="dropzone"
            type="file" accept="image/jpg,image/jpeg,image/png"
            onDragOver={this.dragOverHandeler}
            onChange={(evt) => this.onFileChange(evt.target.files)} />
        </label>
      </form>
    );
  }

}
