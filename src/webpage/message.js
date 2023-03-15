import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import '../css/style.css';
import '../css/message.css';   
import '../css/timeline.css';
import test_image from '../image/test_image.png';
import RoundPicture from '../component/round_picture';
import MessageContent from '../widget/message_content';
import BasicTextarea from '../component/basic_textarea';
import icon_menu_blue from '../image/icon_menu_blue.png';
import icon_message_send from '../image/icon_message_send.png';
import icon_left_arrow_blue from '../image/icon_left_arrow_blue.png';

function Message() {
	var userMessageEditor = {
		basicTextarea : "dateMomoMessageEditor",
		placeholder : "Write Message..."
	}

	const location = useLocation();
	const navigate = useNavigate();

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const [userMessageComposite, setUserMessageComposite] = useState({
		messageResponses : [],
		messengerResponse : {}
	});

	const [roundPictureParts, setRoundPictureParts] = useState({
		roundPictureContainer : "roundPictureContainer",
		roundPictureClass : "messageHeaderPicture",
		roundPicture : ""
	});

	useEffect(() => {
		loadMessageComposite();
	}, []);

	const loadMessageComposite = () => {
		var messengerResponse = location.state.messengerResponse;
		var messageRequest = {
			senderId : currentUser.memberId,
			receiverId : messengerResponse.chatmateId,
			fullName : messengerResponse.fullName,
			userName : messengerResponse.userName,
			lastActiveTime : "",
			profilePicture : messengerResponse.profilePicture,
			userBlockedStatus : messengerResponse.userBlockedStatus
		};	

		axios.post("https://datemomo.com/service/usermessagesdata.php", messageRequest)
	    	.then(response => {
	    		setUserMessageComposite({
	    			messageResponses : response.data,
					messengerResponse : messengerResponse
	    		});

				setRoundPictureParts({
					roundPictureClass : roundPictureParts.roundPictureClass,
					roundPicture : "https://datemomo.com/client/image/" 
						+ messengerResponse.profilePicture
				});
	        }, error => {
	        	console.log(error);
	        });		
	}

	return (
		<div className="scrollView">
			<div className="dateMomoMessageLayout">
				<div className="dateMomoMessageHeader">
					<div className="backNavigationLayout">
						<img className="backNavigationIcon" alt="" src={icon_left_arrow_blue} />
					</div>
					<div className="headerPictureLayout">
						<RoundPicture pictureParts={roundPictureParts} />
					</div>
					<div className="chatMateUserNameLayout">
						<div className="chatMateUserName">{userMessageComposite.messengerResponse.userName}</div>
						<div className="lastActiveTime">online</div>
					</div>
					<div className="messageMenuLayout">
						<img className="messageMenuIcon" alt="" src={icon_menu_blue} />
					</div>
				</div>
				<div className="dateMomoMessageBody">
					{
						userMessageComposite.messageResponses.map((messageResponse) => ( 
							<MessageContent messageData={messageResponse} 
								messengerData={userMessageComposite.messengerResponse} />
						))
					}
				</div>
				<div className="dateMomoMessageFooter">
					<div className="messageInputField">
						<BasicTextarea formParts={userMessageEditor} />
					</div>
					<div className="messageSenderLayout">
						<img className="messageSenderIcon" alt="" src={icon_message_send} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Message;   


