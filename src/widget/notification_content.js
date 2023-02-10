import React from 'react';
import '../css/input.css';
import '../css/messenger.css';
import RoundPicture from '../component/round_picture';
import {getTimeDifference} from '../utility/utility';
import test_image from '../image/test_image.png';

class NotificationContent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var roundPictureParts = {
			roundPictureClass : this.props.notificationComposite.notificationClasses.roundPictureClass, 
			roundPicture : "https://datemomo.com/client/image/" + 
				this.props.notificationComposite.notificationResponse.profilePicture
		};
               
		return (
			<div className={this.props.notificationComposite.notificationClasses.notificationContentLayout}> 
				<div className={this.props.notificationComposite.notificationClasses.roundPictureLayout}> 
					<RoundPicture pictureParts={roundPictureParts} />
				</div>
				<div className={this.props.notificationComposite.notificationClasses.notificationLayout}> 
					<div className={this.props.notificationComposite.notificationClasses.notificationTitle}>
						{this.props.notificationComposite.notificationResponse.genericNotification}</div> 
					<div className="chatLastMessage">{getTimeDifference(this.props.notificationComposite.notificationResponse.notificationDate, true)}</div>
				</div>   
			</div>
		);
	}
}

export default NotificationContent;   


