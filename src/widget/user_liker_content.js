import React from 'react';
import '../css/input.css';
import '../css/messenger.css';
import RoundPicture from '../component/round_picture';
import test_image from '../image/test_image.png';

class UserLikerContent extends React.Component {
	state = {userLikerData : {}};

	constructor(props) {
		super(props);
		this.state.userLikerData = props.userLikerData; 
	}

	render() {           
		return (
			<div className="notificationOuterLayout">
				<div className="roundPictureContainer">
					<RoundPicture pictureParts={this.state.userLikerData.roundPictureParts} />
				</div>
				<div className="notificationComponentLayout">
					<div className="notificationTitle">{this.state.userLikerData.userLikerNameAge}</div>
					<div className="chatLastMessage">{this.state.userLikerData.userLikerLocation}</div>
				</div>   
			</div>
		);
	}
}

export default UserLikerContent;   


