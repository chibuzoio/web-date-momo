import React from 'react';
import '../css/input.css';

class BasicButton extends React.Component {
	state = {buttonTitle : ""};

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
		this.state.buttonTitle = props.buttonTitle; 
	}

	render() {
		return (
			<input type="submit" value={this.state.buttonTitle} />
		);
	}
}

export default BasicButton;   


