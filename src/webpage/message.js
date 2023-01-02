import React from 'react';
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

	constructor(props) {
		super(props);
		this.state = {}; 
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
						<MessageContent />
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


