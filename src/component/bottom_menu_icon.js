import React from 'react';
import '../css/input.css'; 

class BottomMenuIcon extends React.Component {
	state = {menuParts : {}};
		
	constructor(props) {
		super(props);
		this.state.menuParts = props.menuParts; 
	}

	render() {  
		return (
			<button className={this.state.menuParts.bottomMenuClass} type="button"> 
				<img className="bottomMenuIcon" alt="" src={this.state.menuParts.menuIcon} />
			</button>
		);
	}
}

export default BottomMenuIcon;   


