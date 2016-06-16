'use strict';
import React, { Component } from 'react';
import classNames from 'classnames';

const {
    PropTypes
} = React;

class ChangePasswordForm extends Component {
    constructor(props){
        super(props);
        this.state = {
          email : null,
          oldPassword : null,
          newPassword : null  
        };
    }
    
    componentWillReceiveProps(nextProps){
        const {email} = nextProps;
        if(email) this.setState({ email });       
    }
    
    componentWillUnmount(){
        const { componentWillUnmount } = this.props;
        console.log('hello')
        if(componentWillUnmount instanceof Function) componentWillUnmount();
    }
    
    onEmailChange(event) {
        const email = event.target.value;
        event.preventDefault();
        this.setState({ email });
    }
    
    onOldPasswordChange(event){
        const oldPassword = event.target.value;
        event.preventDefault();
        this.setState({ oldPassword });
    }
    
    onNewPasswordChange(event){
        const newPassword = event.target.value;
        event.preventDefault();
        this.setState({ newPassword });
    }
    
    submitHandler(event){
        const { onSubmit } = this.props;
        event.preventDefault();
        if(onSubmit instanceof Function) return onSubmit(this.state);
    }
    
    _renderMessage(){
        const { submitted, success, message } = this.props,
            messageClass = classNames([
                'message',
                { success : submitted && success },
                { warning : submitted && !success }
            ]);
        if(!submitted) return null;
        return (
           <div className={messageClass}>
                { message }
           </div>
        );
    }
    
    render(){
        const { email, oldPassword, newPassword } = this.state;
       return (
        <form className='password-form light' onSubmit={event => this.submitHandler(event)}>
            <div>
                <h3>CHANGE PASSWORD</h3>
                { this._renderMessage() }
                <div className='input-container'>
                    <input type='email'
                        name='email'
                        onChange={event => this.onEmailChange(event)}
                        value={email}
                        placeholder="email"
                    />
                    <input type='password'
                        name='oldPassword'
                        onChange={event => this.onOldPasswordChange(event)}
                        value={oldPassword}
                        placeholder="old password"
                    />
                    <input type='password'
                        name='newPassword'
                        onChange={event => this.onNewPasswordChange(event)}
                        value={newPassword}
                        placeholder="new password"
                    />
                </div>
                <div className='button-container'>
                    <button type='submit'>SUBMIT</button>
                </div>
            </div>
        </form>
       );
    }
}

ChangePasswordForm.propTypes = {
    onSubmit : PropTypes.func,
    email : PropTypes.string,
    submitted : PropTypes.bool,
    success : PropTypes.bool,
    message : PropTypes.string,
    componentWillUnmount : PropTypes.func
};

export default ChangePasswordForm;