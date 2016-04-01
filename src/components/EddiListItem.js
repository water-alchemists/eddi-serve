  'use strict';
import React, { Component, PropTypes } from 'react';

import { PATHS } from '../constants';

import { Link } from 'react-router';

import style from '../less/EddiListItem.less';

class EddiListItem extends Component {

  render(){
  	const { name, url, id } = this.props,
      itemStyle = {
        'background-image' : `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url("${url}")`
      };
    return (
    	<Link to={{ pathname: PATHS.DASHBOARD, query: { id } }}
        	className='eddi-list-item' 
          style={itemStyle}
        >
      		<div className='text-container'>
      			<div className='eddi-item-overlay'>{ name }</div>
      			<div className='sprite arrow right'></div>
      		</div>
    	</Link>
    );
  }

}

EddiListItem.propTypes = {
	name : PropTypes.string.isRequired,
	url : PropTypes.string.isRequired,
	id : PropTypes.string.isRequired
};

export default EddiListItem;


