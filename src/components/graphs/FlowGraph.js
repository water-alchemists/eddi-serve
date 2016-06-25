import React, { Component, PropTypes } from 'react';

import { GRAPH_INDICTATOR } from '../../constants';

const SIZE = 120;
const CENTER = SIZE/2;
const LINE_THICKNESS = 20;
const BASE10 = Math.log(10);
const BASE5 = Math.log(5);

//slow is 0.3, medium is 3, fast is 30
const FLOW_TARGET = 5; // LPM

function colorForRate(rate){  
  var rateFactor = Math.abs( Math.log(rate) / BASE5 );
  return colorForFactor(rateFactor);
}

function colorForAnglePi(anglePi){ // angle without pi factor
  //var angleFactor = Math.abs(anglePi - 1.5) / 0.7;
  var angleDiff = Math.abs(anglePi - 0.77);
  var angleFactor = (angleDiff / 0.5);
  return colorForFactor(angleFactor);
}

function colorForFactor(factor){ // factor is 0 to 2
  var diff  =  Math.abs(factor - 1);
  if( diff > 1 ){ diff = 1; }
  var red   =  Math.round(42  + (129 * factor));
  var green =  Math.round(191 - (138 * factor));
  var blue  =  Math.round(208 - (172 * factor));
  return `rgba(${red}, ${green}, ${blue}, 1)`;
}

function angleForRate(rate){
  var logMult = ((Math.log(rate) / BASE5) + 1) / 2; // goes from 0 to 1
  return ((logMult * 1.4) + 0) * Math.PI;
}



export default class FlowGraph extends Component {

  componentDidMount(){
    this.canvas = this.refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.paint(this.props.rate);
  }

  componentWillReceiveProps(newProps){
    this.paint(newProps.rate);
  }

  shouldComponentUpdate(){
    return false;
  }


  paint(rate){
    var context = this.context;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    context.lineWidth = LINE_THICKNESS;
    for( let ix=0; ix<1.45; ix+=0.05 ){
      context.strokeStyle = colorForAnglePi(ix);
      context.beginPath();
      context.arc(CENTER, CENTER, 0.8*CENTER, (ix+0.7)*Math.PI, (ix+0.9)*Math.PI, false );
      context.stroke();
    }

    var pointEdge = (0.8*CENTER) - 4;
    var baseEdge = (0.8*CENTER) - (LINE_THICKNESS / 1.9);
    var angle = angleForRate(rate);
    var baseAngleA = angle - 0.1;
    var baseAngleB = angle + 0.1;
    context.fillStyle = GRAPH_INDICTATOR;
    context.beginPath();
    context.moveTo(
      CENTER + (pointEdge * Math.cos(angle)),
      CENTER + (pointEdge * Math.sin(angle))
    );
    context.lineTo(
      CENTER + (baseEdge * Math.cos(baseAngleA)),
      CENTER + (baseEdge * Math.sin(baseAngleA))
    );
    context.lineTo(
      CENTER + (baseEdge * Math.cos(baseAngleB)),
      CENTER + (baseEdge * Math.sin(baseAngleB))
    );
    context.closePath();
    context.fill();
  }

  render(){
    return <canvas ref="canvas" className='flow-graph' height={SIZE} width={SIZE} />
  }

}

FlowGraph.propTypes = {
  rate : PropTypes.number.isRequired
};

FlowGraph.defaultProps = {
  rate: 0
};
