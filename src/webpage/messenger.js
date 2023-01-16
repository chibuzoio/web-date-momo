import React from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/messenger.css';
import Header from '../widget/header';
import Footer from '../widget/footer'; 
import EmptyMessenger from '../widget/empty_messenger'; 

class Messenger extends React.Component {
	currentUser = {};
	requestData = {};
	state = {contextData : {
		messengerResponses : [],
		stateLoaded : false
	}}; 

	constructor(props) {
		super(props);
		this.displayRequiredPage = this.displayRequiredPage.bind(this);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		// var encodedString = encodeURIComponent("That's why development stalls. Moreover, due to personal reasons, I was away for approximately two months. That's why I was inactive for long".split(" ").join("+"));
		// console.log("Value of the encoded string here is " + encodedString);
		// var decodedString = decodeURIComponent(encodedString).split("+").join(" ");
		// console.log("Value of decodedString here is " + decodedString);
	}

	componentDidMount() {
		this.requestData = {
			memberId : this.currentUser.memberId
		}

		axios.post("http://datemomo.com/service/usermessengersdata.php", this.requestData)
	    	.then(response => {
	    		this.setState({contextData : {
		    			messengerResponses : response.data,
		    			stateLoaded : true
		    		}
	    		});

	    		console.log("The response data here from querying all messenger composites is " + JSON.stringify(response.data));
	        }, error => {
	        	console.log(error);
	        });
	}

	displayRequiredPage() {
		if (this.state.contextData.stateLoaded) {
			if (this.state.contextData.messengerResponses.length > 0) {
				return (
					<div className="genericMessengerLayout">
						<div className="activeMessengerHeader">Chats</div>
							{
								this.state.contextData.messengerResponses.map((messengerResponse) => ( 
									<div className="activeMessengerContent">
										<div className="roundPictureContainer">
											<img className="emptyMessengerPicture" 
												alt="" src={"http://datemomo.com/client/image/" 
												+ messengerResponse.profilePicture} />
										</div>
										<div className="userNameMessageLayout">
											<div className="chatMateUserName">{messengerResponse.userName}</div>
											<div className="chatLastMessage">{decodeURIComponent(messengerResponse.lastMessage).split("+").join(" ")}</div>
										</div>
										<div className="messagePropertiesLayout">				
											<div className="unreadMessageCounter basicButton">{messengerResponse.unreadMessageCount}</div>
											<div className="lastMessageDate">{messengerResponse.lastMessageDate}</div>
										</div>
									</div>
								))
							}
						<div className="bottomPadding"><p></p></div>
					</div>
				);
			} else {
				return (<EmptyMessenger />);
			}
		}
	}

	render() {       
		return (
			<div>
				<div className="dateMomoMessengerLayout">
					{this.displayRequiredPage()}
				</div>
			</div>
		);
	}
}

export default Messenger;   


