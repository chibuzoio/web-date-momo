import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import '../css/picture_upload.css';
import '../css/floating_account.css';  
import * as faceapi from 'face-api.js';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import loading_puzzle from '../image/loading_puzzle.gif';
import icon_view_blue from '../image/icon_view_blue.png';
import icon_edit_white from '../image/icon_edit_white.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png'; 
import icon_message_blue from '../image/icon_message_blue.png';
import icon_no_notification from '../image/icon_no_notification.png'; 
import { checkNullInMessenger, selectChosenSticker } from '../utility/utility';
import ActiveMessenger from './active_messenger';
import BottomMenuIcon from '../component/bottom_menu_icon';
import IconProfilePicture from '../component/icon_profile_picture'; 
import NotificationIterator from '../widget/notification_iterator';
import EmptyMessengerContent from '../widget/empty_messenger_content';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import { isJSON } from 'validator';

function LeftMenuSection() {
	var visibleMessengerDisplay = "messengerMessageLayout";
	var visibleEmptyNotification = "emptyMessengerLeftMenu";
	var hiddenMessengerDisplay = visibleMessengerDisplay + " hideComponent";
	var hiddenEmptyNotification = visibleEmptyNotification + " hideComponent";
	var base64String = "";
	var pictureUpdateRequest = {
		memberId : 0,
		imageWidth : 0,
		imageHeight : 0,
		base64Picture : ""
	};
	var messengerRequestData = {};
	var leftMenuPhotoButton = {
		buttonTitle : "Photos",
		buttonIcon : icon_gallery_blue,
		leftIconHollowButtonLayout : "leftMenuPhotoButton",
		leftIconHollowButtonIcon : "leftMenuPhotoIcon",
		leftIconHollowButtonTitle : "leftMenuPhotoTitle"	
	}

	var leftMenuEditorButton = {
		bottomMenuClass : "leftMenuEditorButton selectedMenuLayout",
		bottomMenuIcon : "leftMenuBottomMenuIcon",
		menuIcon : icon_edit_white
	}

	var leftMenuProfileButton = {
		buttonTitle : "View Profile",
		buttonIcon : icon_view_blue,
		leftIconHollowButtonLayout : "leftMenuPhotoButton",
		leftIconHollowButtonIcon : "leftMenuPhotoIcon",
		leftIconHollowButtonTitle : "leftMenuPhotoTitle"
	}

	const MODEL_URL = process.env.PUBLIC_URL + '/models';
	const userDataComposite = JSON.parse(localStorage.getItem("userDataComposite"));

	var profilePictureParts = {
		roundPicture : "http://localhost:1337/image/" + userDataComposite.currentUserData.userInformationData.profilePicture,
		pictureLayoutClass : "profilePictureLayout pictureLayoutClass",
		profilePictureClass : "profilePictureImage profilePictureClass",
		pictureChangeClass : "profilePictureIcon pictureChangeClass"
	}

	const location = useLocation();
	const navigate = useNavigate();
	const selectPictureButton = useRef();
	const [notificationLoader, setNotificationLoader] = useState(hiddenEmptyNotification);
	const [displayMessengerClass, setDisplayMessengerClass] = useState(visibleMessengerDisplay);
	const [emptyNotificationLayout, setEmptyNotificationLayout] = useState(visibleEmptyNotification);
	const [pictureUpload, setPictureUpload] = useState({
		picture : "",
		faceCountInPicture : 0,
		imageWidth : 0,
		imageHeight : 0
	});

	useEffect(() => {
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
	}, []);

	const openUserGallery = (buttonClicked) => {
		if (buttonClicked) {
			// refreshTimelineData();

			navigate("/gallery/" + userDataComposite.currentUserData.userInformationData.memberId + "/" + 0);
		}
	}

	const editUserProfile = (buttonClicked) => {
		if (buttonClicked) {
			// refreshTimelineData();

			// window.location.assign("/profile");
		}
	}

	const refreshTimelineData = () => {
		var timelineRequestData = {
			memberId : userDataComposite.currentUserData.userInformationData.memberId,
			age : userDataComposite.currentUserData.userInformationData.age,
			sex : userDataComposite.currentUserData.userInformationData.sex,
			registrationDate : userDataComposite.currentUserData.userInformationData.registrationDate,
			bisexualCategory : userDataComposite.currentUserData.userSexualityData.bisexualCategory,
			gayCategory : userDataComposite.currentUserData.userSexualityData.gayCategory,
			lesbianCategory : userDataComposite.currentUserData.userSexualityData.lesbianCategory,
			straightCategory : userDataComposite.currentUserData.userSexualityData.straightCategory,
			sugarDaddyCategory : userDataComposite.currentUserData.userSexualityData.sugarDaddyCategory,
			sugarMommyCategory : userDataComposite.currentUserData.userSexualityData.sugarMommyCategory,
			toyBoyCategory : userDataComposite.currentUserData.userSexualityData.toyBoyCategory,
			toyGirlCategory : userDataComposite.currentUserData.userSexualityData.toyGirlCategory,
			bisexualInterest : userDataComposite.currentUserData.userInterestData.bisexualInterest,
			gayInterest : userDataComposite.currentUserData.userInterestData.gayInterest,
			lesbianInterest : userDataComposite.currentUserData.userInterestData.lesbianInterest,
			straightInterest : userDataComposite.currentUserData.userInterestData.straightInterest,
			friendshipInterest : userDataComposite.currentUserData.userInterestData.friendshipInterest,
			sugarDaddyInterest : userDataComposite.currentUserData.userInterestData.sugarDaddyInterest,
			sugarMommyInterest : userDataComposite.currentUserData.userInterestData.sugarMommyInterest,
			relationshipInterest : userDataComposite.currentUserData.userInterestData.relationshipInterest,
			toyBoyInterest : userDataComposite.currentUserData.userInterestData.toyBoyInterest,
			toyGirlInterest : userDataComposite.currentUserData.userInterestData.toyGirlInterest,
			sixtyNineExperience : userDataComposite.currentUserData.userExperienceData.sixtyNineExperience,
			analSexExperience : userDataComposite.currentUserData.userExperienceData.analSexExperience,
			givenHeadExperience : userDataComposite.currentUserData.userExperienceData.givenHeadExperience,
			missionaryExperience : userDataComposite.currentUserData.userExperienceData.missionaryExperience,
			oneNightStandExperience : userDataComposite.currentUserData.userExperienceData.oneNightStandExperience,
			orgySexExperience : userDataComposite.currentUserData.userExperienceData.orgySexExperience,
			poolSexExperience : userDataComposite.currentUserData.userExperienceData.poolSexExperience,
			receivedHeadExperience : userDataComposite.currentUserData.userExperienceData.receivedHeadExperience,
			carSexExperience : userDataComposite.currentUserData.userExperienceData.carSexExperience,
			publicSexExperience : userDataComposite.currentUserData.userExperienceData.publicSexExperience,
			cameraSexExperience : userDataComposite.currentUserData.userExperienceData.cameraSexExperience,
			threesomeExperience : userDataComposite.currentUserData.userExperienceData.threesomeExperience,
			sexToyExperience : userDataComposite.currentUserData.userExperienceData.sexToyExperience,
			videoSexExperience : userDataComposite.currentUserData.userExperienceData.videoSexExperience
		}

		var emptyMessengerRequestData = {
			memberId : userDataComposite.currentUserData.userInformationData.memberId
		};

		axios.post("http://localhost:1337/matcheduserdata", timelineRequestData)
			.then(response => {
				userDataComposite.timelineDataComposite = response.data;

				if (userDataComposite.messengerResponses.length <= 0) {
					axios.post("http://localhost:1337/alluserdata", emptyMessengerRequestData)
						.then(response => {
							userDataComposite.emptyMessengerResponse = response.data;

							localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));
						}, error => {
							console.log(error);
						});
				} else {
					localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));
				}
			}, error => {
				console.log(error);
			});	        
	}

	const openUserProfile = (buttonClicked) => {
		if (buttonClicked) {
			var requestData = {
				memberId : userDataComposite.currentUserData.userInformationData.memberId
			}

			// refreshTimelineData();

			axios.post("http://localhost:1337/userinformation", requestData)
				.then(response => {
					userDataComposite.userProfileResponse = response.data;
			
					localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));

					navigate("/profile/" + userDataComposite.currentUserData.userInformationData.memberId);
				}, error => {
					console.log(error);
				});
		}
	}

	const openUserMessenger = (event) => {
		// refreshTimelineData();

		navigate("/messenger");
	}

	const openUserNotification = (event) => {
		// before you navigate to notification, first load all the required notification composite
		// Already loaded in login script
		// refreshTimelineData();

		navigate("/notification");
	}

	const changeProfilePicture = (changePictureClicked) => {
		if (changePictureClicked) {
			selectPictureButton.current.click();
		}
	}
	
/* 		{
			"userPictureComposite":[
				{
					"imageHeight":755,"imageName":"profile170352578600001.png","imageId":1,"imageWidth":433
				},
				{
					"imageHeight":755,"imageName":"profile170388307100001.png","imageId":3,"imageWidth":433
				}
			],
			"userInformationData":{
				"memberId":1,"registrationDate":"1703525763","currentLocation":"","profilePicture":"profile170388307100001.png","deleteAccount":0,"passwordHash":"$2b$10$xaCGiRVnfsuK87cC5ctXreEjnmJ8HuRj006ypQwc8JDpjAjaODMNW","emailAddress":"","phoneNumber":"","impactCount":1,"userStatus":"Hello dear! Welcome to my profile!","userLevel":"displayMatchedUsers","userName":"Solution","fullName":"","sex":"MALE","age":31
			},
			"userExperienceData":{
				"oneNightStandExperience":1,"receivedHeadExperience":1,"missionaryExperience":1,"threesomeExperience":1,"publicSexExperience":1,"givenHeadExperience":1,"cameraSexExperience":1,"sixtyNineExperience":1,"poolSexExperience":1,"analSexExperience":0,"carSexExperience":1,"orgySexExperience":1
			},
			"messengerTableName":"messenger170352576300001",
			"userSexualityData":{
				"sugarDaddyCategory":1,"sugarMommyCategory":1,"straightCategory":1,"bisexualCategory":1,"lesbianCategory":1,"toyGirlCategory":1,"toyBoyCategory":0,"gayCategory":0
			},
			"userInterestData":{
				"relationshipInterest":0,"sugarDaddyInterest":1,"sugarMommyInterest":1,"friendshipInterest":0,"straightInterest":1,"bisexualInterest":1,"lesbianInterest":1,"toyGirlInterest":1,"toyBoyInterest":1,"gayInterest":0
			},
			"memberId":1,
			"liked":false
		} */

	const loadMessageComposite = (messengerResponse) => {
		var messageRequest = {
			senderId : userDataComposite.currentUserData.userInformationData.memberId,
			receiverId : messengerResponse.chatmateId,
			fullName : messengerResponse.fullName,
			userName : messengerResponse.userName,
			lastActiveTime : "",
			profilePicture : messengerResponse.profilePicture,
			userBlockedStatus : messengerResponse.userBlockedStatus
		};	

		// refreshTimelineData();

		axios.post("http://localhost:1337/usermessagesdata", messageRequest)
			.then(response => {
				navigate("/message", {
					state : {
						messengerResponse : messengerResponse,
						messageResponses : response.data
					}
				});
			}, error => {
				console.log(error);
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

	const updateProfilePicture = () => {
		pictureUpdateRequest.memberId = userDataComposite.currentUserData.userInformationData.memberId;

		if (pictureUpload.imageWidth > 0 
			&& pictureUpload.imageHeight > 0 && pictureUpload.faceCountInPicture > 0) {
			axios.post("http://localhost:1337/updatepicture", pictureUpdateRequest)
		    	.then(response => { 
		    		userDataComposite.currentUserData.userInformationData.profilePicture = response.data.profilePicture;
					localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));
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
  
	const clickNotificationComponent = (notificationEffectorId) => {	
		var requestData = {
			memberId : notificationEffectorId
		};

		// refreshTimelineData();

		axios.post("http://localhost:1337/userinformation", requestData)
			.then(response => {
				userDataComposite.userProfileResponse = response.data;

				localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));

				navigate("/profile/" + notificationEffectorId);
			}, error => {
				console.log(error);
			});
	}

	const clickMessengerComponent = (messengerResponse) => {
		loadMessageComposite(messengerResponse);
	}

	const displayMessengerContent = () => { 
		if (userDataComposite.messengerResponses.length > 0) {
			var messengerComposite = [];

			for (var i = 0; i < userDataComposite.messengerResponses.length; i++) {
				var messengerContent = {
					messengerResponse : userDataComposite.messengerResponses[i],
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
				<ActiveMessenger activeMessengerComposite={messengerComposite} 
					onActiveMessengerClicked={clickMessengerComponent} />
			);
		} else {
			var homeDisplayResponses = [];

			for (var i = 0; i < userDataComposite.emptyMessengerResponse.homeDisplayResponses.length; i++) {
				homeDisplayResponses.push(userDataComposite.emptyMessengerResponse.homeDisplayResponses[i]);

				if (i > 0) {
					break;
				}
			}

			return (
				<div className="emptyMessengerLeftMenu">
					{
						homeDisplayResponses.map((homeDisplayUser) => ( 
							<EmptyMessengerContent emptyMessengerContent={homeDisplayUser} 
								onClickMessengerLayout={messengerLayoutClicked} 
								onClickWavingIcon={wavingIconClicked} />
						))
					}
				</div>
			);
		} 
	}

	const displayNotificationContent = () => {
		console.log("The value of userDataComposite.notificationResponses here is " 
			+ JSON.stringify(userDataComposite.notificationResponses));

		if (userDataComposite.notificationResponses.length > 0) {
			var notificationComposite = [];
			
			for (var i = 0; i < userDataComposite.notificationResponses.length; i++) {
				var notificationContent = {
					notificationResponse : userDataComposite.notificationResponses[i],
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
				<NotificationIterator notificationComposite={notificationComposite} 
					onNotificationIteratorClicked={clickNotificationComponent} />
			);
		} else {
			return (
				<>
					<div className={emptyNotificationLayout}>
						<img className="emptyNotificationIcon" alt="" src={icon_no_notification} />
						<div className="emptyNotificationMessage">You do not have notifications yet!</div>
					</div>
					<div className={notificationLoader}>
						<img className="loadingPuzzleIcon" alt="" src={loading_puzzle} />
					</div>
				</>
			);
		}
	}

    const wavingIconClicked = (homeDisplayResponse) => {
    	sendPreparedMessage(homeDisplayResponse);	
    }

	const messengerLayoutClicked = (homeDisplayResponse) => {		
		var messengerResponseCopy = {
			chatmateId : homeDisplayResponse.userInformationData.memberId,
			userName : homeDisplayResponse.userInformationData.userName,
			fullName : homeDisplayResponse.userInformationData.fullName,
			profilePicture : homeDisplayResponse.userInformationData.profilePicture,
			userBlockedStatus : homeDisplayResponse.userInformationData.userBlockedStatus
		};

		loadMessageComposite(messengerResponseCopy);
	}

	const sendPreparedMessage = (homeDisplayResponse) => {
		var preparedSenderMessage = "<{#anim-wave#}>";
		preparedSenderMessage = encodeURIComponent(preparedSenderMessage.split(" ").join("+"));

		var postMessageRequest = {
			senderId : userDataComposite.currentUserData.userInformationData.memberId,
	        receiverId : homeDisplayResponse.memberId,
	        messagePosition : 0, 
	        senderMessage : preparedSenderMessage		
		};
           
		axios.post("http://localhost:1337/postmessage", postMessageRequest)
	    	.then(response => {
				var messageResponse = {
					messageId : response.data.messageId,
			       	messenger : response.data.messenger,
			       	message : response.data.message,
			       	readStatus : response.data.readStatus,
			       	seenStatus : response.data.seenStatus,
			       	deleteMessage : response.data.deleteMessage,
			       	messageDate : response.data.messageDate
				};
				
				var messengerResponseCopy = {
					chatmateId : homeDisplayResponse.userInformationData.memberId,
					userName : homeDisplayResponse.userInformationData.userName,
					fullName : homeDisplayResponse.userInformationData.fullName,
					profilePicture : homeDisplayResponse.userInformationData.profilePicture,
					userBlockedStatus : homeDisplayResponse.userInformationData.userBlockedStatus
				};

				loadMessageComposite(messengerResponseCopy);
	        }, error => {
	        	console.log(error);
	        });					
	}

	/* For the three layouts on leftMenuLayout, make the height 
	of the first two wrap contents, while the height of the last 
	content stretch to the bottom, but if it's shorter than the screen, 
	make it scroll in a scroll layout */

	return (
		<div className="leftMenuLayout">
			<div className="profileMenuLayout leftMenuContent">
				<div className="profileMenuUpperLayout">
					<input type="file" onChange={handlePictureChange} className="uploadPictureButton"
						ref={selectPictureButton} accept="image/*" />
					<IconProfilePicture onClickPictureChange={changeProfilePicture} 
						pictureParts={profilePictureParts} />
					<div className="leftUpperPhotoButtons">
						<LeftIconHollowButton onButtonClicked={openUserGallery} buttonParts={leftMenuPhotoButton} />
						<BottomMenuIcon onButtonClicked={editUserProfile} menuParts={leftMenuEditorButton} />
					</div>
				</div>
				<div className="profileMenuLowerLayout">
					<div className="leftMenuUserName">
						{userDataComposite.currentUserData.userInformationData.userName.charAt(0).toUpperCase() + 
							userDataComposite.currentUserData.userInformationData.userName.slice(1)}
					</div>
					<div className="leftMenuLocation">
						{(userDataComposite.currentUserData.userInformationData.currentLocation === "") ? 
							"Location Not Set" : userDataComposite.currentUserData.userInformationData.currentLocation}
					</div>
					<LeftIconHollowButton onButtonClicked={openUserProfile} buttonParts={leftMenuProfileButton} />
				</div>
			</div>
			<div className="messengerMenuLayout leftMenuContent">
				<div className="leftMenuHeader">Chats</div>
				<div className={displayMessengerClass}>
					{displayMessengerContent()}
				</div>
				<div className={notificationLoader}>
					<img className="loadingPuzzleIcon" alt="" src={loading_puzzle} />
				</div>
				<div className="messengerFooterLayout" onClick={openUserMessenger}>
					<u>Messenger</u>
				</div>
			</div>
			<div className="notificationMenuLayout leftMenuContent">
				<div className="leftMenuHeader">Notifications</div>
				<div className="messengerMessageLayout">
					{displayNotificationContent()}
				</div>
				<div className="messengerFooterLayout" onClick={openUserNotification}>
					<u>Notification</u>
				</div>
			</div>
		</div>
	);
}

export default LeftMenuSection;   


