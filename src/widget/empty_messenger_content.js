import React, { useState, useEffect, useRef } from 'react';
import '../css/messenger.css';
import HorizontalButtonList from '../component/horizontal_button_list';
import grey_placeholder from '../image/grey_placeholder.png';
import icon_waving_hand from '../image/icon_waving_hand.png';
import RoundPicture from '../component/round_picture';

function EmptyMessengerContent(props) {

	const displayUserImage = (userGottenPicture) => {
		if (typeof userGottenPicture != "undefined") {
			return (<img className="emptyMessengerPicture" 
						alt="" src={"https://datemomo.com/client/image/" 
						+ userGottenPicture.imageName} />);
		} else {
			return (<img className="emptyMessengerPicture" 
						alt="" src={grey_placeholder} />);
		}
	}

	const buildSexualCategoryButtons = (emptyMessengerContent) => {
		var sexualCategoryButtons = [];

        if (emptyMessengerContent.bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton emptyMessengerButtons"});
        }
           
		return sexualCategoryButtons;
	} 

	return (
		<div className="emptyMessengerContent">
			<div className="roundPictureContainer">
				{displayUserImage(props.emptyMessengerContent.userPictureResponses[0])}
			</div>
			<div className="userAccountData">
				<div className="chatMateUserName">{props.emptyMessengerContent.userName.charAt(0).toUpperCase() 
					+ props.emptyMessengerContent.userName.slice(1)}, {props.emptyMessengerContent.age}</div>
				<div className="chatMateLocation">{props.emptyMessengerContent.currentLocation}</div>
				<HorizontalButtonList sexualityButtons={buildSexualCategoryButtons(props.emptyMessengerContent)} />
			</div>
			<div className="wavingIconContainer">				
				<img className="messengerWavingIcon" alt="" src={icon_waving_hand} />
			</div>
		</div>
	);
}

export default EmptyMessengerContent;   


