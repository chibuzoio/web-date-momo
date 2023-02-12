import React from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/messenger.css';
import grey_placeholder from '../image/grey_placeholder.png';
import NotificationIterator from '../widget/notification_iterator';

class Notification extends React.Component {
	currentUser = {};
	requestData = {};
	state = {contextData : {
		notificationResponses : [],
		stateLoaded : false
	}}; 

	constructor(props) {
		super(props);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.displayNotificationContent = this.displayNotificationContent.bind(this);
	}

	componentDidMount() {
		this.requestData = {
			memberId : this.currentUser.memberId
		}

		axios.post("https://datemomo.com/service/usernotifications.php", this.requestData)
	    	.then(response => {
	    		this.setState({contextData : {
	    			notificationResponses : response.data,
	    			stateLoaded : true
		    	}});
	        }, error => {
	        	console.log(error);
	        });
	}

	displayNotificationContent() {
		if (this.state.contextData.stateLoaded) {
			if (this.state.contextData.notificationResponses.length > 0) {
				var notificationComposite = [];
				
				for (var i = 0; i < this.state.contextData.notificationResponses.length; i++) {
					var notificationContent = {
						notificationResponse : this.state.contextData.notificationResponses[i],
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
					<NotificationIterator notificationComposite={notificationComposite} />
				);
			} else {
				// return (
				// empty notification message 
				// );
			}
		}
	}
       
	render() {             
		return (
			<div className="dateMomoMessengerLayout">
				<div className="notificationHeader">Notifications</div>
				<div className="notificationFlexLayout">
					{this.displayNotificationContent()}
				</div>
			</div> 
		);
	}
}

export default Notification;   


