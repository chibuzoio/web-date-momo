import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/timeline.css';
import '../css/messenger.css';
import grey_placeholder from '../image/grey_placeholder.png';
import NotificationIterator from '../widget/notification_iterator';

function Notification() {	
	const navigate = useNavigate();
	
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
	const [notificationResponses, setNotificationResponses] = useState([]);

	useEffect(() => {
		loadNotificationComposite();
	}, []);	

	const loadNotificationComposite = () => {
		var requestData = {
			memberId : currentUser.memberId
		}

		axios.post("https://datemomo.com/service/usernotifications.php", requestData)
	    	.then(response => {
	    		setNotificationResponses(response.data);
	        }, error => {
	        	console.log(error);
	        });		
	}

	const clickNotificationComponent = (notificationEffectorId) => {
		navigate("/profile/" + notificationEffectorId);
	}

	const displayNotificationContent = () => {
		if (notificationResponses.length > 0) {
			var notificationComposite = [];
			
			for (var i = 0; i < notificationResponses.length; i++) {
				var notificationContent = {
					notificationResponse : notificationResponses[i],
					notificationClasses : {
						notificationContentLayout : "activeMessengerContent notificationContentTimeline",
						notificationTitle : "notificationTitleTimeline",
						roundPictureClass : "emptyMessengerPicture messengerPictureTimeline",
						roundPictureLayout : "roundPictureContainer",
						notificationLayout : "notificationComponentLayout notificationTimeline",
						notifierUserName : "notifierUserName"
					}
				}

				notificationComposite.push(notificationContent);
			}
   
			return (
				<NotificationIterator notificationComposite={notificationComposite} 
					onNotificationIteratorClicked={clickNotificationComponent} />
			);
		} else {
			// return (
			// empty notification message 
			// );
		}
	}
       
	return (
		<div className="scrollView">
			<div className="dateMomoMessengerLayout">
				<div className="notificationHeader">Notifications</div>
				<div className="notificationFlexLayout">
					{displayNotificationContent()}
				</div>
			</div> 
		</div>
	);
}

export default Notification;   


