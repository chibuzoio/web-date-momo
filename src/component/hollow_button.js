import React from 'react';
import '../css/input.css';
import '../css/style.css';

class HollowButton extends React.Component {
	state = {buttonParts : {}};

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

export default HollowButton;   


