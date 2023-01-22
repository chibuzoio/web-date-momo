import React from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/messenger.css';
import grey_placeholder from '../image/grey_placeholder.png';

class Notification extends React.Component {
	currentUser = {};
	requestData = {};
	state = {contextData : {
		notificationResponses : [],
		stateLoaded : false
	}}; 

	constructor(props) {
		super(props);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.displayUserImage = this.displayUserImage.bind(this);
	}

	componentDidMount() {
		this.requestData = {
			memberId : this.currentUser.memberId
		}

		axios.post("https://datemomo.com/service/usernotifications.php", this.requestData)
	    	.then(response => {
	    		this.setState({contextData : {
	    			notificationResponses : response.data,
	    			stateLoaded : true
		    	}});

	    		console.log("The response data here from querying all notifications here is " + JSON.stringify(response.data));
	        }, error => {
	        	console.log(error);
	        });
	}

	displayUserImage(userGottenPicture) {
		if (userGottenPicture !== "") {
			return (<img className="emptyMessengerPicture" 
						alt="" src={"https://datemomo.com/client/image/" 
						+ userGottenPicture} />);
		} else {
			return (<img className="emptyMessengerPicture" 
						alt="" src={grey_placeholder} />);
		}
	}
       
	render() {             
		return (
			<div className="dateMomoMessengerLayout">
				<div className="notificationHeader">Notifications</div>
				{
					this.state.contextData.notificationResponses.map((notificationResponse) => (
						<div className="notificationOuterLayout">
							<div className="roundPictureContainer">
								{this.displayUserImage(notificationResponse.profilePicture)}
							</div>
							<div className="notificationComponentLayout">
								<div className="notificationTitle">{notificationResponse.genericNotification}</div>
								<div className="chatLastMessage">{notificationResponse.notificationDate}</div>
							</div>   
						</div>
					))
				}
			</div> 
		);
	}
}

export default Notification;   


