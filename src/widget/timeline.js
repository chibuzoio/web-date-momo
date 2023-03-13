import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import '../css/picture_upload.css';
import '../css/floating_account.css';
import placeholder from '../image/placeholder.jpg'; 
import RoundPicture from '../component/round_picture';
import ActiveMessenger from '../widget/active_messenger';
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
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
		memberId : currentUser.memberId,
		age : currentUser.age,
		sex : currentUser.sex,
		registrationDate : currentUser.registrationDate,
    	bisexualCategory : currentUser.bisexualCategory,
    	gayCategory : currentUser.gayCategory,
    	lesbianCategory : currentUser.lesbianCategory,
    	straightCategory : currentUser.straightCategory,
    	sugarDaddyCategory : currentUser.sugarDaddyCategory,
    	sugarMommyCategory : currentUser.sugarMommyCategory,
    	toyBoyCategory : currentUser.toyBoyCategory,
    	toyGirlCategory : currentUser.toyGirlCategory,
    	bisexualInterest : currentUser.bisexualInterest,
    	gayInterest : currentUser.gayInterest,
    	lesbianInterest : currentUser.lesbianInterest,
    	straightInterest : currentUser.straightInterest,
    	friendshipInterest : currentUser.friendshipInterest,
    	sugarDaddyInterest : currentUser.sugarDaddyInterest,
    	sugarMommyInterest : currentUser.sugarMommyInterest,
    	relationshipInterest : currentUser.relationshipInterest,
    	toyBoyInterest : currentUser.toyBoyInterest,
    	toyGirlInterest : currentUser.toyGirlInterest,
    	sixtyNineExperience : currentUser.sixtyNineExperience,
    	analSexExperience : currentUser.analSexExperience,
    	givenHeadExperience : currentUser.givenHeadExperience,
    	missionaryExperience : currentUser.missionaryExperience,
    	oneNightStandExperience : currentUser.oneNightStandExperience,
    	orgySexExperience : currentUser.orgySexExperience,
    	poolSexExperience : currentUser.poolSexExperience,
    	receivedHeadExperience : currentUser.receivedHeadExperience,
    	carSexExperience : currentUser.carSexExperience,
    	publicSexExperience : currentUser.publicSexExperience,
    	cameraSexExperience : currentUser.cameraSexExperience,
    	threesomeExperience : currentUser.threesomeExperience,
    	sexToyExperience : currentUser.sexToyExperience,
    	videoSexExperience : currentUser.videoSexExperience
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
		axios.post("https://datemomo.com/service/matcheduserdata.php", requestData)
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
			currentLocation : userComposite.homeDisplayResponses[currentUserPosition].currentLocation,
			profilePicture : userComposite.homeDisplayResponses[currentUserPosition].profilePicture,
			userStatus : userComposite.homeDisplayResponses[currentUserPosition].userStatus,
			userName : userComposite.homeDisplayResponses[currentUserPosition].userName,
			age : userComposite.homeDisplayResponses[currentUserPosition].age
		});

		setCloseLayoutIcon({
			menuLayoutClass : visibleMenuLayout,
			menuIconClass : closeLayoutIcon.menuIconClass,
			menuIcon : closeLayoutIcon.menuIcon
		});
	}

	const buildSexualExperienceButtons = (currentPosition) => {
		var sexualExperienceButtons = [];

        if (userComposite.homeDisplayResponses[currentPosition].sixtyNineExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "69", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].analSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].givenHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].missionaryExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].oneNightStandExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].orgySexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].poolSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].receivedHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].carSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].publicSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].cameraSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].threesomeExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].sexToyExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].videoSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualExperienceButtons;
	} 

	const buildSexualInterestButtons = (currentPosition) => {
		var sexualInterestButtons = [];

        if (userComposite.homeDisplayResponses[currentPosition].bisexualInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].friendshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].gayInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].lesbianInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].relationshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].straightInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].sugarDaddyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].sugarMommyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].toyBoyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].toyGirlInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
                
		return sexualInterestButtons;
	} 

	const buildSexualCategoryButtons = (currentPosition) => {
		var sexualCategoryButtons = [];

        if (userComposite.homeDisplayResponses[currentPosition].bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (userComposite.homeDisplayResponses[currentPosition].toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualCategoryButtons;
	} 

	const replaceImagePlaceholder = (event) => {
		var currentUserPosition = event.currentTarget.getAttribute("data-current-user");
		event.currentTarget.src = "https://datemomo.com/client/image/" 
			+ userComposite.homeDisplayResponses[currentUserPosition].profilePicture;
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

		if (userComposite.homeDisplayResponses[currentUserPosition].liked) {
			currentUserLiked = false;
		} 

		var homeDisplayResponses = userComposite.homeDisplayResponses;
		homeDisplayResponses[currentUserPosition].liked = currentUserLiked;
         
		setUserComposite({
			homeDisplayResponses : homeDisplayResponses,
			thousandRandomCounter : userComposite.thousandRandomCounter
		});
          
		var likeRequestData = {
			memberId : currentUser.memberId,
            liked : userComposite.homeDisplayResponses[currentUserPosition].liked,
			likedUserId : userComposite.homeDisplayResponses[currentUserPosition].memberId
		};

		axios.post("https://datemomo.com/service/likeuser.php", likeRequestData)
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
					memberId : currentUser.memberId,
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

				axios.post("https://datemomo.com/service/morematcheduserdata.php", moreMatchedUserRequest)
					.then(response => {
			    		var homeDisplayResponsesData = userComposite.homeDisplayResponses.concat(response.data);

			    		var memberIdArray = [];
			    		var homeDisplayResponses = [];

			    		for (var i = 0; i < homeDisplayResponsesData.length; i++) {
			    			if (memberIdArray.indexOf(homeDisplayResponsesData[i].memberId) < 0) {
			    				memberIdArray.push(homeDisplayResponsesData[i].memberId);
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
										{homeDisplayUser.userName.charAt(0).toUpperCase() 
										+ homeDisplayUser.userName.slice(1)}, {homeDisplayUser.age}
									</div>
									<div className="locationText"> {(homeDisplayUser.currentLocation === "") ? 
										"Location Not Set" : homeDisplayUser.currentLocation}</div>
								</div>
								<div className="likeIconLayout" data-current-user={index} onClick={clickLikeUser}>
									{changeLikedIcon(homeDisplayUser.liked)}
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
						onLoad={setGradientHeight} alt="" src={"https://datemomo.com/client/image/" 
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


