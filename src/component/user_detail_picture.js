import React from 'react';
import '../css/style.css';
import '../css/profile.css';

class UserDetailPicture extends React.Component {
	state = {userDetailParts : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				userDetailParts : props.userDetailParts
			}
		});
	}

	render() {   
		return (
			<div className="detailPictureLayout" style={{
				height : this.props.dimension.detailPictureHeight,
				width : this.props.dimension.detailPictureWidth}}>
				<div className={this.props.userDetailParts.innerPictureClass}>
					<img className="detailPictureImage" style={{
						height : this.props.dimension.detailPictureHeight,
						width : this.props.dimension.detailPictureWidth}}
						alt="" src={"http://localhost:1337/image/" 
						+ this.props.userDetailParts.userDetails.profilePicture} />
					<div className="userNameLabel" style={{
						marginTop : this.props.dimension.topUserNameMargin,
						height : this.props.dimension.userNameLabelHeight}}>
						{this.props.userDetailParts.userDetails.pictureUserName.charAt(0).toUpperCase() 
						+ this.props.userDetailParts.userDetails.pictureUserName.slice(1)},&nbsp;
						{this.props.userDetailParts.userDetails.pictureAge}
					</div>
				</div>
			</div>
		);
	}
}

export default UserDetailPicture;   


