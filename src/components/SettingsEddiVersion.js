'use strict';
import React, { Component } from 'react';

const {
	PropTypes
} = React;

class SettingsEddiVersion extends Component {
	render(){
		const { artikNumber, artikDate, eddiNumber, eddiDate } = this.props;

		return (
			<div>
				<div style={styles.row}>
					<p style={styles.bold}>{`EDDI ${eddiNumber}`}</p>
					<p>{`updated ${eddiDate}`}</p>
				</div>
				<div style={styles.row}>
					<p style={styles.bold}>{`ARTIK ${artikNumber}`}</p>
					<p>{`released ${artikDate}`}</p>
				</div>
			</div>
		);
	}
}

SettingsEddiVersion.propTypes = {
	artikNumber : PropTypes.string,
	artikDate : PropTypes.date,
	eddiNumber : PropTypes.string,
	eddiDate : PropTypes.date
}

const styles = {
	row : {
		display : 'flex',
		flexDirection: 'row',
		justifyContent : 'space-between',
		alignItems : 'center'
	},
	bold : {
		fontWeight : 'bold'
	}
}

export default SettingsEddiVersion;