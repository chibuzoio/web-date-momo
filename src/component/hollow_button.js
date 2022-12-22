import React from 'react';
import '../css/input.css';

class HollowButton extends React.Component {
	state = {buttonParts : {}};

	constructor(props) {
		super(props);
		this.state.buttonParts = props.buttonParts; 
	}

	render() {
		return (
			<input className={this.state.buttonParts.buttonClass} type="submit" 
			value={this.state.buttonParts.buttonTitle} />
		);
	}
}

export default HollowButton;   


