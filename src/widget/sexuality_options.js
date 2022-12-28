import React from 'react';
import '../css/sexuality.css';
import HollowButton from '../component/hollow_button';

class SexualityOptions extends React.Component {
	state = {sexualityButtons : []};

	constructor(props) {
		super(props);
		this.state.sexualityButtons = props.sexualityButtons; 
	}

	render() { 
		return (
			<div className="sexualityButtonLayout">
				{ 
					this.state.sexualityButtons.map((sexualityButton) => ( 
						<HollowButton buttonParts={sexualityButton} />
					))
				}
			</div>
		);
	}
}

export default SexualityOptions;   


