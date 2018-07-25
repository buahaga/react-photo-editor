import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { uploadImage } from '../redux/actions/uploadImage';
import { Canvas } from './canvas/Canvas';
import { FileUploader } from '../components/file-uploader/FileUploader';
import { Image } from '../interfaces/image';
import './App.css';

interface DispatchFromProps {
  dispatchImgSrc: (value: Image) => void;
}

interface StateFromProps {
  imageReducer: {
    image: Image;
  };
}

interface AppProps {
  dispatchImgSrc: (value: Image) => void;
  image: Image;
}

export class App extends React.Component<AppProps> {

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <Canvas image={this.props.image} />
        <FileUploader uploadToCanvas={this.props.dispatchImgSrc} />
      </React.Fragment>
    );
  }

}

function mapStateToProps(state: StateFromProps) {
  return {
    image: state.imageReducer.image,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    dispatchImgSrc: (image: Image) => dispatch(uploadImage(image)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
