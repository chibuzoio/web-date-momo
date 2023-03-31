import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/style.css';
import '../css/profile.css';
import '../css/timeline.css';
import '../css/sexuality.css';  
import '../css/picture_upload.css';
import * as faceapi from 'face-api.js';
import icon_edit_blue from '../image/icon_edit_blue.png'; 
import icon_camera_blue from '../image/icon_camera_blue.png';
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import icon_gallery_blue from '../image/icon_gallery_blue.png'; 
import SexualityBiometrics from '../widget/sexuality_biometrics';
import UserDetailPicture from '../component/user_detail_picture';
import IconProfilePicture from '../component/icon_profile_picture'; 
import LeftIconHollowButton from '../component/left_icon_hollow_button';

function Profile() {
	var base64String = "";
	var pictureUpdateRequest = {
		memberId : 0,
		imageWidth : 0,
		imageHeight : 0,
		base64Picture : ""
	};

	var editProfileButton = {
		buttonTitle : "Edit Profile",
		buttonIcon : icon_edit_blue,
		leftIconHollowButtonLayout : "leftIconHollowButton buttonTopMargin " + 
			"greyHollowButton floatingAccountButton",
		leftIconHollowButtonIcon : "hollowButtonLeftIcon",
		leftIconHollowButtonTitle : "leftHollowButtonTitle"
	};

	var pictureGalleryButton = {
		buttonTitle : "Photos",
		buttonIcon : icon_gallery_blue,
		leftIconHollowButtonLayout : "leftIconHollowButton buttonTopMargin " + 
			"greyHollowButton floatingAccountButton",
		leftIconHollowButtonIcon : "hollowButtonLeftIcon",
		leftIconHollowButtonTitle : "leftHollowButtonTitle"
	};

	var visibleFirstThree = "firstThreeLikerUsers";
	var visibleSecondThree = "secondThreeLikerUsers";
	var visibleLikerUserLayout = "allLikerUserLayout";
	var hiddenFirstThree = visibleFirstThree + " hideComponent";
	var hiddenSecondThree = visibleSecondThree + " hideComponent";
	var hiddenLikerUserLayout = visibleLikerUserLayout + " hideComponent";

	const params = useParams();
	const navigate = useNavigate();
	const profileLayout = useRef();
	const selectPictureButton = useRef();

	const MODEL_URL = process.env.PUBLIC_URL + '/models';
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	var profilePictureParts = {
		roundPicture : "https://datemomo.com/client/image/" + currentUser.profilePicture,
		pictureLayoutClass : "profilePictureLayout",
		profilePictureClass : "profilePictureImage",
		pictureChangeClass : "profilePictureIcon"
	}

	const [userLikerResponses, setUserLikerResponses] = useState([]);
	const [userProfileResponse, setUserProfileResponse] = useState({
		memberId : 0,
        age : 0,
        sex : "",
        fullName : "",
        userName : "",
        userStatus : "",
        phoneNumber : "",
        emailAddress : "",
        profilePicture : "",
        userBlockedStatus : 0,
        currentLocation : "",
        registrationDate : "",
        messengerTableName : "",
        liked : false,
        userPictureResponses : [],
        bisexualCategory : 0,
        gayCategory : 0,
        lesbianCategory : 0,
        straightCategory : 0,
        sugarDaddyCategory : 0,
        sugarMommyCategory : 0,
        toyBoyCategory : 0,
        toyGirlCategory : 0,
        bisexualInterest : 0,
        gayInterest : 0,
        lesbianInterest : 0,
        straightInterest : 0,
        friendshipInterest : 0,
        sugarDaddyInterest : 0,
        sugarMommyInterest : 0,
        relationshipInterest : 0,
        toyBoyInterest : 0,
        toyGirlInterest : 0,
        sixtyNineExperience : 0,
        analSexExperience : 0,
        givenHeadExperience : 0,
        oneNightStandExperience : 0,
        orgySexExperience : 0,
        poolSexExperience : 0,
        receivedHeadExperience : 0,
        missionaryExperience : 0,
        carSexExperience : 0,
        publicSexExperience : 0,
        cameraSexExperience : 0,
        threesomeExperience : 0,
        sexToyExperience : 0,
        videoSexExperience : 0
	});
	
	const [pictureUpload, setPictureUpload] = useState({
		picture : "",
		faceCountInPicture : 0,
		imageWidth : 0,
		imageHeight : 0
	});

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
		memberId : params.memberId
	}

	useEffect(() => {
		calculatePictureDimensions();
		window.addEventListener('resize', calculatePictureDimensions);

		async function loadModels(modelUrl) {
		  	Promise.all([
		    	faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl),
		    	faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl),
		    	faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl),
		    	faceapi.nets.faceExpressionNet.loadFromUri(modelUrl),
		  	]).then(() => {
		  		console.log("Models have been loaded here!!!!");
		  	});
		};

		loadModels(MODEL_URL);

		loadUserProfileComposite();

		return () => {
			window.removeEventListener('resize', calculatePictureDimensions);
		};
	}, [userProfileResponse]);

	const loadUserProfileComposite = () => {
		axios.post("https://datemomo.com/service/userinformation.php", requestData)
	    	.then(response => {
	    		setUserProfileResponse(response.data);
	        }, error => {
	        	console.log(error);
	        });

	    if (currentUser.memberId == params.memberId) {
			axios.post("https://datemomo.com/service/userlikersdata.php", requestData)
		    	.then(response => {
		    		setUserLikerResponses(response.data);
		    		displayAvailableLiker();
		        }, error => {
		        	console.log(error);
		        });
		} else {
			setUserLikerLayout({
				userLikerDisplayTitle : userLikerLayout.userLikerDisplayTitle,
				generalLikerDisplayLayout : hiddenLikerUserLayout,
				firstThreeLikerDisplay : userLikerLayout.firstThreeLikerDisplay,
				secondThreeLikerDisplay : userLikerLayout.secondThreeLikerDisplay
			});
		}
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

        if (userProfileResponse.sixtyNineExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "69", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.analSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.givenHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.missionaryExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.oneNightStandExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.orgySexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.poolSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.receivedHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.carSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.publicSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.cameraSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.threesomeExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.sexToyExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.videoSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualExperienceButtons;
	} 

	const buildSexualInterestButtons = () => {
		var sexualInterestButtons = [];

        if (userProfileResponse.bisexualInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.friendshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.gayInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.lesbianInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.relationshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.straightInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.sugarDaddyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.sugarMommyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.toyBoyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.toyGirlInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
                
		return sexualInterestButtons;
	} 

	const buildSexualCategoryButtons = () => {
		var sexualCategoryButtons = [];

        if (userProfileResponse.bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (userProfileResponse.toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }

		return sexualCategoryButtons;
	} 

	const processFaceDetection = async (imageData) => {
		var detections = await faceapi.detectAllFaces(imageData, 
			new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
	   		.then((response) => {     
				setPictureUpload({
					picture : pictureUpload.picture,
					faceCountInPicture : response.length,
					imageWidth : pictureUpload.imageWidth,
					imageHeight : pictureUpload.imageHeight	
				});
	   		});
	}
          
	const handlePictureChange = (event) => {
		if (event.target.files[0] != null) {
			var imageReader = new FileReader();
			imageReader.readAsDataURL(event.target.files[0]);

			imageReader.onload = (event) => {
				var imageData = new Image();
				base64String = event.target.result;

				setPictureUpload({
					picture : base64String,
					faceCountInPicture : pictureUpload.faceCountInPicture,
					imageWidth : pictureUpload.imageWidth,
					imageHeight : pictureUpload.imageHeight
				});

				pictureUpdateRequest.base64Picture = 
					base64String.substring(base64String.indexOf("base64,") + 7);
	        
				imageData.src = base64String;

				processFaceDetection(imageData);

				imageData.onload = () => {
					setPictureUpload({
						picture : pictureUpload.picture,
						faceCountInPicture : pictureUpload.faceCountInPicture,
						imageWidth : imageData.width,
						imageHeight : imageData.height
					});

					pictureUpdateRequest.imageWidth = imageData.width;
					pictureUpdateRequest.imageHeight = imageData.height;

					setTimeout(function() {
						updateProfilePicture();
					}, 1000);
				};
			};

			imageReader.onerror = (error) => {
				console.log("Error gotten here is: " + error);
			}
		}
	}

	const updateProfilePicture = () => {
		pictureUpdateRequest.memberId = currentUser.memberId;

		if (pictureUpload.imageWidth > 0 
			&& pictureUpload.imageHeight > 0 && pictureUpload.faceCountInPicture > 0) {
			axios.post("https://datemomo.com/service/updatepicture.php", pictureUpdateRequest)
		    	.then(response => { 
		    		currentUser.profilePicture = response.data.profilePicture;
					localStorage.setItem("currentUser", JSON.stringify(currentUser));
					window.location.reload(true);
		        }, error => {
		        	console.log(error);
		        });
		} else {
			if (pictureUpload.faceCountInPicture <= 0) {
				// Display no Face In Picture Error Message here

			}      
		}
	}

	const changeProfilePicture = (changePictureClicked) => {
		if (changePictureClicked) {
			selectPictureButton.current.click();
		}
	}

	const openUserGallery = (buttonClicked) => {
		if (buttonClicked) {
			navigate("/gallery/" + currentUser.memberId + "/" + 0);
		}
	}

	const editUserProfile = (buttonClicked) => {
		if (buttonClicked) {
			// window.location.assign("/profile");
		}
	}

	return ( 			
		<div className="scrollView">
			<div className="dateMomoProfileLayout" ref={profileLayout}> 
				<div className="pictureUserNameLayout">
					<div className="profilePictureContainer">
						<input type="file" onChange={handlePictureChange} className="uploadPictureButton"
							ref={selectPictureButton} accept="image/*" />
						<IconProfilePicture onClickPictureChange={changeProfilePicture} 
							pictureParts={profilePictureParts} />
					</div>
					<div className="userNameLocationLayout">
						<div className="userNameAgeText">{userProfileResponse.userName.charAt(0).toUpperCase() 
							+ userProfileResponse.userName.slice(1)}, {userProfileResponse.age}</div>
						<div className="userLocationText">{userProfileResponse.currentLocation}</div>
						<div className="currentStatusText">{userProfileResponse.userStatus}</div>
					</div>
				</div>
				<div className="profileButtonLayout">
					<LeftIconHollowButton onButtonClicked={openUserGallery} buttonParts={pictureGalleryButton} />
					<LeftIconHollowButton onButtonClicked={editUserProfile} buttonParts={editProfileButton} />
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
					<div className="sexualityHeader">{currentUser.memberId == params.memberId ? 
						"My" : userProfileResponse.userName.charAt(0).toUpperCase() 
						+ userProfileResponse.userName.slice(1)} Sexuality</div>
					<SexualityBiometrics sexualityButtons={buildSexualCategoryButtons()} />
					<div className="sexualityHeader">{currentUser.memberId == params.memberId ? 
						"My" : userProfileResponse.userName.charAt(0).toUpperCase() 
						+ userProfileResponse.userName.slice(1)} Interests</div>
					<SexualityBiometrics sexualityButtons={buildSexualInterestButtons()} />
					<div className="sexualityHeader">{currentUser.memberId == params.memberId ? 
						"My" : userProfileResponse.userName.charAt(0).toUpperCase() 
						+ userProfileResponse.userName.slice(1)} Experiences</div>
					<SexualityBiometrics sexualityButtons={buildSexualExperienceButtons()} />
				</div>
			</div>
		</div>
	);
}

export default Profile;   


