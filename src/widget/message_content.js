import React, { useState, useEffect, useRef } from 'react';
import '../css/style.css';
import '../css/input.css';
import '../css/message.css';
import RoundPicture from '../component/round_picture';
import { selectChosenSticker } from '../utility/utility';

function MessageContent(props) {
	var visibleChatMateMessage = "baseMessage chatMateMessage";
	var visibleHostUserMessage = "baseMessage hostUserMessage";
	var hiddenChatMateMessage = visibleChatMateMessage + " hideComponent";
	var hiddenHostUserMessage = visibleHostUserMessage + " hideComponent";
	var visibleChatMateIcon = visibleChatMateMessage + " iconMessageLayout";
	var visibleHostUserIcon = visibleHostUserMessage + " iconMessageLayout"; 

	const [decodedMessageComponent, setDecodedMessageComponent] = useState("");
	const [chatMateMessageLayout, setChatMateMessageLayout] = useState(hiddenChatMateMessage);
	const [hostUserMessageLayout, setHostUserMessageLayout] = useState(hiddenHostUserMessage);

	useEffect(() => {
		var gottenMessage = 
			decodeURIComponent(props.messageData.message).split("+").join(" ");

		setDecodedMessageComponent(gottenMessage);

		if ((gottenMessage.indexOf("<{#") > -1) && (gottenMessage.indexOf("#}>") > -1)) {
			if (props.messageData.messenger === props.messengerData.chatmateId) {
				setChatMateMessageLayout(visibleChatMateIcon);
				setHostUserMessageLayout(hiddenHostUserMessage);
			} else {
				setChatMateMessageLayout(hiddenChatMateMessage);
				setHostUserMessageLayout(visibleHostUserIcon);
			}
		} else {
			if (props.messageData.messenger === props.messengerData.chatmateId) {
				setChatMateMessageLayout(visibleChatMateMessage);
				setHostUserMessageLayout(hiddenHostUserMessage);
			} else {
				setChatMateMessageLayout(hiddenChatMateMessage);
				setHostUserMessageLayout(visibleHostUserMessage);
			}
		}
	}, []);
  
	const decodeMessageData = () => {
		if ((decodedMessageComponent.indexOf("<{#") > -1) 
			&& (decodedMessageComponent.indexOf("#}>") > -1)) {
			return (<img className="messageSticker" alt="" src={selectChosenSticker(decodedMessageComponent)} />);
		} else {
			return decodedMessageComponent;
		}
	}

	return (
		<div className="chatMessageLayout">
			<div className={chatMateMessageLayout}>
				{decodeMessageData()}
			</div>
			<div className={hostUserMessageLayout}>
				{decodeMessageData()}
			</div>
		</div>
	);
}

export default MessageContent;   


