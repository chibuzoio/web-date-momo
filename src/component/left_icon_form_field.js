import React from 'react';
import '../css/input.css';
import '../css/style.css';

class LeftIconFormField extends React.Component {
	// fieldInputValue = "";
	state = {formParts : {}};

/*		
	You declare constructor explicitly because 
	you want to initialize state. You initialized 
	state because you want to set state somewhere
	in the class. If not, use data from props directly, 
	without initializing state with it and do not declare 
	the constructor because it's already declared implicitly.
*/		
	constructor(props) {
		super(props);
		this.state.formParts = props.formParts; 

		this.handleChange = this.handleChange.bind(this);
	}

  	handleChange(e) {
  		// console.log("The value of e.target.value here is " + e.target.value);

   		this.setState({formParts : {
				fieldIcon : this.state.formParts.fieldIcon,
				placeholder : this.state.formParts.placeholder,
				label : this.state.formParts.label,
				value : e.target.value,
				type : this.state.formParts.type,
				fieldLayoutClass : this.state.formParts.fieldLayoutClass,
				fieldIconClass : this.state.formParts.fieldIconClass
			}
		});
   	}

	render() {  
		return (
			<div>
				<label>{this.state.formParts.label}</label>
				<div className={this.state.formParts.fieldLayoutClass}>
				    <img className={this.state.formParts.fieldIconClass} alt="" src={this.state.formParts.fieldIcon} />
				    <input 
				    	type={this.state.formParts.type} name="name" 
				    	value={this.state.formParts.value}
				    	onChange={this.handleChange}
				    	placeholder={this.state.formParts.placeholder} />
				</div>
			</div>
		);
	}
}

export default LeftIconFormField;   


