import React from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/messenger.css';
import Header from '../widget/header';
import Footer from '../widget/footer'; 
import EmptyMessenger from '../widget/empty_messenger'; 
import {checkNullInMessenger} from '../utility/utility';
import ActiveMessenger from '../widget/active_messenger';

class Messenger extends React.Component {	
	currentUser = {};
	requestData = {
		memberId : 0
	};
	state = {contextData : {
		messengerResponses : [],
		stateLoaded : false
	}}; 

	constructor(props) {
		super(props);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.clickMessengerComponent = this.clickMessengerComponent.bind(this);
		this.displayMessengerContent = this.displayMessengerContent.bind(this);
	}

	componentDidMount() {
		this.requestData = {
			memberId : this.currentUser.memberId
		}

		axios.post("https://datemomo.com/service/usermessengersdata.php", this.requestData)
	    	.then(response => {
				var localMessengerResponses = checkNullInMessenger(response.data);

				setTimeout(function() {
					this.setState(function(state) { 
						return {contextData : {
			    			messengerResponses : localMessengerResponses,
			    			stateLoaded : true
			    		}
					}});
				}.bind(this), 1000);
	        }, error => {
	        	console.log(error);
	        });
	}
      
	clickMessengerComponent(messengerResponse) {
		localStorage.setItem("messengerResponse", JSON.stringify(messengerResponse));
		window.location.assign("/message");
	}

	displayMessengerContent() {
		if (this.state.contextData.stateLoaded) {
			if (this.state.contextData.messengerResponses.length > 0) {
				var messengerComposite = [];

				for (var i = 0; i < this.state.contextData.messengerResponses.length; i++) {
					var messengerContent = {
						messengerResponse : this.state.contextData.messengerResponses[i],
						messengerClasses : {
							messengerContentLayout : "activeMessengerContent messengerContentTimeline",
							chatMateUserName : "chatMateUserName chatMateUserNameTimeline",
							roundPictureClass : "emptyMessengerPicture messengerPictureTimeline",
							roundPictureLayout : "roundPictureContainer",
							userNameMessageLayout : "userNameMessageLayout userNameMessageLayoutTimeline",
							messagePropertiesLayout : "messagePropertiesLayout",
							unreadMessageCounter : "unreadMessageCounter unreadMessageCounterTimeline basicButton",
							lastMessageDate : "lastMessageDate",
							timeFullText : false
						}
					}
	   
					messengerComposite.push(messengerContent);
				}
	          
				return (
					<>
						<div className="activeMessengerHeader">Chats</div>
						<ActiveMessenger onActiveMessengerClicked={this.clickMessengerComponent} 
							activeMessengerComposite={messengerComposite} />
					</>
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
					{this.displayMessengerContent()}
				</div>
			</div>
		);
	}
}

export default Messenger;   


