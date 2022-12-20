import React from 'react';
import '../css/input.css';

class BasicButton extends React.Component {
	state = {buttonParts : {}};

	constructor(props) {
		super(props);
		this.state.buttonParts = props.buttonParts; 
	}

	render() {
		return (
			<input className="hollowButton buttonTopMargin" type="submit" 
			value={this.state.buttonParts.buttonTitle} />
		);
	}
}

export default BasicButton;   


