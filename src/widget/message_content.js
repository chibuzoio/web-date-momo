import React from 'react';
import '../css/style.css';
import '../css/input.css';
import '../css/message.css';
import RoundPicture from '../component/round_picture';
import test_image from '../image/test_image.png';

class MessageContent extends React.Component {
	state = {messageData : {}};

	constructor(props) {
		super(props);
		this.state.messageData = props.messageData; 
	}

	render() {
		var roundPictureParts = {
			roundPictureClass : "emptyMessengerPicture",
			roundPicture : test_image
		};
               
		return (
			<div className="chatMessageLayout">
				<div className="baseMessage chatMateMessage">
					{this.state.messageData.message}
				</div>
				<div className="baseMessage hostUserMessage">
					{this.state.messageData.message}
				</div>
			</div>
		);
	}
}

export default MessageContent;   


