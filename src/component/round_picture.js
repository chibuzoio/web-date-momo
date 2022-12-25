import React from 'react';
import '../css/style.css';

class RoundPicture extends React.Component {
	state = {pictureParts : {}};

	constructor(props) {
		super(props);
		this.state.pictureParts = props.pictureParts; 
	}

	render() {  
		return (
			<img className={this.state.pictureParts.roundPictureClass} 
			alt="" src={this.state.pictureParts.roundPicture} />
		);
	}
}

export default RoundPicture;   


