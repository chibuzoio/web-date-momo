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
						alt="" src={"http://localhost:1337/image/" 
						+ userGottenPicture.imageName} />);
		} else {
			return (<img className="emptyMessengerPicture" 
						alt="" src={grey_placeholder} />);
		}
	}

	const buildSexualCategoryButtons = (emptyMessengerContent) => {
		var sexualCategoryButtons = [];

        if (emptyMessengerContent.userSexualityData.bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.userSexualityData.gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.userSexualityData.lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.userSexualityData.straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.userSexualityData.sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.userSexualityData.sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.userSexualityData.toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (emptyMessengerContent.userSexualityData.toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton emptyMessengerButtons"});
        }
           
		return sexualCategoryButtons;
	} 

	const clickWavingIcon = (event) => {
		props.onClickWavingIcon(props.emptyMessengerContent);
	}

	const clickEmptyMessengerLayout = (event) => {
		props.onClickMessengerLayout(props.emptyMessengerContent);
	}
  
	return (
		<div className="emptyMessengerContent">
			<div className="roundPictureContainer" onClick={clickEmptyMessengerLayout}>
				{displayUserImage(props.emptyMessengerContent.userPictureComposite[0])}
			</div>
			<div className="userAccountData" onClick={clickEmptyMessengerLayout}>
				<div className="chatMateUserName">{props.emptyMessengerContent.userInformationData.userName.charAt(0).toUpperCase() 
					+ props.emptyMessengerContent.userInformationData.userName.slice(1)}, {props.emptyMessengerContent.userInformationData.age}</div>
				<div className="chatMateLocation">{props.emptyMessengerContent.currentLocation}</div>
				<HorizontalButtonList sexualityButtons={buildSexualCategoryButtons(props.emptyMessengerContent)} />
			</div>
			<div className="wavingIconContainer" onClick={clickWavingIcon}>				
				<img className="messengerWavingIcon" alt="" src={icon_waving_hand} />
			</div>
		</div>
	);
}

export default EmptyMessengerContent;   


