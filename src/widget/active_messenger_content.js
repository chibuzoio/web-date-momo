import React from 'react';
import '../css/input.css';
import '../css/messenger.css';
import RoundPicture from '../component/round_picture';
import {getTimeDifference} from '../utility/utility';
import test_image from '../image/test_image.png';

class ActiveMessengerContent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var roundPictureParts = {
			roundPictureClass : this.props.messengerComposite.messengerClasses.roundPictureClass,
			roundPicture : "https://datemomo.com/client/image/" + 
				this.props.messengerComposite.messengerResponse.profilePicture
		};
           
		return (
			<div className={this.props.messengerComposite.messengerClasses.messengerContentLayout}>
				<div className={this.props.messengerComposite.messengerClasses.roundPictureLayout}>
					<RoundPicture pictureParts={roundPictureParts} />
				</div>
				<div className={this.props.messengerComposite.messengerClasses.userNameMessageLayout}>
					<div className={this.props.messengerComposite.messengerClasses.chatMateUserName}>
						{this.props.messengerComposite.messengerResponse.userName.charAt(0).toUpperCase() + 
							this.props.messengerComposite.messengerResponse.userName.slice(1)}</div>
					<div className="chatLastMessage">{decodeURIComponent(this.props.messengerComposite
						.messengerResponse.lastMessage).split("+").join(" ").substring(0, 35) + 
						((this.props.messengerComposite.messengerResponse.lastMessage.length > 35) ? "..." : "")}</div>
				</div>
				<div className={this.props.messengerComposite.messengerClasses.messagePropertiesLayout}>				
					<div className={this.props.messengerComposite.messengerClasses.unreadMessageCounter}>
						{this.props.messengerComposite.messengerResponse.unreadMessageCount}</div>
					<div className={this.props.messengerComposite.messengerClasses.lastMessageDate}>
						{getTimeDifference(this.props.messengerComposite.messengerResponse.lastMessageDate, 
						this.props.messengerComposite.messengerClasses.timeFullText)}</div>
				</div>
			</div>
		);
	}
}

export default ActiveMessengerContent;   


