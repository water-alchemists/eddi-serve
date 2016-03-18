'use strict';
import React, { Component } from 'react';
import moment from 'moment';

const {
	PropTypes
} = React;

class SettingsEddiVersion extends Component {
	render(){
		const { artikNumber, artikDate, eddiNumber, eddiDate } = this.props,
			formattedArtikDate = moment(artikDate).format('M/D/YY'),
			formattedEddiDate = moment(eddiDate).format('M/D/YY');

		return (
			<div className='settings-version' >
				<div className='version-type' style={styles.row}>
					<p className='info' style={styles.bold}>{`EDDI ${eddiNumber}`}</p>
					<p className='date'>{`updated ${formattedEddiDate}`}</p>
				</div>
				<div className='version-type' style={styles.row}>
					<p className='info' style={styles.bold}>{`ARTIK ${artikNumber}`}</p>
					<p className='date'>{`released ${formattedArtikDate}`}</p>
				</div>
			</div>
		);
	}
}

SettingsEddiVersion.propTypes = {
	artikNumber : PropTypes.string.isRequired,
	artikDate : PropTypes.instanceOf(Date).isRequired,
	eddiNumber : PropTypes.string.isRequired,
	eddiDate : PropTypes.instanceOf(Date).isRequired
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