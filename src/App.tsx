import * as React from 'react';
declare let module: any;
import { ToolBar } from './components/toolbar/ToolBar';
import { Canvas } from './components/canvas/Canvas';
import { CanvasMask } from './components/canvas-mask/CanvasMask';
import './App.css';

export class App extends React.Component {

  state = {
    imgStyle: {
      imgWidth: 600,
      imgHeight: 500,
      imgSrc: "https://popuppainting.com/wp-content/uploads/2017/05/Irises-by-Vincent-Van-Gogh.jpg",
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
