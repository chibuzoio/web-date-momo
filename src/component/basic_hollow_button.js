import React from 'react';
import '../css/input.css';
import '../css/style.css';
import BasicButton from '../component/basic_button';
import HollowButton from '../component/hollow_button';

class BasicHollowButton extends React.Component {
	state = {buttonParts : {}};
 
	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		console.log("The value of props from basicHollowButton is " + JSON.stringify(props));
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

export default BasicHollowButton;   


