import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/input.css';
import '../css/messenger.css';
import icon_empty_chat from '../image/icon_empty_chat.png';
import grey_placeholder from '../image/grey_placeholder.png';
import icon_waving_hand from '../image/icon_waving_hand.png';
import HorizontalButtonList from '../component/horizontal_button_list';

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
		this.buildSexualCategoryButtons = this.buildSexualCategoryButtons.bind(this);
	}

	componentDidMount() {
		this.requestData = {
			memberId : this.currentUser.memberId
		}

		axios.post("http://datemomo.com/service/alluserdata.php", this.requestData)
	    	.then(response => {
	    		this.setState(function(state) { 
	    			return {contextData : {
		    			emptyMessengerComposite : response.data,
		    			stateLoaded : true
		    		}
		    	}});
	        }, error => {
	        	console.log(error);
	        });
	}

	buildSexualCategoryButtons(homeDisplayUser) {
		var sexualCategoryButtons = [];

        if (homeDisplayUser.bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (homeDisplayUser.gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (homeDisplayUser.lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (homeDisplayUser.straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (homeDisplayUser.sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (homeDisplayUser.sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (homeDisplayUser.toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton emptyMessengerButtons"});
        }

        if (homeDisplayUser.toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton emptyMessengerButtons"});
        }
           
		return sexualCategoryButtons;
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
								<div className="chatMateUserName">{homeDisplayUser.userName.charAt(0).toUpperCase() 
									+ homeDisplayUser.userName.slice(1)}, {homeDisplayUser.age}</div>
								<div className="chatMateLocation">{homeDisplayUser.currentLocation}</div>
								<HorizontalButtonList sexualityButtons={this.buildSexualCategoryButtons(homeDisplayUser)} />
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


