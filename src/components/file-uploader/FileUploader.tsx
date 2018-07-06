import * as React from 'react';
import { fireBase } from '../../firebase/firebaseConfig';
import './FileUploader.css';

interface FileUploaderProps {
  uploadToCanvas: (url: string) => void;
}

interface FileUploaderState {
  selectedFile: Partial<{
    name: string;
  }>;
}

export class FileUploader extends React.Component<FileUploaderProps, FileUploaderState> {
  constructor(props: FileUploaderProps) {
    super(props);
    this.state = {
      selectedFile: {},
    };
  }

  chooseFile = (fileList: FileList) => {
    this.setState({
      selectedFile: fileList[0]
    });
  }

  uploadFile = () => {
    if (this.state.selectedFile) {
      const storageRef = fireBase.storage().ref(`/${this.state.selectedFile.name}`);
      storageRef.put(this.state.selectedFile)
        .then(() => this.setImageUrl())
        .then(() => this.repaintCanvas());
    }
  }

  setImageUrl = () => {
      fireBase.storage().ref().child(`/${this.state.selectedFile.name}`).getDownloadURL()
      .then((url: string) => this.props.uploadToCanvas(url));
  }

  repaintCanvas = () => {
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
    const image = document.querySelector('.hidden-image') as HTMLImageElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(image, 0, 0);
  }

  render() {
    return (
      <div className="file-uploader">
        <input className="file-uploader-choose" type="file" onChange={(evt) => this.chooseFile(evt.target.files)} />
        <button className="file-uploader-upload" onClick={this.uploadFile}>Upload File</button>
      </div>
    );
  }

}
