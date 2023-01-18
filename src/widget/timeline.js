import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import '../css/floating_account.css';
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
			sexualExperienceButtons : [],
			sexualInterestButtons : [],
			sexualCategoryButtons : [],
			floatingLayoutDisplay : "none",
			userDisplayResponse : {
				currentLocation : "",
				profilePicture : "",
				userStatus : "",
				userName : "",
				age : 0
			},
			gradientHeight : 0
		},
		stateLoaded : false
	}}; 

	constructor(props) {
		super(props);
		// localStorage.setItem("currentUser", "{}");
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.buildSexualExperienceButtons = this.buildSexualExperienceButtons.bind(this);
		this.buildSexualInterestButtons = this.buildSexualInterestButtons.bind(this);
		this.buildSexualCategoryButtons = this.buildSexualCategoryButtons.bind(this);
		this.displayFloatingLayout = this.displayFloatingLayout.bind(this);
		this.updateGradientHeight = this.updateGradientHeight.bind(this);
		this.setGradientHeight = this.setGradientHeight.bind(this);
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
					sexualExperienceButtons : state.contextData.floatingAccountData.sexualExperienceButtons,
					sexualInterestButtons : state.contextData.floatingAccountData.sexualInterestButtons,
					sexualCategoryButtons : state.contextData.floatingAccountData.sexualCategoryButtons,
					floatingLayoutDisplay : state.contextData.floatingAccountData.floatingLayoutDisplay,
					userDisplayResponse : state.contextData.floatingAccountData.userDisplayResponse,
					gradientHeight : this.userAccountImage.clientHeight
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
					sexualExperienceButtons : state.contextData.floatingAccountData.sexualExperienceButtons,
					sexualInterestButtons : state.contextData.floatingAccountData.sexualInterestButtons,
					sexualCategoryButtons : state.contextData.floatingAccountData.sexualCategoryButtons,
					floatingLayoutDisplay : state.contextData.floatingAccountData.floatingLayoutDisplay,
					userDisplayResponse : state.contextData.floatingAccountData.userDisplayResponse,
					gradientHeight : event.target.clientHeight
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
		var currentUserPosition = event.currentTarget.getAttribute("data-current-user");

		this.setState(function(state) {
			return {contextData :  {
				userComposite : state.contextData.userComposite,
				floatingAccountData : {
					sexualExperienceButtons : this.buildSexualExperienceButtons(currentUserPosition),
					sexualInterestButtons : this.buildSexualInterestButtons(currentUserPosition),
					sexualCategoryButtons : this.buildSexualCategoryButtons(currentUserPosition),
					floatingLayoutDisplay : "flex",
					userDisplayResponse : {          
						currentLocation : state.contextData.userComposite.homeDisplayResponses[currentUserPosition].currentLocation,
						profilePicture : state.contextData.userComposite.homeDisplayResponses[currentUserPosition].profilePicture,
						userStatus : state.contextData.userComposite.homeDisplayResponses[currentUserPosition].userStatus,
						userName : state.contextData.userComposite.homeDisplayResponses[currentUserPosition].userName,
						age : state.contextData.userComposite.homeDisplayResponses[currentUserPosition].age
					},
					gradientHeight : state.contextData.floatingAccountData.gradientHeight
				},
				stateLoaded : state.contextData.stateLoaded		
			}
		}});
	}

	buildSexualExperienceButtons(currentPosition) {
		var sexualExperienceButtons = [];

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].sixtyNineExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "69", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].analSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].givenHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].missionaryExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].oneNightStandExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].orgySexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].poolSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].receivedHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].carSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].publicSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].cameraSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].threesomeExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].sexToyExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].videoSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualExperienceButtons;
	} 

	buildSexualInterestButtons(currentPosition) {
		var sexualInterestButtons = [];

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].bisexualInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].friendshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].gayInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].lesbianInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].relationshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].straightInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].sugarDaddyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].sugarMommyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].toyBoyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].toyGirlInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
                
		return sexualInterestButtons;
	} 

	buildSexualCategoryButtons(currentPosition) {
		var sexualCategoryButtons = [];

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.state.contextData.userComposite.homeDisplayResponses[currentPosition].toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualCategoryButtons;
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
              
		return (
			<div>
				<div className="scrollView">
					{ 
						this.state.contextData.userComposite.homeDisplayResponses.map((homeDisplayUser, index) => ( 
							<div className="timelineWidget"> 
								<img className="centerCropped" onClick={this.displayFloatingLayout} 
									data-current-user={index} src={"http://datemomo.com/client/image/" 
									+ homeDisplayUser.userPictureResponses[0].imageName} />
								<div className="bottomContentLayout">
									<div className="userNameLayout" data-current-user={index}  
										onClick={this.displayFloatingLayout}>
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
							+ this.state.contextData.floatingAccountData.userDisplayResponse.profilePicture} />
						<div className="gradientCover" ref={(gradientCover) => {this.gradientCover = gradientCover}} 
							style={{height : this.state.contextData.floatingAccountData.gradientHeight}}>
							<div className="gradientLayout">
								<div className="gradientUserName">
								{this.state.contextData.floatingAccountData.userDisplayResponse.userName.charAt(0).toUpperCase() 
								+ this.state.contextData.floatingAccountData.userDisplayResponse.userName.slice(1)},&nbsp;
								{this.state.contextData.floatingAccountData.userDisplayResponse.age}</div>
								<div className="gradientLocation">{this.state.contextData.floatingAccountData.userDisplayResponse.currentLocation}</div>
							</div>
						</div>
						<div className="userStatusText">{this.state.contextData.floatingAccountData.userDisplayResponse.userStatus}</div>
						<div className="floatingLayoutButtons">
							<LeftIconHollowButton buttonParts={viewProfileButton} />
							<LeftIconHollowButton buttonParts={messageButton} />
						</div>
						<div className="floatingSexualityLayout">
							<div className="sexualityHeader">{this.state.contextData.floatingAccountData.userDisplayResponse.userName.charAt(0).toUpperCase() 
								+ this.state.contextData.floatingAccountData.userDisplayResponse.userName.slice(1)} sexuality</div>
							<SexualityOptions sexualityButtons={this.state.contextData.floatingAccountData.sexualCategoryButtons} />
							<div className="sexualityHeader">{this.state.contextData.floatingAccountData.userDisplayResponse.userName.charAt(0).toUpperCase() 
								+ this.state.contextData.floatingAccountData.userDisplayResponse.userName.slice(1)} is looking for</div>
							<SexualityOptions sexualityButtons={this.state.contextData.floatingAccountData.sexualInterestButtons} />
							<div className="sexualityHeader">{this.state.contextData.floatingAccountData.userDisplayResponse.userName.charAt(0).toUpperCase() 
								+ this.state.contextData.floatingAccountData.userDisplayResponse.userName.slice(1)} sexual fantasies</div>
							<SexualityOptions sexualityButtons={this.state.contextData.floatingAccountData.sexualExperienceButtons} />
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default Timeline;   


