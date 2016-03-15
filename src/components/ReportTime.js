'use strict';
import React, { Component, PropTypes } from 'react';

import DateSelect from './DateSelect';

class ReportTime extends Component {
	render(){
		const { title } = this.props;
		return (
			<div>
				<h3>{`${title.toUpperCase()}`}</h3>
				<div>
					<DateSelect />
				</div>
			</div>
		);
	}
}

ReportTime.propTypes = {
	title : PropTypes.string,
	onChange : PropTypes.func
};

export default ReportTime;