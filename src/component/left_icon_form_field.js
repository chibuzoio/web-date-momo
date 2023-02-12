import React from 'react';
import '../css/input.css';
import '../css/style.css';
import BasicFormField from '../component/basic_form_field';

class LeftIconFormField extends React.Component {
	state = {formParts : {}};
	
	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);   
		this.updateValueFormData = this.updateValueFormData.bind(this);
	}

	updateValueFormData(valueFormData, isBlurred) {
		this.props.onFormValueChange(valueFormData, isBlurred);
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
				    <BasicFormField onFormValueChange={this.updateValueFormData} formParts={this.props.formParts} />
				</div>
			</div>
		);
	}
}

export default LeftIconFormField;   


