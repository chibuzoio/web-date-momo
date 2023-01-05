import React from 'react';
import '../css/input.css';
import '../css/style.css';

class BottomBorderIconMenu extends React.Component {
	state = {iconMenuParts : {}};
    
	constructor(props) {
		super(props);
		this.state.iconMenuParts = props.iconMenuParts; 
	}

	render() {  
		return (
			<div className="bottomBorderIconMenu">
				<img className="iconMenuImage" alt="" src={this.state.iconMenuParts.iconMenuImage} />
				<div className="iconMenuTitle"> 
					{this.state.iconMenuParts.iconMenuTitle}
				</div>
			</div>
		);
	}
}

export default BottomBorderIconMenu;   


