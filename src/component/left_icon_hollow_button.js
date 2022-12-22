import React from 'react';
import '../css/input.css';

class LeftIconHollowButton extends React.Component {
	state = {buttonParts : {}};

	constructor(props) {
		super(props);
		this.state.buttonParts = props.buttonParts; 
	}

	render() {
		return (
			<button className="leftIconHollowButton hollowButton buttonTopMargin">
				<div className="leftHollowButtonContent"> 
					<img className="hollowButtonLeftIcon" src={this.state.buttonParts.buttonIcon}/>
					<div className="leftHollowButtonTitle">{this.state.buttonParts.buttonTitle}</div>
				</div>
			</button>
		);
	}
}

export default LeftIconHollowButton;   


