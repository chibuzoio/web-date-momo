import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import '../css/picture_upload.css';
import placeholder from '../image/placeholder.jpg'; 
import RoundPicture from '../component/round_picture';
import ActiveMessenger from '../widget/active_messenger';
import LeftMenuSection from '../widget/left_menu_section';
import ProgressAnimation from '../component/progress_animation';
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
import icon_view_blue from '../image/icon_view_blue.png';
import color_loader from '../image/color_loader.gif';
import logo from '../image/datemomo.png';

/*
// send data to another page like this: 
const navigate = useNavigate();
navigate('/other-page', { state: { id: 7, color: 'green' } });

// Receive data from another page like this:  
const {state} = useLocation();
const { id, color } = state; // Read values passed on state
*/

function Gallery() {
	var visibleAnimationClass = "colorLoaderLayout";
	var hiddenAnimationClass = visibleAnimationClass + " hideComponent";
	
	var colorLoaderData = {
		animationLayout : "colorLoaderLayout",
		animationImageClass : "colorLoader",
		animationMotionIcon : color_loader
	}

	// If useParams does not work with 
	// gallery's router construct, use useLocation
	const parameter = useParams();
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	var requestData = {
        memberId = parameter.memberId,
        currentPosition = parameter.currentPosition
	};

	console.log("Parameter values gotten in gallery page are memberId = " 
		+ parameter.memberId + " and " + parameter.currentPosition);

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
		closeLayoutIcon : {
			menuLayoutClass : "menuLayoutClass",
			menuIconClass : "menuIconClass",
			menuIcon : icon_close_white,
			menuLayoutDisplay : "none",
		},
		infiniteScrollingPage : {
			infiniteScrollLoader : {
				animationLayout : this.hiddenAnimationClass,
				animationImageClass : "colorLoader",
				animationMotionIcon : color_loader
			},
			totalAvailablePages : 0,
			lastDisplayPage : 0
		},
		displayTimelineCover : "flex",
		stateLoaded : false
	}}; 
  
	componentDidMount() {
	
		window.addEventListener('resize', this.updateGradientHeight);
		window.addEventListener('scroll', this.detectScrollBottom);

		axios.post("https://datemomo.com/service/matcheduserdata.php", this.requestData)
			.then(response => {
	    		this.setState(function(state) { 
	    			return {contextData : {
	    				userComposite : response.data, 
	    				floatingAccountData : state.contextData.floatingAccountData,
	    				closeLayoutIcon : state.contextData.closeLayoutIcon,
	    				infiniteScrollingPage : {
	    					infiniteScrollLoader : {
								animationLayout : this.hiddenAnimationClass,
								animationImageClass : state.contextData.infiniteScrollingPage.infiniteScrollLoader.animationImageClass,
								animationMotionIcon : state.contextData.infiniteScrollingPage.infiniteScrollLoader.animationMotionIcon
							},
	    					totalAvailablePages : response.data.homeDisplayResponses.length,
	    					lastDisplayPage : response.data.homeDisplayResponses.length - 1
	    				},
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
   
	replaceImagePlaceholder(event) {
		var currentUserPosition = event.currentTarget.getAttribute("data-current-user");
		event.currentTarget.src = "https://datemomo.com/client/image/" 
			+ this.state.contextData.userComposite.homeDisplayResponses[currentUserPosition].profilePicture;

		event.currentTarget.onload = function() {
	 		this.setState(function(state) { 
				return {contextData : {
					userComposite : state.contextData.userComposite,
					floatingAccountData : state.contextData.floatingAccountData,
					closeLayoutIcon : state.contextData.closeLayoutIcon,
					infiniteScrollingPage : state.contextData.infiniteScrollingPage,
					displayTimelineCover : "none",
					stateLoaded : state.contextData.stateLoaded
				}
			}});  
		}.bind(this);
	}

	closeFloatingLayout(menuLayoutDisplay) {
		if (menuLayoutDisplay === "none") {
			this.setState(function(state) { 
				return {contextData : {
					userComposite : state.contextData.userComposite,
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
						floatingAccountData : state.contextData.floatingAccountData,
						closeLayoutIcon : state.contextData.closeLayoutIcon,
						infiniteScrollingPage : {
							infiniteScrollLoader : {
								animationLayout : this.visibleAnimationClass,
								animationImageClass : state.contextData.infiniteScrollingPage.infiniteScrollLoader.animationImageClass,
								animationMotionIcon : state.contextData.infiniteScrollingPage.infiniteScrollLoader.animationMotionIcon
							},
							totalAvailablePages : state.contextData.infiniteScrollingPage.totalAvailablePages,
							lastDisplayPage : state.contextData.infiniteScrollingPage.lastDisplayPage
						},
						displayTimelineCover : state.contextData.displayTimelineCover,
						stateLoaded : state.contextData.stateLoaded
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
								floatingAccountData : state.contextData.floatingAccountData,
								closeLayoutIcon : state.contextData.closeLayoutIcon,
								infiniteScrollingPage : {
									infiniteScrollLoader : {
										animationLayout : this.hiddenAnimationClass,
										animationImageClass : state.contextData.infiniteScrollingPage.infiniteScrollLoader.animationImageClass,
										animationMotionIcon : state.contextData.infiniteScrollingPage.infiniteScrollLoader.animationMotionIcon
									},
									totalAvailablePages : totalAvailablePages,
									lastDisplayPage : lastDisplayPage
								},
								displayTimelineCover : state.contextData.displayTimelineCover,
								stateLoaded : state.contextData.stateLoaded
							}
						}});  

						window.addEventListener('scroll', this.detectScrollBottom);
			        }, error => {              
						this.setState(function(state) { 
							return {contextData : {
								userComposite : state.contextData.userComposite,
								floatingAccountData : state.contextData.floatingAccountData,
								closeLayoutIcon : state.contextData.closeLayoutIcon,
								infiniteScrollingPage : {
									infiniteScrollLoader : {
										animationLayout : this.hiddenAnimationClass,
										animationImageClass : state.contextData.infiniteScrollingPage.infiniteScrollLoader.animationImageClass,
										animationMotionIcon : state.contextData.infiniteScrollingPage.infiniteScrollLoader.animationMotionIcon
									},
									totalAvailablePages : state.contextData.infiniteScrollingPage.totalAvailablePages,
									lastDisplayPage : state.contextData.infiniteScrollingPage.lastDisplayPage
								},
								displayTimelineCover : state.contextData.displayTimelineCover,
								stateLoaded : state.contextData.stateLoaded
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
						floatingAccountData : state.contextData.floatingAccountData,
						closeLayoutIcon : state.contextData.closeLayoutIcon,
						infiniteScrollingPage : {
							infiniteScrollLoader : {
								animationLayout : this.hiddenAnimationClass,
								animationImageClass : state.contextData.infiniteScrollingPage.infiniteScrollLoader.animationImageClass,
								animationMotionIcon : state.contextData.infiniteScrollingPage.infiniteScrollLoader.animationMotionIcon
							},
							totalAvailablePages : state.contextData.infiniteScrollingPage.totalAvailablePages,
							lastDisplayPage : state.contextData.infiniteScrollingPage.lastDisplayPage
						},
						displayTimelineCover : state.contextData.displayTimelineCover,
						stateLoaded : state.contextData.stateLoaded
					}
				}});  
			}
		}
	}

	return (
		<div>
			<div className="outerParentLayout">

				<LeftMenuSection />

				{/*Replace the declarations below with those for picture gallery*/}
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
					<ProgressAnimation animationData={this.state.contextData.infiniteScrollingPage.infiniteScrollLoader} />
				</div>
			</div>

			<div className="timelineCover" style={{display : this.state.contextData.displayTimelineCover}}>
				<ProgressAnimation animationData={colorLoaderData} />
			</div>
		</div>
	);
}

export default Gallery;   


