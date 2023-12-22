import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import '../css/picture_upload.css';
import '../css/floating_account.css';
import { useNavigate, useLocation } from "react-router-dom";
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

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	console.log("currentUser data composite here is " + JSON.stringify(currentUser));

	const location = useLocation();
	const navigate = useNavigate();
	const userAccountImage = useRef();
	const homeDisplayScroller = useRef();
	const [userComposite, setUserComposite] = useState({
		homeDisplayResponses : [],
		thousandRandomCounter : []
	});

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

	if (currentUser != null) {
		if (Object.keys(currentUser).length > 0) {
			if (currentUser.authenticated === false) {
				window.location.replace("/login");
			}     
		} else {
			window.location.replace("/login");
		}
	} else {
		window.location.replace("/login");
	}

	var requestData = {
		memberId : currentUser.userInformationData.memberId,
		age : currentUser.userInformationData.age,
		sex : currentUser.userInformationData.sex,
		registrationDate : currentUser.userInformationData.registrationDate,
    	bisexualCategory : currentUser.userSexualityData.bisexualCategory,
    	gayCategory : currentUser.userSexualityData.gayCategory,
    	lesbianCategory : currentUser.userSexualityData.lesbianCategory,
    	straightCategory : currentUser.userSexualityData.straightCategory,
    	sugarDaddyCategory : currentUser.userSexualityData.sugarDaddyCategory,
    	sugarMommyCategory : currentUser.userSexualityData.sugarMommyCategory,
    	toyBoyCategory : currentUser.userSexualityData.toyBoyCategory,
    	toyGirlCategory : currentUser.userSexualityData.toyGirlCategory,
    	bisexualInterest : currentUser.userInterestData.bisexualInterest,
    	gayInterest : currentUser.userInterestData.gayInterest,
    	lesbianInterest : currentUser.userInterestData.lesbianInterest,
    	straightInterest : currentUser.userInterestData.straightInterest,
    	friendshipInterest : currentUser.userInterestData.friendshipInterest,
    	sugarDaddyInterest : currentUser.userInterestData.sugarDaddyInterest,
    	sugarMommyInterest : currentUser.userInterestData.sugarMommyInterest,
    	relationshipInterest : currentUser.userInterestData.relationshipInterest,
    	toyBoyInterest : currentUser.userInterestData.toyBoyInterest,
    	toyGirlInterest : currentUser.userInterestData.toyGirlInterest,
    	sixtyNineExperience : currentUser.userExperienceData.sixtyNineExperience,
    	analSexExperience : currentUser.userExperienceData.analSexExperience,
    	givenHeadExperience : currentUser.userExperienceData.givenHeadExperience,
    	missionaryExperience : currentUser.userExperienceData.missionaryExperience,
    	oneNightStandExperience : currentUser.userExperienceData.oneNightStandExperience,
    	orgySexExperience : currentUser.userExperienceData.orgySexExperience,
    	poolSexExperience : currentUser.userExperienceData.poolSexExperience,
    	receivedHeadExperience : currentUser.userExperienceData.receivedHeadExperience,
    	carSexExperience : currentUser.userExperienceData.carSexExperience,
    	publicSexExperience : currentUser.userExperienceData.publicSexExperience,
    	cameraSexExperience : currentUser.userExperienceData.cameraSexExperience,
    	threesomeExperience : currentUser.userExperienceData.threesomeExperience,
    	sexToyExperience : currentUser.userExperienceData.sexToyExperience,
    	videoSexExperience : currentUser.userExperienceData.videoSexExperience
	};

	useEffect(() => {
		window.addEventListener('resize', updateGradientHeight);
		window.addEventListener('scroll', detectScrollBottom);

		loadUserComposite();

	    return () => {
	    	window.removeEventListener('resize', updateGradientHeight);
			window.removeEventListener('scroll', detectScrollBottom);
	    };
	}, []);

	const loadUserComposite = () => {
		axios.post("http://localhost:1337/matcheduserdata", requestData)
			.then(response => {
				setUserComposite(response.data);

				setInfiniteScrollLoader({
					animationLayout : hiddenAnimationClass,
					animationImageClass : infiniteScrollLoader.animationImageClass,
					animationMotionIcon : infiniteScrollLoader.animationMotionIcon
				});

				setInfiniteScrollingPage({
	    			totalAvailablePages : response.data.homeDisplayResponses.length,
	   				lastDisplayPage : response.data.homeDisplayResponses.length - 1
				});
	        }, error => {
	        	console.log(error);
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
			currentLocation : userComposite.homeDisplayResponses[currentUserPosition].userInformationData.currentLocation,
			profilePicture : userComposite.homeDisplayResponses[currentUserPosition].userInformationData.profilePicture,
			userStatus : userComposite.homeDisplayResponses[currentUserPosition].userInformationData.userStatus,
			userName : userComposite.homeDisplayResponses[currentUserPosition].userInformationData.userName,
			age : userComposite.homeDisplayResponses[currentUserPosition].userInformationData.age
		});

		setCloseLayoutIcon({
			menuLayoutClass : visibleMenuLayout,
			menuIconClass : closeLayoutIcon.menuIconClass,
			menuIcon : closeLayoutIcon.menuIcon
		});
	}

	const buildSexualExperienceButtons = (currentPosition) => {
		var sexualExperienceButtons = [];

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.sixtyNineExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "69", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.analSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.givenHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.missionaryExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.oneNightStandExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.orgySexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.poolSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.receivedHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.carSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.publicSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.cameraSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.threesomeExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.sexToyExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userExperienceData.videoSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualExperienceButtons;
	} 

	const buildSexualInterestButtons = (currentPosition) => {
		var sexualInterestButtons = [];

        if (userComposite.homeDisplayResponses[currentPosition].userInterestData.bisexualInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userInterestData.friendshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userInterestData.gayInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userInterestData.lesbianInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userInterestData.relationshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userInterestData.straightInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userInterestData.sugarDaddyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userInterestData.sugarMommyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userInterestData.toyBoyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userInterestData.toyGirlInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
                
		return sexualInterestButtons;
	} 

	const buildSexualCategoryButtons = (currentPosition) => {
		var sexualCategoryButtons = [];

        if (userComposite.homeDisplayResponses[currentPosition].userSexualityData.bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userSexualityData.gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userSexualityData.lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userSexualityData.straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userSexualityData.sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userSexualityData.sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userSexualityData.toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].userSexualityData.toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualCategoryButtons;
	} 

	const replaceImagePlaceholder = (event) => {
		var currentUserPosition = event.currentTarget.getAttribute("data-current-user");
		event.currentTarget.src = "http://localhost:1337/image/" 
			+ userComposite.homeDisplayResponses[currentUserPosition].userInformationData.profilePicture;
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

		if (userComposite.homeDisplayResponses[currentUserPosition].liked.liked) {
			currentUserLiked = false;
		} 

		var homeDisplayResponses = userComposite.homeDisplayResponses;
		homeDisplayResponses[currentUserPosition].liked.liked = currentUserLiked;
         
		setUserComposite({
			homeDisplayResponses : homeDisplayResponses,
			thousandRandomCounter : userComposite.thousandRandomCounter
		});
          
		var likeRequestData = {
			memberId : currentUser.userInformationData.memberId,
            liked : userComposite.homeDisplayResponses[currentUserPosition].liked.liked,
			likedUserId : userComposite.homeDisplayResponses[currentUserPosition].userInformationData.memberId
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
			if (infiniteScrollingPage.totalAvailablePages < userComposite.thousandRandomCounter.length) {
				window.removeEventListener('scroll', detectScrollBottom);

				setInfiniteScrollLoader({
					animationLayout : visibleAnimationClass,
					animationImageClass : infiniteScrollLoader.animationImageClass,
					animationMotionIcon : infiniteScrollLoader.animationMotionIcon
				});

				var tenIterationCounter = 0;
				var moreMatchedUserRequest = {
					memberId : currentUser.userInformationData.memberId,
					nextMatchedUsersIdArray : []
				};				

				var countStartindex = infiniteScrollingPage.lastDisplayPage + 1;
        
				for (var i = countStartindex; i < userComposite.thousandRandomCounter.length; i++) {
					moreMatchedUserRequest.nextMatchedUsersIdArray.push(userComposite.thousandRandomCounter[i]);
					tenIterationCounter++

                    if (tenIterationCounter >= 10) {
                        break
                    }
				}

				axios.post("http://localhost:1337/morematcheduserdata", moreMatchedUserRequest)
					.then(response => {
			    		var homeDisplayResponsesData = userComposite.homeDisplayResponses.concat(response.data);

			    		var memberIdArray = [];
			    		var homeDisplayResponses = [];

			    		for (var i = 0; i < homeDisplayResponsesData.length; i++) {
			    			if (memberIdArray.indexOf(homeDisplayResponsesData[i].userInformationData.memberId) < 0) {
			    				memberIdArray.push(homeDisplayResponsesData[i].userInformationData.memberId);
			    				homeDisplayResponses.push(homeDisplayResponsesData[i]);
			    			}
			    		}

			    		var totalAvailablePages = homeDisplayResponses.length;
			    		var lastDisplayPage = userComposite.thousandRandomCounter
			    			.indexOf(homeDisplayResponses[homeDisplayResponses.length - 1].memberId);

						setUserComposite({
							homeDisplayResponses : homeDisplayResponses,
							thousandRandomCounter : userComposite.thousandRandomCounter
						});
          
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

	return (
		<div className="scrollView" ref={homeDisplayScroller} onScroll={detectScrollBottom}>
			<div className="timelineLayout">
				{ 
					userComposite.homeDisplayResponses.map((homeDisplayUser, index) => ( 
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


