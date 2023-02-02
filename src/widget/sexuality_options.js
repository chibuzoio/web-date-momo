import React from 'react';
import '../css/sexuality.css';
import BasicHollowButton from '../component/basic_hollow_button';

class SexualityOptions extends React.Component {
	state = {sexualityButtons : []};

	constructor(props) {
		super(props);     
		this.updateState = this.updateState.bind(this);
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
						<BasicHollowButton buttonParts={sexualityButton} />
					))
				}
			</div>
		);
	}
}

export default SexualityOptions;   


