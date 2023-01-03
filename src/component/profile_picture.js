import React from 'react';
import '../css/style.css';
import '../css/profile.css';

class ProfilePicture extends React.Component {
	state = {pictureParts : {}};

	constructor(props) {
		super(props);
		this.state.pictureParts = props.pictureParts; 
	}

	render() {  
		return (
			<div className="profilePictureLayout">
				<img className="profilePictureImage" 
				alt="" src={this.state.pictureParts.roundPicture} />
			</div>
		);
	}
}

export default ProfilePicture;   


