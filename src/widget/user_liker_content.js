import React from 'react';
import '../css/input.css';
import '../css/messenger.css';
import RoundPicture from '../component/round_picture';
import test_image from '../image/test_image.png';

class UserLikerContent extends React.Component {
	state = {userLikerData : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				userLikerData : props.userLikerData
			}
		});
	}

	render() {           
		return (
			<div className="notificationOuterLayout">
				<div className="roundPictureContainer">
					<RoundPicture pictureParts={this.props.userLikerData.roundPictureParts} />
				</div>
				<div className="notificationComponentLayout">
					<div className="notificationTitle">{this.props.userLikerData.userLikerNameAge}</div>
					<div className="chatLastMessage">{this.props.userLikerData.userLikerLocation}</div>
				</div>   
			</div>
		);
	}
}

export default UserLikerContent;   


