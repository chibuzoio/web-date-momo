import React from 'react';
import '../css/sexuality.css';
import HollowButton from '../component/hollow_button';

class SexualityOptions extends React.Component {
	state = {sexualityButtons : []};

	constructor(props) {
		super(props);

		// This failed. Use setState construct to update state 
		// if data here need to change on user interaction  
		this.state.sexualityButtons = props.sexualityButtons; 
	}

	render() { 
		return (
			<div className="sexualityButtonLayout">
				{ 
					this.props.sexualityButtons.map((sexualityButton) => ( 
						<HollowButton buttonParts={sexualityButton} />
					))
				}
			</div>
		);
	}
}

export default SexualityOptions;   


