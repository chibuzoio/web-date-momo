import React from 'react';
import '../css/messenger.css';
import ActiveMessengerContent from '../widget/active_messenger_content';
import RoundPicture from '../component/round_picture';
import test_image from '../image/test_image.png';

class ActiveMessenger extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {
		var roundPictureParts = {
			roundPictureClass : "roundPictureClass",
			roundPicture : test_image
		};

		return (
			<div className="genericMessengerLayout">
				<div className="activeMessengerHeader">Chats</div>
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<div className="bottomPadding"><p></p></div>
			</div>
		);
	}
}

export default ActiveMessenger;   


