import React, { Component } from 'react';



export default class HistoricalGraph extends Component {



  render(){
    return <div className='historical-graph'>
      <div className='historical-selector'>
        <div className='historical-selection'>This Month</div>
        <div className='historical-selection'>This Week</div>
        <div className='historical-selection'>Today</div>
      </div>
      <canvas ref='canvas' className='historical-graph-canvas' />
    </div>
  }

}
