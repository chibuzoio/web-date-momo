import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import '../css/floating_account.css';
import placeholder from '../image/placeholder.jpg';
import icon_menu_black from '../image/icon_menu_black.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png'; 
import RoundPicture from '../component/round_picture';
import ActiveMessenger from '../widget/active_messenger';
import NotificationIterator from '../widget/notification_iterator';
import BottomMenuIcon from '../component/bottom_menu_icon';
import IconProfilePicture from '../component/icon_profile_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_heart_hollow from '../image/icon_heart_hollow.png';
import icon_heart_red from '../image/icon_heart_red.png';
import icon_search from '../image/icon_search.png';
import icon_message_blue from '../image/icon_message_blue.png';
import CloseLayoutIcon from '../component/close_layout_icon';
import SexualityBiometrics from '../widget/sexuality_biometrics';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import motion_placeholder from '../image/motion_placeholder.gif';
import icon_close_white from '../image/icon_close_white.png';
import icon_edit_white from '../image/icon_edit_white.png';
import icon_view_blue from '../image/icon_view_blue.png';
import color_loader from '../image/color_loader.gif';
import logo from '../image/datemomo.png';

class Timeline extends React.Component {
	currentUser = {};
	requestData = {};
	messengerRequestData = {};
	state = {contextData : {
		userComposite : {
			homeDisplayResponses : [],
			thousandRandomCounter : []
		},
		messengerResponses : [],
		notificationResponses : [],
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
		closeLayoutIcon : {
			menuLayoutClass : "menuLayoutClass",
			menuIconClass : "menuIconClass",
			menuIcon : icon_close_white,
			menuLayoutDisplay : "none",
		},
		infiniteScrollingPage : {
			colorLoadingDisplay : "flex",
			totalAvailablePages : 0,
			lastDisplayPage : 0
		},
		displayTimelineCover : "flex",
		stateLoaded : false
	}}; 

	constructor(props) {
		super(props);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.buildSexualExperienceButtons = this.buildSexualExperienceButtons.bind(this);
		this.buildSexualInterestButtons = this.buildSexualInterestButtons.bind(this);
		this.buildSexualCategoryButtons = this.buildSexualCategoryButtons.bind(this);
		this.displayNotificationContent = this.displayNotificationContent.bind(this);
		this.replaceImagePlaceholder = this.replaceImagePlaceholder.bind(this);
		this.displayMessengerContent = this.displayMessengerContent.bind(this);
		this.displayFloatingLayout = this.displayFloatingLayout.bind(this);
		this.updateGradientHeight = this.updateGradientHeight.bind(this);
		this.closeFloatingLayout = this.closeFloatingLayout.bind(this);
		this.detectScrollBottom = this.detectScrollBottom.bind(this);
		this.setGradientHeight = this.setGradientHeight.bind(this);
		this.openUserProfile = this.openUserProfile.bind(this);
		this.openUserGallery = this.openUserGallery.bind(this);
		this.editUserProfile = this.editUserProfile.bind(this);
		this.changeLikedIcon = this.changeLikedIcon.bind(this);
		this.clickLikeUser = this.clickLikeUser.bind(this);
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

		this.messengerRequestData = {
			memberId : this.currentUser.memberId
		}

		window.addEventListener('resize', this.updateGradientHeight);
		window.addEventListener('scroll', this.detectScrollBottom);

		axios.post("https://datemomo.com/service/matcheduserdata.php", this.requestData)
			.then(response => {
	    		this.setState(function(state) { 
	    			return {contextData : {
	    				userComposite : response.data,
	    				messengerResponses : state.contextData.messengerResponses,
	    				notificationResponses : state.contextData.notificationResponses,
	    				floatingAccountData : state.contextData.floatingAccountData,
	    				closeLayoutIcon : state.contextData.closeLayoutIcon,
	    				infiniteScrollingPage : {
	    					colorLoadingDisplay : "none",
	    					totalAvailablePages : response.data.homeDisplayResponses.length,
	    					lastDisplayPage : response.data.homeDisplayResponses.length - 1
	    				},
	    				displayTimelineCover : state.contextData.displayTimelineCover,
	    				stateLoaded : true
	    			}
	    		}});  
	        }, error => {
	        	console.log(error);
	        });

		axios.post("https://datemomo.com/service/usermessengersdata.php", this.messengerRequestData)
	    	.then(response => {
	    		this.setState(function(state) { 
	    			return {contextData : {
	    				userComposite : state.contextData.userComposite,
	    				messengerResponses : response.data,
	    				notificationResponses : state.contextData.notificationResponses,
	    				floatingAccountData : state.contextData.floatingAccountData,
	    				closeLayoutIcon : state.contextData.closeLayoutIcon,
	    				infiniteScrollingPage : state.contextData.infiniteScrollingPage,
	    				displayTimelineCover : state.contextData.displayTimelineCover,
	    				stateLoaded : state.contextData.stateLoaded
		    		}
	    		}});
	        }, error => {
	        	console.log(error);
	        });

		axios.post("https://datemomo.com/service/usernotifications.php", this.messengerRequestData) 
	    	.then(response => {
	    		this.setState(function(state) { 
	    			return {contextData : {
	    				userComposite : state.contextData.userComposite,
	    				messengerResponses : state.contextData.messengerResponses,
	    				notificationResponses : response.data,
	    				floatingAccountData : state.contextData.floatingAccountData,
	    				closeLayoutIcon : state.contextData.closeLayoutIcon,
	    				infiniteScrollingPage : state.contextData.infiniteScrollingPage,
	    				displayTimelineCover : state.contextData.displayTimelineCover,
	    				stateLoaded : state.contextData.stateLoaded
		    		}
	    		}});
	        }, error => {
	        	console.log(error);
	        });
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateGradientHeight);
		window.removeEventListener('scroll', this.detectScrollBottom);
	}

	updateGradientHeight() { 
		this.setState(function(state) { 
			return {contextData : {
				userComposite : state.contextData.userComposite,
				messengerResponses : state.contextData.messengerResponses,
				notificationResponses : state.contextData.notificationResponses,
				floatingAccountData : {
					sexualExperienceButtons : state.contextData.floatingAccountData.sexualExperienceButtons,
					sexualInterestButtons : state.contextData.floatingAccountData.sexualInterestButtons,
					sexualCategoryButtons : state.contextData.floatingAccountData.sexualCategoryButtons,
					floatingLayoutDisplay : state.contextData.floatingAccountData.floatingLayoutDisplay,
					userDisplayResponse : state.contextData.floatingAccountData.userDisplayResponse,
					gradientHeight : this.userAccountImage.clientHeight
				},
				closeLayoutIcon : state.contextData.closeLayoutIcon,
				infiniteScrollingPage : state.contextData.infiniteScrollingPage,
				displayTimelineCover : state.contextData.displayTimelineCover,
				stateLoaded : state.contextData.stateLoaded
			}
		}});  
	}

	setGradientHeight(event) {         
		this.setState(function(state) { 
			return {contextData : {
				userComposite : state.contextData.userComposite,
				messengerResponses : state.contextData.messengerResponses,
				notificationResponses : state.contextData.notificationResponses,
				floatingAccountData : {
					sexualExperienceButtons : state.contextData.floatingAccountData.sexualExperienceButtons,
					sexualInterestButtons : state.contextData.floatingAccountData.sexualInterestButtons,
					sexualCategoryButtons : state.contextData.floatingAccountData.sexualCategoryButtons,
					floatingLayoutDisplay : state.contextData.floatingAccountData.floatingLayoutDisplay,
					userDisplayResponse : state.contextData.floatingAccountData.userDisplayResponse,
					gradientHeight : event.target.clientHeight   
				},
				closeLayoutIcon : state.contextData.closeLayoutIcon,
				infiniteScrollingPage : state.contextData.infiniteScrollingPage,
				displayTimelineCover : state.contextData.displayTimelineCover,
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
			return {contextData : {
				userComposite : state.contextData.userComposite,
				messengerResponses : state.contextData.messengerResponses,
				notificationResponses : state.contextData.notificationResponses,
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
				closeLayoutIcon : {
					menuLayoutClass : state.contextData.closeLayoutIcon.menuLayoutClass,
					menuIconClass : state.contextData.closeLayoutIcon.menuIconClass,
					menuIcon : state.contextData.closeLayoutIcon.menuIcon,
					menuLayoutDisplay : "flex",
				},
				infiniteScrollingPage : state.contextData.infiniteScrollingPage,
				displayTimelineCover : state.contextData.displayTimelineCover,
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

	replaceImagePlaceholder(event) {
		var currentUserPosition = event.currentTarget.getAttribute("data-current-user");
		event.currentTarget.src = "https://datemomo.com/client/image/" 
			+ this.state.contextData.userComposite.homeDisplayResponses[currentUserPosition].profilePicture;

		event.currentTarget.onload = function() {
	 		this.setState(function(state) { 
				return {contextData : {
					userComposite : state.contextData.userComposite,
					messengerResponses : state.contextData.messengerResponses,
					notificationResponses : state.contextData.notificationResponses,
					floatingAccountData : state.contextData.floatingAccountData,
					closeLayoutIcon : state.contextData.closeLayoutIcon,
					infiniteScrollingPage : state.contextData.infiniteScrollingPage,
					displayTimelineCover : "none",
					stateLoaded : true
				}
			}});  
		}.bind(this);
	}

	closeFloatingLayout(menuLayoutDisplay) {
		if (menuLayoutDisplay === "none") {
			this.setState(function(state) { 
				return {contextData : {
					userComposite : state.contextData.userComposite,
					messengerResponses : state.contextData.messengerResponses,
					notificationResponses : state.contextData.notificationResponses,
					floatingAccountData : {
						sexualExperienceButtons : state.contextData.floatingAccountData.sexualExperienceButtons,
						sexualInterestButtons : state.contextData.floatingAccountData.sexualInterestButtons,
						sexualCategoryButtons : state.contextData.floatingAccountData.sexualCategoryButtons,
						floatingLayoutDisplay : "none",
						userDisplayResponse : state.contextData.floatingAccountData.userDisplayResponse,
						gradientHeight : state.contextData.floatingAccountData.gradientHeight
					},
					closeLayoutIcon : {
						menuLayoutClass : state.contextData.closeLayoutIcon.menuLayoutClass,
						menuIconClass : state.contextData.closeLayoutIcon.menuIconClass,
						menuIcon : state.contextData.closeLayoutIcon.menuIcon,
						menuLayoutDisplay : "none",
					},
					infiniteScrollingPage : state.contextData.infiniteScrollingPage,
					displayTimelineCover : state.contextData.displayTimelineCover,
					stateLoaded : state.contextData.stateLoaded
				}
			}});  
		}
	}

	clickLikeUser(event) {
		var currentUserLiked = true;
		var currentUserPosition = event.currentTarget.getAttribute("data-current-user");

		if (this.state.contextData.userComposite.homeDisplayResponses[currentUserPosition].liked) {
			currentUserLiked = false;
		} 

		var homeDisplayResponses = this.state.contextData.userComposite.homeDisplayResponses;
		homeDisplayResponses[currentUserPosition].liked = currentUserLiked;

		this.setState(function(state) { 
			return {contextData : {
				userComposite : {
					homeDisplayResponses : homeDisplayResponses,
					thousandRandomCounter : state.contextData.userComposite.thousandRandomCounter
				},
				messengerResponses : state.contextData.messengerResponses,
				notificationResponses : state.contextData.notificationResponses,
				floatingAccountData : state.contextData.floatingAccountData,
				closeLayoutIcon : state.contextData.closeLayoutIcon,
				infiniteScrollingPage : state.contextData.infiniteScrollingPage,
				displayTimelineCover : state.contextData.displayTimelineCover,
				stateLoaded : state.contextData.stateLoaded
			}
		}});  

		var likeRequestData = {
			memberId : this.currentUser.memberId,
            liked : this.state.contextData.userComposite.homeDisplayResponses[currentUserPosition].liked,
			likedUserId : this.state.contextData.userComposite.homeDisplayResponses[currentUserPosition].memberId
		};

		axios.post("https://datemomo.com/service/likeuser.php", likeRequestData)
	    	.then(response => {
	    		// console.log("Action proceeded with positive response from the server");
	        }, error => {
	        	console.log(error);
	        });
	}

	detectScrollBottom() {        
		if ((this.homeDisplayScroller.scrollHeight - 
			this.homeDisplayScroller.scrollTop) <= (this.homeDisplayScroller.clientHeight 
			+ (this.homeDisplayScroller.clientHeight / 2))) {
			if (this.state.contextData.infiniteScrollingPage.totalAvailablePages < 
				this.state.contextData.userComposite.thousandRandomCounter.length) {
				window.removeEventListener('scroll', this.detectScrollBottom);

				this.setState(function(state) { 
					return {contextData : {
						userComposite : state.contextData.userComposite,
						messengerResponses : state.contextData.messengerResponses,
						notificationResponses : state.contextData.notificationResponses,
						floatingAccountData : state.contextData.floatingAccountData,
						closeLayoutIcon : state.contextData.closeLayoutIcon,
						infiniteScrollingPage : {
							colorLoadingDisplay : "flex",
							totalAvailablePages : state.contextData.infiniteScrollingPage.totalAvailablePages,
							lastDisplayPage : state.contextData.infiniteScrollingPage.lastDisplayPage
						},
						displayTimelineCover : state.contextData.displayTimelineCover,
						stateLoaded : false
					}
				}});  

				var tenIterationCounter = 0;
				var moreMatchedUserRequest = {
					memberId : this.currentUser.memberId,
					nextMatchedUsersIdArray : []
				};				

				var countStartindex = this.state.contextData.infiniteScrollingPage.lastDisplayPage + 1;
        
				for (var i = countStartindex; i < this.state.contextData.userComposite.thousandRandomCounter.length; i++) {
					moreMatchedUserRequest.nextMatchedUsersIdArray.push(this.state.contextData.userComposite.thousandRandomCounter[i]);
					tenIterationCounter++

                    if (tenIterationCounter >= 10) {
                        break
                    }
				}

				axios.post("https://datemomo.com/service/morematcheduserdata.php", moreMatchedUserRequest)
					.then(response => {
			    		var homeDisplayResponsesData = this.state.contextData.userComposite.homeDisplayResponses.concat(response.data);

			    		var memberIdArray = [];
			    		var homeDisplayResponses = [];

			    		for (var i = 0; i < homeDisplayResponsesData.length; i++) {
			    			if (memberIdArray.indexOf(homeDisplayResponsesData[i].memberId) < 0) {
			    				memberIdArray.push(homeDisplayResponsesData[i].memberId);
			    				homeDisplayResponses.push(homeDisplayResponsesData[i]);
			    			}
			    		}

			    		var totalAvailablePages = homeDisplayResponses.length;
			    		var lastDisplayPage = this.state.contextData.userComposite.thousandRandomCounter
			    			.indexOf(homeDisplayResponses[homeDisplayResponses.length - 1].memberId);
       
						this.setState(function(state) { 
							return {contextData : {
								userComposite : {
									homeDisplayResponses : homeDisplayResponses,
									thousandRandomCounter : state.contextData.userComposite.thousandRandomCounter
								},
								messengerResponses : state.contextData.messengerResponses,
								notificationResponses : state.contextData.notificationResponses,
								floatingAccountData : state.contextData.floatingAccountData,
								closeLayoutIcon : state.contextData.closeLayoutIcon,
								infiniteScrollingPage : {
									colorLoadingDisplay : "none",
									totalAvailablePages : totalAvailablePages,
									lastDisplayPage : lastDisplayPage
								},
								displayTimelineCover : state.contextData.displayTimelineCover,
								stateLoaded : true
							}
						}});  

						window.addEventListener('scroll', this.detectScrollBottom);
			        }, error => {              
						this.setState(function(state) { 
							return {contextData : {
								userComposite : state.contextData.userComposite,
								messengerResponses : state.contextData.messengerResponses,
								notificationResponses : state.contextData.notificationResponses,
								floatingAccountData : state.contextData.floatingAccountData,
								closeLayoutIcon : state.contextData.closeLayoutIcon,
								infiniteScrollingPage : {
									colorLoadingDisplay : "none",
									totalAvailablePages : state.contextData.infiniteScrollingPage.totalAvailablePages,
									lastDisplayPage : state.contextData.infiniteScrollingPage.lastDisplayPage
								},
								displayTimelineCover : state.contextData.displayTimelineCover,
								stateLoaded : true
							}
						}});  

						window.addEventListener('scroll', this.detectScrollBottom);
			        	console.log(error);
			        });
			} else {
				window.addEventListener('scroll', this.detectScrollBottom);

				this.setState(function(state) { 
					return {contextData : {
						userComposite : state.contextData.userComposite,
						messengerResponses : state.contextData.messengerResponses,
						notificationResponses : state.contextData.notificationResponses,
						floatingAccountData : state.contextData.floatingAccountData,
						closeLayoutIcon : state.contextData.closeLayoutIcon,
						infiniteScrollingPage : {
							colorLoadingDisplay : "none",
							totalAvailablePages : state.contextData.infiniteScrollingPage.totalAvailablePages,
							lastDisplayPage : state.contextData.infiniteScrollingPage.lastDisplayPage
						},
						displayTimelineCover : state.contextData.displayTimelineCover,
						stateLoaded : true
					}
				}});  
			}
		}
	}

	displayMessengerContent() {
		if (this.state.contextData.messengerResponses.length > 0) {
			var messengerComposite = [];

			for (var i = 0; i < this.state.contextData.messengerResponses.length; i++) {
				var messengerContent = {
					messengerResponse : this.state.contextData.messengerResponses[i],
					messengerClasses : {
						messengerContentLayout : "activeMessengerContent messengerContentTimeline",
						chatMateUserName : "chatMateUserName chatMateUserNameTimeline",
						roundPictureClass : "emptyMessengerPicture messengerPictureTimeline",
						roundPictureLayout : "roundPictureContainer",
						userNameMessageLayout : "userNameMessageLayout userNameMessageLayoutTimeline",
						messagePropertiesLayout : "messagePropertiesLayout",
						unreadMessageCounter : "unreadMessageCounter unreadMessageCounterTimeline basicButton",
						lastMessageDate : "lastMessageDate",
						timeFullText : false
					}
				}
   
				messengerComposite.push(messengerContent);
              
				if (i > 0) {
					break;
				}
			}
       
			return (
				<ActiveMessenger activeMessengerComposite={messengerComposite} />
			);
		} else {
			// return (
			// empty messenger message 
			// );
		}
	}

	displayNotificationContent() {
		if (this.state.contextData.notificationResponses.length > 0) {
			var notificationComposite = [];
			
			for (var i = 0; i < this.state.contextData.notificationResponses.length; i++) {
				var notificationContent = {
					notificationResponse : this.state.contextData.notificationResponses[i],
					notificationClasses : {
						notificationContentLayout : "activeMessengerContent notificationContentTimeline",
						notificationTitle : "notificationTitleTimeline",
						roundPictureClass : "emptyMessengerPicture messengerPictureTimeline",
						roundPictureLayout : "roundPictureContainer",
						notificationLayout : "notificationComponentLayout notificationTimeline",
						notifierUserName : "notifierUserName"
					}
				}

				notificationComposite.push(notificationContent);

				if (i > 0) {
					break;
				}
			}
   
			return (
				<NotificationIterator notificationComposite={notificationComposite} />
			);
		} else {
			// return (
			// empty notification message 
			// );
		}
	}

	openUserGallery(buttonClicked) {
		if (buttonClicked) {
			// navigate to user gallery
		}
	}

	editUserProfile(buttonClicked) {
		if (buttonClicked) {
			// window.location.assign("/profile");
		}
	}

	openUserProfile(buttonClicked) {
		if (buttonClicked) {
			window.location.assign("/profile");
		}
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
              
		var profilePictureParts = {
			roundPicture : "https://datemomo.com/client/image/" + 
				this.currentUser.profilePicture,
			pictureLayoutClass : "profilePictureLayout pictureLayoutClass",
			profilePictureClass : "profilePictureImage profilePictureClass",
			pictureChangeClass : "profilePictureIcon pictureChangeClass"
		}

		var leftMenuProfileButton = {
			buttonTitle : "View Profile",
			buttonIcon : icon_view_blue,
			leftIconHollowButtonClass : "leftIconHollowButtonClass hollowButton",
			leftHollowButtonContentClass : "leftHollowButtonContentClass",
			hollowButtonLeftIconClass : "hollowButtonLeftIconClass",
			leftHollowButtonTitleClass : "leftHollowButtonTitleClass"
		}

		var leftMenuPhotoButton = {
			buttonTitle : "Photos",
			buttonIcon : icon_gallery_blue,
			leftIconHollowButtonClass : "leftIconHollowButtonClass hollowButton leftMenuPhotoButton",
			leftHollowButtonContentClass : "leftHollowButtonContentClass",
			hollowButtonLeftIconClass : "hollowButtonLeftIconClass",
			leftHollowButtonTitleClass : "leftHollowButtonTitleClass"	
		}

		var leftMenuEditorButton = {
			bottomMenuClass : "bottomMenuLayout bottomMenuClass selectedMenuLayout",
			menuIcon : icon_edit_white
		}

		return (
			<div>
				<div className="outerParentLayout">

					<div className="leftMenuLayout">
						<div className="profileMenuLayout leftMenuContent">
							<div className="profileMenuUpperLayout">
								<IconProfilePicture pictureParts={profilePictureParts} />
								<div className="leftUpperPhotoButtons">
									<LeftIconHollowButton onButtonClicked={this.openUserGallery} buttonParts={leftMenuPhotoButton} />
									<BottomMenuIcon onButtonClicked={this.editUserProfile} menuParts={leftMenuEditorButton} />
								</div>
							</div>
							<div className="profileMenuLowerLayout">
								<div className="leftMenuUserName">
									{this.currentUser.userName.charAt(0).toUpperCase() + 
										this.currentUser.userName.slice(1)}
								</div>
								<div className="leftMenuLocation">
									{(this.currentUser.currentLocation === "") ? 
										"Location Not Set" : this.currentUser.currentLocation}
								</div>
								<LeftIconHollowButton onButtonClicked={this.openUserProfile} buttonParts={leftMenuProfileButton} />
							</div>
						</div>
						<div className="messengerMenuLayout leftMenuContent">
							<div className="leftMenuHeader">Chats</div>
							<div className="messengerMessageLayout">
								{this.displayMessengerContent()}
							</div>
							<div className="messengerFooterLayout">
								<u>Messenger</u>
							</div>
						</div>
						<div className="notificationMenuLayout leftMenuContent">
							<div className="leftMenuHeader">Notifications</div>
							<div className="messengerMessageLayout">
								{this.displayNotificationContent()}								
							</div>
							<div className="messengerFooterLayout">
								<u>Notification</u>
							</div>
						</div>
					</div>

					<div className="scrollView" ref={(homeDisplayScroller) => 
						{this.homeDisplayScroller = homeDisplayScroller}} onScroll={this.detectScrollBottom}>
						{ 
							this.state.contextData.userComposite.homeDisplayResponses.map((homeDisplayUser, index) => ( 
								<div className="timelineWidget"> 
									<img className="centerCropped" onClick={this.displayFloatingLayout} 
										data-current-user={index} src={motion_placeholder} alt="" 
										onLoad={this.replaceImagePlaceholder} /> 
									<div className="bottomContentLayout">
										<div className="userNameLayout" data-current-user={index}  
											onClick={this.displayFloatingLayout}>
											<div className="userNameText">
												{homeDisplayUser.userName.charAt(0).toUpperCase() 
												+ homeDisplayUser.userName.slice(1)}, {homeDisplayUser.age}
											</div>
											<div className="locationText">{(homeDisplayUser.currentLocation === "") ? 
												"Location Not Set" : homeDisplayUser.currentLocation}</div>
										</div>
										<div className="likeIconLayout" ref={(userTimelineLiker) => 
											{this.userTimelineLiker = userTimelineLiker}} data-current-user={index} 
											onClick={this.clickLikeUser}>
											{this.changeLikedIcon(homeDisplayUser.liked)}
										</div>
									</div>
								</div>
							))
						}
						<div className="colorLoaderLayout" style={{display : 
							this.state.contextData.infiniteScrollingPage.colorLoadingDisplay}}>
							<img className="colorLoader" src={color_loader} alt="" />
						</div>
					</div>

				</div>

				<div className="floatingUserAccountLayout" 
					style={{display : this.state.contextData.floatingAccountData.floatingLayoutDisplay}}>
					<div className="floatingUserAccountWidget">
						<img className="floatingUserAccountImage" 
							ref={(userAccountImage) => {this.userAccountImage = userAccountImage}} 
							onLoad={this.setGradientHeight} alt="" src={"https://datemomo.com/client/image/" 
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
							<SexualityBiometrics sexualityButtons={this.state.contextData.floatingAccountData.sexualCategoryButtons} />
							<div className="sexualityHeader">{this.state.contextData.floatingAccountData.userDisplayResponse.userName.charAt(0).toUpperCase() 
								+ this.state.contextData.floatingAccountData.userDisplayResponse.userName.slice(1)} is looking for</div>
							<SexualityBiometrics sexualityButtons={this.state.contextData.floatingAccountData.sexualInterestButtons} />
							<div className="sexualityHeader">{this.state.contextData.floatingAccountData.userDisplayResponse.userName.charAt(0).toUpperCase() 
								+ this.state.contextData.floatingAccountData.userDisplayResponse.userName.slice(1)} sexual fantasies</div>
							<SexualityBiometrics sexualityButtons={this.state.contextData.floatingAccountData.sexualExperienceButtons} />
						</div>
					</div>
				</div>

				<CloseLayoutIcon menuIconParts={this.state.contextData.closeLayoutIcon} onChangeIconDisplay={this.closeFloatingLayout} />
				<div className="timelineCover" style={{display : this.state.contextData.displayTimelineCover}}>
					<div className="colorLoaderLayout">
						<img className="colorLoader" src={color_loader} alt="" />
					</div>
				</div>
			</div>
		);
	}
}

export default Timeline;   


