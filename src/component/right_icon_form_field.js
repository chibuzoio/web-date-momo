import React from 'react';
import '../css/input.css';

class RightIconFormField extends React.Component {
	state = {formParts : {}};

	constructor(props) {
		super(props);
		this.state.formParts = props.formParts; 
	}

	render() {  
		return (
			<div className={this.state.formParts.fieldLayoutClass}>
			    <input className={this.state.formParts.formFieldClass} type={this.state.formParts.type} 
			    name="name" placeholder={this.state.formParts.placeholder} />
			    <img className={this.state.formParts.fieldIconClass} alt="" src={this.state.formParts.fieldIcon} />
			</div>
		);
	}
}

export default RightIconFormField;   


