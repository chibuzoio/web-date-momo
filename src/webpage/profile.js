import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/profile.css';
import '../css/timeline.css';
import '../css/sexuality.css';  
import { getQueryParam } from '../utility/utility';
import icon_edit_blue from '../image/icon_edit_blue.png'; 
import icon_camera_blue from '../image/icon_camera_blue.png';
import { Outlet, Link, useNavigate } from "react-router-dom";
import icon_gallery_blue from '../image/icon_gallery_blue.png'; 
import SexualityBiometrics from '../widget/sexuality_biometrics';
import UserDetailPicture from '../component/user_detail_picture';
import LeftIconHollowButton from '../component/left_icon_hollow_button';

function Profile() {
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

	var visibleFirstThree = "firstThreeLikerUsers";
	var visibleSecondThree = "secondThreeLikerUsers";
	var visibleLikerUserLayout = "allLikerUserLayout";
	var hiddenFirstThree = visibleFirstThree + " hideComponent";
	var hiddenSecondThree = visibleSecondThree + " hideComponent";
	var hiddenLikerUserLayout = visibleLikerUserLayout + " hideComponent";

	const profileLayout = useRef();
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const [userLikerResponses, setUserLikerResponses] = useState([]);

	const [userLikerLayout, setUserLikerLayout] = useState({
		userLikerDisplayTitle : "",
		generalLikerDisplayLayout : hiddenLikerUserLayout,
		firstThreeLikerDisplay : hiddenFirstThree,
		secondThreeLikerDisplay : hiddenSecondThree
	});

	const [userLikerDimensions, setUserLikerDimensions] = useState({
		detailPictureHeight : "0px",
		detailPictureWidth : "0px",
		userNameLabelHeight : "0px",
		topUserNameMargin : "0px"
	});

	const [firstLikerUser, setFirstLikerUser] = useState({
		innerPictureClass : "hideComponent", 
		userDetails : {
			profilePicture : "",
			pictureUserName : "",
			pictureAge : 0
		}
	});

	const [secondLikerUser, setSecondLikerUser] = useState({
		innerPictureClass : "hideComponent", 
		userDetails : {
			profilePicture : "",
			pictureUserName : "",
			pictureAge : 0
		}
	});

	const [thirdLikerUser, setThirdLikerUser] = useState({
		innerPictureClass : "hideComponent", 
		userDetails : {
			profilePicture : "",
			pictureUserName : "",
			pictureAge : 0
		}
	});

	const [fourthLikerUser, setFourthLikerUser] = useState({
		innerPictureClass : "hideComponent", 
		userDetails : {
			profilePicture : "",
			pictureUserName : "",
			pictureAge : 0
		}
	});

	const [fifthLikerUser, setFifthLikerUser] = useState({
		innerPictureClass : "hideComponent", 
		userDetails : {
			profilePicture : "",
			pictureUserName : "",
			pictureAge : 0
		}
	});

	const [sixthLikerUser, setSixthLikerUser] = useState({
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

		loadLikerUserComposite();

		return () => {
			window.removeEventListener('resize', calculatePictureDimensions);
		};
	}, [userLikerResponses]);

	const loadLikerUserComposite = () => {
		axios.post("https://datemomo.com/service/userlikersdata.php", requestData)
	    	.then(response => {
	    		setUserLikerResponses(response.data);
				displayAvailableLiker();
	        }, error => {
	        	console.log(error);
	        });
	} 

	const initializeFirstLikerUser = () => {   
		setFirstLikerUser({
			innerPictureClass : (userLikerResponses[0].userName.length > 0) ? "" : "hideComponent",  
			userDetails : {
				profilePicture : userLikerResponses[0].profilePicture,
				pictureUserName : userLikerResponses[0].userName,
				pictureAge : userLikerResponses[0].age
			}
		});
	}

	const initializeSecondLikerUser = () => {
		setSecondLikerUser({
			innerPictureClass : (userLikerResponses[1].userName.length > 0) ? "" : "hideComponent",  
			userDetails : {
				profilePicture : userLikerResponses[1].profilePicture,
				pictureUserName : userLikerResponses[1].userName,
				pictureAge : userLikerResponses[1].age
			}
		});
	}

	const initializeThirdLikerUser = () => {
		setThirdLikerUser({
			innerPictureClass : (userLikerResponses[2].userName.length > 0) ? "" : "hideComponent",  
			userDetails : {
				profilePicture : userLikerResponses[2].profilePicture,
				pictureUserName : userLikerResponses[2].userName,
				pictureAge : userLikerResponses[2].age
			}
		});
	}

	const initializeFourthLikerUser = () => {
		setFourthLikerUser({
			innerPictureClass : (userLikerResponses[3].userName.length > 0) ? "" : "hideComponent",  
			userDetails : {
				profilePicture : userLikerResponses[3].profilePicture,
				pictureUserName : userLikerResponses[3].userName,
				pictureAge : userLikerResponses[3].age
			}
		});
	}

	const initializeFifthLikerUser = () => {
		setFifthLikerUser({
			innerPictureClass : (userLikerResponses[4].userName.length > 0) ? "" : "hideComponent",  
			userDetails : {
				profilePicture : userLikerResponses[4].profilePicture,
				pictureUserName : userLikerResponses[4].userName,
				pictureAge : userLikerResponses[4].age
			}
		});
	}

	const initializeSixthLikerUser = () => {
		setSixthLikerUser({
			innerPictureClass : (userLikerResponses[5].userName.length > 0) ? "" : "hideComponent",  
			userDetails : {
				profilePicture : userLikerResponses[5].profilePicture,
				pictureUserName : userLikerResponses[5].userName,
				pictureAge : userLikerResponses[5].age
			}
		});
	}

	const displayAvailableLiker = () => {
		var likerDisplayTitle = "";

		if (userLikerResponses.length > 1) {
			likerDisplayTitle = userLikerResponses.length + " People Like You";

			setUserLikerLayout({
				userLikerDisplayTitle : likerDisplayTitle,
				generalLikerDisplayLayout : userLikerLayout.generalLikerDisplayLayout,
				firstThreeLikerDisplay : userLikerLayout.firstThreeLikerDisplay,
				secondThreeLikerDisplay : userLikerLayout.secondThreeLikerDisplay
			});
		}

		if (userLikerResponses.length === 1) {
			likerDisplayTitle = "1 Person Likes You";

			setUserLikerLayout({
				userLikerDisplayTitle : likerDisplayTitle,
				generalLikerDisplayLayout : userLikerLayout.generalLikerDisplayLayout,
				firstThreeLikerDisplay : userLikerLayout.firstThreeLikerDisplay,
				secondThreeLikerDisplay : userLikerLayout.secondThreeLikerDisplay
			});
		}

		if (userLikerResponses.length <= 0) {
			setUserLikerLayout({
				userLikerDisplayTitle : likerDisplayTitle,
				generalLikerDisplayLayout : hiddenLikerUserLayout,
				firstThreeLikerDisplay : hiddenFirstThree,
				secondThreeLikerDisplay : hiddenSecondThree
			});
		} else {
			setUserLikerLayout({
				userLikerDisplayTitle : likerDisplayTitle,
				generalLikerDisplayLayout : visibleLikerUserLayout,
				firstThreeLikerDisplay : visibleFirstThree,
				secondThreeLikerDisplay : hiddenSecondThree
			});

			if (userLikerResponses.length <= 3) {
				setUserLikerLayout({
					userLikerDisplayTitle : likerDisplayTitle,
					generalLikerDisplayLayout : visibleLikerUserLayout,
					firstThreeLikerDisplay : visibleFirstThree,
					secondThreeLikerDisplay : hiddenSecondThree
				});

				if (userLikerResponses.length === 1) {
					initializeFirstLikerUser();
				}

				if (userLikerResponses.length === 2) {
					initializeFirstLikerUser();
					initializeSecondLikerUser();
				}

				if (userLikerResponses.length === 3) {
					initializeFirstLikerUser();
					initializeSecondLikerUser();
					initializeThirdLikerUser();
				}
			} else {
				setUserLikerLayout({
					userLikerDisplayTitle : likerDisplayTitle,
					generalLikerDisplayLayout : visibleLikerUserLayout,
					firstThreeLikerDisplay : visibleFirstThree,
					secondThreeLikerDisplay : visibleSecondThree
				});

				if (userLikerResponses.length === 4) {
					initializeFirstLikerUser();
					initializeSecondLikerUser();
					initializeThirdLikerUser();
					initializeFourthLikerUser();
				}

				if (userLikerResponses.length === 5) {
					initializeFirstLikerUser();
					initializeSecondLikerUser();
					initializeThirdLikerUser();
					initializeFourthLikerUser();
					initializeFifthLikerUser();
				}

				if (userLikerResponses.length === 6) {
					initializeFirstLikerUser();
					initializeSecondLikerUser();
					initializeThirdLikerUser();
					initializeFourthLikerUser();
					initializeFifthLikerUser();
					initializeSixthLikerUser();						
				}
                
				if (userLikerResponses.length > 6) {
					// display the count of users not displayed over the 6th user layout 
					initializeFirstLikerUser();
					initializeSecondLikerUser();
					initializeThirdLikerUser();
					initializeFourthLikerUser();
					initializeFifthLikerUser();
					initializeSixthLikerUser();
				}
			}
		}
	}

	const calculatePictureDimensions = () => {
		var browserWidth = profileLayout.current.clientWidth;  
		var sumOfPictureMargins = (8 / 100) * browserWidth;
		var totalPictureWidth = browserWidth - sumOfPictureMargins;
		var eachPictureWidth = totalPictureWidth / 3;
		var eachPictureHeight = 1.1 * eachPictureWidth;
		var userNameLabel = (19.48052 / 100) * eachPictureHeight;
		var userNameTopMargin = (eachPictureHeight * (-34)) / 154; // (newHeight * oldMargin) / oldHeight
	
		setUserLikerDimensions({
			detailPictureHeight : eachPictureHeight + "px",
			detailPictureWidth : eachPictureWidth + "px",
			userNameLabelHeight : userNameLabel + "px",
			topUserNameMargin : userNameTopMargin + "px"
		});
	}

	const buildSexualExperienceButtons = () => {
		var sexualExperienceButtons = [];

        if (currentUser.sixtyNineExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "69", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.analSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.givenHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.missionaryExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.oneNightStandExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.orgySexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.poolSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.receivedHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.carSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.publicSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.cameraSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.threesomeExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.sexToyExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.videoSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualExperienceButtons;
	} 

	const buildSexualInterestButtons = () => {
		var sexualInterestButtons = [];

        if (currentUser.bisexualInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.friendshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.gayInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.lesbianInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.relationshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.straightInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.sugarDaddyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.sugarMommyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.toyBoyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.toyGirlInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
                
		return sexualInterestButtons;
	} 

	const buildSexualCategoryButtons = () => {
		var sexualCategoryButtons = [];

        if (currentUser.bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (currentUser.toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }

		return sexualCategoryButtons;
	} 
          
	return ( 			
		<div className="scrollView">
			<div className="dateMomoProfileLayout" ref={profileLayout}> 
				<div className="pictureUserNameLayout">
					<div className="profilePictureContainer">
						<div className="profilePictureLayout">
							<img className="profilePictureImage" 
								alt="" src={"https://datemomo.com/client/image/" 
								+ currentUser.profilePicture} />
							<img className="profilePictureIcon" alt="" src={icon_camera_blue} />
						</div>
					</div>
					<div className="userNameLocationLayout">
						<div className="userNameAgeText">{currentUser.userName.charAt(0).toUpperCase() 
							+ currentUser.userName.slice(1)}, {currentUser.age}</div>
						<div className="userLocationText">{currentUser.currentLocation}</div>
						<div className="currentStatusText">{currentUser.userStatus}</div>
					</div>
				</div>
				<div className="profileButtonLayout">
					<LeftIconHollowButton buttonParts={pictureGalleryButton} />
					<LeftIconHollowButton buttonParts={editProfileButton} />
				</div>
				<div className={userLikerLayout.generalLikerDisplayLayout}> 
					<div className="userlikerCount">{userLikerLayout.userLikerDisplayTitle}</div>
					<div className={userLikerLayout.firstThreeLikerDisplay}>
						<UserDetailPicture userDetailParts={firstLikerUser} dimension={userLikerDimensions} />
						<UserDetailPicture userDetailParts={secondLikerUser} dimension={userLikerDimensions} />
						<UserDetailPicture userDetailParts={thirdLikerUser} dimension={userLikerDimensions} />
					</div>
					<div className={userLikerLayout.secondThreeLikerDisplay}>
						<UserDetailPicture userDetailParts={fourthLikerUser} dimension={userLikerDimensions} />
						<UserDetailPicture userDetailParts={fifthLikerUser} dimension={userLikerDimensions} />
						<UserDetailPicture userDetailParts={sixthLikerUser} dimension={userLikerDimensions} />
					</div>
				</div>
				<div className="userLikerSexualityLayout">
					<div className="sexualityHeader">My sexuality</div>
					<SexualityBiometrics sexualityButtons={buildSexualCategoryButtons()} />
					<div className="sexualityHeader">My Interests</div>
					<SexualityBiometrics sexualityButtons={buildSexualInterestButtons()} />
					<div className="sexualityHeader">My Experiences</div>
					<SexualityBiometrics sexualityButtons={buildSexualExperienceButtons()} />
				</div>
			</div>
		</div>
	);
}

export default Profile;   


