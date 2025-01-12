import React, { useState, useEffect, useRef } from 'react';
import '../css/style.css';
import '../css/profile.css';
import '../css/timeline.css';
import test_image from '../image/test_image.png';
import icon_logout from '../image/icon_logout.png';
import LeftIconMenu from '../component/left_icon_menu'; 
import icon_suggestion from '../image/icon_suggestion.png';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
	
	const location = useLocation();
	const profileLayout = useRef();
	const userDataComposite = JSON.parse(localStorage.getItem("userDataComposite"));

	// const [userLikedResponses, setUserLikedResponses] = useState([]);
	
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

	useEffect(() => {
		calculatePictureDimensions();
		window.addEventListener('resize', calculatePictureDimensions);

		displayAvailableLiked();

		return () => {
			window.removeEventListener('resize', calculatePictureDimensions);
		};
	}, []);

	const logoutCurrentUser = (menuClicked) => {
		if (menuClicked) {
			localStorage.setItem("userDataComposite", "{}");
			window.location.replace("/login");
		}
	}

	const calculatePictureDimensions = () => {
		var browserWidth = profileLayout.current.clientWidth;  
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
			innerPictureClass : (userDataComposite.likedUserComposite[0].userName.length > 0) ? "" : "hideComponent", 
			userDetails : {
				profilePicture : userDataComposite.likedUserComposite[0].profilePicture,
				pictureUserName : userDataComposite.likedUserComposite[0].userName,
				pictureAge : userDataComposite.likedUserComposite[0].age
			}
		});	
	}

	const initializeSecondLikedUser = () => {      
		setSecondLikedUser({
			innerPictureClass : (userDataComposite.likedUserComposite[1].userName.length > 0) ? "" : "hideComponent", 
			userDetails : {
				profilePicture : userDataComposite.likedUserComposite[1].profilePicture,
				pictureUserName : userDataComposite.likedUserComposite[1].userName,
				pictureAge : userDataComposite.likedUserComposite[1].age
			}
		});
	}

	const initializeThirdLikedUser = () => {
		setThirdLikedUser({
			innerPictureClass : (userDataComposite.likedUserComposite[2].userName.length > 0) ? "" : "hideComponent", 
			userDetails : {
				profilePicture : userDataComposite.likedUserComposite[2].profilePicture,
				pictureUserName : userDataComposite.likedUserComposite[2].userName,
				pictureAge : userDataComposite.likedUserComposite[2].age
			}
		});		
	}

	const initializeFourthLikedUser = () => {
		setFourthLikedUser({
			innerPictureClass : (userDataComposite.likedUserComposite[3].userName.length > 0) ? "" : "hideComponent", 
			userDetails : {
				profilePicture : userDataComposite.likedUserComposite[3].profilePicture,
				pictureUserName : userDataComposite.likedUserComposite[3].userName,
				pictureAge : userDataComposite.likedUserComposite[3].age
			}
		});
	}

	const displayAvailableLiked = () => {
		if (userDataComposite.likedUserComposite.length > 0) {
			setUserLikedLayout({
				userLikedDisplayTitle : "People You Like",
				generalLikedDisplayLayout : userLikedLayout.generalLikedDisplayLayout,
				firstThreeLikedDisplay : userLikedLayout.firstThreeLikedDisplay
			});
		}

		if (userDataComposite.likedUserComposite.length <= 0) {
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

			if (userDataComposite.likedUserComposite.length === 1) {
				initializeFirstLikedUser();
			}

			if (userDataComposite.likedUserComposite.length === 2) {
				initializeFirstLikedUser();
				initializeSecondLikedUser();
			}

			if (userDataComposite.likedUserComposite.length === 3) {
				initializeFirstLikedUser();
				initializeSecondLikedUser();
				initializeThirdLikedUser();
			}
			
			if (userDataComposite.likedUserComposite.length === 4) { 
				initializeFirstLikedUser();
				initializeSecondLikedUser();
				initializeThirdLikedUser();
				initializeFourthLikedUser();
			}

			if (userDataComposite.likedUserComposite.length > 4) {
				// display the count of users not displayed over the 6th user layout 
				initializeFirstLikedUser();
				initializeSecondLikedUser();
				initializeThirdLikedUser();
				initializeFourthLikedUser();
			}
		}     
	}

	return ( 
		<div className="scrollView">
			<div className="dateMomoProfileLayout" ref={profileLayout}>
				<div className="profilePictureImpactCount">
					<div className="accountPictureLayout">
						<div className="profilePictureLayout">
							<img className="profilePictureImage" 
								alt="" src={"http://localhost:1337/image/" 
								+ userDataComposite.currentUserData.userInformationData.profilePicture} />
						</div>
					</div>
					<div className="impactCountLayout">
						<div className="impactCountHeader">Impact</div>
						<div className="impactCountNumber">{userDataComposite.currentUserData.userInformationData.impactCount}</div>
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
		</div>
	);
}

export default Account;   


