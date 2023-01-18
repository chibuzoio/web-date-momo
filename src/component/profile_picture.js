import React from 'react';
import '../css/style.css';
import '../css/profile.css';

class ProfilePicture extends React.Component {
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
			<div className="profilePictureLayout">
				<img className="profilePictureImage" 
				alt="" src={this.props.pictureParts.roundPicture} />
			</div>
		);
	}
}

export default ProfilePicture;   


