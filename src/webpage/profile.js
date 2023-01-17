import React from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/profile.css';
import '../css/sexuality.css';  
import icon_edit_blue from '../image/icon_edit_blue.png'; 
import icon_camera_blue from '../image/icon_camera_blue.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png'; 
import LeftIconHollowButton from '../component/left_icon_hollow_button';

class Profile extends React.Component {
	currentUser = {};
	requestData = {};
	userLikerDisplayStatus = {
		userLikerDisplayTitle : "",
		allLikerUserLayout : "none",
		firstThreeLikerUsers : "flex",
		secondThreeLikerUsers : "flex", 
		firstLikerUser : {userLikerData : {
			likerDisplayStatus : "block",
			likerProfilePicture : "",
			likerUserName : "",
			likerAge : ""
		}},
		secondLikerUser : {userLikerData : {
			likerDisplayStatus : "block",
			likerProfilePicture : "",
			likerUserName : "",
			likerAge : ""
		}},
		thirdLikerUser : {userLikerData : {
			likerDisplayStatus : "block",
			likerProfilePicture : "",
			likerUserName : "",
			likerAge : ""
		}},
		fourthLikerUser : {userLikerData : {
			likerDisplayStatus : "block",
			likerProfilePicture : "",
			likerUserName : "",
			likerAge : ""
		}},
		fifthLikerUser : {userLikerData : {
			likerDisplayStatus : "block",
			likerProfilePicture : "",
			likerUserName : "",
			likerAge : ""
		}},
		sixthLikerUser : {userLikerData : {
			likerDisplayStatus : "block",
			likerProfilePicture : "",
			likerUserName : "",
			likerAge : ""
		}}
	};
	state = {contextData : {
		userLikerResponses : [],
		userLikerProperties : {
			detailPictureHeight : "0px",
			detailPictureWidth : "0px",
			userNameLabelHeight : "0px",
			topUserNameMargin : "0px"
		},
		stateLoaded : false
	}}; 

	constructor(props) {
		super(props);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.displayAvailableLiker = this.displayAvailableLiker.bind(this);
		this.displayInterestButtons = this.displayInterestButtons.bind(this);
		this.displaySexualityButtons = this.displaySexualityButtons.bind(this);
		this.displayExperienceButtons = this.displayExperienceButtons.bind(this);
		this.initializeFirstLikerUser = this.initializeFirstLikerUser.bind(this);
		this.initializeFifthLikerUser = this.initializeFifthLikerUser.bind(this);
		this.initializeSixthLikerUser = this.initializeSixthLikerUser.bind(this);
		this.initializeThirdLikerUser = this.initializeThirdLikerUser.bind(this);
		this.initializeSecondLikerUser = this.initializeSecondLikerUser.bind(this);
		this.initializeFourthLikerUser = this.initializeFourthLikerUser.bind(this);
		this.calculatePictureDimensions = this.calculatePictureDimensions.bind(this);
		// this.calculatePictureDimensions(); // Very very wrong to call this 
		// method in the constructor because it sets state in itself      
	}

	componentDidMount() {
		this.calculatePictureDimensions();
		window.addEventListener('resize', this.calculatePictureDimensions);
	
		this.requestData = {
			memberId : this.currentUser.memberId
		}

		axios.post("http://datemomo.com/service/userlikersdata.php", this.requestData)
	    	.then(response => {
	    		this.setState({contextData : {
		    			userLikerResponses : response.data,
		    			userLikerProperties : this.state.contextData.userLikerProperties,
		    			stateLoaded : true
		    		}
	    		});

				this.displayAvailableLiker();
	    		console.log("The response data here from querying all user likers composite here is " + JSON.stringify(response.data));
	        }, error => {
	        	console.log(error);
	        });
	}

	initializeFirstLikerUser() {      
		this.userLikerDisplayStatus.firstLikerUser.userLikerData.likerProfilePicture = 
			this.state.contextData.userLikerResponses[0].profilePicture;
		this.userLikerDisplayStatus.firstLikerUser.userLikerData.likerUserName = 
			this.state.contextData.userLikerResponses[0].userName;
		this.userLikerDisplayStatus.firstLikerUser.userLikerData.likerAge = 
			this.state.contextData.userLikerResponses[0].age;
	}

	initializeSecondLikerUser() {      
		this.userLikerDisplayStatus.secondLikerUser.userLikerData.likerProfilePicture = 
			this.state.contextData.userLikerResponses[1].profilePicture;
		this.userLikerDisplayStatus.secondLikerUser.userLikerData.likerUserName = 
			this.state.contextData.userLikerResponses[1].userName;
		this.userLikerDisplayStatus.secondLikerUser.userLikerData.likerAge = 
			this.state.contextData.userLikerResponses[1].age;
	}

	initializeThirdLikerUser() {      
		this.userLikerDisplayStatus.thirdLikerUser.userLikerData.likerProfilePicture = 
			this.state.contextData.userLikerResponses[2].profilePicture;
		this.userLikerDisplayStatus.thirdLikerUser.userLikerData.likerUserName = 
			this.state.contextData.userLikerResponses[2].userName;
		this.userLikerDisplayStatus.thirdLikerUser.userLikerData.likerAge = 
			this.state.contextData.userLikerResponses[2].age;
	}

	initializeFourthLikerUser() {      
		this.userLikerDisplayStatus.fourthLikerUser.userLikerData.likerProfilePicture = 
			this.state.contextData.userLikerResponses[3].profilePicture;
		this.userLikerDisplayStatus.fourthLikerUser.userLikerData.likerUserName = 
			this.state.contextData.userLikerResponses[3].userName;
		this.userLikerDisplayStatus.fourthLikerUser.userLikerData.likerAge = 
			this.state.contextData.userLikerResponses[3].age;
	}

	initializeFifthLikerUser() {      
		this.userLikerDisplayStatus.fifthLikerUser.userLikerData.likerProfilePicture = 
			this.state.contextData.userLikerResponses[4].profilePicture;
		this.userLikerDisplayStatus.fifthLikerUser.userLikerData.likerUserName = 
			this.state.contextData.userLikerResponses[4].userName;
		this.userLikerDisplayStatus.fifthLikerUser.userLikerData.likerAge = 
			this.state.contextData.userLikerResponses[4].age;
	}

	initializeSixthLikerUser() {      
		this.userLikerDisplayStatus.sixthLikerUser.userLikerData.likerProfilePicture = 
			this.state.contextData.userLikerResponses[5].profilePicture;
		this.userLikerDisplayStatus.sixthLikerUser.userLikerData.likerUserName = 
			this.state.contextData.userLikerResponses[5].userName;
		this.userLikerDisplayStatus.sixthLikerUser.userLikerData.likerAge = 
			this.state.contextData.userLikerResponses[5].age;
	}

	displayAvailableLiker() {
		if (this.state.contextData.stateLoaded) {
			if (this.state.contextData.userLikerResponses.length > 1) {
				this.userLikerDisplayStatus.userLikerDisplayTitle = 
					this.state.contextData.userLikerResponses.length + " People Like You";
			}

			if (this.state.contextData.userLikerResponses.length === 1) {
				this.userLikerDisplayStatus.userLikerDisplayTitle = "1 Person Likes You";
			}

			if (this.state.contextData.userLikerResponses.length <= 0) {
				this.userLikerDisplayStatus.allLikerUserLayout = "none";
			} else {
				this.userLikerDisplayStatus.allLikerUserLayout = "flex";

				if (this.state.contextData.userLikerResponses.length <= 3) {
					this.userLikerDisplayStatus.secondThreeLikerUsers = "none";
					
					if (this.state.contextData.userLikerResponses.length === 1) {
						this.userLikerDisplayStatus.secondLikerUser.userLikerData.likerDisplayStatus = "none";
						this.userLikerDisplayStatus.thirdLikerUser.userLikerData.likerDisplayStatus = "none";
						this.initializeFirstLikerUser();
					}

					if (this.state.contextData.userLikerResponses.length === 2) {
						this.userLikerDisplayStatus.thirdLikerUser.userLikerData.likerDisplayStatus = "none";
						this.initializeFirstLikerUser();
						this.initializeSecondLikerUser();
					}

					if (this.state.contextData.userLikerResponses.length === 3) {
						this.initializeFirstLikerUser();
						this.initializeSecondLikerUser();
						this.initializeThirdLikerUser();
					}
				} else {
					if (this.state.contextData.userLikerResponses.length === 4) {
						this.userLikerDisplayStatus.fifthLikerUser.userLikerData.likerDisplayStatus = "none";
						this.userLikerDisplayStatus.sixthLikerUser.userLikerData.likerDisplayStatus = "none";
						this.initializeFirstLikerUser();
						this.initializeSecondLikerUser();
						this.initializeThirdLikerUser();
						this.initializeFourthLikerUser();
					}

					if (this.state.contextData.userLikerResponses.length === 5) {
						this.userLikerDisplayStatus.sixthLikerUser.userLikerData.likerDisplayStatus = "none";
						this.initializeFirstLikerUser();
						this.initializeSecondLikerUser();
						this.initializeThirdLikerUser();
						this.initializeFourthLikerUser();
						this.initializeFifthLikerUser();
					}

					if (this.state.contextData.userLikerResponses.length === 6) {
						this.initializeFirstLikerUser();
						this.initializeSecondLikerUser();
						this.initializeThirdLikerUser();
						this.initializeFourthLikerUser();
						this.initializeFifthLikerUser();
						this.initializeSixthLikerUser();
					}

					if (this.state.contextData.userLikerResponses.length > 6) {
						// display the count of users not displayed over the 6th user layout 
						this.initializeFirstLikerUser();
						this.initializeSecondLikerUser();
						this.initializeThirdLikerUser();
						this.initializeFourthLikerUser();
						this.initializeFifthLikerUser();
						this.initializeSixthLikerUser();
					}
				}
			}
		}
	}

	calculatePictureDimensions() {
		var browserWidth = window.innerWidth;  
		var sumOfPictureMargins = (8 / 100) * browserWidth;
		var totalPictureWidth = browserWidth - sumOfPictureMargins;
		var eachPictureWidth = totalPictureWidth / 3;
		var eachPictureHeight = 1.1 * eachPictureWidth;
		var userNameLabel = (19.48052 / 100) * eachPictureHeight;
		var userNameTopMargin = (eachPictureHeight * (-34)) / 154; // (newHeight * oldMargin) / oldHeight

		console.log("Execution entered here with browserWidth = " + browserWidth);

		this.setState({contextData : {
			userLikerResponses : this.state.contextData.userLikerResponses,
			userLikerProperties : {    
				detailPictureHeight : eachPictureHeight + "px",
				detailPictureWidth : eachPictureWidth + "px",
				userNameLabelHeight : userNameLabel + "px",
				topUserNameMargin : userNameTopMargin + "px"
			},
			stateLoaded : this.state.contextData.stateLoaded
		}});
	}

	displaySexualityButtons() {
		var builtButtonList = "";

		if (this.currentUser.bisexualCategory > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Bisexual</button>";
		}

		if (this.currentUser.gayCategory > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Gay</button>";
		}

		if (this.currentUser.lesbianCategory > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Lesbian</button>";
		}

		if (this.currentUser.straightCategory > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Straight</button>";
		}

		if (this.currentUser.sugarDaddyCategory > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Sugar Daddy</button>";
		}

		if (this.currentUser.sugarMommyCategory > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Sugar Mommy</button>";
		}

		if (this.currentUser.toyBoyCategory > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Toy Boy</button>";
		}

		if (this.currentUser.toyGirlCategory > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Toy Girl</button>";
		}

		return builtButtonList;
	}
  
	displayInterestButtons() {
		var builtButtonList = "";

		if (this.currentUser.bisexualInterest > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Bisexual</button>";
		}

		if (this.currentUser.friendshipInterest > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Friendship</button>";
		}

		if (this.currentUser.gayInterest > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Gay</button>";
		}

		if (this.currentUser.lesbianInterest > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Lesbian</button>";
		}

		if (this.currentUser.relationshipInterest > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Relationship</button>";
		}

		if (this.currentUser.straightInterest > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Straight</button>";
		}

		if (this.currentUser.sugarDaddyInterest > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Sugar Daddy</button>";
		}

		if (this.currentUser.sugarMommyInterest > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Sugar Mommy</button>";
		}

		if (this.currentUser.toyBoyInterest > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Toy Boy</button>";
		}

		if (this.currentUser.toyGirlInterest > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Toy Girl</button>";
		}

		return builtButtonList;
	}
          
	displayExperienceButtons() {
		var builtButtonList = "";

		if (this.currentUser.sixtyNineExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">69</button>";
		}

		if (this.currentUser.analSexExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Anal Sex</button>";
		}

		if (this.currentUser.givenHeadExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Given Head</button>";
		}

		if (this.currentUser.missionaryExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Missionary</button>";
		}

		if (this.currentUser.oneNightStandExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">One-night Stand</button>";
		}

		if (this.currentUser.orgySexExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Orgy Sex</button>";
		}

		if (this.currentUser.poolSexExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Pool Sex</button>";
		}

		if (this.currentUser.receivedHeadExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Received Head</button>";
		}
 
		if (this.currentUser.carSexExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Sexed In Car</button>";
		}

		if (this.currentUser.publicSexExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Sexed In Public</button>";
		}

		if (this.currentUser.cameraSexExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Sexed With Camera</button>";
		}

		if (this.currentUser.threesomeExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Threesome</button>";
		}

		if (this.currentUser.sexToyExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Used Sex Toys</button>";
		}

		if (this.currentUser.videoSexExperience > 0) {
			builtButtonList += "<button class=\"basicButton sexualityButton\" type=\"button\">Video Sex Chat</button>";
		}

		return builtButtonList;
	}

	render() {              
		var editProfileButton = {
			buttonTitle : "Edit Profile",
			buttonIcon : icon_edit_blue,
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin " + 
				"greyHollowButton floatingAccountButton",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
		}

		var pictureGalleryButton = {
			buttonTitle : "Photos",
			buttonIcon : icon_gallery_blue,
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin " + 
				"greyHollowButton floatingAccountButton",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
		}
              
		return ( 
			<div className="dateMomoProfileLayout">
				<div className="pictureUserNameLayout">
					<div className="profilePictureContainer">
						<div className="profilePictureLayout">
							<img className="profilePictureImage" 
								alt="" src={"http://datemomo.com/client/image/" 
								+ this.currentUser.profilePicture} />
							<img className="profilePictureIcon" alt="" src={icon_camera_blue} />
						</div>
					</div>
					<div className="userNameLocationLayout">
						<div className="userNameAgeText">{this.currentUser.userName}, {this.currentUser.age}</div>
						<div className="userLocationText">{this.currentUser.currentLocation}</div>
						<div className="currentStatusText">{this.currentUser.userStatus}</div>
					</div>
				</div>
				<div className="profileButtonLayout">
					<LeftIconHollowButton buttonParts={pictureGalleryButton} />
					<LeftIconHollowButton buttonParts={editProfileButton} />
				</div>
				<div className="allLikerUserLayout" style={{display : this.userLikerDisplayStatus.allLikerUserLayout}}> 
					<div className="userlikerCount">{this.userLikerDisplayStatus.userLikerDisplayTitle}</div>
					<div className="firstThreeLikerUsers" style={{display : this.userLikerDisplayStatus.firstThreeLikerUsers}}>
						<div className="detailPictureLayout" 
							style={{height : this.state.contextData.userLikerProperties.detailPictureHeight,
							width : this.state.contextData.userLikerProperties.detailPictureWidth}}>
							<div style={{display : this.userLikerDisplayStatus.firstLikerUser.userLikerData.likerDisplayStatus}}>
								<img className="detailPictureImage" style={{
									height : this.state.contextData.userLikerProperties.detailPictureHeight,
									width : this.state.contextData.userLikerProperties.detailPictureWidth}}
									alt="" src={"http://datemomo.com/client/image/" 
									+ this.userLikerDisplayStatus.firstLikerUser.userLikerData.likerProfilePicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.contextData.userLikerProperties.topUserNameMargin,
									height : this.state.contextData.userLikerProperties.userNameLabelHeight}}>
									{this.userLikerDisplayStatus.firstLikerUser.userLikerData.likerUserName},&nbsp;
									{this.userLikerDisplayStatus.firstLikerUser.userLikerData.likerAge}
								</div>
							</div>
						</div>

						<div className="detailPictureLayout" 
							style={{height : this.state.contextData.userLikerProperties.detailPictureHeight,
							width : this.state.contextData.userLikerProperties.detailPictureWidth}}>
							<div style={{display : this.userLikerDisplayStatus.secondLikerUser.userLikerData.likerDisplayStatus}}>
								<img className="detailPictureImage" style={{
									height : this.state.contextData.userLikerProperties.detailPictureHeight,
									width : this.state.contextData.userLikerProperties.detailPictureWidth}}
									alt="" src={"http://datemomo.com/client/image/" 
									+ this.userLikerDisplayStatus.secondLikerUser.userLikerData.likerProfilePicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.contextData.userLikerProperties.topUserNameMargin,
									height : this.state.contextData.userLikerProperties.userNameLabelHeight}}>
									{this.userLikerDisplayStatus.secondLikerUser.userLikerData.likerUserName},&nbsp;
									{this.userLikerDisplayStatus.secondLikerUser.userLikerData.likerAge}
								</div>
							</div>
						</div>
					
						<div className="detailPictureLayout" 
							style={{height : this.state.contextData.userLikerProperties.detailPictureHeight,
							width : this.state.contextData.userLikerProperties.detailPictureWidth}}>
							<div style={{display : this.userLikerDisplayStatus.thirdLikerUser.userLikerData.likerDisplayStatus}}>
								<img className="detailPictureImage" style={{
									height : this.state.contextData.userLikerProperties.detailPictureHeight,
									width : this.state.contextData.userLikerProperties.detailPictureWidth}}
									alt="" src={"http://datemomo.com/client/image/" 
									+ this.userLikerDisplayStatus.thirdLikerUser.userLikerData.likerProfilePicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.contextData.userLikerProperties.topUserNameMargin,
									height : this.state.contextData.userLikerProperties.userNameLabelHeight}}>
									{this.userLikerDisplayStatus.thirdLikerUser.userLikerData.likerUserName},&nbsp;
									{this.userLikerDisplayStatus.thirdLikerUser.userLikerData.likerAge}
								</div>
							</div>
						</div>  
					</div>
					<div className="secondThreeLikerUsers" style={{display : this.userLikerDisplayStatus.secondThreeLikerUsers}}>
						<div className="detailPictureLayout" 
							style={{height : this.state.contextData.userLikerProperties.detailPictureHeight,
							width : this.state.contextData.userLikerProperties.detailPictureWidth}}>
							<div style={{display : this.userLikerDisplayStatus.fourthLikerUser.userLikerData.likerDisplayStatus}}>
								<img className="detailPictureImage" style={{
									height : this.state.contextData.userLikerProperties.detailPictureHeight,
									width : this.state.contextData.userLikerProperties.detailPictureWidth}}
									alt="" src={"http://datemomo.com/client/image/" 
									+ this.userLikerDisplayStatus.fourthLikerUser.userLikerData.likerProfilePicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.contextData.userLikerProperties.topUserNameMargin,
									height : this.state.contextData.userLikerProperties.userNameLabelHeight}}>
									{this.userLikerDisplayStatus.fourthLikerUser.userLikerData.likerUserName},&nbsp;
									{this.userLikerDisplayStatus.fourthLikerUser.userLikerData.likerAge}
								</div>
							</div>
						</div>
					
						<div className="detailPictureLayout" 
							style={{height : this.state.contextData.userLikerProperties.detailPictureHeight,
							width : this.state.contextData.userLikerProperties.detailPictureWidth}}>
							<div style={{display : this.userLikerDisplayStatus.fifthLikerUser.userLikerData.likerDisplayStatus}}>
								<img className="detailPictureImage" style={{
									height : this.state.contextData.userLikerProperties.detailPictureHeight,
									width : this.state.contextData.userLikerProperties.detailPictureWidth}}
									alt="" src={"http://datemomo.com/client/image/" 
									+ this.userLikerDisplayStatus.fifthLikerUser.userLikerData.likerProfilePicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.contextData.userLikerProperties.topUserNameMargin,
									height : this.state.contextData.userLikerProperties.userNameLabelHeight}}>
									{this.userLikerDisplayStatus.fifthLikerUser.userLikerData.likerUserName},&nbsp;
									{this.userLikerDisplayStatus.fifthLikerUser.userLikerData.likerAge}
								</div>
							</div>
						</div>
					
						<div className="detailPictureLayout" 
							style={{height : this.state.contextData.userLikerProperties.detailPictureHeight,
							width : this.state.contextData.userLikerProperties.detailPictureWidth}}>
							<div style={{display : this.userLikerDisplayStatus.sixthLikerUser.userLikerData.likerDisplayStatus}}>
								<img className="detailPictureImage" style={{
									height : this.state.contextData.userLikerProperties.detailPictureHeight,
									width : this.state.contextData.userLikerProperties.detailPictureWidth}}
									alt="" src={"http://datemomo.com/client/image/" 
									+ this.userLikerDisplayStatus.sixthLikerUser.userLikerData.likerProfilePicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.contextData.userLikerProperties.topUserNameMargin,
									height : this.state.contextData.userLikerProperties.userNameLabelHeight}}>
									{this.userLikerDisplayStatus.sixthLikerUser.userLikerData.likerUserName},&nbsp;
									{this.userLikerDisplayStatus.sixthLikerUser.userLikerData.likerAge}
								</div>
							</div>
						</div>  
					</div>
				</div>
				<div className="userLikerSexualityLayout">
					<div className="sexualityHeader">My sexuality</div>
					<div className="sexualityButtonLayout" dangerouslySetInnerHTML={{__html : this.displaySexualityButtons()}} ></div>
					<div className="sexualityHeader">My Interests</div>
					<div className="sexualityButtonLayout" dangerouslySetInnerHTML={{__html : this.displayInterestButtons()}} ></div>
					<div className="sexualityHeader">My Experiences</div>
					<div className="sexualityButtonLayout" dangerouslySetInnerHTML={{__html : this.displayExperienceButtons()}} ></div>
				</div>
			</div>
		);
	}
}

export default Profile;   


