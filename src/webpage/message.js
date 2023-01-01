import React from 'react';
import '../css/style.css';
import '../css/message.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import test_image from '../image/test_image.png';
import RoundPicture from '../component/round_picture';
import MessageContent from '../widget/message_content';
import icon_menu_blue from '../image/icon_menu_blue.png';
import BasicFormField from '../component/basic_form_field';
import icon_left_arrow_blue from '../image/icon_left_arrow_blue.png';

class Message extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {
		var userMessageEditor = {
			ageFieldClass : "ageFormField",
			placeholder : "Write Message...",
			type : "text"
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
						<BasicFormField formParts={userMessageEditor} />
					</div>
				</div>
				{/* <Footer /> */}
			</div>
		);
	}
}

export default Message;   


