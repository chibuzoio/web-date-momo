import React from 'react';
import '../css/input.css'; 
import BasicButton from '../component/basic_button';

class HorizontalButtonList extends React.Component {
	state = {sexualityButtons : []};

	constructor(props) {
		super(props);
		this.state.sexualityButtons = props.sexualityButtons; 
	}

	render() {      
		return (
			<div className="horizontalButtonList">
				{ 
					this.state.sexualityButtons.map((sexualityButton) => ( 
						<BasicButton buttonParts={sexualityButton} />
					))
				}
			</div>
		);
	}
}

export default HorizontalButtonList;   


