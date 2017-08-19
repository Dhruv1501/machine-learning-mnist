import React, { Component } from 'react';
import { SketchPad, TOOL_PENCIL } from 'react-sketchpad/lib';
import { Network } from 'synaptic';
import { scale } from './sampling';

// import networkData from './mnist/network.json';
// import example from './mnist/example.json';

// const mnistNetwork = Network.fromJSON(networkData);
const SAMPLE_SIDE = 28;
const FACTOR = 10;
const SIDE = SAMPLE_SIDE * FACTOR;
const max = (arr) => {
  let index = 0;
  let data = -Infinity;
  arr.forEach((d, i) => {
    if (d > data) {
      index = i;
      data = d;
    }
  });
  return index;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      tool: TOOL_PENCIL,
      size: 2 * FACTOR,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    };
  }

  onSampleClick() {
    require.ensure(['./mnist/example.json'], (require) => {
      const example = require('./mnist/example.json');

      const [canvas] = document.getElementsByTagName('canvas');
      const context = canvas.getContext('2d');
      const imageData = context.createImageData(SIDE, SIDE);
      scale(example.input, SAMPLE_SIDE, FACTOR).forEach((pixel, i) => {
        const index = i * 4;
        const data = 1 - (pixel || 0);
        imageData.data[index] = data * 255; //r
        imageData.data[index + 1] = data * 255; //g
        imageData.data[index + 2] = data * 255; //b
        imageData.data[index + 3] = 255; //a
      });

      context.putImageData(imageData, 0, 0);
    });
  }

  onCheckClick() {
    require.ensure(['./mnist/network.json'], (require) => {
      const networkData = require('./mnist/network.json');
      const mnistNetwork = Network.fromJSON(networkData);

      const [canvas] = document.getElementsByTagName('canvas');
      const context = canvas.getContext('2d');
      const { data } = context.getImageData(0, 0, SIDE, SIDE);
      const pixels = data.reduce((prev, current, index) => {
        if (index % 4 !== 0) {
          const last = prev[prev.length - 1] || 0;
          if ((index + 1) % 4 === 0) {
            return prev; //alpha
          }
          prev[prev.length - 1] = last + current;
          return prev;
        }
        return [...prev, current];
      }, [])
        .map((x) => {
          const result = 1 - (x / 255 / 3);
          return result;
        });
      const scaledPixels = scale(pixels, SIDE, 1 / FACTOR).map(pixel => pixel || 0);
      const output = mnistNetwork.activate(scaledPixels);
      const result = max(output);
      this.setState({ result });
    });
  }

  onCleanClick() {
    const [canvas] = document.getElementsByTagName('canvas');
    const context = canvas.getContext('2d');
    const imageData = context.createImageData(SIDE, SIDE);

    imageData.data.forEach((d, i) => {
      imageData.data[i] = 255;
    });

    context.putImageData(imageData, 0, 0);
    this.setState({ result: '' });
  }

  render() {
    const { tool, size, color, items } = this.state;
    return (
      <div>
        <div style={{ 'border': '1px solid black', 'float': 'left', 'margin': '5px' }}>
          <SketchPad
            width={SIDE}
            height={SIDE}
            animate={true}
            size={size}
            color={color}
            items={items}
            tool={tool}
          />
        </div>
        <div>
          <button onClick={() => this.onCheckClick()}>Check</button>
          <button onClick={() => this.onSampleClick()}>Sample</button>
          <button onClick={() => this.onCleanClick()}>Clean</button>
          <div>result: {this.state.result}</div>
        </div>
      </div>
    );
  }
}

export default App;
