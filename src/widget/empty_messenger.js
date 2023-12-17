import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/input.css';
import '../css/messenger.css';
import icon_empty_chat from '../image/icon_empty_chat.png';
import grey_placeholder from '../image/grey_placeholder.png';
import icon_waving_hand from '../image/icon_waving_hand.png';
import EmptyMessengerContent from '../widget/empty_messenger_content';

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
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
	    this.wavingIconClicked = this.wavingIconClicked.bind(this);
		this.messengerLayoutClicked = this.messengerLayoutClicked.bind(this);
	}

	componentDidMount() {
		this.requestData = {
			memberId : this.currentUser.userInformationData.memberId
		}

		axios.post("http://localhost:1337/alluserdata", this.requestData)
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
    
    wavingIconClicked(homeDisplayResponse) {
    	this.props.onClickWavingIcon(homeDisplayResponse);
    }

	messengerLayoutClicked(homeDisplayResponse) {
		this.props.onClickMessengerLayout(homeDisplayResponse);
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
						<EmptyMessengerContent emptyMessengerContent={homeDisplayUser} 
							onClickMessengerLayout={this.messengerLayoutClicked} 
							onClickWavingIcon={this.wavingIconClicked} />
					))
				}

				<div className="bottomPadding"><p></p></div>
			</div>
		);
	}
}

export default EmptyMessenger;   


