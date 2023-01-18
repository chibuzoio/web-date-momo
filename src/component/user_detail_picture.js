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
				userDetailParts : this.props.userDetailParts
			}
		});
	}

	render() {   
		return (
			<div className="detailPictureLayout" style={{
					height : this.props.userDetailParts.detailPictureHeight,
					width : this.props.userDetailParts.detailPictureWidth}}>
				<img className="detailPictureImage" style={{
					height : this.props.userDetailParts.detailPictureHeight,
					width : this.props.userDetailParts.detailPictureWidth}}
					alt="" src={this.props.userDetailParts.roundPicture} />
				<div className="userNameLabel" style={{
					height : this.props.userDetailParts.userNameLabelHeight}}>
					{this.props.userDetailParts.userNameAge}
				</div>
			</div>
		);
	}
}

export default UserDetailPicture;   


