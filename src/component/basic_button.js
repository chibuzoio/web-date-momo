import React from 'react';
import '../css/input.css';
import '../css/style.css';

class BasicButton extends React.Component {
	state = {buttonParts : {}};
 
	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.clickBasicButton = this.clickBasicButton.bind(this);
	}

	clickBasicButton(event) {
		this.props.onButtonClicked(true);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				buttonParts : props.buttonParts
			}
		});
	}

	render() {  
		return (
			<button className={this.props.buttonParts.buttonClass} 
				style={{display: this.props.buttonParts.buttonDisplay}}
				onClick={this.clickBasicButton} type="button"> 
				{this.props.buttonParts.buttonTitle}
			</button>
		);
	}
}

export default BasicButton;   


