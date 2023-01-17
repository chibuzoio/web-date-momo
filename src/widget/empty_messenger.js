import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/input.css';
import '../css/messenger.css';
import icon_empty_chat from '../image/icon_empty_chat.png';
import grey_placeholder from '../image/grey_placeholder.png';
import icon_waving_hand from '../image/icon_waving_hand.png';

class EmptyMessenger extends React.Component {
	currentUser = {};
	requestData = {};
	state = {contextData : {
		emptyMessengerComposite : {
			homeDisplayResponses : [],
			thousandRandomCounter : []
		},
		stateLoaded : false
	}}; 
   
	constructor(props) {
		super(props);
		this.displayUserImage = this.displayUserImage.bind(this);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.displaySexualityButtons = this.displaySexualityButtons.bind(this);
	}

	componentDidMount() {
		this.requestData = {
			memberId : this.currentUser.memberId
		}

		axios.post("http://datemomo.com/service/alluserdata.php", this.requestData)
	    	.then(response => {
	    		this.setState({contextData : {
	    			emptyMessengerComposite : response.data,
	    			stateLoaded : true
	    		}});

	    		console.log("The response data here from querying all user composites is " + JSON.stringify(response.data));
	        }, error => {
	        	console.log(error);
	        });
	}

	displaySexualityButtons(homeDisplayUser) {
		var builtButtonList = "";

		if (homeDisplayUser.bisexualCategory > 0) {
			builtButtonList += "<button class=\"basicButton emptyMessengerButtons\" type=\"button\">Bisexual</button>";
		}

		if (homeDisplayUser.gayCategory > 0) {
			builtButtonList += "<button class=\"basicButton emptyMessengerButtons\" type=\"button\">Gay</button>";
		}

		if (homeDisplayUser.lesbianCategory > 0) {
			builtButtonList += "<button class=\"basicButton emptyMessengerButtons\" type=\"button\">Lesbian</button>";
		}

		if (homeDisplayUser.straightCategory > 0) {
			builtButtonList += "<button class=\"basicButton emptyMessengerButtons\" type=\"button\">Straight</button>";
		}

		if (homeDisplayUser.sugarDaddyCategory > 0) {
			builtButtonList += "<button class=\"basicButton emptyMessengerButtons\" type=\"button\">Sugar Daddy</button>";
		}

		if (homeDisplayUser.sugarMommyCategory > 0) {
			builtButtonList += "<button class=\"basicButton emptyMessengerButtons\" type=\"button\">Sugar Mommy</button>";
		}

		if (homeDisplayUser.toyBoyCategory > 0) {
			builtButtonList += "<button class=\"basicButton emptyMessengerButtons\" type=\"button\">Toy Boy</button>";
		}

		if (homeDisplayUser.toyGirlCategory > 0) {
			builtButtonList += "<button class=\"basicButton emptyMessengerButtons\" type=\"button\">Toy Girl</button>";
		}

		return builtButtonList;
	} 
           
	displayUserImage(userGottenPicture) {
		if (typeof userGottenPicture != "undefined") {
			return (<img className="emptyMessengerPicture" 
						alt="" src={"http://datemomo.com/client/image/" 
						+ userGottenPicture.imageName} />);
		} else {
			return (<img className="emptyMessengerPicture" 
						alt="" src={grey_placeholder} />);
		}
	}

	render() {  	 
		return (
			<div className="genericMessengerLayout">
				<div className="emptyMessengerDescription">
					<img className="emptyMessengerDescriptionIcon" src={icon_empty_chat} />
					<div className="emptyMessengerDescriptionText"> 
						Your messenger list is empty! You might want to begin 
						meeting people by waving at them!
					</div> 				
				</div>

				{
					this.state.contextData.emptyMessengerComposite.homeDisplayResponses.map((homeDisplayUser) => ( 
						<div className="emptyMessengerContent">
							<div className="roundPictureContainer">
								{this.displayUserImage(homeDisplayUser.userPictureResponses[0])}
							</div>
							<div className="userAccountData">
								<div className="chatMateUserName">{homeDisplayUser.userName}, {homeDisplayUser.age}</div>
								<div className="chatMateLocation">{homeDisplayUser.currentLocation}</div>
								<div className="sexualityButtonList" dangerouslySetInnerHTML={{__html : this.displaySexualityButtons(homeDisplayUser)}} ></div>
							</div>
							<div className="wavingIconContainer">				
								<img className="messengerWavingIcon" alt="" src={icon_waving_hand} />
							</div>
						</div>
					))
				}

				<div className="bottomPadding"><p></p></div>
			</div>
		);
	}
}

export default EmptyMessenger;   


