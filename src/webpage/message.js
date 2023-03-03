import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/message.css';   
import test_image from '../image/test_image.png';
import RoundPicture from '../component/round_picture';
import MessageContent from '../widget/message_content';
import BasicTextarea from '../component/basic_textarea';
import icon_menu_blue from '../image/icon_menu_blue.png';
import icon_message_send from '../image/icon_message_send.png';
import icon_left_arrow_blue from '../image/icon_left_arrow_blue.png';

class Message extends React.Component {
	currentUser = {};
	messengerResponse = {};
	state = {contextData : { 
		messageResponses : [],
		messengerResponse : this.messengerResponse
	}};

	constructor(props) {
		super(props);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.messengerResponse = JSON.parse(localStorage.getItem("messengerResponse"));
	}

	componentDidMount() {
		var messageRequest = {
			senderId : this.currentUser.memberId,
			receiverId : this.messengerResponse.chatmateId,
			fullName : this.messengerResponse.fullName,
			userName : this.messengerResponse.userName,
			lastActiveTime : "",
			profilePicture : this.messengerResponse.profilePicture,
			userBlockedStatus : this.messengerResponse.userBlockedStatus
		};	

		axios.post("https://datemomo.com/service/usermessagesdata.php", messageRequest)
	    	.then(response => {
	    		this.setState(function(state) {
	    			return {contextData : {
	    				messageResponses : response.data,
	    				messengerResponse : this.messengerResponse
	    			}
	    		}});
	        }, error => {
	        	console.log(error);
	        });
	}

	render() {
		var userMessageEditor = {
			basicTextarea : "dateMomoMessageEditor",
			placeholder : "Write Message..."
		}

		var roundPictureParts = {
			roundPictureClass : "messageHeaderPicture",
			roundPicture : test_image
		};

		return (
			<div className="dateMomoOuterLayout">
				{/* <Header /> */}
				<div className="dateMomoMessageLayout">
					<div className="dateMomoMessageHeader">
						<div className="backNavigationLayout">
							<img className="backNavigationIcon" alt="" src={icon_left_arrow_blue} />
						</div>
						<div className="headerPictureLayout">
							<RoundPicture pictureParts={roundPictureParts} />
						</div>
						<div className="chatMateUserNameLayout">
							<div className="chatMateUserName">Solution</div>
							<div className="lastActiveTime">online</div>
						</div>
						<div className="messageMenuLayout">
							<img className="messageMenuIcon" alt="" src={icon_menu_blue} />
						</div>
					</div>
					<div className="dateMomoMessageBody">
						{
							this.state.contextData.messageResponses.map((messageResponse) => ( 
								<MessageContent messageData={messageResponse} 
									messengerData={this.state.contextData.messengerResponse} />
							))
						}
					</div>
					<div className="dateMomoMessageFooter">
						<div className="messageInputField">
							<BasicTextarea formParts={userMessageEditor} />
						</div>
						<div className="messageSenderLayout">
							<img className="messageSenderIcon" alt="" src={icon_message_send} />
						</div>
					</div>
				</div>
				{/* <Footer /> */}
			</div>
		);
	}
}

export default Message;   


