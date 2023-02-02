import React from 'react';
import '../css/input.css'; 
import BasicButton from '../component/basic_button';

class HorizontalButtonList extends React.Component {
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
			<div className="horizontalButtonList">
				{ 
					this.props.sexualityButtons.map((sexualityButton) => ( 
						<BasicButton buttonParts={sexualityButton} />
					))
				}
			</div>
		);
	}
}

export default HorizontalButtonList;   


