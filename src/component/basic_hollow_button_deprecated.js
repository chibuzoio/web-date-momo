import React from 'react';
import '../css/input.css';
import '../css/style.css';
import BasicButton from './basic_button';
import HollowButton from './hollow_button';

class BasicHollowButtonDeprecated extends React.Component {
	state = {buttonParts : {}};
 
	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.selectButtonContent = this.selectButtonContent.bind(this);
		this.removeButtonContent = this.removeButtonContent.bind(this);
	}
 
	selectButtonContent(buttonClicked) {
		if (buttonClicked) {
			this.props.onButtonSelected(true);
		}
	}

	removeButtonContent(buttonClicked) {
		if (buttonClicked) {
			this.props.onButtonSelected(false);
		}
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
			<div className="basicHollowButton">
				<HollowButton onButtonClicked={this.selectButtonContent} buttonParts={this.props.buttonParts.hollowButton} />
				<BasicButton onButtonClicked={this.removeButtonContent} buttonParts={this.props.buttonParts.basicButton} />
			</div>
		);
	}
}

export default BasicHollowButtonDeprecated;   


