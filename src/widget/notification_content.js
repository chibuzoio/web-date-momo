import React from 'react';
import '../css/input.css';
import '../css/messenger.css';
import RoundPicture from '../component/round_picture';
import {getTimeDifference} from '../utility/utility';
import test_image from '../image/test_image.png';

class NotificationContent extends React.Component {

	constructor(props) {
		super(props);
		this.formatNotifierUserName = this.formatNotifierUserName.bind(this);
		this.clickNotificationContent = this.clickNotificationContent.bind(this);
	}

	clickNotificationContent(event) {
		this.props.onNotificationClicked(this.props.notificationComposite.notificationResponse.notificationEffectorId);
	}

	formatNotifierUserName() {
		var gottenUserName = this.props.notificationComposite.notificationResponse.genericNotification
			.substring((this.props.notificationComposite.notificationResponse.genericNotification.indexOf("{") + 1), 
			this.props.notificationComposite.notificationResponse.genericNotification.indexOf("}"));
		var notificationText = this.props.notificationComposite.notificationResponse.genericNotification
			.substring(this.props.notificationComposite.notificationResponse.genericNotification.indexOf("}") + 1);
	  
		return (
			<><span className={this.props.notificationComposite.notificationClasses.notifierUserName}>{gottenUserName}</span>{notificationText}</>
		);
	}

	render() {
		var roundPictureParts = {
			roundPictureClass : this.props.notificationComposite.notificationClasses.roundPictureClass, 
			roundPicture : "https://datemomo.com/client/image/" + 
				this.props.notificationComposite.notificationResponse.profilePicture
		};
               
		return (
			<div className={this.props.notificationComposite.notificationClasses.notificationContentLayout} 
				onClick={this.clickNotificationContent}> 
				<div className={this.props.notificationComposite.notificationClasses.roundPictureLayout}> 
					<RoundPicture pictureParts={roundPictureParts} />
				</div>
				<div className={this.props.notificationComposite.notificationClasses.notificationLayout}> 
					<div className={this.props.notificationComposite.notificationClasses.notificationTitle}>
						{this.formatNotifierUserName()}</div> 
					<div className="chatLastMessage">
						{getTimeDifference(this.props.notificationComposite.notificationResponse.notificationDate, 
						true)}</div>
				</div>   
			</div>
		);
	}
}

export default NotificationContent;   


