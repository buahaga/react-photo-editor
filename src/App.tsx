import * as React from 'react';
import { connect } from 'react-redux';
import { imageAction } from './redux/actions/imageAction';
import { Canvas } from './components/canvas/Canvas';
import { FileUploader } from './components/file-uploader/FileUploader';
import './App.css';

interface DispatchFromProps {
  dispatchImgSrc: (value: string) => void;
}

interface StateFromProps {
  imageReducer: {
    imgUrl: string
  };
}

class App extends React.Component<any> {

  state = {
    imgStyle: {
      imgWidth: 600,
      imgHeight: 500,
      imgSrc: '',
    }
  }

  componentDidMount() {
    this.setState({
      imgStyle: {
        imgSrc: this.props.imgUrl
      }
    });
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.imgUrl !== prevProps.imgUrl) {
      this.setState({
        imgStyle: {
          imgSrc: this.props.imgUrl
        }
      });
    }
  }

  render(): React.ReactNode {
    const { imgWidth, imgHeight, imgSrc } = this.state.imgStyle;

    return (
      <div>
        <Canvas
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          imgSrc={imgSrc}
        ></Canvas>
        <FileUploader uploadToCanvas={this.props.dispatchImgSrc} />
      </div>
    );
  }

}

function mapStateToProps(state: StateFromProps) {
  return {
    imgUrl: state.imageReducer.imgUrl
  };
}

function mapDispatchToProps(dispatch: any): DispatchFromProps {
  return {
    dispatchImgSrc: (url: string) => dispatch(imageAction(url))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
