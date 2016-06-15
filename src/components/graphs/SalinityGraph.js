import React, { Component, PropTypes } from 'react';

const SIZE = 120;
const CENTER = SIZE/2;

const DANGEROUS_SALINITY = 2000;

const COLOR = {
  good : 'rgba(0, 157, 167, 1)',
  bad : 'rgba(171, 53, 36, 1)'
};

function colorAtPPM(ppm){
  var ppmFactor = Math.min(1, (ppm / DANGEROUS_SALINITY));
  var red   =  Math.round(42  + (129 * ppmFactor));
  var green =  Math.round(191 - (138 * ppmFactor));
  var blue  =  Math.round(208 - (172 * ppmFactor));
  return `rgba(${red}, ${green}, ${blue}, 1)`;
}

function determineColor(ppm, threshold){
  return ppm < threshold ? COLOR.good : COLOR.bad;
}

export default class SalinityGraph extends Component {

  componentDidMount(){
    const { salinity, threshold } = this.props;
    this.canvas = this.refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.paint(salinity, threshold);
  }

  componentWillReceiveProps(newProps){
    const { salinity, threshold } = newProps;
    this.paint(salinity, threshold);
  }

  shouldComponentUpdate(){
    return false;
  }


  paint(ppm, threshold){
    ppm = Math.min(ppm, 4000);
    var context = this.context;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var density = ppm / 400;
    const color = determineColor(ppm, threshold);
    // draw circle
    context.beginPath();
    context.arc(CENTER, CENTER, CENTER - 3, 0, 2 * Math.PI, false)
    context.lineWidth = 3;
    context.strokeStyle = color;
    context.stroke();

    // draw dots
    for( var ix=0; ix < density; ix++ ){
      let radius = (ix * ((CENTER)/density));
      let angleIncr = 60 / ix;
      // let color = colorAtPPM((radius / CENTER) * ppm); // no gradient in the new designs
      for( let ir=0; ir < 360; ir += angleIncr ){
        var centerX = CENTER + (radius * Math.sin(Math.PI * (((ix*2)+ir)/180)));
        var centerY = CENTER + (radius * Math.cos(Math.PI * (((ix*2)+ir)/180)));
        context.beginPath();
        context.arc(centerX, centerY, 2, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
      }
    }
  }

  render(){
    return <canvas ref="canvas" className='salinity-graph' height={SIZE} width={SIZE} />
  }

}

SalinityGraph.propTypes = {
  salinity : PropTypes.number.isRequired,
  threshold : PropTypes.number.isRequired
}

SalinityGraph.defaultProps = {
  salinity: 0,
  threshold : DANGEROUS_SALINITY
}
