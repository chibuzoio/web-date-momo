import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import '../css/picture_upload.css';
import '../css/floating_account.css';  
import * as faceapi from 'face-api.js';
import icon_view_blue from '../image/icon_view_blue.png';
import icon_edit_white from '../image/icon_edit_white.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png'; 
import icon_message_blue from '../image/icon_message_blue.png';
import {checkNullInMessenger} from '../utility/utility';
import ActiveMessenger from '../widget/active_messenger';
import BottomMenuIcon from '../component/bottom_menu_icon';
import IconProfilePicture from '../component/icon_profile_picture'; 
import NotificationIterator from '../widget/notification_iterator';
import LeftIconHollowButton from '../component/left_icon_hollow_button';

class LeftMenuSection extends React.Component {
	currentUser = {};
	base64String = "";
	pictureUpdateRequest = {
		memberId : 0,
		imageWidth : 0,
		imageHeight : 0,
		base64Picture : ""
	};
	messengerRequestData = {};
	state = {contextData : {
		messengerResponses : [],
		notificationResponses : [],
		pictureUpload : {
			picture : "",
			faceCountInPicture : 0,
			imageWidth : 0,
			imageHeight : 0
		},
		stateLoaded : false
	}};

	constructor(props) {
		super(props);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.displayNotificationContent = this.displayNotificationContent.bind(this);
		this.displayMessengerContent = this.displayMessengerContent.bind(this);
		this.changeProfilePicture = this.changeProfilePicture.bind(this);
		this.handlePictureChange = this.handlePictureChange.bind(this);
		this.openUserProfile = this.openUserProfile.bind(this);
		this.openUserGallery = this.openUserGallery.bind(this);
		this.editUserProfile = this.editUserProfile.bind(this);
	}

	componentDidMount() {
		const MODEL_URL = process.env.PUBLIC_URL + '/models';
		this.loadModels(MODEL_URL);

		this.messengerRequestData = {
			memberId : this.currentUser.memberId
		}

		axios.post("https://datemomo.com/service/usermessengersdata.php", this.messengerRequestData)
	    	.then(response => {
				var localMessengerResponses = checkNullInMessenger(response.data);
		
				this.setState(function(state) { 
					return {contextData : {
						messengerResponses : localMessengerResponses,
						notificationResponses : state.contextData.notificationResponses,
						pictureUpload : state.contextData.pictureUpload,
						stateLoaded : true
					}
				}}); 		
	        }, error => {
	        	console.log(error);
	        });

		axios.post("https://datemomo.com/service/usernotifications.php", this.messengerRequestData) 
	    	.then(response => {
	    		this.setState(function(state) { 
	    			return {contextData : { 
	    				messengerResponses : state.contextData.messengerResponses,
	    				notificationResponses : response.data,
						pictureUpload : state.contextData.pictureUpload,
						stateLoaded : true
		    		}
	    		}});
	        }, error => {
	        	console.log(error);
	        });
	}

	async loadModels(modelUrl) {
	  	Promise.all([
	    	faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl),
	    	faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl),
	    	faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl),
	    	faceapi.nets.faceExpressionNet.loadFromUri(modelUrl),
	  	]).then(() => {
	  		console.log("Models have been loaded here!!!!");
	  	});
	}

	openUserGallery(buttonClicked) {
		if (buttonClicked) {
			// navigate to user gallery

// service/userpicture.php


		}
	}

	editUserProfile(buttonClicked) {
		if (buttonClicked) {
			// window.location.assign("/profile");
		}
	}

	openUserProfile(buttonClicked) {
		if (buttonClicked) {
			window.location.assign("/profile");
		}
	}

	changeProfilePicture(changePictureClicked) {
		if (changePictureClicked) {
			this.selectPictureButton.click();			
		}
	}

	handlePictureChange(event) {
		if (event.target.files[0] != null) {
			var imageReader = new FileReader();
			imageReader.readAsDataURL(event.target.files[0]);

			imageReader.onload = function(event) {
				var imageData = new Image();
				this.base64String = event.target.result;

				// console.log("base64String gotten here is " + this.base64String.substring(5));

				this.setState(function(state) {
					return {contextData : {
						messengerResponses : state.contextData.messengerResponses,
						notificationResponses : state.contextData.notificationResponses, 
						pictureUpload : {
							picture : this.base64String,
							faceCountInPicture : state.contextData.pictureUpload.faceCountInPicture,
							imageWidth : state.contextData.pictureUpload.imageWidth,
							imageHeight : state.contextData.pictureUpload.imageHeight
						}, 
						stateLoaded : state.contextData.stateLoaded
					}
				}});  

				this.pictureUpdateRequest.base64Picture = 
					this.base64String.substring(this.base64String.indexOf("base64,") + 7);
            
				imageData.src = this.base64String;

				this.processFaceDetection(imageData);

				imageData.onload = function() {
					this.setState(function(state) {
						return {contextData : {
							messengerResponses : state.contextData.messengerResponses,
							notificationResponses : state.contextData.notificationResponses, 
							pictureUpload : {
								picture : state.contextData.pictureUpload.picture,
								faceCountInPicture : state.contextData.pictureUpload.faceCountInPicture,
								imageWidth : imageData.width,
								imageHeight : imageData.height
							}, 
							stateLoaded : state.contextData.stateLoaded
						}
					}});  
    
    				this.pictureUpdateRequest.imageWidth = imageData.width;
    				this.pictureUpdateRequest.imageHeight = imageData.height;

					setTimeout(function() {
						this.updateProfilePicture();
					}.bind(this), 1000);
				}.bind(this);
			}.bind(this);

			imageReader.onerror = function(error) {
				console.log("Error gotten here is: " + error);
			}
		}
	}

	async processFaceDetection(imageData) {
   		var detections = await faceapi.detectAllFaces(imageData, 
   			new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
	   		.then((response) => {     
				this.setState(function(state) {
					return {contextData : {
						messengerResponses : state.contextData.messengerResponses,
						notificationResponses : state.contextData.notificationResponses,
						pictureUpload : {
							picture : state.contextData.pictureUpload.picture,
							faceCountInPicture : response.length,
							imageWidth : state.contextData.pictureUpload.imageWidth,
							imageHeight : state.contextData.pictureUpload.imageHeight
						},
						stateLoaded : state.contextData.stateLoaded
					}
				}});           
	   		});
	}

	updateProfilePicture() {
		this.pictureUpdateRequest.memberId = this.currentUser.memberId;
   
   		if (this.state.contextData.pictureUpload.imageWidth > 0 
			&& this.state.contextData.pictureUpload.imageHeight > 0 
			&& this.state.contextData.pictureUpload.faceCountInPicture > 0) {
			axios.post("https://datemomo.com/service/updatepicture.php", this.pictureUpdateRequest)
		    	.then(response => { 
		    		this.currentUser.profilePicture = response.data.profilePicture;
					localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
					window.location.reload(true);
		        }, error => {
		        	console.log(error);
		        });
		} else {
			if (this.state.contextData.pictureUpload.faceCountInPicture <= 0) {
				// Display no Face In Picture Error Message here

			}      
		}
	}

	displayMessengerContent() { 
		if (this.state.contextData.stateLoaded) {
			if (this.state.contextData.messengerResponses.length > 0) {
				var messengerComposite = [];
	   
				for (var i = 0; i < this.state.contextData.messengerResponses.length; i++) {
					var messengerContent = {
						messengerResponse : this.state.contextData.messengerResponses[i],
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
	}

	displayNotificationContent() {
		if (this.state.contextData.notificationResponses.length > 0) {
			var notificationComposite = [];
			
			for (var i = 0; i < this.state.contextData.notificationResponses.length; i++) {
				var notificationContent = {
					notificationResponse : this.state.contextData.notificationResponses[i],
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

	render() {           
		var leftMenuPhotoButton = {
			buttonTitle : "Photos",
			buttonIcon : icon_gallery_blue,
			leftIconHollowButtonLayout : "leftMenuPhotoButton",
			leftIconHollowButtonIcon : "leftMenuPhotoIcon",
			leftIconHollowButtonTitle : "leftMenuPhotoTitle"	
		}

		var profilePictureParts = {
			roundPicture : "https://datemomo.com/client/image/" + 
				this.currentUser.profilePicture,
			pictureLayoutClass : "profilePictureLayout pictureLayoutClass",
			profilePictureClass : "profilePictureImage profilePictureClass",
			pictureChangeClass : "profilePictureIcon pictureChangeClass"
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

		/* For the three layouts on leftMenuLayout, make the height 
		of the first two wrap contents, while the height of the last 
		content stretch to the bottom, but if it's shorter than the screen, 
		make it scroll in a scroll layout */

		return (
			<div className="leftMenuLayout">
				<div className="profileMenuLayout leftMenuContent">
					<div className="profileMenuUpperLayout">
						<input type="file" onChange={this.handlePictureChange} className="uploadPictureButton"
							ref={(selectPictureButton) => {this.selectPictureButton = selectPictureButton}} accept="image/*" />
						<IconProfilePicture onClickPictureChange={this.changeProfilePicture} 
							pictureParts={profilePictureParts} />
						<div className="leftUpperPhotoButtons">
							<LeftIconHollowButton onButtonClicked={this.openUserGallery} buttonParts={leftMenuPhotoButton} />
							<BottomMenuIcon onButtonClicked={this.editUserProfile} menuParts={leftMenuEditorButton} />
						</div>
					</div>
					<div className="profileMenuLowerLayout">
						<div className="leftMenuUserName">
							{this.currentUser.userName.charAt(0).toUpperCase() + 
								this.currentUser.userName.slice(1)}
						</div>
						<div className="leftMenuLocation">
							{(this.currentUser.currentLocation === "") ? 
								"Location Not Set" : this.currentUser.currentLocation}
						</div>
						<LeftIconHollowButton onButtonClicked={this.openUserProfile} buttonParts={leftMenuProfileButton} />
					</div>
				</div>
				<div className="messengerMenuLayout leftMenuContent">
					<div className="leftMenuHeader">Chats</div>
					<div className="messengerMessageLayout">
						{this.displayMessengerContent()}
					</div>
					<div className="messengerFooterLayout">
						<u>Messenger</u>
					</div>
				</div>
				<div className="notificationMenuLayout leftMenuContent">
					<div className="leftMenuHeader">Notifications</div>
					<div className="messengerMessageLayout">
						{this.displayNotificationContent()}
					</div>
					<div className="messengerFooterLayout">
						<u>Notification</u>
					</div>
				</div>
			</div>
		);
	}
}

export default LeftMenuSection;   


