import * as React from 'react';
import { connect } from 'react-redux';
import { imageAction } from './redux/actions/imageAction';
import { Canvas } from './components/canvas/Canvas';
import { FileUploader } from './components/file-uploader/FileUploader';
import { Image } from './interfaces/image';
import './App.css';

interface DispatchFromProps {
  dispatchImgSrc: (value: Partial<Image>) => void;
}

interface StateFromProps {
  imageReducer: {
    image: Partial<Image>;
  };
}

interface AppState {
  image: Partial<Image>;
}

//TODO get rid of <any>
class App extends React.Component<any> {

  public state: any;

  public constructor(props: any) {
    super(props);
    this.state = {
      image: {}
    };
  }

  public componentDidUpdate(prevProps: any) {
    if (this.props.image.name !== prevProps.image.name) {
      this.setState({
        image: this.props.image
      });
    }
  }

  public render(): React.ReactNode {
    const image = this.state.image;

    return (
      <div>
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
    image: state.imageReducer.image
  };
}

function mapDispatchToProps(dispatch: any): DispatchFromProps {
  return {
    dispatchImgSrc: (image: Partial<Image>) => dispatch(imageAction(image))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
