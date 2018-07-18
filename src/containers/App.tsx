import * as React from 'react';
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

interface AppState {
  image: Partial<Image>;
}

export class App extends React.Component<any> {

  public state: AppState;

  public constructor(props: any) {
    super(props);
    this.state = {
      image: {},
    };
  }

  public componentDidUpdate(prevProps: any) {
    if (this.props.image.name !== prevProps.image.name) {
      this.setState({
        image: this.props.image,
      });
    }
  }

  public render(): React.ReactNode {
    const image = this.state.image;

    return (
      <div className="app">
        <Canvas
          image={image}
        ></Canvas>
        <FileUploader uploadToCanvas={this.props.dispatchImgSrc} />
      </div>
    );
  }

}

function mapStateToProps(state: StateFromProps) {
  return {
    image: state.imageReducer.image,
  };
}

function mapDispatchToProps(dispatch: any): DispatchFromProps {
  return {
    dispatchImgSrc: (image: Partial<Image>) => dispatch(uploadImage(image)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
