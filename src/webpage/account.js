import React, { useState, useEffect, useRef } from 'react';
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
import { Outlet, Link, useNavigate } from "react-router-dom";
import icon_announcement from '../image/icon_announcement.png';
import UserDetailPicture from '../component/user_detail_picture';
import icon_help_and_support from '../image/icon_help_and_support.png';
import icon_terms_and_conditions from '../image/icon_terms_and_conditions.png';

function Account() {
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

	var visibleFirstThree = "firstThreeLikerUsers";
	var visibleLikedUserLayout = "allLikerUserLayout";
	var hiddenFirstThree = visibleFirstThree + " hideComponent";
	var hiddenLikedUserLayout = visibleLikedUserLayout + " hideComponent";
	
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const [userLikedResponses, setUserLikedResponses] = useState([]);
	
	const [userLikedLayout, setUserLikedLayout] = useState({
		userLikedDisplayTitle : "",
		generalLikedDisplayLayout : hiddenLikedUserLayout,
		firstThreeLikedDisplay : hiddenFirstThree
	});

	const [userLikedDimensions, setUserLikedDimensions] = useState({
		detailPictureHeight : "0px",
		detailPictureWidth : "0px",
		userNameLabelHeight : "0px",
		topUserNameMargin : "0px"
	});

	const [firstLikedUser, setFirstLikedUser] = useState({
		innerPictureClass : "hideComponent", 
		userDetails : {
			profilePicture : "",
			pictureUserName : "",
			pictureAge : 0
		}
	});	

	const [secondLikedUser, setSecondLikedUser] = useState({
		innerPictureClass : "hideComponent", 
		userDetails : {
			profilePicture : "",
			pictureUserName : "",
			pictureAge : 0
		}
	});

	const [thirdLikedUser, setThirdLikedUser] = useState({
		innerPictureClass : "hideComponent", 
		userDetails : {
			profilePicture : "",
			pictureUserName : "",
			pictureAge : 0
		}
	});

	const [fourthLikedUser, setFourthLikedUser] = useState({
		innerPictureClass : "hideComponent", 
		userDetails : {
			profilePicture : "",
			pictureUserName : "",
			pictureAge : 0
		}
	});

	var requestData = {
		memberId : currentUser.memberId
	}

	useEffect(() => {
		calculatePictureDimensions();
		window.addEventListener('resize', calculatePictureDimensions);

		loadLikedUserComposite();

		return () => {
			window.removeEventListener('resize', calculatePictureDimensions);
		};
	}, [userLikedResponses]);

	const loadLikedUserComposite = () => {
		axios.post("https://datemomo.com/service/likedusersdata.php", requestData)
			.then(response => {
				setUserLikedResponses(response.data);
				displayAvailableLiked();
		    }, error => {
		    	console.log(error);
		    });
	}

	const logoutCurrentUser = (menuClicked) => {
		if (menuClicked) {
			localStorage.setItem("currentUser", "{}");
			window.location.replace("/login");
		}
	}

	const calculatePictureDimensions = () => {
		var browserWidth = window.innerWidth;  
		var sumOfPictureMargins = (8 / 100) * browserWidth;
		var totalPictureWidth = browserWidth - sumOfPictureMargins;
		var eachPictureWidth = totalPictureWidth / 4;
		var eachPictureHeight = 1.1 * eachPictureWidth;
		var userNameLabel = (19.48052 / 100) * eachPictureHeight;
		var userNameTopMargin = (eachPictureHeight * (-34)) / 154; // (newHeight * oldMargin) / oldHeight

		// console.log("Execution entered here with browserWidth = " + browserWidth);

		setUserLikedDimensions({
			detailPictureHeight : eachPictureHeight + "px",
			detailPictureWidth : eachPictureWidth + "px",
			userNameLabelHeight : userNameLabel + "px",
			topUserNameMargin : userNameTopMargin + "px"
		});
	}

	const initializeFirstLikedUser = () => { 
		setFirstLikedUser({
			innerPictureClass : (userLikedResponses[0].userName.length > 0) ? "" : "hideComponent", 
			userDetails : {
				profilePicture : userLikedResponses[0].profilePicture,
				pictureUserName : userLikedResponses[0].userName,
				pictureAge : userLikedResponses[0].age
			}
		});	
	}

	const initializeSecondLikedUser = () => {      
		setSecondLikedUser({
			innerPictureClass : (userLikedResponses[1].userName.length > 0) ? "" : "hideComponent", 
			userDetails : {
				profilePicture : userLikedResponses[1].profilePicture,
				pictureUserName : userLikedResponses[1].userName,
				pictureAge : userLikedResponses[1].age
			}
		});
	}

	const initializeThirdLikedUser = () => {
		setThirdLikedUser({
			innerPictureClass : (userLikedResponses[2].userName.length > 0) ? "" : "hideComponent", 
			userDetails : {
				profilePicture : userLikedResponses[2].profilePicture,
				pictureUserName : userLikedResponses[2].userName,
				pictureAge : userLikedResponses[2].age
			}
		});		
	}

	const initializeFourthLikedUser = () => {
		setFourthLikedUser({
			innerPictureClass : (userLikedResponses[3].userName.length > 0) ? "" : "hideComponent", 
			userDetails : {
				profilePicture : userLikedResponses[3].profilePicture,
				pictureUserName : userLikedResponses[3].userName,
				pictureAge : userLikedResponses[3].age
			}
		});
	}

	const displayAvailableLiked = () => {
		if (userLikedResponses.length > 0) {
			setUserLikedLayout({
				userLikedDisplayTitle : "People You Like",
				generalLikedDisplayLayout : userLikedLayout.generalLikedDisplayLayout,
				firstThreeLikedDisplay : userLikedLayout.firstThreeLikedDisplay
			});
		}

		if (userLikedResponses.length <= 0) {
			setUserLikedLayout({
				userLikedDisplayTitle : userLikedLayout.userLikedDisplayTitle,
				generalLikedDisplayLayout : hiddenLikedUserLayout,
				firstThreeLikedDisplay : hiddenFirstThree
			});
		} else {
			setUserLikedLayout({
				userLikedDisplayTitle : userLikedLayout.userLikedDisplayTitle,
				generalLikedDisplayLayout : visibleLikedUserLayout,
				firstThreeLikedDisplay : visibleFirstThree
			});

			if (userLikedResponses.length === 1) {
				initializeFirstLikedUser();
			}

			if (userLikedResponses.length === 2) {
				initializeFirstLikedUser();
				initializeSecondLikedUser();
			}

			if (userLikedResponses.length === 3) {
				initializeFirstLikedUser();
				initializeSecondLikedUser();
				initializeThirdLikedUser();
			}
			
			if (userLikedResponses.length === 4) { 
				initializeFirstLikedUser();
				initializeSecondLikedUser();
				initializeThirdLikedUser();
				initializeFourthLikedUser();
			}

			if (userLikedResponses.length > 4) {
				// display the count of users not displayed over the 6th user layout 
				initializeFirstLikedUser();
				initializeSecondLikedUser();
				initializeThirdLikedUser();
				initializeFourthLikedUser();
			}
		}     
	}

	return ( 
		<div className="dateMomoProfileLayout">
			<div className="profilePictureImpactCount">
				<div className="accountPictureLayout">
					<div className="profilePictureLayout">
						<img className="profilePictureImage" 
							alt="" src={"https://datemomo.com/client/image/" 
							+ currentUser.profilePicture} />
					</div>
				</div>
				<div className="impactCountLayout">
					<div className="impactCountHeader">Impact</div>
					<div className="impactCountNumber">{currentUser.impactCount}</div>
				</div>
			</div>
			<div className="likedUsersTitle">People You Like</div>
			<div className={userLikedLayout.firstThreeLikedDisplay}>
				<UserDetailPicture userDetailParts={firstLikedUser} dimension={userLikedDimensions} />
				<UserDetailPicture userDetailParts={secondLikedUser} dimension={userLikedDimensions} />
				<UserDetailPicture userDetailParts={thirdLikedUser} dimension={userLikedDimensions} />
				<UserDetailPicture userDetailParts={fourthLikedUser} dimension={userLikedDimensions} />
			</div>
			<div className="accountMenuLayout">
				<LeftIconMenu iconMenuParts={friendReferenceMenu} /> 
				<LeftIconMenu iconMenuParts={suggestionMenu} /> 
				<LeftIconMenu iconMenuParts={helpSupportMenu} /> 
				<LeftIconMenu iconMenuParts={termsConditionMenu} /> 
				<LeftIconMenu onMenuClicked={logoutCurrentUser} iconMenuParts={accountLogoutMenu} /> 
			</div>
		</div>
	);
}

export default Account;   


