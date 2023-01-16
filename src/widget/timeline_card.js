import React from 'react';
import axios from 'axios';
import '../css/header.css';
import '../css/timeline.css';
import placeholder from '../image/placeholder.jpg';
import icon_menu_black from '../image/icon_menu_black.png';
import RoundPicture from '../component/round_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_heart_hollow from '../image/icon_heart_hollow.png';
import icon_heart_red from '../image/icon_heart_red.png';
import icon_search from '../image/icon_search.png';
import test_image from '../image/test_image.png';
import logo from '../image/datemomo.png';

class TimelineCard extends React.Component {
	currentUser = {};
	requestData = {};
	state = {contextData : {
		userComposite : {
			homeDisplayResponses : [],
			thousandRandomCounter : []
		},
		stateLoaded : false
	}}; 

	constructor(props) {
		super(props);
		// localStorage.setItem("currentUser", "{}");
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.changeLikedIcon = this.changeLikedIcon.bind(this);
	}

	componentDidMount() {
		this.requestData = {
			memberId : this.currentUser.memberId,
			age : this.currentUser.age,
			sex : this.currentUser.sex,
			registrationDate : this.currentUser.registrationDate,
        	bisexualCategory : this.currentUser.bisexualCategory,
        	gayCategory : this.currentUser.gayCategory,
        	lesbianCategory : this.currentUser.lesbianCategory,
        	straightCategory : this.currentUser.straightCategory,
        	sugarDaddyCategory : this.currentUser.sugarDaddyCategory,
        	sugarMommyCategory : this.currentUser.sugarMommyCategory,
        	toyBoyCategory : this.currentUser.toyBoyCategory,
        	toyGirlCategory : this.currentUser.toyGirlCategory,
        	bisexualInterest : this.currentUser.bisexualInterest,
        	gayInterest : this.currentUser.gayInterest,
        	lesbianInterest : this.currentUser.lesbianInterest,
        	straightInterest : this.currentUser.straightInterest,
        	friendshipInterest : this.currentUser.friendshipInterest,
        	sugarDaddyInterest : this.currentUser.sugarDaddyInterest,
        	sugarMommyInterest : this.currentUser.sugarMommyInterest,
        	relationshipInterest : this.currentUser.relationshipInterest,
        	toyBoyInterest : this.currentUser.toyBoyInterest,
        	toyGirlInterest : this.currentUser.toyGirlInterest,
        	sixtyNineExperience : this.currentUser.sixtyNineExperience,
        	analSexExperience : this.currentUser.analSexExperience,
        	givenHeadExperience : this.currentUser.givenHeadExperience,
        	missionaryExperience : this.currentUser.missionaryExperience,
        	oneNightStandExperience : this.currentUser.oneNightStandExperience,
        	orgySexExperience : this.currentUser.orgySexExperience,
        	poolSexExperience : this.currentUser.poolSexExperience,
        	receivedHeadExperience : this.currentUser.receivedHeadExperience,
        	carSexExperience : this.currentUser.carSexExperience,
        	publicSexExperience : this.currentUser.publicSexExperience,
        	cameraSexExperience : this.currentUser.cameraSexExperience,
        	threesomeExperience : this.currentUser.threesomeExperience,
        	sexToyExperience : this.currentUser.sexToyExperience,
        	videoSexExperience : this.currentUser.videoSexExperience
		};
    
		axios.post("http://datemomo.com/service/matcheduserdata.php", this.requestData)
	    	.then(response => {
	    		this.setState({contextData : {
		    			userComposite : response.data
		    		},
		    		stateLoaded : true
	    		});

	    		console.log("The response data here from querying all user composites is " + JSON.stringify(response.data));
	        }, error => {
	        	console.log(error);
	        });
	}

	componentWillUnmount() {

	}

	changeLikedIcon(liked) {
		if (liked) {
			return (<img className="heartIcon" alt="" src={icon_heart_red}/>);
		} else {
			return (<img className="heartIcon" alt="" src={icon_heart_hollow}/>);
		}
	}

	render() {        
		return (
			<div>
				{ 
					this.state.contextData.userComposite.homeDisplayResponses.map((homeDisplayUser) => ( 
						<div className="timelineWidget"> 
							<img className="centerCropped" src={"http://datemomo.com/client/image/" 
								+ homeDisplayUser.userPictureResponses[0].imageName} />
							<div className="bottomContentLayout">
								<div className="userNameLayout">
									<div className="userNameText">{homeDisplayUser.userName}, {homeDisplayUser.age}</div>
									<div className="locationText">{homeDisplayUser.currentLocation}</div>
								</div>
								<div className="likeIconLayout">
									{this.changeLikedIcon(homeDisplayUser.liked)}
								</div>
							</div>
						</div>
					))
				}
			</div>
		);
	}
}

export default TimelineCard;   


