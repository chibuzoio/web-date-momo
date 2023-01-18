import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import placeholder from '../image/placeholder.jpg';
import icon_menu_black from '../image/icon_menu_black.png';
import RoundPicture from '../component/round_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_heart_hollow from '../image/icon_heart_hollow.png';
import icon_heart_red from '../image/icon_heart_red.png';
import icon_search from '../image/icon_search.png';
import icon_message_blue from '../image/icon_message_blue.png';
import SexualityOptions from '../widget/sexuality_options';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import icon_view_blue from '../image/icon_view_blue.png';
import test_image from '../image/test_image.png';
import logo from '../image/datemomo.png';

class Timeline extends React.Component {
	currentUser = {};
	requestData = {};
	state = {contextData : {
		userComposite : {
			homeDisplayResponses : [],
			thousandRandomCounter : []
		},
		floatingAccountData : {
			floatingLayoutDisplay : "none",
			accountCurrentLocation : "",
			accountProfilePicture : "",
			accountUserStatus : "",
			accountUserName : "",
			gradientHeight : 0,
			accountAge : 0
		},
		stateLoaded : false
	}}; 

	constructor(props) {
		super(props);
		// localStorage.setItem("currentUser", "{}");
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.displayFloatingLayout = this.displayFloatingLayout.bind(this);
		this.updateGradientHeight = this.updateGradientHeight.bind(this);
		this.setGradientHeight = this.setGradientHeight.bind(this);
		this.changeLikedIcon = this.changeLikedIcon.bind(this);
		this.getDataValue = this.getDataValue.bind(this);
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

		window.addEventListener('resize', this.updateGradientHeight);
    
		axios.post("http://datemomo.com/service/matcheduserdata.php", this.requestData)
	    	.then(response => {
	    		this.setState(function(state) { 
	    			return {contextData : {
			    		userComposite : response.data,
			    		floatingAccountData : state.contextData.floatingAccountData,
			    		stateLoaded : true
			    	}
			    }});

	    		console.log("The response data here from querying all user composites is " + JSON.stringify(response.data));
	        }, error => {
	        	console.log(error);
	        });
	}

	componentWillUnmount() {

	}

	updateGradientHeight() { 
		this.setState(function(state) {
			return {contextData :  {
				userComposite : state.contextData.userComposite,
				floatingAccountData : {
					floatingLayoutDisplay : state.contextData.floatingAccountData.floatingLayoutDisplay,
					accountCurrentLocation : state.contextData.floatingAccountData.accountCurrentLocation,
					accountProfilePicture : state.contextData.floatingAccountData.accountProfilePicture,
					accountUserStatus : state.contextData.floatingAccountData.accountUserStatus,
					accountUserName : state.contextData.floatingAccountData.accountUserName,
					gradientHeight : this.userAccountImage.clientHeight,
					accountAge : state.contextData.floatingAccountData.accountAge
				},
				stateLoaded : state.contextData.stateLoaded
			}
		}});
	}

	setGradientHeight(event) {         
		this.setState(function(state) { 
			return {contextData :  {
				userComposite : state.contextData.userComposite,
				floatingAccountData : {
					floatingLayoutDisplay : state.contextData.floatingAccountData.floatingLayoutDisplay,
					accountCurrentLocation : state.contextData.floatingAccountData.accountCurrentLocation,
					accountProfilePicture : state.contextData.floatingAccountData.accountProfilePicture,
					accountUserStatus : state.contextData.floatingAccountData.accountUserStatus,
					accountUserName : state.contextData.floatingAccountData.accountUserName,
					gradientHeight : event.target.clientHeight,
					accountAge : state.contextData.floatingAccountData.accountAge
				},
				stateLoaded : state.contextData.stateLoaded
			}
		}});
	}

	changeLikedIcon(liked) {
		if (liked) {
			return (<img className="heartIcon" alt="" src={icon_heart_red}/>);
		} else {
			return (<img className="heartIcon" alt="" src={icon_heart_hollow}/>);
		}
	}

	displayFloatingLayout(event) {     
		// Always use event.currentTarget instead of event.target for safe DOM manipulation         
		console.log("The value of data-current-user on this target is " 
			+ event.currentTarget.getAttribute("data-current-user"));
	}

	getDataValue(event) {
		console.log("The value of data-current-user for userNameLayout here is " 
			+ event.currentTarget.getAttribute("data-current-user"));
	}

	render() {        
		var viewProfileButton = {
			buttonTitle : "View Profile",
			buttonIcon : icon_view_blue,
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin " + 
				"greyHollowButton floatingAccountButton",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
		}

		var messageButton = {
			buttonTitle : "Message",
			buttonIcon : icon_message_blue,
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin " + 
				"floatContentRight greyHollowButton floatingAccountButton",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
		}

		var sexualCategoryButtons = [
			{buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"}
		];

		var sexualInterestButtons = [
			{buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"}
		];
    
		var sexualExperienceButtons = [
			{buttonTitle : "69", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"}
		];
     
		return (
			<div>
				<div className="scrollView">
					{ 
						this.state.contextData.userComposite.homeDisplayResponses.map((homeDisplayUser) => ( 
							<div className="timelineWidget"> 
								<img className="centerCropped" onClick={this.displayFloatingLayout} 
									data-current-user={homeDisplayUser.userName} src={"http://datemomo.com/client/image/" 
									+ homeDisplayUser.userPictureResponses[0].imageName} />
								<div className="bottomContentLayout">
									<div className="userNameLayout" data-current-user={homeDisplayUser.memberId}  
										onClick={this.getDataValue}>
										<div className="userNameText">
											{homeDisplayUser.userName.charAt(0).toUpperCase() 
											+ homeDisplayUser.userName.slice(1)}, {homeDisplayUser.age}
										</div>
										<div className="locationText">{homeDisplayUser.currentLocation}</div>
									</div>
									<div className="likeIconLayout" ref={(userTimelineLiker) => 
										{this.userTimelineLiker = userTimelineLiker}}>
										{this.changeLikedIcon(homeDisplayUser.liked)}
									</div>
								</div>
							</div>
						))
					}
				</div>

				<div className="floatingUserAccountLayout" 
					style={{display : this.state.contextData.floatingAccountData.floatingLayoutDisplay}}>
					<div className="floatingUserAccountWidget">
						<img className="floatingUserAccountImage" 
							ref={(userAccountImage) => {this.userAccountImage = userAccountImage}} 
							onLoad={this.setGradientHeight} alt="" src={"http://datemomo.com/client/image/" 
							+ this.state.contextData.floatingAccountData.accountProfilePicture} />
						<div className="gradientCover" ref={(gradientCover) => {this.gradientCover = gradientCover}} 
							style={{height : this.state.contextData.floatingAccountData.gradientHeight}}>
							<div className="gradientLayout">
								<div className="gradientUserName">
								{this.state.contextData.floatingAccountData.accountUserName.charAt(0).toUpperCase() 
								+ this.state.contextData.floatingAccountData.accountUserName.slice(1)},&nbsp;
								{this.state.contextData.floatingAccountData.accountAge}</div>
								<div className="gradientLocation">Minarelikoy</div>
							</div>
						</div>
						<div className="userStatusText">{this.state.contextData.floatingAccountData.accountUserStatus}</div>
						<div className="floatingLayoutButtons">
							<LeftIconHollowButton buttonParts={viewProfileButton} />
							<LeftIconHollowButton buttonParts={messageButton} />
						</div>
						<div className="floatingSexualityLayout">
							<div className="sexualityHeader">{this.state.contextData.floatingAccountData.accountUserName.charAt(0).toUpperCase() 
								+ this.state.contextData.floatingAccountData.accountUserName.slice(1)} sexuality</div>
							<SexualityOptions sexualityButtons={sexualCategoryButtons} />
							<div className="sexualityHeader">{this.state.contextData.floatingAccountData.accountUserName.charAt(0).toUpperCase() 
								+ this.state.contextData.floatingAccountData.accountUserName.slice(1)} is looking for</div>
							<SexualityOptions sexualityButtons={sexualInterestButtons} />
							<div className="sexualityHeader">{this.state.contextData.floatingAccountData.accountUserName.charAt(0).toUpperCase() 
								+ this.state.contextData.floatingAccountData.accountUserName.slice(1)} sexual fantasies</div>
							<SexualityOptions sexualityButtons={sexualExperienceButtons} />
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default Timeline;   


