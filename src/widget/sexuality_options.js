import React from 'react';
import '../css/input.css';
import '../css/sexuality.css';
import BasicHollowButton from '../component/basic_hollow_button';

class SexualityOptions extends React.Component {
	sexualitySelected = false;
	state = {sexualityButtons : []};

	constructor(props) {
		super(props);     
		this.updateState = this.updateState.bind(this);
		this.getSexualityProperty = this.getSexualityProperty.bind(this);
		this.selectSexualityOption = this.selectSexualityOption.bind(this);
	}

	componentDidMount() {
		this.updateState();
	}

	getSexualityProperty(event) {
		var currentSelectedOption = event.currentTarget.getAttribute("data-current-sexuality");

		setTimeout(function() {
			if (this.sexualitySelected) {
				var localSexualityButtons = this.state.sexualityButtons;
				localSexualityButtons[currentSelectedOption].basicButton.buttonDisplay = "flex";
				localSexualityButtons[currentSelectedOption].hollowButton.buttonDisplay = "none";

				this.setState(function(state) {
					return {sexualityButtons : localSexualityButtons}
				});

				this.props.onSexualityChange(localSexualityButtons);
			} else {
				var localSexualityButtons = this.state.sexualityButtons;
				localSexualityButtons[currentSelectedOption].basicButton.buttonDisplay = "none";
				localSexualityButtons[currentSelectedOption].hollowButton.buttonDisplay = "flex";

				this.setState(function(state) {
					return {sexualityButtons : localSexualityButtons}
				});

				this.props.onSexualityChange(localSexualityButtons);
			}
		}.bind(this), 500);
	}

	selectSexualityOption(buttonSelected) {		
		this.sexualitySelected = buttonSelected;
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				sexualityButtons : props.sexualityButtons
			}
		});
	}

	render() { 
		return (
			<div className="sexualityButtonLayout">
				{ 
					this.state.sexualityButtons.map((sexualityButton, index) => ( 
						<div className="basicHollowButton" onClick={this.getSexualityProperty} data-current-sexuality={index}>
							<BasicHollowButton onButtonSelected={this.selectSexualityOption} buttonParts={sexualityButton} />
						</div>
					))
				}
			</div>
		);
	}
}

export default SexualityOptions;   


