import React from 'react';
import '../css/input.css';
import '../css/messenger.css';
import RoundPicture from '../component/round_picture';
import test_image from '../image/test_image.png';

class ActiveMessengerContent extends React.Component {

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
			<div className="activeMessengerContent">
				<div className="roundPictureContainer">
					<RoundPicture pictureParts={roundPictureParts} />
				</div>
				<div className="userNameMessageLayout">
					<div className="chatMateUserName">Solution</div>
					<div className="chatLastMessage">Hello dear! How did it go?</div>
				</div>
				<div className="messagePropertiesLayout">				
					<div className="unreadMessageCounter basicButton">98</div>
					<div className="lastMessageDate">1 week ago</div>
				</div>
			</div>
		);
	}
}

export default ActiveMessengerContent;   


