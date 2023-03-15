import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/timeline.css';
import '../css/messenger.css';
import Header from '../widget/header';
import Footer from '../widget/footer'; 
import EmptyMessenger from '../widget/empty_messenger'; 
import {checkNullInMessenger} from '../utility/utility';
import ActiveMessenger from '../widget/active_messenger';

function Messenger() {	
	const navigate = useNavigate();

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const [messengerResponses, setMessengerResponses] = useState([]);

	useEffect(() => {
		loadMessengerComposite();
	}, []);

    const loadMessengerComposite = () => {
		var requestData = {
			memberId : currentUser.memberId
		}

		axios.post("https://datemomo.com/service/usermessengersdata.php", requestData)
	    	.then(response => {
				var localMessengerResponses = checkNullInMessenger(response.data);
				setMessengerResponses(localMessengerResponses);
	        }, error => {
	        	console.log(error);
	        });    	
    }

	const clickMessengerComponent = (messengerResponse) => {
		localStorage.setItem("messengerResponse", JSON.stringify(messengerResponse));
		navigate("/message");
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
			return (<EmptyMessenger />);
		}
	}

	return (
		<div className="scrollView">
			<div className="dateMomoMessengerLayout">
				{displayMessengerContent()}
			</div>
		</div>
	);
}

export default Messenger;   


