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
			roundPictureClass : "roundPictureClass",
			roundPicture : test_image
		};

		var sexualCategoryButtons = [
			{buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"}
		];
             
		return (
			<div className="emptyMessengerContent">
				<RoundPicture pictureParts={roundPictureParts} />
				<div className="userAccountData">
					<div className="chatMateUserName">Solution, 33</div>
					<div className="chatMateLocation">Minarelikoy</div>
					<HorizontalButtonList sexualityButtons={sexualCategoryButtons} />
				</div>
				<img className="messengerWavingIcon" alt="" src={icon_waving_hand} />
			</div>
		);
	}
}

export default EmptyMessengerContent;   


