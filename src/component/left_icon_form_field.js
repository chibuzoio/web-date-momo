import React from 'react';
import '../css/input.css';
import '../css/style.css';

class LeftIconFormField extends React.Component {
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
			<div>
				<label>{this.props.formParts.label}</label>
				<div className={this.props.formParts.fieldLayoutClass}>
				    <img className={this.props.formParts.fieldIconClass} alt="" src={this.props.formParts.fieldIcon} />
				    <input 
				    	type={this.props.formParts.type} name="name" onBlur={this.checkFieldValue}
				    	value={this.props.formParts.value} onChange={this.getInputValue}
				    	placeholder={this.props.formParts.placeholder} />
				</div>
			</div>
		);
	}
}

export default LeftIconFormField;   


