import React from 'react';
import '../css/input.css';

class BasicFormField extends React.Component {
	state = {formParts : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				formParts : this.props.formParts
			}
		});
	}

	render() {     
		return (
			<input className={this.props.formParts.ageFieldClass} type={this.props.formParts.type} 
			placeholder={this.props.formParts.placeholder} />
		);
	}
}

export default BasicFormField;   


