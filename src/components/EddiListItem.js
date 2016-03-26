'use strict';
import React, { Component, PropTypes } from 'react';

import { PATHS } from '../constants';

import { Link } from 'react-router';

import style from '../less/EddiListItem.less';

class EddiListItem extends Component {

  render(){
  	const { name, url, id } = this.props;
    return (
    	<Link to={{ pathname: PATHS.DASHBOARD, query: { id } }}
        	className='eddi-list-item' 
        >
        	<div className='image-container'>
        		<div className='image-cropper'>
        			<img src={url} />
        		</div>
        	</div>
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


