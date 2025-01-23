import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/timeline.css';
import '../css/messenger.css';
import Header from '../widget/header';
import Footer from '../widget/footer'; 
import color_loader from '../image/color_loader.gif';
import EmptyMessenger from '../widget/empty_messenger'; 
import ActiveMessenger from '../widget/active_messenger';
import { checkNullInMessenger, selectChosenSticker } from '../utility/utility';

function Messenger() {	
	var visibleMessengerLoader = "messengerLoaderLayout";
	var visibleMessengerDisplay = "dateMomoMessengerLayout";
	var hiddenMessengerLoader = visibleMessengerLoader + " hideComponent";
	var hiddenMessengerDisplay = visibleMessengerDisplay + " hideComponent";
	const navigate = useNavigate();

	const userDataComposite = JSON.parse(localStorage.getItem("userDataComposite"));

	const [messengerDisplayClass, setMessengerDisplayClass] = useState(visibleMessengerDisplay);
	const [messengerDisplayLoader, setMessengerDisplayLoader] = useState(hiddenMessengerLoader);
    
	const clickMessengerComponent = (messengerResponse) => {
		loadMessageComposite(messengerResponse);
	}

	const loadMessageComposite = (messengerResponse) => {
		var messageRequest = {
			senderId : userDataComposite.currentUserData.userInformationData.memberId,
			receiverId : messengerResponse.chatmateId,
			fullName : messengerResponse.fullName,
			userName : messengerResponse.userName,
			lastActiveTime : "",
			profilePicture : messengerResponse.profilePicture,
			userBlockedStatus : messengerResponse.userBlockedStatus
		};	

		axios.post("http://localhost:1337/usermessagesdata", messageRequest)
			.then(response => {
				navigate("/message", {
					state : {
						messengerResponse : messengerResponse,
						messageResponses : response.data
					}
				});
			}, error => {
				console.log(error);
			});
	}

	const displayMessengerContent = () => {
		if (userDataComposite.messengerResponses.length > 0) {
			var messengerComposite = [];

			for (var i = 0; i < userDataComposite.messengerResponses.length; i++) {
				var messengerContent = {
					messengerResponse : userDataComposite.messengerResponses[i],
					messengerClasses : {
						messengerContentLayout : "activeMessengerContent messengerContentTimeline",
						chatMateUserName : "chatMateUserName chatMateUserNameTimeline",
						roundPictureClass : "emptyMessengerPicture messengerPictureTimeline",
						roundPictureLayout : "roundPictureContainer",
						userNameMessageLayout : "userNameMessageLayout userNameMessageLayoutTimeline",
						messagePropertiesLayout : "messagePropertiesLayout",
						unreadMessageCounter : "unreadMessageCounter unreadMessageCounterTimeline basicButton",
						lastMessageDate : "lastMessageDate",
						timeFullText : false
					}
				}
   
				messengerComposite.push(messengerContent);
			}
          
			return (
				<>
					<div className="activeMessengerHeader">Chats</div>
					<ActiveMessenger onActiveMessengerClicked={clickMessengerComponent} 
						activeMessengerComposite={messengerComposite} />
				</>
			);
		} else {
			return (<EmptyMessenger onClickMessengerLayout={messengerLayoutClicked} 
				onClickWavingIcon={wavingIconClicked} />);
		}
	}

    const wavingIconClicked = (homeDisplayResponse) => {
    	sendPreparedMessage(homeDisplayResponse);
    }

	const messengerLayoutClicked = (homeDisplayResponse) => {
		var messengerResponseCopy = {
			chatmateId : homeDisplayResponse.userInformationData.memberId,
			userName : homeDisplayResponse.userInformationData.userName,
			fullName : homeDisplayResponse.userInformationData.fullName,
			profilePicture : homeDisplayResponse.userInformationData.profilePicture,
			userBlockedStatus : homeDisplayResponse.userInformationData.userBlockedStatus
		};

/* 		{
			"userPictureComposite":[
				{
					"imageHeight":755,"imageName":"profile170352578600001.png","imageId":1,"imageWidth":433
				},
				{
					"imageHeight":755,"imageName":"profile170388307100001.png","imageId":3,"imageWidth":433
				}
			],
			"userInformationData":{
				"memberId":1,"registrationDate":"1703525763","currentLocation":"","profilePicture":"profile170388307100001.png","deleteAccount":0,"passwordHash":"$2b$10$xaCGiRVnfsuK87cC5ctXreEjnmJ8HuRj006ypQwc8JDpjAjaODMNW","emailAddress":"","phoneNumber":"","impactCount":1,"userStatus":"Hello dear! Welcome to my profile!","userLevel":"displayMatchedUsers","userName":"Solution","fullName":"","sex":"MALE","age":31
			},
			"userExperienceData":{
				"oneNightStandExperience":1,"receivedHeadExperience":1,"missionaryExperience":1,"threesomeExperience":1,"publicSexExperience":1,"givenHeadExperience":1,"cameraSexExperience":1,"sixtyNineExperience":1,"poolSexExperience":1,"analSexExperience":0,"carSexExperience":1,"orgySexExperience":1
			},
			"messengerTableName":"messenger170352576300001",
			"userSexualityData":{
				"sugarDaddyCategory":1,"sugarMommyCategory":1,"straightCategory":1,"bisexualCategory":1,"lesbianCategory":1,"toyGirlCategory":1,"toyBoyCategory":0,"gayCategory":0
			},
			"userInterestData":{
				"relationshipInterest":0,"sugarDaddyInterest":1,"sugarMommyInterest":1,"friendshipInterest":0,"straightInterest":1,"bisexualInterest":1,"lesbianInterest":1,"toyGirlInterest":1,"toyBoyInterest":1,"gayInterest":0
			},
			"memberId":1,
			"liked":false
		} */

		loadMessageComposite(messengerResponseCopy);
	}

	const sendPreparedMessage = (homeDisplayResponse) => {
		var preparedSenderMessage = "<{#anim-wave#}>";
		preparedSenderMessage = encodeURIComponent(preparedSenderMessage.split(" ").join("+"));

		var postMessageRequest = {
			senderId : userDataComposite.currentUserData.userInformationData.memberId,
	        receiverId : homeDisplayResponse.memberId,
	        messagePosition : 0, 
	        senderMessage : preparedSenderMessage		
		};
           
		axios.post("http://localhost:1337/postmessage", postMessageRequest)
	    	.then(response => {
				var messageResponse = {
					messageId : response.data.messageId,
			       	messenger : response.data.messenger,
			       	message : response.data.message,
			       	readStatus : response.data.readStatus,
			       	seenStatus : response.data.seenStatus,
			       	deleteMessage : response.data.deleteMessage,
			       	messageDate : response.data.messageDate
				};

				var messengerResponseCopy = {
					chatmateId : homeDisplayResponse.memberId,
					userName : homeDisplayResponse.userName,
					fullName : homeDisplayResponse.fullName,
					profilePicture : homeDisplayResponse.profilePicture,
					userBlockedStatus : homeDisplayResponse.userBlockedStatus
				};
				
				loadMessageComposite(messengerResponseCopy);
	        }, error => {
	        	console.log(error);
	        });					
	}

	return (
		<div className="scrollView whiteBackground">
			<div className={messengerDisplayClass}>
				{displayMessengerContent()}
			</div>
			<div className={messengerDisplayLoader}>
				<img className="colorLoader" alt="" src={color_loader} />
			</div>
		</div>
	);
}

export default Messenger;   


