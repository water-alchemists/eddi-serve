'use strict';
import React, { Component, PropTypes } from 'react';

class ZipInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : null
        };
    }
    
    componentWillReceiveProps(nextProps){
        const { value } = nextProps;
        if(value && (value !== this.state.value)) this.setState({ value });
    }
    
    changeHandler(event){
        event.preventDefault();
        const { onChange } = this.props,
            value = event.target.value;
        if(!value || value.length < 6) this.setState({ value });
    }
    
    blurHandler(event){
		event.preventDefault();
		const { onChange } = this.props,
			value = event.target.value,
			formattedValue = !isNaN(Number(value)) ? value : null;

        if(onChange instanceof Function) onChange(formattedValue);
	}
    
    render(){
        const { placeholder } = this.props,
            { value } = this.state;

        return (
            <div className='zip-input'>
                <input type='number'
                    onChange={event => this.changeHandler(event)}
                    placeholder={placeholder}
                    pattern='[0-9]*'
                    onBlur={event => this.blurHandler(event)}
                    value={value}
                />
            </div>
        );
    }
}

ZipInput.propTypes = {
    value : PropTypes.number,
    onChange : PropTypes.func,
    placeholder : PropTypes.string
};

ZipInput.defaultProps = {
    placeholder : 'Enter Zip Code'
};

export default ZipInput;