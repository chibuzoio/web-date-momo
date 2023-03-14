import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import '../css/picture_upload.css';
import '../css/floating_account.css';  
import * as faceapi from 'face-api.js';
import { Outlet, Link, useNavigate } from "react-router-dom";
import icon_view_blue from '../image/icon_view_blue.png';
import icon_edit_white from '../image/icon_edit_white.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png'; 
import icon_message_blue from '../image/icon_message_blue.png';
import { checkNullInMessenger } from '../utility/utility';
import ActiveMessenger from '../widget/active_messenger';
import BottomMenuIcon from '../component/bottom_menu_icon';
import IconProfilePicture from '../component/icon_profile_picture'; 
import NotificationIterator from '../widget/notification_iterator';
import LeftIconHollowButton from '../component/left_icon_hollow_button';

function LeftMenuSection() {
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
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	var profilePictureParts = {
		roundPicture : "https://datemomo.com/client/image/" + currentUser.profilePicture,
		pictureLayoutClass : "profilePictureLayout pictureLayoutClass",
		profilePictureClass : "profilePictureImage profilePictureClass",
		pictureChangeClass : "profilePictureIcon pictureChangeClass"
	}

	const navigate = useNavigate();
	const selectPictureButton = useRef();
	const [pictureUpload, setPictureUpload] = useState({
		picture : "",
		faceCountInPicture : 0,
		imageWidth : 0,
		imageHeight : 0
	});
	const [messengerResponses, setMessengerResponses] = useState([]);
	const [notificationResponses, setNotificationResponses] = useState([]);       

	var messengerRequestData = {
		memberId : currentUser.memberId
	}

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

		loadMessengerNotificationData();
	}, []);
	
	const loadMessengerNotificationData = () => {
		axios.post("https://datemomo.com/service/usermessengersdata.php", messengerRequestData)
	    	.then(response => {
				var localMessengerResponses = checkNullInMessenger(response.data);
				setMessengerResponses(localMessengerResponses);
	        }, error => {
	        	console.log(error);
	        });

		axios.post("https://datemomo.com/service/usernotifications.php", messengerRequestData) 
	    	.then(response => {
	    		setNotificationResponses(response.data);
	        }, error => {
	        	console.log(error);
	        });		        
	}

	const openUserGallery = (buttonClicked) => {
		if (buttonClicked) {
			// service/userpicture.php
			// If useParams refuses to work, get parameters using location.state of useLocation  
			
	        navigate("/gallery", {
			    memberId : currentUser.memberId,
			    currentPosition : 0
		    });
		}
	}

	const editUserProfile = (buttonClicked) => {
		if (buttonClicked) {
			// window.location.assign("/profile");
		}
	}

	const openUserProfile = (buttonClicked) => {
		if (buttonClicked) {
			navigate("/profile");
		}
	}

	const changeProfilePicture = (changePictureClicked) => {
		if (changePictureClicked) {
			selectPictureButton.current.click();
		}
	}

	const handlePictureChange = (event) => {
		if (event.target.files[0] != null) {
			var imageReader = new FileReader();
			imageReader.readAsDataURL(event.target.files[0]);

			imageReader.onload = (event) => {
				var imageData = new Image();
				base64String = event.target.result;

				// console.log("base64String gotten here is " + this.base64String.substring(5));

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

	const displayMessengerContent = () => { 
		if (messengerResponses.length > 0) {
			var messengerComposite = [];

			for (var i = 0; i < messengerResponses.length; i++) {
				var messengerContent = {
					messengerResponse : messengerResponses[i],
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
				<ActiveMessenger activeMessengerComposite={messengerComposite} />
			);
		} else {
			// return (
			// empty messenger message 
			// );
		} 
	}

	const displayNotificationContent = () => {
		if (notificationResponses.length > 0) {
			var notificationComposite = [];
			
			for (var i = 0; i < notificationResponses.length; i++) {
				var notificationContent = {
					notificationResponse : notificationResponses[i],
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
				<NotificationIterator notificationComposite={notificationComposite} />
			);
		} else {
			// return (
			// empty notification message 
			// );
		}
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
						{currentUser.userName.charAt(0).toUpperCase() + 
							currentUser.userName.slice(1)}
					</div>
					<div className="leftMenuLocation">
						{(currentUser.currentLocation === "") ? 
							"Location Not Set" : currentUser.currentLocation}
					</div>
					<LeftIconHollowButton onButtonClicked={openUserProfile} buttonParts={leftMenuProfileButton} />
				</div>
			</div>
			<div className="messengerMenuLayout leftMenuContent">
				<div className="leftMenuHeader">Chats</div>
				<div className="messengerMessageLayout">
					{displayMessengerContent()}
				</div>
				<div className="messengerFooterLayout">
					<u>Messenger</u>
				</div>
			</div>
			<div className="notificationMenuLayout leftMenuContent">
				<div className="leftMenuHeader">Notifications</div>
				<div className="messengerMessageLayout">
					{displayNotificationContent()}
				</div>
				<div className="messengerFooterLayout">
					<u>Notification</u>
				</div>
			</div>
		</div>
	);
}

export default LeftMenuSection;   


