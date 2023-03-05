import React from 'react';
import '../css/style.css';
import '../css/profile.css';
import icon_camera_blue from '../image/icon_camera_blue.png';

class IconProfilePicture extends React.Component {
	state = {pictureParts : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.changeProfilePicture = this.changeProfilePicture.bind(this);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				pictureParts : props.pictureParts
			}
		});
	}

	changeProfilePicture(event) {
		this.props.onClickPictureChange(true);
	}

	render() {  
		return (
			<div className={this.props.pictureParts.pictureLayoutClass}>
				<img className={this.props.pictureParts.profilePictureClass} 
				alt="" src={this.props.pictureParts.roundPicture} />
				<img className={this.props.pictureParts.pictureChangeClass} 
					onClick={this.changeProfilePicture} alt="" src={icon_camera_blue} />
			</div>
		);
	}
}

export default IconProfilePicture;   


