import React from 'react';
import '../css/input.css';
import '../css/style.css';

class LeftIconFormField extends React.Component {
	// this is the way you declare global variable in react js 
	// class just like you declare global state variable below it 
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
			<div>
				<label>{this.props.formParts.label}</label>
				<div className={this.props.formParts.fieldLayoutClass}>
				    <img className={this.props.formParts.fieldIconClass} alt="" src={this.props.formParts.fieldIcon} />
				    <input 
				    	type={this.props.formParts.type} name="name" 
				    	value={this.props.formParts.value}
				    	placeholder={this.props.formParts.placeholder} />
				</div>
			</div>
		);
	}
}

export default LeftIconFormField;   


