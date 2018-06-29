import * as React from 'react';
import { connect } from 'react-redux';
import { rootAction } from './redux/actions/rootAction';
import { Canvas } from './components/canvas/Canvas';
import './App.css';


export class App extends React.Component<any> {

  state = {
    imgStyle: {
      imgWidth: 600,
      imgHeight: 500,
      imgSrc: 'https://popuppainting.com/wp-content/uploads/2017/05/Irises-by-Vincent-Van-Gogh.jpg',
    },
  }

  // componentDidMount() {
  //   this.props.rootAction(11)
  // }

  render(): React.ReactNode {
    const { imgWidth, imgHeight, imgSrc } = this.state.imgStyle;

    return (
      <div>
        <Canvas
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          imgSrc={imgSrc}>
        </Canvas>
      </div>
    )
  }

}

function mapStateToProps(state: any) {
  return {
    store: state
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    rootAction: (value: any) => dispatch(rootAction(value))
  };
}

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps
)(App);
