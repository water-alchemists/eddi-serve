'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ChangePasswordForm from '../../components/ChangePasswordForm';

import { menuNameChange } from '../../actions/menu';
import { userChangePasswordThunk } from '../../actions/user';
import { formClear } from '../../actions/form';

import style from './Profile.less';

function mapStateToProps(state){
	return {
		user : state.user,
		form : state.form
	};
}

function mapDispatchToProps(dispatch){
	return {
		changePassword: ({ email, oldPassword, newPassword }) => dispatch(userChangePasswordThunk(email, oldPassword, newPassword)),
        formClear : () => dispatch(formClear()),
        updateMenuName: name => dispatch(menuNameChange(name)),
	};
}

class Profile extends Component {
    componentWillMount(){
        const { updateMenuName } = this.props;
        updateMenuName('Profile');
    }
    
    shouldComponentUpdate(nextProps){
        return true;
    }
    
    render(){
        const { user, form } = this.props;
        return (
            <div id='profile' className="page">
                <ChangePasswordForm 
                    email={user.email}
                    submitted={form.submitted}
                    success={form.success}
                    message={form.message}
                    onSubmit={this.props.changePassword}
                    componentWillUnmount={this.props.formClear}
                />
            </div>
        )
    }
}

Profile.propTypes = {
	user : PropTypes.shape({
        email : PropTypes.string
    }),
    form : PropTypes.shape({
        submitted: PropTypes.bool.isRequired,
        success : PropTypes.bool,
        message : PropTypes.string
    })
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
