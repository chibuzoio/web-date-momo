import React from 'react';
import '../css/input.css';

class RightIconFormField extends React.Component {
	state = {formParts : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
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
			<div className={this.props.formParts.fieldLayoutClass}>
			    <input className={this.props.formParts.formFieldClass} type={this.props.formParts.type} 
				    name="name" placeholder={this.props.formParts.placeholder} />
			    <img className={this.props.formParts.fieldIconClass} alt="" src={this.props.formParts.fieldIcon} />
			</div>
		);
	}
}

export default RightIconFormField;   


