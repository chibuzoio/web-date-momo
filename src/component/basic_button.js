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
		this.state.buttonParts = props.buttonParts; 
	}

	render() {  
		return (
			<button className={this.state.buttonParts.buttonClass} type="button"> 
				{this.state.buttonParts.buttonTitle}
			</button>
		);
	}
}

export default BasicButton;   


