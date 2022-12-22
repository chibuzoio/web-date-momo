import React from 'react';
import '../css/input.css';

class LeftIconHollowButton extends React.Component {
	state = {buttonParts : {}};

	constructor(props) {
		super(props);
		this.state.buttonParts = props.buttonParts; 
	}

	render() {
		// leftIconHollowButtonClass = leftIconHollowButton hollowButton buttonTopMargin
		// leftHollowButtonContentClass = leftHollowButtonContent
		// hollowButtonLeftIconClass = hollowButtonLeftIcon
		// leftHollowButtonTitleClass = leftHollowButtonTitle

		return (
			<button className={this.state.buttonParts.leftIconHollowButtonClass}>
				<div className={this.state.buttonParts.leftHollowButtonContentClass}> 
					<img className={this.state.buttonParts.hollowButtonLeftIconClass} src={this.state.buttonParts.buttonIcon}/>
					<div className={this.state.buttonParts.leftHollowButtonTitleClass}>{this.state.buttonParts.buttonTitle}</div>
				</div>
			</button>
		);
	}
}

export default LeftIconHollowButton;   


