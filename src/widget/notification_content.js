import React from 'react';
import '../css/input.css';
import '../css/messenger.css';
import RoundPicture from '../component/round_picture';
import test_image from '../image/test_image.png';

class NotificationContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {
		var roundPictureParts = {
			roundPictureClass : "emptyMessengerPicture",
			roundPicture : test_image
		};
               
		return (
			<div className="notificationOuterLayout">
				<div className="roundPictureContainer">
					<RoundPicture pictureParts={roundPictureParts} />
				</div>
				<div className="notificationComponentLayout">
					<div className="notificationTitle">Solution reacted to your profile picture</div>
					<div className="chatLastMessage">8 days ago</div>
				</div>   
			</div>
		);
	}
}

export default NotificationContent;   


