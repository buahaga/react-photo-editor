import * as React from 'react';
import { ToolBar } from './components/toolbar/ToolBar';
import { Canvas } from './components/canvas/Canvas';
import './App.css';

export class App extends React.Component {

  state = {
    imgStyle: {
      imgWidth: 600,
      imgHeight: 500,
      imgSrc: 'https://popuppainting.com/wp-content/uploads/2017/05/Irises-by-Vincent-Van-Gogh.jpg',
    },
  }

  render(): React.ReactNode {
    const { imgWidth, imgHeight, imgSrc } = this.state.imgStyle;

    return (
      <React.Fragment>

        <Canvas
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          imgSrc={imgSrc}>
        </Canvas>

        <ToolBar />

      </React.Fragment>
    )
  }

}
