'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { PATHS } from '../../constants';

import HomeButton from '../../components/HomeButton';

import { getAllEddiByUserThunk } from '../../actions/eddis';

function mapStateToProps(state){
	return {
		user : state.user,
		eddis : state.eddis.list
	};
}

function mapDispatchToProps(dispatch){
	return {
		navigateTo : (pathname, query) => browserHistory.push({ pathname, query }),
		getEddisByUser : () => dispatch(getAllEddiByUserThunk())
	};
}

class List extends Component {

	componentWillReceiveProps(nextProps){
		const { user, getEddisByUser } = this.props;
		if(nextProps.user !== user) return getEddisByUser();
	}

	clickHandler(destination, query){
		const { navigateTo } = this.props;
		navigateTo(destination, query);
	}

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
			return eddis.map((eddi, i) => {
				const name = eddi.settings.name;
				return (
					<HomeButton key={i}
						name={name}
					/>
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
		const { user, eddis } = this.props,
      NoEddiElement = this._renderNoEddis(),
      EddiButtons = this._renderEddiButtons(),
      showEddi = eddis && eddis.length ? EddiButtons : NoEddiElement;

		console.log('these are teh eddis', eddis);

		return (
			<div id="list">
				{ showEddi }
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);
