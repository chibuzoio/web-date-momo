import React from 'react';
import '../css/messenger.css';
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
			<div className="activeMessengerLayout">

			</div>
		);
	}
}

export default ActiveMessenger;   


