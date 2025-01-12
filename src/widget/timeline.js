import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import '../css/picture_upload.css';
import '../css/floating_account.css';
import ProgressAnimation from '../component/progress_animation';
import icon_heart_hollow from '../image/icon_heart_hollow.png';
import icon_heart_red from '../image/icon_heart_red.png';
import icon_message_blue from '../image/icon_message_blue.png';
import CloseLayoutIcon from '../component/close_layout_icon';
import SexualityBiometrics from '../widget/sexuality_biometrics';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import motion_placeholder from '../image/motion_placeholder.gif';
import icon_close_white from '../image/icon_close_white.png';
import icon_view_blue from '../image/icon_view_blue.png';
import color_loader from '../image/color_loader.gif';

function Timeline() {
	var visibleMenuLayout = "menuLayoutClass";
	var visibleTimelineCover = "timelineCover";
	var visibleAnimationClass = "colorLoaderLayout";
	var visibleFloatingLayout = "floatingUserAccountWidget";
	var hiddenMenuLayout = visibleMenuLayout + " hideComponent";
	var hiddenTimelineCover = visibleTimelineCover + " hideComponent";
	var hiddenAnimationClass = visibleAnimationClass + " hideComponent";
	var hiddenFloatingLayout = visibleFloatingLayout + " hideComponent";

	var viewProfileButton = {
		buttonTitle : "View Profile",
		buttonIcon : icon_view_blue,
		leftIconHollowButtonLayout : "leftIconHollowButton buttonTopMargin " + 
			"greyHollowButton floatingAccountButton",
		leftIconHollowButtonIcon : "hollowButtonLeftIcon",
		leftIconHollowButtonTitle : "leftHollowButtonTitle"
	}

	var messageButton = {
		buttonTitle : "Message",
		buttonIcon : icon_message_blue,
		leftIconHollowButtonLayout : "leftIconHollowButton buttonTopMargin " + 
			"floatContentRight greyHollowButton floatingAccountButton",
		leftIconHollowButtonIcon : "hollowButtonLeftIcon",
		leftIconHollowButtonTitle : "leftHollowButtonTitle"
	}

	var colorLoaderData = {
		animationLayout : "colorLoaderLayout",
		animationImageClass : "colorLoader",
		animationMotionIcon : color_loader
	}

	var userDataComposite = JSON.parse(localStorage.getItem("userDataComposite"));

	const userAccountImage = useRef();
	const homeDisplayScroller = useRef();

	const [sexualCompositeButtons, setSexualCompositeButtons] = useState({
		sexualExperienceButtons : [],
		sexualInterestButtons : [],
		sexualCategoryButtons : []
	});

	const [floatingLayoutSettings, setFloatingLayoutSettings] = useState({
		floatingLayoutDisplay : hiddenFloatingLayout,
		gradientHeight : 0
	});

	const [floatingAccountData, setFloatingAccountData] = useState({
		currentLocation : "",
		profilePicture : "",
		userStatus : "",
		userName : "",
		age : 0
	});

	const [closeLayoutIcon, setCloseLayoutIcon] = useState({
		menuLayoutClass : hiddenMenuLayout,
		menuIconClass : "menuIconClass",
		menuIcon : icon_close_white
	});

	const [infiniteScrollLoader, setInfiniteScrollLoader] = useState({
		animationLayout : hiddenAnimationClass,
		animationImageClass : "colorLoader",
		animationMotionIcon : color_loader
	});

	const [infiniteScrollingPage, setInfiniteScrollingPage] = useState({
		totalAvailablePages : 0,
		lastDisplayPage : 0
	});

	const [timelineCoverClass, setTimelineCoverClass] = useState(visibleTimelineCover);

	if (userDataComposite.currentUserData.userInformationData != null) {
		if (Object.keys(userDataComposite.currentUserData.userInformationData).length > 0) {
			if (userDataComposite.currentUserData.userInformationData.authenticated === false) {
				window.location.replace("/login");
			}     
		} else {
			window.location.replace("/login");
		}
	} else {
		window.location.replace("/login");
	}

	useEffect(() => {
		window.addEventListener('resize', updateGradientHeight);
		window.addEventListener('scroll', detectScrollBottom);

		loadTimelineComposite();

	    return () => {
	    	window.removeEventListener('resize', updateGradientHeight);
			window.removeEventListener('scroll', detectScrollBottom);
	    };
	}, []);

	const loadTimelineComposite = () => {
		setInfiniteScrollLoader({
			animationLayout : hiddenAnimationClass,
			animationImageClass : infiniteScrollLoader.animationImageClass,
			animationMotionIcon : infiniteScrollLoader.animationMotionIcon
		});

		setInfiniteScrollingPage({
			totalAvailablePages : userDataComposite.timelineDataComposite.homeDisplayResponses.length,
			lastDisplayPage : userDataComposite.timelineDataComposite.homeDisplayResponses.length - 1
		});
	}
             
	const updateGradientHeight = () => { 
		setFloatingLayoutSettings({
			floatingLayoutDisplay : floatingLayoutSettings.floatingLayoutDisplay,
			gradientHeight : userAccountImage.current.clientHeight
		});
	}

	const setGradientHeight = (event) => {         
		setFloatingLayoutSettings({
			floatingLayoutDisplay : floatingLayoutSettings.floatingLayoutDisplay,
			gradientHeight : event.target.clientHeight   
		});
	}

	const changeLikedIcon = (liked) => {
		if (liked) {
			return (<img className="heartIcon" alt="" src={icon_heart_red}/>);
		} else {
			return (<img className="heartIcon" alt="" src={icon_heart_hollow}/>);
		}
	}

	const displayFloatingLayout = (event) => {     
		var currentUserPosition = event.currentTarget.getAttribute("data-current-user");
        
		setSexualCompositeButtons({
			sexualExperienceButtons : buildSexualExperienceButtons(currentUserPosition),
			sexualInterestButtons : buildSexualInterestButtons(currentUserPosition),
			sexualCategoryButtons : buildSexualCategoryButtons(currentUserPosition)
		});

		setFloatingLayoutSettings({
			floatingLayoutDisplay : visibleFloatingLayout,
			gradientHeight : floatingLayoutSettings.gradientHeight	
		});

		setFloatingAccountData({
			currentLocation : userDataComposite.timelineDataComposite.homeDisplayResponses[currentUserPosition].userInformationData.currentLocation,
			profilePicture : userDataComposite.timelineDataComposite.homeDisplayResponses[currentUserPosition].userInformationData.profilePicture,
			userStatus : userDataComposite.timelineDataComposite.homeDisplayResponses[currentUserPosition].userInformationData.userStatus,
			userName : userDataComposite.timelineDataComposite.homeDisplayResponses[currentUserPosition].userInformationData.userName,
			age : userDataComposite.timelineDataComposite.homeDisplayResponses[currentUserPosition].userInformationData.age
		});

		setCloseLayoutIcon({
			menuLayoutClass : visibleMenuLayout,
			menuIconClass : closeLayoutIcon.menuIconClass,
			menuIcon : closeLayoutIcon.menuIcon
		});
	}

	const buildSexualExperienceButtons = (currentPosition) => {
		var sexualExperienceButtons = [];

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.sixtyNineExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "69", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.analSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.givenHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.missionaryExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.oneNightStandExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.orgySexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.poolSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.receivedHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.carSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.publicSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.cameraSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.threesomeExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.sexToyExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userExperienceData.videoSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualExperienceButtons;
	} 

	const buildSexualInterestButtons = (currentPosition) => {
		var sexualInterestButtons = [];

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userInterestData.bisexualInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userInterestData.friendshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userInterestData.gayInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userInterestData.lesbianInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userInterestData.relationshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userInterestData.straightInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userInterestData.sugarDaddyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userInterestData.sugarMommyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userInterestData.toyBoyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userInterestData.toyGirlInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
                
		return sexualInterestButtons;
	} 

	const buildSexualCategoryButtons = (currentPosition) => {
		var sexualCategoryButtons = [];

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userSexualityData.bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userSexualityData.gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userSexualityData.lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userSexualityData.straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userSexualityData.sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userSexualityData.sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userSexualityData.toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentPosition].userSexualityData.toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualCategoryButtons;
	} 

	const replaceImagePlaceholder = (event) => {
		var currentUserPosition = event.currentTarget.getAttribute("data-current-user");
		event.currentTarget.src = "http://localhost:1337/image/" 
			+ userDataComposite.timelineDataComposite.homeDisplayResponses[currentUserPosition].userInformationData.profilePicture;
		event.currentTarget.onload = () => setTimelineCoverClass(hiddenTimelineCover);
	}

	const closeFloatingLayout = (hideDisplayLayout) => {
		if (hideDisplayLayout) {
			setFloatingLayoutSettings({
				floatingLayoutDisplay : hiddenFloatingLayout,
				gradientHeight : floatingLayoutSettings.gradientHeight	
			});

			setCloseLayoutIcon({
				menuLayoutClass : hiddenMenuLayout,
				menuIconClass : closeLayoutIcon.menuIconClass,
				menuIcon : closeLayoutIcon.menuIcon		
			});
		}
	}

	const clickLikeUser = (event) => {
		var currentUserLiked = true;
		var currentUserPosition = event.currentTarget.getAttribute("data-current-user");

		if (userDataComposite.timelineDataComposite.homeDisplayResponses[currentUserPosition].liked.liked) {
			currentUserLiked = false;
		} 

		var homeDisplayResponses = userDataComposite.timelineDataComposite.homeDisplayResponses;
		homeDisplayResponses[currentUserPosition].liked.liked = currentUserLiked;
         
		userDataComposite.timelineDataComposite.homeDisplayResponses = homeDisplayResponses;

		localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));
        
		var likeRequestData = {
			memberId : userDataComposite.currentUserData.userInformationData.memberId,
            liked : userDataComposite.timelineDataComposite.homeDisplayResponses[currentUserPosition].liked.liked,
			likedUserId : userDataComposite.timelineDataComposite.homeDisplayResponses[currentUserPosition].userInformationData.memberId
		};

		axios.post("http://localhost:1337/likeuser", likeRequestData)
	    	.then(response => {
	    		// console.log("Action proceeded with positive response from the server");
	        }, error => {
	        	console.log(error);
	        });
	}

	const detectScrollBottom = () => {        
		if ((homeDisplayScroller.current.scrollHeight - 
			homeDisplayScroller.current.scrollTop) <= (homeDisplayScroller.current.clientHeight 
			+ (homeDisplayScroller.current.clientHeight / 2))) {
			if (infiniteScrollingPage.totalAvailablePages < userDataComposite.timelineDataComposite.thousandRandomCounter.length) {
				window.removeEventListener('scroll', detectScrollBottom);

				setInfiniteScrollLoader({
					animationLayout : visibleAnimationClass,
					animationImageClass : infiniteScrollLoader.animationImageClass,
					animationMotionIcon : infiniteScrollLoader.animationMotionIcon
				});

				var tenIterationCounter = 0;
				var moreMatchedUserRequest = {
					memberId : userDataComposite.currentUserData.userInformationData.memberId,
					nextMatchedUsersIdArray : []
				};				

				var countStartindex = infiniteScrollingPage.lastDisplayPage + 1;
        
				for (var i = countStartindex; i < userDataComposite.timelineDataComposite.thousandRandomCounter.length; i++) {
					moreMatchedUserRequest.nextMatchedUsersIdArray.push(userDataComposite.timelineDataComposite.thousandRandomCounter[i]);
					tenIterationCounter++

                    if (tenIterationCounter >= 10) {
                        break
                    }
				}

				axios.post("http://localhost:1337/morematcheduserdata", moreMatchedUserRequest)
					.then(response => {
			    		var homeDisplayResponsesData = userDataComposite.timelineDataComposite.homeDisplayResponses.concat(response.data);

			    		var memberIdArray = [];
			    		var homeDisplayResponses = [];

			    		for (var i = 0; i < homeDisplayResponsesData.length; i++) {
			    			if (memberIdArray.indexOf(homeDisplayResponsesData[i].userInformationData.memberId) < 0) {
			    				memberIdArray.push(homeDisplayResponsesData[i].userInformationData.memberId);
			    				homeDisplayResponses.push(homeDisplayResponsesData[i]);
			    			}
			    		}

			    		var totalAvailablePages = homeDisplayResponses.length;
			    		var lastDisplayPage = userDataComposite.timelineDataComposite.thousandRandomCounter
			    			.indexOf(homeDisplayResponses[homeDisplayResponses.length - 1].memberId);

						userDataComposite.timelineDataComposite.homeDisplayResponses = homeDisplayResponses; 

						localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));

						setInfiniteScrollLoader({
							animationLayout : hiddenAnimationClass,
							animationImageClass : infiniteScrollLoader.animationImageClass,
							animationMotionIcon : infiniteScrollLoader.animationMotionIcon
						});

       					setInfiniteScrollingPage({
       						totalAvailablePages : totalAvailablePages,
							lastDisplayPage : lastDisplayPage
       					});

       					window.addEventListener('scroll', detectScrollBottom);
			        }, error => {      
						setInfiniteScrollLoader({
							animationLayout : hiddenAnimationClass,
							animationImageClass : infiniteScrollLoader.animationImageClass,
							animationMotionIcon : infiniteScrollLoader.animationMotionIcon
						});

						window.addEventListener('scroll', detectScrollBottom);
			        	console.log(error);
			        });
			} else {
				window.addEventListener('scroll', detectScrollBottom);

				setInfiniteScrollLoader({
					animationLayout : hiddenAnimationClass,
					animationImageClass : infiniteScrollLoader.animationImageClass,
					animationMotionIcon : infiniteScrollLoader.animationMotionIcon
				});
			}
		}
	}

	// Confirm if loading more pages or liking a user is effected in the UI, using 
	// the variable userDataComposite object or should it be stored in state   

	return (
		<div className="scrollView" ref={homeDisplayScroller} onScroll={detectScrollBottom}>
			<div className="timelineLayout">
				{ 
					userDataComposite.timelineDataComposite.homeDisplayResponses.map((homeDisplayUser, index) => ( 
						<div className="timelineWidget">
							<img className="centerCropped" onClick={displayFloatingLayout} 
								data-current-user={index} src={motion_placeholder} alt="" 
								onLoad={replaceImagePlaceholder} /> 
							<div className="bottomContentLayout">
								<div className="userNameLayout" data-current-user={index}  
									onClick={displayFloatingLayout}>
									<div className="userNameText">
										{homeDisplayUser.userInformationData.userName.charAt(0).toUpperCase() 
										+ homeDisplayUser.userInformationData.userName.slice(1)}, {homeDisplayUser.userInformationData.age}
									</div>
									<div className="locationText"> {(homeDisplayUser.userInformationData.currentLocation === "") ? 
										"Location Not Set" : homeDisplayUser.userInformationData.currentLocation}</div>
								</div>
								<div className="likeIconLayout" data-current-user={index} onClick={clickLikeUser}>
									{changeLikedIcon(homeDisplayUser.liked.liked)}
								</div>
							</div>
						</div>
					))
				}
				<ProgressAnimation animationData={infiniteScrollLoader} />
			</div>

			<div className={floatingLayoutSettings.floatingLayoutDisplay}>

				<div className="floatingAccountImageContainer">
					<img className="floatingUserAccountImage" ref={userAccountImage} 
						onLoad={setGradientHeight} alt="" src={"http://localhost:1337/image/" 
						+ floatingAccountData.profilePicture} />
				</div>					
				<div className="gradientCover" style={{height : floatingLayoutSettings.gradientHeight}}>
					<div className="gradientLayout">
						<div className="gradientUserName">
						{floatingAccountData.userName.charAt(0).toUpperCase() 
						+ floatingAccountData.userName.slice(1)},&nbsp;
						{floatingAccountData.age}</div>
						<div className="gradientLocation">{floatingAccountData.currentLocation}</div>
					</div>
				</div>
				<div className="userStatusText"> {floatingAccountData.userStatus}</div>
				<div className="floatingLayoutButtons">
					<LeftIconHollowButton buttonParts={viewProfileButton} />
					<LeftIconHollowButton buttonParts={messageButton} />
				</div>
				<div className="floatingSexualityLayout">
					<div className="sexualityHeader"> {floatingAccountData.userName.charAt(0).toUpperCase() 
						+ floatingAccountData.userName.slice(1)} sexuality</div>
					<SexualityBiometrics sexualityButtons={sexualCompositeButtons.sexualCategoryButtons} />
					<div className="sexualityHeader"> {floatingAccountData.userName.charAt(0).toUpperCase() 
						+ floatingAccountData.userName.slice(1)} is looking for</div>
					<SexualityBiometrics sexualityButtons={sexualCompositeButtons.sexualInterestButtons} />
					<div className="sexualityHeader"> {floatingAccountData.userName.charAt(0).toUpperCase() 
						+ floatingAccountData.userName.slice(1)} sexual fantasies</div>
					<SexualityBiometrics sexualityButtons={sexualCompositeButtons.sexualExperienceButtons} />
				</div>
				<CloseLayoutIcon menuIconParts={closeLayoutIcon} onChangeIconDisplay={closeFloatingLayout} /> 
			</div>     

			<div className={timelineCoverClass}>
				<ProgressAnimation animationData={colorLoaderData} />
			</div>
		</div>
	);
}

export default Timeline;   


