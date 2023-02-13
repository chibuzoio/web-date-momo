import React from 'react';
import '../css/input.css';
import '../css/style.css';

class LeftIconHollowButton extends React.Component {
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
				buttonParts : props.buttonParts
			}
		});
	}

	render() {
		return (
			<button onClick={this.clickHollowButton} className={this.props.buttonParts.leftIconHollowButtonLayout}>
				<img className={this.props.buttonParts.leftIconHollowButtonIcon} src={this.props.buttonParts.buttonIcon}/>
				<div className={this.props.buttonParts.leftIconHollowButtonTitle}>{this.props.buttonParts.buttonTitle}</div>
			</button>
		);
	}
}

export default LeftIconHollowButton;   


