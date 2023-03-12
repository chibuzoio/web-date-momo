import React from 'react';
import '../css/input.css';
import '../css/style.css';

class CloseLayoutIcon extends React.Component {
	state = {menuIconParts : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.changeIconDisplay = this.changeIconDisplay.bind(this);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				menuIconParts : props.menuIconParts
			}
		});
	}

	changeIconDisplay() {
		this.props.onChangeIconDisplay(true);
	}

	render() {  
		return (
			<div className={this.props.menuIconParts.menuLayoutClass} onClick={this.changeIconDisplay}> 
				<img className={this.props.menuIconParts.menuIconClass} 
					src={this.props.menuIconParts.menuIcon} alt="" />
			</div>
		);
	}
}

export default CloseLayoutIcon;   


