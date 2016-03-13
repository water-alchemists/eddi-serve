import React, { Component } from 'react';
import { connect } from 'react-redux';

import { modalShow } from '../actions/modal';

import style from '../less/AddEddiButton.less';



function mapDispatchToProps(dispatch){
	return {
		openAddForm : () => dispatch(modalShow('AddEddiModal'))
	};
}


class AddEddiButton extends Component {

  render(){
    return <div className='add-eddi-button' onClick={() => this.props.openAddForm()}>
      <span>add new +</span>
    </div>
  }

}

export default connect(
  null,
	mapDispatchToProps
)(AddEddiButton);
