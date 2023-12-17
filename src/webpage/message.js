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
import { selectChosenSticker } from '../utility/utility';
import icon_menu_blue from '../image/icon_menu_blue.png';
import icon_message_send from '../image/icon_message_send.png';
import icon_left_arrow_blue from '../image/icon_left_arrow_blue.png';

function Message() {
	var placeholderText = "Write Message...";	
	var messageResponse = {
		messageId : 0,
       	messenger : 0,
       	message : "",
       	readStatus : 0,
       	seenStatus : 0,
       	deleteMessage : 0,
       	messageDate : ""
	};

	const location = useLocation();
	const navigate = useNavigate();
	const messageBottomMargin = useRef();

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	
	var postMessageRequest = {
		senderId : currentUser.userInformationData.memberId,
        receiverId : 0,
        messagePosition : 0, 
        senderMessage : ""		
	};
	
	const [messageInputValue, setMessageInputValue] = useState("");

	const [userMessageEditor, setUserMessageEditor] = useState({
		basicTextarea : "dateMomoMessageEditor",
		placeholder : placeholderText,
		setPlaceholder : true
	});

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
			senderId : currentUser.userInformationData.memberId,
			receiverId : messengerResponse.chatmateId,
			fullName : messengerResponse.fullName,
			userName : messengerResponse.userName,
			lastActiveTime : "",
			profilePicture : messengerResponse.profilePicture,
			userBlockedStatus : messengerResponse.userBlockedStatus
		};	

		axios.post("http://localhost:1337/usermessagesdata", messageRequest)
	    	.then(response => {
	    		setUserMessageComposite({
	    			messageResponses : response.data,
					messengerResponse : messengerResponse
	    		});

				setRoundPictureParts({
					roundPictureClass : roundPictureParts.roundPictureClass,
					roundPicture : "http://localhost:1337/image/" 
						+ messengerResponse.profilePicture
				});

				setTimeout(() => {
					if (messageBottomMargin.current != null) {
						messageBottomMargin.current.scrollIntoView({ behavior: "smooth" });
					}
				}, 300);
	        }, error => {
	        	console.log(error);
	        });		
	}

	const sendPreparedMessage = (event) => {
		var preparedSenderMessage = messageInputValue.trim();

		if (preparedSenderMessage !== "") {
			preparedSenderMessage = encodeURIComponent(preparedSenderMessage.split(" ").join("+"));
	
			postMessageRequest = {
				senderId : currentUser.userInformationData.memberId,
		        receiverId : location.state.messengerResponse.chatmateId,
		        messagePosition : userMessageComposite.messageResponses.length, 
		        senderMessage : preparedSenderMessage		
			};
               
			axios.post("http://localhost:1337/postmessage", postMessageRequest)
		    	.then(response => {
					messageResponse = {
						messageId : response.data.messageId,
				       	messenger : response.data.messenger,
				       	message : response.data.message,
				       	readStatus : response.data.readStatus,
				       	seenStatus : response.data.seenStatus,
				       	deleteMessage : response.data.deleteMessage,
				       	messageDate : response.data.messageDate
					}

					var userMessageCompositeCopy = userMessageComposite.messageResponses;
					userMessageCompositeCopy.push(messageResponse);

					setUserMessageComposite({
						messageResponses : userMessageCompositeCopy,
						messengerResponse : userMessageComposite.messengerResponse
					});

					setUserMessageEditor({
						basicTextarea : userMessageEditor.basicTextarea,
						placeholder : userMessageEditor.placeholder,
						setPlaceholder : true
					});

					setMessageInputValue("");

					setTimeout(() => {
						if (messageBottomMargin.current != null) {
							messageBottomMargin.current.scrollIntoView({ behavior: "smooth" });
						}
					});
		        }, error => {
		        	console.log(error);
		        });					
		}
	}

	const updateMessageEditor = (showPlaceholder) => {
		if (showPlaceholder) {
			setUserMessageEditor({
				basicTextarea : userMessageEditor.basicTextarea,
				placeholder : userMessageEditor.placeholder,
				setPlaceholder : true
			});
		} else {
			setUserMessageEditor({
				basicTextarea : userMessageEditor.basicTextarea,
				placeholder : userMessageEditor.placeholder,
				setPlaceholder : false
			});
		}
	}

	const updateTextareaState = (textChangeValue) => {
		setMessageInputValue(textChangeValue);
	}

	const processPressedKey = (keyPressValue) => {
		switch (keyPressValue) {
			case "Enter": 
				sendPreparedMessage();
				break;
		}
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
					<div ref={messageBottomMargin} />
				</div>
				<div className="dateMomoMessageFooter">
					<div className="messageInputField">
						<BasicTextarea formParts={userMessageEditor} onTextValueChange={updateTextareaState} 
							displayPlaceholder={updateMessageEditor} onKeyRelease={processPressedKey} />
					</div>
					<div className="messageSenderLayout" onClick={sendPreparedMessage}>
						<img className="messageSenderIcon" alt="" src={icon_message_send} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Message;   


