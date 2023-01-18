import React from 'react';
import '../css/input.css';
import '../css/style.css';

class LeftIconHollowButton extends React.Component {
	state = {buttonParts : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
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
			<button className={this.props.buttonParts.leftIconHollowButtonClass}>
				<div className={this.props.buttonParts.leftHollowButtonContentClass}> 
					<img className={this.props.buttonParts.hollowButtonLeftIconClass} src={this.props.buttonParts.buttonIcon}/>
					<div className={this.props.buttonParts.leftHollowButtonTitleClass}>{this.props.buttonParts.buttonTitle}</div>
				</div>
			</button>
		);
	}
}

export default LeftIconHollowButton;   


