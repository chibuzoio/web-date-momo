import React from 'react';
import '../css/style.css';
import '../css/profile.css';

class UserDetailPicture extends React.Component {
	state = {userDetailParts : {}};

	constructor(props) {
		super(props);
		this.state.userDetailParts = props.userDetailParts; 
	}

	render() {  
		// Programmatically alter picture length and width based on changes 
		// on screen sizes  

		return (
			<div className="detailPictureLayout" style={{
					height : this.state.userDetailParts.detailPictureHeight,
					width : this.state.userDetailParts.detailPictureWidth}}>
				<img className="detailPictureImage" style={{
					height : this.state.userDetailParts.detailPictureHeight,
					width : this.state.userDetailParts.detailPictureWidth}}
				alt="" src={this.state.userDetailParts.roundPicture} />
				<div className="userNameLabel" style={{
					height : this.state.userDetailParts.userNameLabelHeight}}>
					{this.state.userDetailParts.userNameAge}
				</div>
			</div>
		);
	}
}

export default UserDetailPicture;   


