import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/profile.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import test_image from '../image/test_image.png';
import icon_edit_blue from '../image/icon_edit_blue.png';
import ProfilePicture from '../component/profile_picture';
import SexualityOptions from '../widget/sexuality_options';
import icon_camera_blue from '../image/icon_camera_blue.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import UserDetailPicture from '../component/user_detail_picture';
import IconProfilePicture from '../component/icon_profile_picture';
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

	render() {             
		var userProfilePicture = {
			roundPicture : test_image
		};

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
					<SexualityOptions sexualityButtons={sexualCategoryButtons} />
					<div className="sexualityHeader">My Interests</div>
					<SexualityOptions sexualityButtons={sexualInterestButtons} />
					<div className="sexualityHeader">My Experiences</div>
					<SexualityOptions sexualityButtons={sexualExperienceButtons} />
				</div>
			</div>
		);
	}
}

export default Profile;   


