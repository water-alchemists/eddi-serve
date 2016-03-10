'use strict';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { PATHS } from '../constants';

const {
	PropTypes
} = React;

class LoggedInHome extends Component {
	navigateTo(key, query = {}){
		const pathname = PATHS[key],
			destination = {
				pathname,
				query
			};

		if(pathname) return browserHistory.push(destination);
	}

	_renderEddiButtons(){
		const { eddis } = this.props;
		if(eddis) {
			return eddis.map(eddi => {
				const name = eddi.name;
				return (
					<div>{name}</div>
				);
			});
		}
	}

	_renderNoEddis(){
		return (
			<p>
				{`Currently you are not tracking any eddis. Click `}
				<a onClick={() => this.navigateTo('SETTINGS')}>here</a>
				{` to start tracking one.`}
			</p>
		);
	}

	render(){
		const { eddis } = this.props,
			NoEddiElement = this._renderNoEddis(),
			EddiButtons = this._renderEddiButtons(),
			showEddi = eddis && eddis.length ? EddiButtons : NoEddiElement;
		return (
			<div>
				{ showEddi }
			</div>
		);
	}
}

LoggedInHome.propTypes = {
	eddis : PropTypes.arrayOf(
		PropTypes.shape({
			name : PropTypes.string
		})
	)
}

export default LoggedInHome;