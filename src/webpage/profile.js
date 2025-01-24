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
	const userDataComposite = JSON.parse(localStorage.getItem("userDataComposite"));

	const [faceCountInPicture, setFaceCountInPicture] = useState(0);	
	const [userLikerResponses, setUserLikerResponses] = useState([]);
		    
	const [sexualCompositeButtons, setSexualCompositeButtons] = useState({
		sexualExperienceButtons : [],
		sexualInterestButtons : [],
		sexualCategoryButtons : []
	});

	const [profilePictureParts, setProfilePictureParts] = useState({
		profilePictureClass : "",
		pictureLayoutClass : "",
		pictureChangeClass : "",
		roundPicture : ""
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

		setProfilePictureParts({
			roundPicture : "http://localhost:1337/image/" + userDataComposite.userProfileResponse.userPictureComposite.imageName,
			pictureLayoutClass : "profilePictureLayout",
			profilePictureClass : "profilePictureImage",
			pictureChangeClass : "profilePictureIcon"
		});

		setSexualCompositeButtons({
			sexualExperienceButtons : buildSexualExperienceButtons(),
			sexualInterestButtons : buildSexualInterestButtons(),
			sexualCategoryButtons : buildSexualCategoryButtons()
		});

		loadUserLikerComposite();

		return () => {
			window.removeEventListener('resize', calculatePictureDimensions);
		};
	}, [userDataComposite.userProfileResponse]);

	const loadUserLikerComposite = () => {
	    if (userDataComposite.currentUserData.userInformationData.memberId == params.memberId) {
			axios.post("http://localhost:1337/userlikersdata", requestData)
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
   
        if (userDataComposite.userProfileResponse.userExperienceData.sixtyNineExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "69", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.analSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.givenHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.missionaryExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.oneNightStandExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.orgySexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.poolSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.receivedHeadExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.carSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.publicSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.cameraSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.threesomeExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.sexToyExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userExperienceData.videoSexExperience > 0) {
        	sexualExperienceButtons.push({buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"});
        }
           
		return sexualExperienceButtons;
	} 

	const buildSexualInterestButtons = () => {
		var sexualInterestButtons = [];

        if (userDataComposite.userProfileResponse.userInterestData.bisexualInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userInterestData.friendshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userInterestData.gayInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userInterestData.lesbianInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userInterestData.relationshipInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userInterestData.straightInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userInterestData.sugarDaddyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userInterestData.sugarMommyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userInterestData.toyBoyInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userInterestData.toyGirlInterest > 0) {
        	sexualInterestButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }
                
		return sexualInterestButtons;
	} 

	const buildSexualCategoryButtons = () => {
		var sexualCategoryButtons = [];

        if (userDataComposite.userProfileResponse.userSexualityData.bisexualCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userSexualityData.gayCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userSexualityData.lesbianCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userSexualityData.straightCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userSexualityData.sugarDaddyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userSexualityData.sugarMommyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userSexualityData.toyBoyCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"});
        }

        if (userDataComposite.userProfileResponse.userSexualityData.toyGirlCategory > 0) {
        	sexualCategoryButtons.push({buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"});
        }

		return sexualCategoryButtons;
	} 

	const processFaceDetection = async (imageData) => {
		var detections = await faceapi.detectAllFaces(imageData, 
			new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
	   		.then((response) => {     
				setFaceCountInPicture(response.length);
	   		});
	}
          
	const handlePictureChange = (event) => {
		if (event.target.files[0] != null) {
			var imageReader = new FileReader();
			imageReader.readAsDataURL(event.target.files[0]);

			imageReader.onload = (event) => {
				var imageData = new Image();
				base64String = event.target.result;

				imageData.src = base64String;

				processFaceDetection(imageData);

				imageData.onload = () => {
					var localPictureUploadData = {
						picture : base64String,
						imageWidth : imageData.width,
						imageHeight : imageData.height
					};
			
					updateProfilePicture(localPictureUploadData);
				};
			};

			imageReader.onerror = (error) => {
				console.log("Error gotten here is: " + error);
			}
		}
	}

	const updateProfilePicture = (localPictureUploadData) => {
		pictureUpdateRequest.imageWidth = localPictureUploadData.imageWidth;
		pictureUpdateRequest.imageHeight = localPictureUploadData.imageHeight;
		pictureUpdateRequest.base64Picture = localPictureUploadData.base64Picture;
		pictureUpdateRequest.memberId = userDataComposite.currentUserData.userInformationData.memberId;

		if (localPictureUploadData.imageWidth > 0 
			&& localPictureUploadData.imageHeight > 0/*  && faceCountInPicture > 0 */) {
			axios.post("http://localhost:1337/updatepicture", pictureUpdateRequest)
		    	.then(response => { 
		    		userDataComposite.currentUserData.userInformationData.profilePicture = response.data.profilePicture;
					localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));
					window.location.reload(true);
		        }, error => {
		        	console.log(error);
		        });
		} else {
			if (faceCountInPicture <= 0) {
				// Display no Face In Picture Error Message here

			}      
		}
	}

	const changeProfilePicture = (changePictureClicked) => {
		if (changePictureClicked) {
			if (userDataComposite.currentUserData.userInformationData.memberId == params.memberId) {
				selectPictureButton.current.click();
			}
		}
	}

	const openUserGallery = (buttonClicked) => {
		if (buttonClicked) {
			navigate("/gallery/" + userDataComposite.userProfileResponse.memberId + "/" + 0);
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
						<div className="userNameAgeText">{(userDataComposite.userProfileResponse.userInformationData.userName !== undefined ? 
							(userDataComposite.userProfileResponse.userInformationData.userName.charAt(0).toUpperCase() 
								+ userDataComposite.userProfileResponse.userInformationData.userName.slice(1)) : "")}, {userDataComposite.userProfileResponse.userInformationData.age}</div>
						<div className="userLocationText">{userDataComposite.userProfileResponse.userInformationData.currentLocation}</div>
						<div className="currentStatusText">{userDataComposite.userProfileResponse.userInformationData.userStatus}</div>
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
					<div className="sexualityHeader">{userDataComposite.currentUserData.userInformationData.memberId == params.memberId ? 
						"My" : (userDataComposite.userProfileResponse.userInformationData.userName !== undefined ?
						(userDataComposite.userProfileResponse.userInformationData.userName.charAt(0).toUpperCase() 
						+ userDataComposite.userProfileResponse.userInformationData.userName.slice(1)) : "")} Sexuality</div>
					<SexualityBiometrics sexualityButtons={sexualCompositeButtons.sexualCategoryButtons} />
					<div className="sexualityHeader">{userDataComposite.currentUserData.userInformationData.memberId == params.memberId ? 
						"My" : (userDataComposite.userProfileResponse.userInformationData.userName !== undefined ? 
							(userDataComposite.userProfileResponse.userInformationData.userName.charAt(0).toUpperCase() 
							+ userDataComposite.userProfileResponse.userInformationData.userName.slice(1)) : "")} Interests</div>
					<SexualityBiometrics sexualityButtons={sexualCompositeButtons.sexualInterestButtons} />
					<div className="sexualityHeader">{userDataComposite.currentUserData.userInformationData.memberId == params.memberId ? 
						"My" : (userDataComposite.userProfileResponse.userInformationData.userName !== undefined ?
						(userDataComposite.userProfileResponse.userInformationData.userName.charAt(0).toUpperCase() 
						+ userDataComposite.userProfileResponse.userInformationData.userName.slice(1)) : "")} Experiences</div>
					<SexualityBiometrics sexualityButtons={sexualCompositeButtons.sexualExperienceButtons} />
				</div>
			</div>
		</div>
	);
}

export default Profile;   


