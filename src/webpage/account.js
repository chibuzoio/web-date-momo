import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/profile.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import test_image from '../image/test_image.png';

import icon_logout from '../image/icon_logout.png';
import icon_suggestion from '../image/icon_suggestion.png';
import icon_announcement from '../image/icon_announcement.png';
import icon_help_and_support from '../image/icon_help_and_support.png';
import icon_terms_and_conditions from '../image/icon_terms_and_conditions.png';

import ProfilePicture from '../component/profile_picture'; 
import BorderlessIconMenu from '../component/borderless_icon_menu'; 
import BottomBorderIconMenu from '../component/bottom_border_icon_menu'; 

class Account extends React.Component {
	currentUser = {};
	requestData = {};
	userLikedDisplayStatus = {
		userLikedDisplayTitle : "",
		allLikedUserLayout : "none", 
		firstLikedUser : {userLikedData : {
			likedDisplayStatus : "block",
			likedProfilePicture : "",
			likedUserName : "",
			likedAge : ""
		}},
		secondLikedUser : {userLikedData : {
			likedDisplayStatus : "block",
			likedProfilePicture : "",
			likedUserName : "",
			likedAge : ""
		}},
		thirdLikedUser : {userLikedData : {
			likedDisplayStatus : "block",
			likedProfilePicture : "",
			likedUserName : "",
			likedAge : ""
		}},
		fourthLikedUser : {userLikedData : {
			likedDisplayStatus : "block",
			likedProfilePicture : "",
			likedUserName : "",
			likedAge : ""
		}}  
	};
	state = {contextData : {
		userLikedResponses : [],
		userLikedProperties : {
			detailPictureHeight : "0px",
			detailPictureWidth : "0px",
			userNameLabelHeight : "0px",
			topUserNameMargin : "0px"
		},
		stateLoaded : false
	}};

	constructor(props) {
		super(props);  
		this.displayAvailableLiked = this.displayAvailableLiked.bind(this);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.initializeFirstLikedUser = this.initializeFirstLikedUser.bind(this);
		this.initializeThirdLikedUser = this.initializeThirdLikedUser.bind(this);
		this.initializeSecondLikedUser = this.initializeSecondLikedUser.bind(this);
		this.initializeFourthLikedUser = this.initializeFourthLikedUser.bind(this);
		this.calculatePictureDimensions = this.calculatePictureDimensions.bind(this);
	}

	componentDidMount() {
		this.calculatePictureDimensions();
		window.addEventListener('resize', this.calculatePictureDimensions);

		this.requestData = {
			memberId : this.currentUser.memberId
		}

		axios.post("http://datemomo.com/service/likedusersdata.php", this.requestData)
	    	.then(response => {
	    		this.setState(function(state) { 
	    			return {contextData : {
		    			userLikedResponses : response.data,
		    			userLikedProperties : state.contextData.userLikedProperties,
		    			stateLoaded : true
		    		}
		    	}});

				this.displayAvailableLiked();
	        }, error => {
	        	console.log(error);
	        });
	}

	calculatePictureDimensions() {
		var browserWidth = window.innerWidth;  
		var sumOfPictureMargins = (8 / 100) * browserWidth;
		var totalPictureWidth = browserWidth - sumOfPictureMargins;
		var eachPictureWidth = totalPictureWidth / 4;
		var eachPictureHeight = 1.1 * eachPictureWidth;
		var userNameLabel = (19.48052 / 100) * eachPictureHeight;
		var userNameTopMargin = (eachPictureHeight * (-34)) / 154; // (newHeight * oldMargin) / oldHeight

		console.log("Execution entered here with browserWidth = " + browserWidth);

		this.setState(function(state) { 
			return {contextData : {
				userLikedResponses : state.contextData.userLikedResponses,
				userLikedProperties : {    
					detailPictureHeight : eachPictureHeight + "px",
					detailPictureWidth : eachPictureWidth + "px",
					userNameLabelHeight : userNameLabel + "px",
					topUserNameMargin : userNameTopMargin + "px"
				},
				stateLoaded : state.contextData.stateLoaded
			}
		}});
	}

	initializeFirstLikedUser() {      
		this.userLikedDisplayStatus.firstLikedUser.userLikedData.likedProfilePicture = 
			this.state.contextData.userLikedResponses[0].profilePicture;
		this.userLikedDisplayStatus.firstLikedUser.userLikedData.likedUserName = 
			this.state.contextData.userLikedResponses[0].userName;
		this.userLikedDisplayStatus.firstLikedUser.userLikedData.likedAge = 
			this.state.contextData.userLikedResponses[0].age;
	}

	initializeSecondLikedUser() {      
		this.userLikedDisplayStatus.secondLikedUser.userLikedData.likedProfilePicture = 
			this.state.contextData.userLikedResponses[1].profilePicture;
		this.userLikedDisplayStatus.secondLikedUser.userLikedData.likedUserName = 
			this.state.contextData.userLikedResponses[1].userName;
		this.userLikedDisplayStatus.secondLikedUser.userLikedData.likedAge = 
			this.state.contextData.userLikedResponses[1].age;
	}

	initializeThirdLikedUser() {      
		this.userLikedDisplayStatus.thirdLikedUser.userLikedData.likedProfilePicture = 
			this.state.contextData.userLikedResponses[2].profilePicture;
		this.userLikedDisplayStatus.thirdLikedUser.userLikedData.likedUserName = 
			this.state.contextData.userLikedResponses[2].userName;
		this.userLikedDisplayStatus.thirdLikedUser.userLikedData.likedAge = 
			this.state.contextData.userLikedResponses[2].age;
	}

	initializeFourthLikedUser() {      
		this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedProfilePicture = 
			this.state.contextData.userLikedResponses[3].profilePicture;
		this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedUserName = 
			this.state.contextData.userLikedResponses[3].userName;
		this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedAge = 
			this.state.contextData.userLikedResponses[3].age;
	}

	displayAvailableLiked() {
		if (this.state.contextData.stateLoaded) {
			this.userLikedDisplayStatus.userLikedDisplayTitle = "People You Like";

			if (this.state.contextData.userLikedResponses.length <= 0) {
				this.userLikedDisplayStatus.allLikedUserLayout = "none";
			} else {
				this.userLikedDisplayStatus.allLikedUserLayout = "flex";

				if (this.state.contextData.userLikedResponses.length === 1) {
					this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedDisplayStatus = "none";
					this.userLikedDisplayStatus.secondLikedUser.userLikedData.likedDisplayStatus = "none";
					this.userLikedDisplayStatus.thirdLikedUser.userLikedData.likedDisplayStatus = "none";
					this.initializeFirstLikedUser();
				}

				if (this.state.contextData.userLikedResponses.length === 2) {
					this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedDisplayStatus = "none";
					this.userLikedDisplayStatus.thirdLikedUser.userLikedData.likedDisplayStatus = "none";
					this.initializeFirstLikedUser();
					this.initializeSecondLikedUser();
				}

				if (this.state.contextData.userLikedResponses.length === 3) {
					this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedDisplayStatus = "none";
					this.initializeFirstLikedUser();
					this.initializeSecondLikedUser();
					this.initializeThirdLikedUser();
				}
				
				if (this.state.contextData.userLikedResponses.length === 4) { 
					this.initializeFirstLikedUser();
					this.initializeSecondLikedUser();
					this.initializeThirdLikedUser();
					this.initializeFourthLikedUser();
				}
    
				if (this.state.contextData.userLikedResponses.length > 4) {
					// display the count of users not displayed over the 6th user layout 
					this.initializeFirstLikedUser();
					this.initializeSecondLikedUser();
					this.initializeThirdLikedUser();
					this.initializeFourthLikedUser();
				}
			}
		}
	}

	render() {             
		var userProfilePicture = {
			roundPicture : test_image
		};

		var friendReferenceMenu = {
			iconMenuImage : icon_announcement,
			iconMenuTitle : "Refer A Friend"
		};

		var suggestionMenu = {
			iconMenuImage : icon_suggestion,
			iconMenuTitle : "Suggestion"
		};

		var helpSupportMenu = {
			iconMenuImage : icon_help_and_support,
			iconMenuTitle : "Help And Support"
		};

		var termsConditionMenu = {
			iconMenuImage : icon_terms_and_conditions,
			iconMenuTitle : "Terms And Conditions"
		};

		var accountLogoutMenu = {
			iconMenuImage : icon_logout,
			iconMenuTitle : "Logout"
		};

		return ( 
			<div className="dateMomoProfileLayout">
				<div className="profilePictureImpactCount">
					<div className="accountPictureLayout">
						<div className="profilePictureLayout">
							<img className="profilePictureImage" 
								alt="" src={"http://datemomo.com/client/image/" 
								+ this.currentUser.profilePicture} />
						</div>
					</div>
					<div className="impactCountLayout">
						<div className="impactCountHeader">Impact</div>
						<div className="impactCountNumber">{this.currentUser.impactCount}</div>
					</div>
				</div>
				<div className="likedUsersTitle">People You Like</div>
				<div className="firstThreeLikerUsers" style={{display : this.userLikedDisplayStatus.allLikedUserLayout}}> 
					<div className="detailPictureLayout" style={{
						height : this.state.contextData.userLikedProperties.detailPictureHeight,
						width : this.state.contextData.userLikedProperties.detailPictureWidth}}>
						<div style={{display : this.userLikedDisplayStatus.firstLikedUser.userLikedData.likedDisplayStatus}}>
							<img className="detailPictureImage" style={{
								height : this.state.contextData.userLikedProperties.detailPictureHeight,
								width : this.state.contextData.userLikedProperties.detailPictureWidth}}
								alt="" src={"http://datemomo.com/client/image/" 
								+ this.userLikedDisplayStatus.firstLikedUser.userLikedData.likedProfilePicture} />
							<div className="userNameLabel" style={{
								marginTop : this.state.contextData.userLikedProperties.topUserNameMargin,
								height : this.state.contextData.userLikedProperties.userNameLabelHeight}}>
								{this.userLikedDisplayStatus.firstLikedUser.userLikedData.likedUserName.charAt(0).toUpperCase() 
								+ this.userLikedDisplayStatus.firstLikedUser.userLikedData.likedUserName.slice(1)},&nbsp;
								{this.userLikedDisplayStatus.firstLikedUser.userLikedData.likedAge}
							</div>
						</div>
					</div>

					<div className="detailPictureLayout" style={{
						height : this.state.contextData.userLikedProperties.detailPictureHeight,
						width : this.state.contextData.userLikedProperties.detailPictureWidth}}>
						<div style={{display : this.userLikedDisplayStatus.secondLikedUser.userLikedData.likedDisplayStatus}}>
							<img className="detailPictureImage" style={{
								height : this.state.contextData.userLikedProperties.detailPictureHeight,
								width : this.state.contextData.userLikedProperties.detailPictureWidth}}
								alt="" src={"http://datemomo.com/client/image/" 
								+ this.userLikedDisplayStatus.secondLikedUser.userLikedData.likedProfilePicture} />
							<div className="userNameLabel" style={{
								marginTop : this.state.contextData.userLikedProperties.topUserNameMargin,
								height : this.state.contextData.userLikedProperties.userNameLabelHeight}}>
								{this.userLikedDisplayStatus.secondLikedUser.userLikedData.likedUserName.charAt(0).toUpperCase() 
								+ this.userLikedDisplayStatus.secondLikedUser.userLikedData.likedUserName.slice(1)},&nbsp;
								{this.userLikedDisplayStatus.secondLikedUser.userLikedData.likedAge}
							</div>
						</div>
					</div>
				
					<div className="detailPictureLayout" style={{
						height : this.state.contextData.userLikedProperties.detailPictureHeight,
						width : this.state.contextData.userLikedProperties.detailPictureWidth}}>
						<div style={{display : this.userLikedDisplayStatus.thirdLikedUser.userLikedData.likedDisplayStatus}}>
							<img className="detailPictureImage" style={{
								height : this.state.contextData.userLikedProperties.detailPictureHeight,
								width : this.state.contextData.userLikedProperties.detailPictureWidth}}
								alt="" src={"http://datemomo.com/client/image/" 
								+ this.userLikedDisplayStatus.thirdLikedUser.userLikedData.likedProfilePicture} />
							<div className="userNameLabel" style={{
								marginTop : this.state.contextData.userLikedProperties.topUserNameMargin,
								height : this.state.contextData.userLikedProperties.userNameLabelHeight}}>
								{this.userLikedDisplayStatus.thirdLikedUser.userLikedData.likedUserName.charAt(0).toUpperCase() 
								+ this.userLikedDisplayStatus.thirdLikedUser.userLikedData.likedUserName.slice(1)},&nbsp;
								{this.userLikedDisplayStatus.thirdLikedUser.userLikedData.likedAge}
							</div>
						</div>
					</div>  
				
					<div className="detailPictureLayout" style={{
						height : this.state.contextData.userLikedProperties.detailPictureHeight,
						width : this.state.contextData.userLikedProperties.detailPictureWidth}}>
						<div style={{display : this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedDisplayStatus}}>
							<img className="detailPictureImage" style={{
								height : this.state.contextData.userLikedProperties.detailPictureHeight,
								width : this.state.contextData.userLikedProperties.detailPictureWidth}}
								alt="" src={"http://datemomo.com/client/image/" 
								+ this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedProfilePicture} />
							<div className="userNameLabel" style={{
								marginTop : this.state.contextData.userLikedProperties.topUserNameMargin,
								height : this.state.contextData.userLikedProperties.userNameLabelHeight}}>
								{this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedUserName.charAt(0).toUpperCase() 
								+ this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedUserName.slice(1)},&nbsp;
								{this.userLikedDisplayStatus.fourthLikedUser.userLikedData.likedAge}
							</div>
						</div>
					</div>
				</div>

				<div className="accountMenuLayout">
					<BottomBorderIconMenu iconMenuParts={friendReferenceMenu} />
					<BottomBorderIconMenu iconMenuParts={suggestionMenu} />
					<BottomBorderIconMenu iconMenuParts={helpSupportMenu} />
					<BottomBorderIconMenu iconMenuParts={termsConditionMenu} />
					<BorderlessIconMenu iconMenuParts={accountLogoutMenu} />
				</div>
			</div>
		);
	}
}

export default Account;   


