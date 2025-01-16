import React from 'react';
import '../css/input.css';
import '../css/sexuality.css';
import BasicButton from '../component/basic_button';

class SexualityBiometricsDeprecated extends React.Component {
	state = {sexualityButtons : []};

	constructor(props) {
		super(props);     
		this.updateState = this.updateState.bind(this);
		this.clickedBasicButton = this.clickedBasicButton.bind(this);
	}

	componentDidMount() {
		this.updateState();
	}
    
	clickedBasicButton(buttonClicked) {		
		if (buttonClicked) {}
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
					this.props.sexualityButtons.map((sexualityButton) => ( 
						<BasicButton onButtonClicked={this.clickedBasicButton} buttonParts={sexualityButton} />
					))
				}
			</div>
		);
	}
}

export default SexualityBiometricsDeprecated;   


