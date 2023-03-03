import React from 'react';
import '../css/style.css';
import '../css/input.css';
import '../css/message.css';
import RoundPicture from '../component/round_picture';
import test_image from '../image/test_image.png';

class MessageContent extends React.Component {
	visibleChatMateMessage = "baseMessage chatMateMessage";
	visibleHostUserMessage = "baseMessage hostUserMessage";
	hiddenChatMateMessage = this.visibleChatMateMessage + " hideComponent";
	hiddenHostUserMessage = this.visibleHostUserMessage + " hideComponent";
	state = {contextData : {
		chatMateMessageLayout : this.hiddenChatMateMessage,
		hostUserMessageLayout : this.hiddenHostUserMessage
	}};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (this.props.messageData.messenger === this.props.messengerData.chatmateId) {
			this.setState(function(state) {
				return {contextData : {
					chatMateMessageLayout : this.visibleChatMateMessage,
					hostUserMessageLayout : this.hiddenHostUserMessage
				}
			}});
		} else {
			this.setState(function(state) {
				return {contextData : {
					chatMateMessageLayout : this.hiddenChatMateMessage,
					hostUserMessageLayout : this.visibleHostUserMessage
				}
			}});
		}
	}

	render() {
		var roundPictureParts = {
			roundPictureClass : "emptyMessengerPicture",
			roundPicture : test_image
		};
      
		return (
			<div className="chatMessageLayout">
				<div className={this.state.contextData.chatMateMessageLayout}>
					{decodeURIComponent(this.props.messageData.message).split("+").join(" ")}
				</div>
				<div className={this.state.contextData.hostUserMessageLayout}>
					{decodeURIComponent(this.props.messageData.message).split("+").join(" ")}
				</div>
			</div>
		);
	}
}

export default MessageContent;   


