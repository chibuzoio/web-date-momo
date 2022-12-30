import React from 'react';
import '../css/messenger.css';
import HorizontalButtonList from '../component/horizontal_button_list';
import icon_waving_hand from '../image/icon_waving_hand.png';
import RoundPicture from '../component/round_picture';
import test_image from '../image/test_image.png';

class EmptyMessengerContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {
		var roundPictureParts = {
			roundPictureClass : "emptyMessengerPicture",
			roundPicture : test_image
		};

		var sexualCategoryButtons = [
			{buttonTitle : "Bisexual", buttonClass : "basicButton emptyMessengerButtons"},
			{buttonTitle : "Gay", buttonClass : "basicButton emptyMessengerButtons"},
			{buttonTitle : "Lesbian", buttonClass : "basicButton emptyMessengerButtons"},
			{buttonTitle : "Straight", buttonClass : "basicButton emptyMessengerButtons"},
			{buttonTitle : "Sugar Daddy", buttonClass : "basicButton emptyMessengerButtons"},
			{buttonTitle : "Sugar Mommy", buttonClass : "basicButton emptyMessengerButtons"},
			{buttonTitle : "Toy Boy", buttonClass : "basicButton emptyMessengerButtons"},
			{buttonTitle : "Toy Girl", buttonClass : "basicButton emptyMessengerButtons"}
		];
             
		return (
			<div className="emptyMessengerContent">
				<div className="RoundPictureContainer">
					<RoundPicture pictureParts={roundPictureParts} />
				</div>
				<div className="userAccountData">
					<div className="chatMateUserName">Solution, 33</div>
					<div className="chatMateLocation">Minarelikoy</div>
					<HorizontalButtonList sexualityButtons={sexualCategoryButtons} />
				</div>
				<div className="wavingIconContainer">				
					<img className="messengerWavingIcon" alt="" src={icon_waving_hand} />
				</div>
			</div>
		);
	}
}

export default EmptyMessengerContent;   


