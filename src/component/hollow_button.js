import React from 'react';
import '../css/input.css';
import '../css/style.css';

class HollowButton extends React.Component {
	state = {buttonParts : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.clickHollowButton = this.clickHollowButton.bind(this);
	}

	clickHollowButton(event) {
		this.props.onButtonClicked(true);
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
			<button onClick={this.clickHollowButton} 
				style={{display: this.props.buttonParts.buttonDisplay}}
				className={this.props.buttonParts.buttonClass} type="button"> 
				{this.props.buttonParts.buttonTitle}
			</button>
		);
	}
}

export default HollowButton;   


