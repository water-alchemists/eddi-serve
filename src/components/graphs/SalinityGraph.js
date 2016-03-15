import React, { Component } from 'react';


const SIZE = 200;
const CENTER = SIZE/2;

const DANGEROUS_SALINITY = 2000;


function colorAtPPM(ppm){
  var ppmFactor = Math.min(1, (ppm / DANGEROUS_SALINITY));
  var red   =  Math.round(42  + (129 * ppmFactor));
  var green =  Math.round(191 - (138 * ppmFactor));
  var blue  =  Math.round(208 - (172 * ppmFactor));
  return `rgba(${red}, ${green}, ${blue}, 1)`;
}



export default class SalinityGraph extends Component {

  componentDidMount(){
    this.canvas = this.refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.paint(this.props.salinity);
  }

  componentWillReceiveProps(newProps){
    this.paint(newProps.salinity);
  }

  shouldComponentUpdate(){
    return false;
  }


  paint(ppm){
    var context = this.context;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var density = ppm / 200;
    for( var ix=0; ix < density; ix++ ){
      let radius = (ix * ((CENTER)/density));
      let angleIncr = 60 / ix;
      let color = colorAtPPM((radius / CENTER) * ppm);
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
    return <canvas ref="canvas" height={SIZE} width={SIZE} />
  }

}


SalinityGraph.defaultProps = {
  salinity: 0
}
