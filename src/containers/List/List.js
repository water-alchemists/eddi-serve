'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import { PATHS } from '../../constants';

import HomeButton from '../../components/HomeButton';
import AddEddiButton from '../../components/AddEddiButton';

import { getAllEddiByUserThunk } from '../../actions/eddis';

import style from './List.less';



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
		return <div className='eddis-empty'>
			<p> Currently you are not tracking any eddis. </p>
			<AddEddiButton />
		</div>;
	}

	render(){
		const { user, eddis } = this.props;

		var showEddi;
		if( eddis && eddis.length ){
			showEddi = this._renderEddiButtons();
			console.log('these are teh eddis', eddis);
		} else {
			showEddi = this._renderNoEddis();
		}

		return (
			<div id="list" className="page">
				{ showEddi }
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);
