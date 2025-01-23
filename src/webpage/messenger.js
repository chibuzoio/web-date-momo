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

	const [messengerResponses, setMessengerResponses] = useState(userDataComposite.messengerResponses);
	const [messengerDisplayClass, setMessengerDisplayClass] = useState(visibleMessengerDisplay);
	const [messengerDisplayLoader, setMessengerDisplayLoader] = useState(hiddenMessengerLoader);
    
	const clickMessengerComponent = (messengerResponse) => {
		navigate("/message", {
			state : {
				messengerResponse : messengerResponse
			}
		});
	}

	const displayMessengerContent = () => {
		if (messengerResponses.length > 0) {
			var messengerComposite = [];

			for (var i = 0; i < messengerResponses.length; i++) {
				var messengerContent = {
					messengerResponse : messengerResponses[i],
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
			chatmateId : homeDisplayResponse.memberId,
			userName : homeDisplayResponse.userName,
			fullName : homeDisplayResponse.fullName,
			profilePicture : homeDisplayResponse.profilePicture,
			userBlockedStatus : homeDisplayResponse.userBlockedStatus
		};

		navigate("/message", {
			state : {
				messengerResponse : messengerResponseCopy
			}
		});
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

				navigate("/message", {
					state : {
						messengerResponse : messengerResponseCopy
					}
				});
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


