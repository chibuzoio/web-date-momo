import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/profile.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import test_image from '../image/test_image.png';
import icon_logout from '../image/icon_logout.png';
import LeftIconMenu from '../component/left_icon_menu'; 
import ProfilePicture from '../component/profile_picture'; 
import icon_suggestion from '../image/icon_suggestion.png';
import icon_announcement from '../image/icon_announcement.png';
import UserDetailPicture from '../component/user_detail_picture';
import icon_help_and_support from '../image/icon_help_and_support.png';
import icon_terms_and_conditions from '../image/icon_terms_and_conditions.png';

class Account extends React.Component {
	currentUser = {};
	requestData = {};
	visibleFirstThree = "firstThreeLikerUsers";
	visibleLikedUserLayout = "allLikerUserLayout";
	hiddenFirstThree = this.visibleFirstThree + " hideComponent";
	hiddenLikedUserLayout = this.visibleLikedUserLayout + " hideComponent";
	generalLikedLayout = {
		userLikedDisplayTitle : "",
		generalLikedDisplayLayout : this.hiddenLikedUserLayout,
		firstThreeLikedDisplay : this.hiddenFirstThree
	}
	userLikedDimensions = {
		detailPictureHeight : "0px",
		detailPictureWidth : "0px",
		userNameLabelHeight : "0px",
		topUserNameMargin : "0px"
	}
	state = {contextData : {
		userLikedResponses : [],
		userLikedLayout : {
			userLikedDisplayTitle : "",
			generalLikedDisplayLayout : this.hiddenLikedUserLayout,
			firstThreeLikedDisplay : this.hiddenFirstThree
		},
		firstLikedUser : {
			innerPictureClass : "hideComponent", 
			userDetails : {
				profilePicture : "",
				pictureUserName : "",
				pictureAge : 0
			},
			dimension : {
				detailPictureHeight : "0px",
				detailPictureWidth : "0px",
				userNameLabelHeight : "0px",
				topUserNameMargin : "0px"
			}
		},	
		secondLikedUser : {
			innerPictureClass : "hideComponent", 
			userDetails : {
				profilePicture : "",
				pictureUserName : "",
				pictureAge : 0
			},
			dimension : {
				detailPictureHeight : "0px",
				detailPictureWidth : "0px",
				userNameLabelHeight : "0px",
				topUserNameMargin : "0px"
			}
		},
		thirdLikedUser : {
			innerPictureClass : "hideComponent", 
			userDetails : {
				profilePicture : "",
				pictureUserName : "",
				pictureAge : 0
			},
			dimension : {
				detailPictureHeight : "0px",
				detailPictureWidth : "0px",
				userNameLabelHeight : "0px",
				topUserNameMargin : "0px"
			}
		},
		fourthLikedUser : {
			innerPictureClass : "hideComponent", 
			userDetails : {
				profilePicture : "",
				pictureUserName : "",
				pictureAge : 0
			},
			dimension : {
				detailPictureHeight : "0px",
				detailPictureWidth : "0px",
				userNameLabelHeight : "0px",
				topUserNameMargin : "0px"
			}
		},
		stateLoaded : false
	}};

	constructor(props) {
		super(props);  
		this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
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

		axios.post("https://datemomo.com/service/likedusersdata.php", this.requestData)
	    	.then(response => {
	    		this.setState(function(state) { 
	    			return {contextData : {
		    			userLikedResponses : response.data,
		    			userLikedLayout : state.contextData.userLikedLayout,
		    			firstLikedUser : state.contextData.firstLikedUser,
		    			secondLikedUser : state.contextData.secondLikedUser,
		    			thirdLikedUser : state.contextData.thirdLikedUser,
		    			fourthLikedUser : state.contextData.fourthLikedUser,
		    			stateLoaded : true
		    		}
		    	}});

				this.displayAvailableLiked();
	        }, error => {
	        	console.log(error);
	        });
	}

	logoutCurrentUser(menuClicked) {
		if (menuClicked) {
			localStorage.setItem("currentUser", "{}");
			window.location.replace("/login");
		}
	}

	calculatePictureDimensions() {
		var browserWidth = window.innerWidth;  
		var sumOfPictureMargins = (8 / 100) * browserWidth;
		var totalPictureWidth = browserWidth - sumOfPictureMargins;
		var eachPictureWidth = totalPictureWidth / 4;
		var eachPictureHeight = 1.1 * eachPictureWidth;
		var userNameLabel = (19.48052 / 100) * eachPictureHeight;
		var userNameTopMargin = (eachPictureHeight * (-34)) / 154; // (newHeight * oldMargin) / oldHeight

		// console.log("Execution entered here with browserWidth = " + browserWidth);
	
		this.userLikedDimensions.detailPictureHeight = eachPictureHeight + "px";
		this.userLikedDimensions.detailPictureWidth = eachPictureWidth + "px";
		this.userLikedDimensions.userNameLabelHeight = userNameLabel + "px";
		this.userLikedDimensions.topUserNameMargin = userNameTopMargin + "px";

		this.setState(function(state) { 
			return {contextData : {
				userLikedResponses : state.contextData.userLikedResponses,
				userLikedLayout : state.contextData.userLikedLayout,
				firstLikedUser : {
					innerPictureClass : state.contextData.firstLikedUser.innerPictureClass, 
					userDetails : state.contextData.firstLikedUser.userDetails,
					dimension : this.userLikedDimensions
				},	
				secondLikedUser : {
					innerPictureClass : state.contextData.secondLikedUser.innerPictureClass, 
					userDetails : state.contextData.secondLikedUser.userDetails,
					dimension : this.userLikedDimensions
				},
				thirdLikedUser : {
					innerPictureClass : state.contextData.thirdLikedUser.innerPictureClass, 
					userDetails : state.contextData.thirdLikedUser.userDetails,
					dimension : this.userLikedDimensions
				},
				fourthLikedUser : {
					innerPictureClass : state.contextData.fourthLikedUser.innerPictureClass, 
					userDetails : state.contextData.fourthLikedUser.userDetails,
					dimension : this.userLikedDimensions
				},
				stateLoaded : state.contextData.stateLoaded
			}
		}});
	}

	initializeFirstLikedUser() { 
		this.setState(function(state) { 
			return {contextData : {
    			userLikedResponses : state.contextData.userLikedResponses,
    			userLikedLayout : state.contextData.userLikedLayout,
				firstLikedUser : {
					innerPictureClass : (state.contextData.userLikedResponses[0].userName.length > 0) ? "" : "hideComponent", 
					userDetails : {
						profilePicture : state.contextData.userLikedResponses[0].profilePicture,
						pictureUserName : state.contextData.userLikedResponses[0].userName,
						pictureAge : state.contextData.userLikedResponses[0].age
					},
					dimension : state.contextData.firstLikedUser.dimension
				},	
				secondLikedUser : state.contextData.secondLikedUser,
				thirdLikedUser : state.contextData.thirdLikedUser,
				fourthLikedUser : state.contextData.fourthLikedUser,
    			stateLoaded : state.contextData.stateLoaded
    		}
		}});
	}

	initializeSecondLikedUser() {      
		this.setState(function(state) { 
			return {contextData : {
    			userLikedResponses : state.contextData.userLikedResponses,
    			userLikedLayout : state.contextData.userLikedLayout,
				firstLikedUser : state.contextData.firstLikedUser,	
				secondLikedUser : {
					innerPictureClass : (state.contextData.userLikedResponses[1].userName.length > 0) ? "" : "hideComponent", 
					userDetails : {
						profilePicture : state.contextData.userLikedResponses[1].profilePicture,
						pictureUserName : state.contextData.userLikedResponses[1].userName,
						pictureAge : state.contextData.userLikedResponses[1].age
					},
					dimension : state.contextData.secondLikedUser.dimension
				},
				thirdLikedUser : state.contextData.thirdLikedUser,
				fourthLikedUser : state.contextData.fourthLikedUser, 
    			stateLoaded : state.contextData.stateLoaded
    		}
		}});
	}

	initializeThirdLikedUser() {
		this.setState(function(state) { 
			return {contextData : {
    			userLikedResponses : state.contextData.userLikedResponses,
    			userLikedLayout : state.contextData.userLikedLayout,
				firstLikedUser : state.contextData.firstLikedUser,	
				secondLikedUser : state.contextData.secondLikedUser,
				thirdLikedUser : {
					innerPictureClass : (state.contextData.userLikedResponses[2].userName.length > 0) ? "" : "hideComponent", 
					userDetails : {
						profilePicture : state.contextData.userLikedResponses[2].profilePicture,
						pictureUserName : state.contextData.userLikedResponses[2].userName,
						pictureAge : state.contextData.userLikedResponses[2].age
					},
					dimension : state.contextData.thirdLikedUser.dimension
				},
				fourthLikedUser : state.contextData.fourthLikedUser, 
    			stateLoaded : state.contextData.stateLoaded
    		}
		}});
	}

	initializeFourthLikedUser() {
		this.setState(function(state) { 
			return {contextData : {
    			userLikedResponses : state.contextData.userLikedResponses,
    			userLikedLayout : state.contextData.userLikedLayout,
				firstLikedUser : state.contextData.firstLikedUser,	
				secondLikedUser : state.contextData.secondLikedUser,
				thirdLikedUser : state.contextData.thirdLikedUser,
				fourthLikedUser : {
					innerPictureClass : (state.contextData.userLikedResponses[3].userName.length > 0) ? "" : "hideComponent", 
					userDetails : {
						profilePicture : state.contextData.userLikedResponses[3].profilePicture,
						pictureUserName : state.contextData.userLikedResponses[3].userName,
						pictureAge : state.contextData.userLikedResponses[3].age
					},
					dimension : state.contextData.fourthLikedUser.dimension
				},     
    			stateLoaded : state.contextData.stateLoaded
    		}
		}});
	}

	displayAvailableLiked() {
		if (this.state.contextData.stateLoaded) {
			if (this.state.contextData.userLikedResponses.length > 0) {
				this.generalLikedLayout.userLikedDisplayTitle = "People You Like";
			}

			if (this.state.contextData.userLikedResponses.length <= 0) {
				this.generalLikedLayout.generalLikedDisplayLayout = this.hiddenLikedUserLayout;
				this.generalLikedLayout.firstThreeLikedDisplay = this.hiddenFirstThree;
			} else {
				this.generalLikedLayout.generalLikedDisplayLayout = this.visibleLikedUserLayout;
				this.generalLikedLayout.firstThreeLikedDisplay = this.visibleFirstThree;

				if (this.state.contextData.userLikedResponses.length === 1) {
					this.initializeFirstLikedUser();
				}

				if (this.state.contextData.userLikedResponses.length === 2) {
					this.initializeFirstLikedUser();
					this.initializeSecondLikedUser();
				}

				if (this.state.contextData.userLikedResponses.length === 3) {
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

			this.setState(function(state) { 
				return {contextData : {
	    			userLikedResponses : state.contextData.userLikedResponses,
	    			userLikedLayout : this.generalLikedLayout,
					firstLikedUser : state.contextData.firstLikedUser,	
					secondLikedUser : state.contextData.secondLikedUser,
					thirdLikedUser : state.contextData.thirdLikedUser,
					fourthLikedUser : state.contextData.fourthLikedUser,   
	    			stateLoaded : state.contextData.stateLoaded
	    		}
			}});
		}
	}

	render() {             
		var userProfilePicture = {
			roundPicture : test_image
		};

		var friendReferenceMenu = {
			iconMenuLayout : "bottomBorderIconMenu",
			iconMenuImage : icon_announcement,
			iconMenuTitle : "Refer A Friend"
		};

		var suggestionMenu = {
			iconMenuLayout : "bottomBorderIconMenu",
			iconMenuImage : icon_suggestion,
			iconMenuTitle : "Suggestion"
		};

		var helpSupportMenu = {
			iconMenuLayout : "bottomBorderIconMenu",
			iconMenuImage : icon_help_and_support,
			iconMenuTitle : "Help And Support"
		};

		var termsConditionMenu = {
			iconMenuLayout : "bottomBorderIconMenu",
			iconMenuImage : icon_terms_and_conditions,
			iconMenuTitle : "Terms And Conditions"
		};

		var accountLogoutMenu = {
			iconMenuLayout : "borderlessIconMenu",
			iconMenuImage : icon_logout,
			iconMenuTitle : "Logout"
		};

		return ( 
			<div className="dateMomoProfileLayout">
				<div className="profilePictureImpactCount">
					<div className="accountPictureLayout">
						<div className="profilePictureLayout">
							<img className="profilePictureImage" 
								alt="" src={"https://datemomo.com/client/image/" 
								+ this.currentUser.profilePicture} />
						</div>
					</div>
					<div className="impactCountLayout">
						<div className="impactCountHeader">Impact</div>
						<div className="impactCountNumber">{this.currentUser.impactCount}</div>
					</div>
				</div>
				<div className="likedUsersTitle">People You Like</div>
				<div className={this.state.contextData.userLikedLayout.firstThreeLikedDisplay}>
					<UserDetailPicture userDetailParts={this.state.contextData.firstLikedUser} />
					<UserDetailPicture userDetailParts={this.state.contextData.secondLikedUser} />
					<UserDetailPicture userDetailParts={this.state.contextData.thirdLikedUser} />
					<UserDetailPicture userDetailParts={this.state.contextData.fourthLikedUser} />					
				</div>
				<div className="accountMenuLayout">
					<LeftIconMenu iconMenuParts={friendReferenceMenu} /> 
					<LeftIconMenu iconMenuParts={suggestionMenu} /> 
					<LeftIconMenu iconMenuParts={helpSupportMenu} /> 
					<LeftIconMenu iconMenuParts={termsConditionMenu} /> 
					<LeftIconMenu onMenuClicked={this.logoutCurrentUser} iconMenuParts={accountLogoutMenu} /> 
				</div>
			</div>
		);
	}
}

export default Account;   


