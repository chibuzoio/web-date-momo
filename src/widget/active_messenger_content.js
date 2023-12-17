import React, { useState, useEffect, useRef } from 'react';
import '../css/input.css';
import '../css/messenger.css';
import RoundPicture from '../component/round_picture';
import { getTimeDifference, selectChosenSticker } from '../utility/utility';
import test_image from '../image/test_image.png';

function ActiveMessengerContent(props) {
	var decodedMessageComponent = decodeURIComponent(props
		.messengerComposite.messengerResponse.lastMessage).split("+").join(" ");
	var roundPictureParts = {
		roundPictureClass : props.messengerComposite.messengerClasses.roundPictureClass,
		roundPicture : "http://localhost:1337/image/" + 
			props.messengerComposite.messengerResponse.profilePicture
	};

	const clickMessengerContent = (event) => {
		props.onMessengerClicked(props.messengerComposite.messengerResponse);
	}
             
	const decodeLastMessageData = () => {
		if ((decodedMessageComponent.indexOf("<{#") > -1) 
			&& (decodedMessageComponent.indexOf("#}>") > -1)) {
			return (<img className="messengerSticker" alt="" src={selectChosenSticker(decodedMessageComponent)} />);
		} else {
			return (<div className="chatLastMessage">{decodedMessageComponent.substring(0, 35) + 
				((props.messengerComposite.messengerResponse.lastMessage.length > 35) ? "..." : "")}</div>);
		}
	}

	return (
		<div className={props.messengerComposite.messengerClasses.messengerContentLayout} 
			onClick={clickMessengerContent}>
			<div className={props.messengerComposite.messengerClasses.roundPictureLayout}>
				<RoundPicture pictureParts={roundPictureParts} />
			</div>
			<div className={props.messengerComposite.messengerClasses.userNameMessageLayout}>
				<div className={props.messengerComposite.messengerClasses.chatMateUserName}>
					{props.messengerComposite.messengerResponse.userName.charAt(0).toUpperCase() + 
						props.messengerComposite.messengerResponse.userName.slice(1)}</div>
				{decodeLastMessageData()}
			</div>
			<div className={props.messengerComposite.messengerClasses.messagePropertiesLayout}>				
				<div className={props.messengerComposite.messengerClasses.unreadMessageCounter}>
					{props.messengerComposite.messengerResponse.unreadMessageCount}</div>
				<div className={props.messengerComposite.messengerClasses.lastMessageDate}>
					{getTimeDifference(props.messengerComposite.messengerResponse.lastMessageDate, 
					props.messengerComposite.messengerClasses.timeFullText)}</div>
			</div>
		</div>
	);
}

export default ActiveMessengerContent;   


