'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { HISTORICAL } from '../../constants';

function isSelected(type, compare){
  return type === compare;
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
    var scaleX = this.canvas.offsetWidth
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
      <canvas ref='canvas' width="100%" height="200px" className='historical-graph-canvas' />
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
