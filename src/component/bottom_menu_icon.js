import React from 'react';
import '../css/input.css'; 

class BottomMenuIcon extends React.Component {
	state = {menuParts : {}};
		
	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				menuParts : this.props.menuParts
			}
		});
	}

	render() {  
		return (
			<button className={this.props.menuParts.bottomMenuClass} type="button"> 
				<img className="bottomMenuIcon" alt="" src={this.props.menuParts.menuIcon} />
			</button>
		);
	}
}

export default BottomMenuIcon;   


