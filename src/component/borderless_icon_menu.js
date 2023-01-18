import React from 'react';
import '../css/input.css';
import '../css/style.css';

class BorderlessIconMenu extends React.Component {
	state = {iconMenuParts : {}};
    
	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				iconMenuParts : this.props.iconMenuParts
			}
		});
	}

	render() {  
		return (
			<div className="borderlessIconMenu">
				<img className="iconMenuImage" alt="" src={this.props.iconMenuParts.iconMenuImage} />
				<div className="iconMenuTitle"> 
					{this.props.iconMenuParts.iconMenuTitle}
				</div>
			</div>
		);
	}
}

export default BorderlessIconMenu;   


