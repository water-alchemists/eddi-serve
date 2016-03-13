import React, { Component } from 'react';

import { PATHS } from '../constants';

import { Link } from 'react-router';

import style from '../less/EddiListItem.less';



export default class EddiListItem extends Component {

  render(){
    return <Link to={{ pathname: PATHS.DASHBOARD, query: { id: this.props.eddi.id } }}
        className='eddi-list-item' style={{backgroundImage: "url('http://www.inuvikgreenhouse.com/web_images/greenhouse01lg.jpg')"}} >
      <div className='eddi-item-overlay'>{ this.props.eddi.settings.name }</div>
    </Link>
  }

}
