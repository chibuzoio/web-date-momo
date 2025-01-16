import React from 'react';
import '../css/input.css';
import '../css/messenger.css';
import RoundPicture from '../component/round_picture';
import {getTimeDifference} from '../utility/utility';
import test_image from '../image/test_image.png';

function NotificationContent(props) {
    var roundPictureParts = {
        roundPictureClass : props.notificationComposite.notificationClasses.roundPictureClass, 
        roundPicture : "http://localhost:1337/image/" + 
            props.notificationComposite.notificationResponse.profilePicture
    };

	const clickNotificationContent = (event) => {
		props.onNotificationClicked(props.notificationComposite.notificationResponse.notificationEffectorId);
	}

	const formatNotifierUserName = () => {
		var gottenUserName = props.notificationComposite.notificationResponse.genericNotification
			.substring((props.notificationComposite.notificationResponse.genericNotification.indexOf("{") + 1), 
			props.notificationComposite.notificationResponse.genericNotification.indexOf("}"));
		var notificationText = props.notificationComposite.notificationResponse.genericNotification
			.substring(props.notificationComposite.notificationResponse.genericNotification.indexOf("}") + 1);
	  
		return (
			<><span className={props.notificationComposite.notificationClasses.notifierUserName}>{gottenUserName}</span>{notificationText}</>
		);
	}
               
    return (
        <div className={props.notificationComposite.notificationClasses.notificationContentLayout} 
            onClick={clickNotificationContent}> 
            <div className={props.notificationComposite.notificationClasses.roundPictureLayout}> 
                <RoundPicture pictureParts={roundPictureParts} />
            </div>
            <div className={props.notificationComposite.notificationClasses.notificationLayout}> 
                <div className={props.notificationComposite.notificationClasses.notificationTitle}>
                    {formatNotifierUserName()}</div> 
                <div className="chatLastMessage">
                    {getTimeDifference(props.notificationComposite.notificationResponse.notificationDate, 
                    true)}</div>
            </div>   
        </div>
    );
}

export default NotificationContent;


