import React from 'react';
import '../css/style.css';

class RoundPicture extends React.Component {
	state = {pictureParts : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				pictureParts : this.props.pictureParts
			}
		});
	}

	render() {  
		return (
			<img className={this.props.pictureParts.roundPictureClass} 
				alt="" src={this.props.pictureParts.roundPicture} />
		);
	}
}

export default RoundPicture;   


