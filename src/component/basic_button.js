import React from 'react';
import '../css/input.css';
import '../css/style.css';

class BasicButton extends React.Component {
	state = {buttonParts : {}};

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
				buttonParts : this.props.buttonParts
			}
		});
	}

	render() {  
		return (
			<button className={this.props.buttonParts.buttonClass} type="button"> 
				{this.props.buttonParts.buttonTitle}
			</button>
		);
	}
}

export default BasicButton;   


