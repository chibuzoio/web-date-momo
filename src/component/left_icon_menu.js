import React from 'react';
import '../css/input.css';
import '../css/style.css';

class LeftIconMenu extends React.Component {
	state = {iconMenuParts : {}};
    
	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.clickIconMenu = this.clickIconMenu.bind(this);
	}

	clickIconMenu(event) {
		this.props.onMenuClicked(true);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				iconMenuParts : props.iconMenuParts
			}
		});
	}

	render() {  
		return (
			<div className={this.props.iconMenuParts.iconMenuLayout} onClick={this.clickIconMenu} >
				<img className="iconMenuImage" alt="" src={this.props.iconMenuParts.iconMenuImage} />
				<div className="iconMenuTitle"> 
					{this.props.iconMenuParts.iconMenuTitle}
				</div>
			</div>
		);
	}
}

export default LeftIconMenu;   


