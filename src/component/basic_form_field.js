import React from 'react';
import '../css/input.css';

class BasicFormField extends React.Component {
	state = {formParts : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.getInputValue = this.getInputValue.bind(this);
		this.checkFieldValue = this.checkFieldValue.bind(this);
	}

	checkFieldValue(event) {
		this.props.onFormValueChange(event.currentTarget.value, true);
	}

	getInputValue(event) {
		this.props.onFormValueChange(event.currentTarget.value, false);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				formParts : props.formParts
			}
		});
	}

	render() {     
		return (
			<input className={this.props.formParts.inputFieldClass} onBlur={this.checkFieldValue} 
				onChange={this.getInputValue} type={this.props.formParts.type} 
				placeholder={this.props.formParts.placeholder} />
		);
	}
}

export default BasicFormField;   


