'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { HISTORICAL } from '../../constants';

function isSelected(type, compare){
  return type === compare;
}



function colorForPointWithThreshold(point, threshold){
  var factor = Math.min( 1, point / (1.5 * threshold) );
  var red   =  Math.round(42  + (129 * factor));
  var green =  Math.round(191 - (138 * factor));
  var blue  =  Math.round(208 - (172 * factor));
  return `rgba(${red}, ${green}, ${blue}, 1)`;
}


class HistoricalGraph extends Component {
  clickHandler(event, type){
    event.preventDefault();
    const { onClick } = this.props;
    if(onClick instanceof Function) return onClick(type);
  }

  componentDidMount(){
    this.canvas = this.refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.paint();
  }

  componentWillReceiveProps(newProps){
    this.paint();
  }

  paint(){
    var pointCount = this.props.data.length;
    var scaleX = this.canvas.offsetWidth / pointCount;
    var maxY = this.props.threshold;
    for( let ix in this.props.data ){
      var daty = this.props.data[ix].y;
      if( daty > maxY ){
        maxY = daty;
      }
    }
    var scaleY = this.canvas.offsetHeight / (1.2 * maxY);

    this.context.lineWidth = 2;
    // paint scale
    this.context.save();
    this.context.setLineDash([5,10]);
    this.context.strokeStyle = "rgba(0, 109, 96, 1)";
    var thresholdY = this.canvas.offsetHeight - (this.props.threshold*scaleY);
    this.context.beginPath();
    this.context.moveTo(0, thresholdY);
    this.context.lineTo(this.canvas.offsetWidth, thresholdY);
    this.context.stroke();
    this.context.restore();

    this.context.font = "normal normal 300 10px sans-serif";

    // render data and x axis
    var lastData;
    for( let ix in this.props.data ){
      var data = this.props.data[ix];
      var xPt = ix*scaleX;
      if( ix % 3 === 0 ){
        switch(this.props.type){
          case HISTORICAL.TODAY:
            var hour = data.x.getHours() % 12;
            hour = (hour === 0) ? 12 : hour;
            this.context.fillText(hour, xPt, 150);
            break;
          case HISTORICAL.WEEK:
          case HISTORICAL.MONTH:
            this.context.fillText(data.x.getDate(), xPt, 150);
            break;
        }
      }

      if( !data.y ){
        lastData = null;
        continue;
      }
      if( lastData ){
        var gradient = this.context.createLinearGradient((ix-1)*scaleX, 0, xPt, 0);
        gradient.addColorStop("0", colorForPointWithThreshold(lastData.y, this.props.threshold));
        gradient.addColorStop("1.0", colorForPointWithThreshold(data.y, this.props.threshold));
        this.context.strokeStyle = gradient;
        this.context.beginPath();
        this.context.moveTo((ix-1)*scaleX, this.canvas.offsetHeight - (lastData.y*scaleY));
        this.context.lineTo(xPt, this.canvas.offsetHeight - (data.y*scaleY));
        this.context.stroke();
      }
      lastData = data;
    }

  }

  render(){
    const { type, data } = this.props,
      monthClass = classNames([
        'historical-selection',
        { selected : isSelected(HISTORICAL.MONTH, type)}
      ]),
      todayClass = classNames([
        'historical-selection',
        { selected : isSelected(HISTORICAL.TODAY, type)}
      ]),
      weekClass = classNames([
        'historical-selection',
        { selected : isSelected(HISTORICAL.WEEK, type)}
      ]);

    console.log('this is the data', data);

    return <div className='historical-graph'>
      <div className='historical-selector'>
        <div className={monthClass}
          onClick={event => this.clickHandler(event, HISTORICAL.MONTH)}
        >
          <span>This Month</span>
        </div>
        <div className={weekClass}
          onClick={event => this.clickHandler(event, HISTORICAL.WEEK)}
        >
          <span>This Week</span>
        </div>
        <div className={todayClass}
          onClick={event => this.clickHandler(event, HISTORICAL.TODAY)}
        >
          <span>Today</span>
        </div>
      </div>
      <canvas ref='canvas' height="160px" style={{width: "100%"}} className='historical-graph-canvas' />
    </div>
  }

}

HistoricalGraph.propTypes = {
  data : PropTypes.arrayOf(
    PropTypes.shape({
      x : PropTypes.instanceOf(Date).isRequired,
      y : PropTypes.number
    })
  ).isRequired,
  onClick : PropTypes.func,
  type : PropTypes.string,
  threshold : PropTypes.number.isRequired
}

export default HistoricalGraph;
