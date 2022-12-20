import React from 'react';
import '../css/input.css';

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
			<input className="basicButton" type="submit" value={this.state.buttonParts.buttonTitle} />
		);
	}
}

export default BasicButton;   


