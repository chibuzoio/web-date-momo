import React from 'react';
import '../css/input.css';

class BasicFormField extends React.Component {
	state = {formParts : {}};

	constructor(props) {
		super(props);
		this.state.formParts = props.formParts; 
	}

	render() {     
		return (
			<input className={this.state.formParts.ageFieldClass} type={this.state.formParts.type} 
			placeholder={this.state.formParts.placeholder} />
		);
	}
}

export default BasicFormField;   


