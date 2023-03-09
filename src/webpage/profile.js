import React from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/profile.css';
import '../css/timeline.css';
import '../css/sexuality.css';  
import { getQueryParam } from '../utility/utility';
import icon_edit_blue from '../image/icon_edit_blue.png'; 
import icon_camera_blue from '../image/icon_camera_blue.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png'; 
import SexualityBiometrics from '../widget/sexuality_biometrics';
import UserDetailPicture from '../component/user_detail_picture';
import LeftIconHollowButton from '../component/left_icon_hollow_button';

class Profile extends React.Component {
	currentUser = {};
	requestData = {};
	visibleFirstThree = "firstThreeLikerUsers";
	visibleSecondThree = "secondThreeLikerUsers";
	visibleLikerUserLayout = "allLikerUserLayout";
	hiddenFirstThree = this.visibleFirstThree + " hideComponent";
	hiddenSecondThree = this.visibleSecondThree + " hideComponent";
	hiddenLikerUserLayout = this.visibleLikerUserLayout + " hideComponent";
	generalLikerLayout = {
		userLikerDisplayTitle : "",
		generalLikerDisplayLayout : this.hiddenLikerUserLayout,
		firstThreeLikerDisplay : this.hiddenFirstThree,
		secondThreeLikerDisplay : this.hiddenSecondThree
	}
	userLikerDimensions = {
		detailPictureHeight : "0px",
		detailPictureWidth : "0px",
		userNameLabelHeight : "0px",
		topUserNameMargin : "0px"
	}
	state = {contextData : {
		userLikerResponses : [],
		userLikerLayout : {
			userLikerDisplayTitle : "",
			generalLikerDisplayLayout : this.hiddenLikerUserLayout,
			firstThreeLikerDisplay : this.hiddenFirstThree,
			secondThreeLikerDisplay : this.hiddenSecondThree
		},
		firstLikerUser : {
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
		secondLikerUser : {
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
		thirdLikerUser : {
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
		fourthLikerUser : {
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
		fifthLikerUser : {
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
		sixthLikerUser : {
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
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.displayAvailableLiker = this.displayAvailableLiker.bind(this);
		this.initializeFirstLikerUser = this.initializeFirstLikerUser.bind(this);
		this.initializeFifthLikerUser = this.initializeFifthLikerUser.bind(this);
		this.initializeSixthLikerUser = this.initializeSixthLikerUser.bind(this);
		this.initializeThirdLikerUser = this.initializeThirdLikerUser.bind(this);
		this.initializeSecondLikerUser = this.initializeSecondLikerUser.bind(this);
		this.initializeFourthLikerUser = this.initializeFourthLikerUser.bind(this);
		this.calculatePictureDimensions = this.calculatePictureDimensions.bind(this);
		this.buildSexualInterestButtons = this.buildSexualInterestButtons.bind(this);
		this.buildSexualCategoryButtons = this.buildSexualCategoryButtons.bind(this);
		this.buildSexualExperienceButtons = this.buildSexualExperienceButtons.bind(this);
	}

	componentDidMount() {
		this.calculatePictureDimensions();
		window.addEventListener('resize', this.calculatePictureDimensions);
	
		this.requestData = {
			memberId : this.currentUser.memberId
		}

		axios.post("https://datemomo.com/service/userlikersdata.php", this.requestData)
	    	.then(response => {
	    		this.setState(function(state) { 
	    			return {contextData : {
		    			userLikerResponses : response.data,
		    			userLikerLayout : state.contextData.userLikerLayout,
		    			firstLikerUser : state.contextData.firstLikerUser,
		    			secondLikerUser : state.contextData.secondLikerUser,
		    			thirdLikerUser : state.contextData.thirdLikerUser,
		    			fourthLikerUser : state.contextData.fourthLikerUser,
		    			fifthLikerUser : state.contextData.fifthLikerUser,
		    			sixthLikerUser : state.contextData.sixthLikerUser,
		    			stateLoaded : true
		    		}
	    		}});

	    		setTimeout(function() {
					this.displayAvailableLiker();
	    		}.bind(this), 1000);
	        }, error => {
	        	console.log(error);
	        });
	}

	initializeFirstLikerUser() {   
		this.setState(function(state) { 
			return {contextData : {
    			userLikerResponses : state.contextData.userLikerResponses,
    			userLikerLayout : state.contextData.userLikerLayout,
				firstLikerUser : {
					innerPictureClass : (state.contextData.userLikerResponses[0].userName.length > 0) ? "" : "hideComponent", 
					userDetails : {
						profilePicture : state.contextData.userLikerResponses[0].profilePicture,
						pictureUserName : state.contextData.userLikerResponses[0].userName,
						pictureAge : state.contextData.userLikerResponses[0].age
					},
					dimension : state.contextData.firstLikerUser.dimension
				},	
				secondLikerUser : state.contextData.secondLikerUser,
				thirdLikerUser : state.contextData.thirdLikerUser,
				fourthLikerUser : state.contextData.fourthLikerUser,
				fifthLikerUser : state.contextData.fifthLikerUser,
				sixthLikerUser : state.contextData.sixthLikerUser,
    			stateLoaded : state.contextData.stateLoaded
    		}
		}});
	}

	initializeSecondLikerUser() {
		this.setState(function(state) { 
			return {contextData : {
    			userLikerResponses : state.contextData.userLikerResponses,
    			userLikerLayout : state.contextData.userLikerLayout,
				firstLikerUser : state.contextData.firstLikerUser,	
				secondLikerUser : {
					innerPictureClass : (state.contextData.userLikerResponses[1].userName.length > 0) ? "" : "hideComponent", 
					userDetails : {
						profilePicture : state.contextData.userLikerResponses[1].profilePicture,
						pictureUserName : state.contextData.userLikerResponses[1].userName,
						pictureAge : state.contextData.userLikerResponses[1].age
					},
					dimension : state.contextData.secondLikerUser.dimension
				},
				thirdLikerUser : state.contextData.thirdLikerUser,
				fourthLikerUser : state.contextData.fourthLikerUser,
				fifthLikerUser : state.contextData.fifthLikerUser,
				sixthLikerUser : state.contextData.sixthLikerUser,
    			stateLoaded : state.contextData.stateLoaded
    		}
		}});
	}

	initializeThirdLikerUser() {
		this.setState(function(state) { 
			return {contextData : {
    			userLikerResponses : state.contextData.userLikerResponses,
    			userLikerLayout : state.contextData.userLikerLayout,
				firstLikerUser : state.contextData.firstLikerUser,	
				secondLikerUser : state.contextData.secondLikerUser,
				thirdLikerUser : {
					innerPictureClass : (state.contextData.userLikerResponses[2].userName.length > 0) ? "" : "hideComponent", 
					userDetails : {
						profilePicture : state.contextData.userLikerResponses[2].profilePicture,
						pictureUserName : state.contextData.userLikerResponses[2].userName,
						pictureAge : state.contextData.userLikerResponses[2].age
					},
					dimension : state.contextData.thirdLikerUser.dimension
				},
				fourthLikerUser : state.contextData.fourthLikerUser,
				fifthLikerUser : state.contextData.fifthLikerUser,
				sixthLikerUser : state.contextData.sixthLikerUser,
    			stateLoaded : state.contextData.stateLoaded
    		}
		}});
	}

	initializeFourthLikerUser() {
		this.setState(function(state) { 
			return {contextData : {
    			userLikerResponses : state.contextData.userLikerResponses,
    			userLikerLayout : state.contextData.userLikerLayout,
				firstLikerUser : state.contextData.firstLikerUser,	
				secondLikerUser : state.contextData.secondLikerUser,
				thirdLikerUser : state.contextData.thirdLikerUser,
				fourthLikerUser : {
					innerPictureClass : (state.contextData.userLikerResponses[3].userName.length > 0) ? "" : "hideComponent", 
					userDetails : {
						profilePicture : state.contextData.userLikerResponses[3].profilePicture,
						pictureUserName : state.contextData.userLikerResponses[3].userName,
						pictureAge : state.contextData.userLikerResponses[3].age
					},
					dimension : state.contextData.fourthLikerUser.dimension
				},
				fifthLikerUser : state.contextData.fifthLikerUser,
				sixthLikerUser : state.contextData.sixthLikerUser,
    			stateLoaded : state.contextData.stateLoaded
    		}
		}});
	}

	initializeFifthLikerUser() {
		this.setState(function(state) { 
			return {contextData : {
    			userLikerResponses : state.contextData.userLikerResponses,
    			userLikerLayout : state.contextData.userLikerLayout,
				firstLikerUser : state.contextData.firstLikerUser,	
				secondLikerUser : state.contextData.secondLikerUser,
				thirdLikerUser : state.contextData.thirdLikerUser,
				fourthLikerUser : state.contextData.fourthLikerUser,
				fifthLikerUser : {
					innerPictureClass : (state.contextData.userLikerResponses[4].userName.length > 0) ? "" : "hideComponent", 
					userDetails : {
						profilePicture : state.contextData.userLikerResponses[4].profilePicture,
						pictureUserName : state.contextData.userLikerResponses[4].userName,
						pictureAge : state.contextData.userLikerResponses[4].age
					},
					dimension : state.contextData.fifthLikerUser.dimension
				},
				sixthLikerUser : state.contextData.sixthLikerUser,
    			stateLoaded : state.contextData.stateLoaded
    		}
		}});
	}

	initializeSixthLikerUser() {
		this.setState(function(state) { 
			return {contextData : {
    			userLikerResponses : state.contextData.userLikerResponses,
    			userLikerLayout : state.contextData.userLikerLayout,
				firstLikerUser : state.contextData.firstLikerUser,	
				secondLikerUser : state.contextData.secondLikerUser,
				thirdLikerUser : state.contextData.thirdLikerUser,
				fourthLikerUser : state.contextData.fourthLikerUser,
				fifthLikerUser : state.contextData.fifthLikerUser,
				sixthLikerUser : {
					innerPictureClass : (state.contextData.userLikerResponses[5].userName.length > 0) ? "" : "hideComponent", 
					userDetails : {
						profilePicture : state.contextData.userLikerResponses[5].profilePicture,
						pictureUserName : state.contextData.userLikerResponses[5].userName,
						pictureAge : state.contextData.userLikerResponses[5].age
					},
					dimension : state.contextData.sixthLikerUser.dimension
				},
    			stateLoaded : state.contextData.stateLoaded
    		}
		}});
	}

	displayAvailableLiker() {
		if (this.state.contextData.stateLoaded) {
			if (this.state.contextData.userLikerResponses.length > 1) {
				this.generalLikerLayout.userLikerDisplayTitle = 
					this.state.contextData.userLikerResponses.length + " People Like You";
			}

			if (this.state.contextData.userLikerResponses.length === 1) {
				this.generalLikerLayout.userLikerDisplayTitle = "1 Person Likes You";
			}

			if (this.state.contextData.userLikerResponses.length <= 0) {
				this.generalLikerLayout.generalLikerDisplayLayout = this.hiddenLikerUserLayout;
				this.generalLikerLayout.firstThreeLikerDisplay = this.hiddenFirstThree;
			} else {
				this.generalLikerLayout.generalLikerDisplayLayout = this.visibleLikerUserLayout;
				this.generalLikerLayout.firstThreeLikerDisplay = this.visibleFirstThree;

				if (this.state.contextData.userLikerResponses.length <= 3) {
					this.generalLikerLayout.secondThreeLikerDisplay = this.hiddenSecondThree;

					if (this.state.contextData.userLikerResponses.length === 1) {
						this.initializeFirstLikerUser();
					}

					if (this.state.contextData.userLikerResponses.length === 2) {
						this.initializeFirstLikerUser();
						this.initializeSecondLikerUser();
					}

					if (this.state.contextData.userLikerResponses.length === 3) {
						this.initializeFirstLikerUser();
						this.initializeSecondLikerUser();
						this.initializeThirdLikerUser();
					}
				} else {
					this.generalLikerLayout.secondThreeLikerDisplay = this.visibleSecondThree;

					if (this.state.contextData.userLikerResponses.length === 4) {
						this.initializeFirstLikerUser();
						this.initializeSecondLikerUser();
						this.initializeThirdLikerUser();
						this.initializeFourthLikerUser();
					}

					if (this.state.contextData.userLikerResponses.length === 5) {
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

			this.setState(function(state) { 
				return {contextData : {
	    			userLikerResponses : state.contextData.userLikerResponses,
	    			userLikerLayout : this.generalLikerLayout,
					firstLikerUser : state.contextData.firstLikerUser,	
					secondLikerUser : state.contextData.secondLikerUser,
					thirdLikerUser : state.contextData.thirdLikerUser,
					fourthLikerUser : state.contextData.fourthLikerUser,
					fifthLikerUser : state.contextData.fifthLikerUser,
					sixthLikerUser : state.contextData.sixthLikerUser,
	    			stateLoaded : state.contextData.stateLoaded
	    		}
			}});
		}
	}

	calculatePictureDimensions() {
		var browserWidth = this.profileLayout.clientWidth;  
		var sumOfPictureMargins = (8 / 100) * browserWidth;
		var totalPictureWidth = browserWidth - sumOfPictureMargins;
		var eachPictureWidth = totalPictureWidth / 3;
		var eachPictureHeight = 1.1 * eachPictureWidth;
		var userNameLabel = (19.48052 / 100) * eachPictureHeight;
		var userNameTopMargin = (eachPictureHeight * (-34)) / 154; // (newHeight * oldMargin) / oldHeight

		// console.log("Execution entered here with browserWidth = " + browserWidth);
	
		this.userLikerDimensions.detailPictureHeight = eachPictureHeight + "px";
		this.userLikerDimensions.detailPictureWidth = eachPictureWidth + "px";
		this.userLikerDimensions.userNameLabelHeight = userNameLabel + "px";
		this.userLikerDimensions.topUserNameMargin = userNameTopMargin + "px";

		this.setState(function(state) { 
			return {contextData : {
				userLikerResponses : state.contextData.userLikerResponses,
				userLikerLayout : state.contextData.userLikerLayout,
				firstLikerUser : {
					innerPictureClass : state.contextData.firstLikerUser.innerPictureClass, 
					userDetails : state.contextData.firstLikerUser.userDetails,
					dimension : this.userLikerDimensions
				},	
				secondLikerUser : {
					innerPictureClass : state.contextData.secondLikerUser.innerPictureClass, 
					userDetails : state.contextData.secondLikerUser.userDetails,
					dimension : this.userLikerDimensions
				},
				thirdLikerUser : {
					innerPictureClass : state.contextData.thirdLikerUser.innerPictureClass, 
					userDetails : state.contextData.thirdLikerUser.userDetails,
					dimension : this.userLikerDimensions
				},
				fourthLikerUser : {
					innerPictureClass : state.contextData.fourthLikerUser.innerPictureClass, 
					userDetails : state.contextData.fourthLikerUser.userDetails,
					dimension : this.userLikerDimensions
				},
				fifthLikerUser : {
					innerPictureClass : state.contextData.fifthLikerUser.innerPictureClass, 
					userDetails : state.contextData.fifthLikerUser.userDetails,
					dimension : this.userLikerDimensions
				},
				sixthLikerUser : {
					innerPictureClass : state.contextData.sixthLikerUser.innerPictureClass, 
					userDetails : state.contextData.sixthLikerUser.userDetails,
					dimension : this.userLikerDimensions
				},
				stateLoaded : state.contextData.stateLoaded
			}
		}});
	}

	buildSexualExperienceButtons() {
		var sexualExperienceButtons = [];

        if (this.currentUser.sixtyNineExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "69", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.analSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.givenHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.missionaryExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.oneNightStandExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.orgySexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.poolSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.receivedHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.carSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.publicSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.cameraSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.threesomeExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.sexToyExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.videoSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualExperienceButtons;
	} 

	buildSexualInterestButtons() {
		var sexualInterestButtons = [];

        if (this.currentUser.bisexualInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.friendshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.gayInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.lesbianInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.relationshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.straightInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.sugarDaddyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.sugarMommyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.toyBoyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.toyGirlInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
                
		return sexualInterestButtons;
	} 

	buildSexualCategoryButtons() {
		var sexualCategoryButtons = [];

        if (this.currentUser.bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (this.currentUser.toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }

		return sexualCategoryButtons;
	} 

	render() {              
		var editProfileButton = {
			buttonTitle : "Edit Profile",
			buttonIcon : icon_edit_blue,
			leftIconHollowButtonLayout : "leftIconHollowButton buttonTopMargin " + 
				"greyHollowButton floatingAccountButton",
			leftIconHollowButtonIcon : "hollowButtonLeftIcon",
			leftIconHollowButtonTitle : "leftHollowButtonTitle"
		}

		var pictureGalleryButton = {
			buttonTitle : "Photos",
			buttonIcon : icon_gallery_blue,
			leftIconHollowButtonLayout : "leftIconHollowButton buttonTopMargin " + 
				"greyHollowButton floatingAccountButton",
			leftIconHollowButtonIcon : "hollowButtonLeftIcon",
			leftIconHollowButtonTitle : "leftHollowButtonTitle"
		}
              
		return ( 			
			<div className="scrollView">
				<div className="dateMomoProfileLayout" 
					ref={(profileLayout) => {this.profileLayout = profileLayout}}> 
					<div className="pictureUserNameLayout">
						<div className="profilePictureContainer">
							<div className="profilePictureLayout">
								<img className="profilePictureImage" 
									alt="" src={"https://datemomo.com/client/image/" 
									+ this.currentUser.profilePicture} />
								<img className="profilePictureIcon" alt="" src={icon_camera_blue} />
							</div>
						</div>
						<div className="userNameLocationLayout">
							<div className="userNameAgeText">{this.currentUser.userName.charAt(0).toUpperCase() 
								+ this.currentUser.userName.slice(1)}, {this.currentUser.age}</div>
							<div className="userLocationText">{this.currentUser.currentLocation}</div>
							<div className="currentStatusText">{this.currentUser.userStatus}</div>
						</div>
					</div>
					<div className="profileButtonLayout">
						<LeftIconHollowButton buttonParts={pictureGalleryButton} />
						<LeftIconHollowButton buttonParts={editProfileButton} />
					</div>
					<div className={this.state.contextData.userLikerLayout.generalLikerDisplayLayout}> 
						<div className="userlikerCount">{this.state.contextData.userLikerLayout.userLikerDisplayTitle}</div>
						<div className={this.state.contextData.userLikerLayout.firstThreeLikerDisplay}>
							<UserDetailPicture userDetailParts={this.state.contextData.firstLikerUser} />
							<UserDetailPicture userDetailParts={this.state.contextData.secondLikerUser} />
							<UserDetailPicture userDetailParts={this.state.contextData.thirdLikerUser} />
						</div>
						<div className={this.state.contextData.userLikerLayout.secondThreeLikerDisplay}>
							<UserDetailPicture userDetailParts={this.state.contextData.fourthLikerUser} />					
							<UserDetailPicture userDetailParts={this.state.contextData.fifthLikerUser} />
							<UserDetailPicture userDetailParts={this.state.contextData.sixthLikerUser} />
						</div>
					</div>
					<div className="userLikerSexualityLayout">
						<div className="sexualityHeader">My sexuality</div>
						<SexualityBiometrics sexualityButtons={this.buildSexualCategoryButtons()} />
						<div className="sexualityHeader">My Interests</div>
						<SexualityBiometrics sexualityButtons={this.buildSexualInterestButtons()} />
						<div className="sexualityHeader">My Experiences</div>
						<SexualityBiometrics sexualityButtons={this.buildSexualExperienceButtons()} />
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;   


