import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/picture_upload.css';
import * as faceapi from 'face-api.js';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import InputErrorMessage from '../component/input_error_message';
import ProgressAnimation from '../component/progress_animation';
import BasicFormField from '../component/basic_form_field';
import BasicButton from '../component/basic_button';
import HollowButton from '../component/hollow_button';
import icon_picture_upload from '../image/icon_picture_upload.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import icon_camera_blue from '../image/icon_camera_blue.png';
import loading_puzzle from '../image/loading_puzzle.gif';
import placeholder from '../image/placeholder.jpg';
import logo from '../image/datemomo.png';

class PictureUpload extends React.Component {
	visibleBasicButton = "basicButton fullWidth";
	visibleHollowButton = "hollowButton fullWidth";
	visibleErrorMessage = "inputErrorMessage errorMessageAlt";
	visibleUploadButton = "basicButton customTopMargin fullWidth";
	visibleAnimationClass = "progressLoadingLayout customTopMargin";
	visibleFemaleHollowButton = "hollowButton uploadPicture fullWidth";
	visibleUserAgeError = "inputErrorMessage centerMessage errorMessageAlt";
	hiddenBasicButton = this.visibleBasicButton + " hideComponent";
	hiddenErrorMessage = this.visibleErrorMessage + " hideComponent";
	hiddenHollowButton = this.visibleHollowButton + " hideComponent";
	hiddenUploadButton = this.visibleUploadButton + " hideComponent";
	hiddenAnimationClass = this.visibleAnimationClass + " hideComponent";
	hiddenFemaleHollowButton = this.visibleFemaleHollowButton + " hideComponent";
	currentUser = {};
	userSexErrorMessage = "Select your sex";
	ageRequiredError = "Your age is required";
	pictureErrorMessage = "Choose picture to upload";
	ageMaximumError = "Age cannot be greater than 80";
	ageMinimumError = "You must be 18 years old or older";
	noFaceInPictureErrorMessage = "The picture you are trying to upload has no human face in it or the face is not bold enough to be detected";
	pictureUploadRequest = {
		sex : "",
		memberId : 0,
		userAge : 0,
		imageWidth : 0,
		imageHeight : 0,
		userLevel : "selectSexualityInterest",
		base64Picture : ""
	};
	state = {contextData : {
			pictureUpload : {
				picture : icon_picture_upload,
				faceCountInPicture : 0,
				imageWidth : 0,
				imageHeight : 0
			},
			userSex : "",
			userAge : 0,
			inputValidity : {
				pictureValidity : {
					errorMessage : this.pictureErrorMessage,
					messageLayout : this.hiddenErrorMessage,
					pictureValid : false
				},
				userSexValidity : {
					errorMessage : this.userSexErrorMessage,
					messageLayout : this.hiddenErrorMessage,
					userSexValid : false
				},
				userAgeValidity : {
					errorMessage : this.ageRequiredError,
					messageLayout : this.hiddenErrorMessage,
					userAgeValid : false
				}
			},
			pictureUploadButtons : {
				maleBasicButton : {
					buttonTitle : "Male",
					buttonClass : this.hiddenBasicButton
				},
				femaleBasicButton : {
					buttonTitle : "Female",
					buttonClass : this.hiddenBasicButton
				},
				maleHollowButton : {
					buttonTitle : "Male",
					buttonClass : this.visibleHollowButton
				},
				femaleHollowButton : {
					buttonTitle : "Female",
					buttonClass : this.visibleFemaleHollowButton
				},
				uploadBasicButton : {
					buttonTitle : "Next",
					buttonClass : this.visibleUploadButton
				},
				puzzleProgressAnimation : {
					animationLayout : this.hiddenAnimationClass,
					animationImageClass : "progressLoadingIcon",
					animationMotionIcon : loading_puzzle
				}
			}
		}
	};

	constructor(props) {
		super(props);
		this.loadModels = this.loadModels.bind(this);
		this.chooseMaleSex = this.chooseMaleSex.bind(this);
		this.chooseFemaleSex = this.chooseFemaleSex.bind(this);
		this.clickChosenMale = this.clickChosenMale.bind(this);
		this.validateUserAge = this.validateUserAge.bind(this);
		this.validateUserSex = this.validateUserSex.bind(this);
		this.openDeviceCamera = this.openDeviceCamera.bind(this);
		this.clickChosenFemale = this.clickChosenFemale.bind(this);
		this.selectPictureFile = this.selectPictureFile.bind(this);
		this.openSystemGallery = this.openSystemGallery.bind(this);
		this.updateInputUserAge = this.updateInputUserAge.bind(this);
		this.handlePictureChange = this.handlePictureChange.bind(this);
		this.handlePictureUpload = this.handlePictureUpload.bind(this);
		this.processFaceDetection = this.processFaceDetection.bind(this);
		this.validateUploadPicture = this.validateUploadPicture.bind(this);
	}

	componentDidMount() {
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.pictureUploadRequest.memberId = this.currentUser.memberId;

		const MODEL_URL = process.env.PUBLIC_URL + '/models';
		this.loadModels(MODEL_URL);
	}

	componentWillUnmount() {

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
	
	chooseMaleSex(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					pictureUpload : state.contextData.pictureUpload,	
					userSex : "Male",
					userAge : state.contextData.userAge,
					inputValidity : state.contextData.inputValidity,
					pictureUploadButtons : {
						maleBasicButton : {
							buttonTitle : "Male",
							buttonClass : this.visibleBasicButton
						},
						femaleBasicButton : {
							buttonTitle : "Female",
							buttonClass : this.hiddenBasicButton
						},
						maleHollowButton : {
							buttonTitle : "Male",
							buttonClass : this.hiddenHollowButton
						},
						femaleHollowButton : {
							buttonTitle : "Female",
							buttonClass : this.visibleFemaleHollowButton
						},
						uploadBasicButton : state.contextData.pictureUploadButtons.uploadBasicButton,
						puzzleProgressAnimation : state.contextData.pictureUploadButtons.puzzleProgressAnimation
					}
				}
			}});  

			this.pictureUploadRequest.sex = "Male";
			
			this.validateUploadPicture();

			setTimeout(function() {
				this.validateUserSex();	
			}.bind(this), 1000);
		}
	}

	chooseFemaleSex(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					pictureUpload : state.contextData.pictureUpload,
					userSex : "Female",
					userAge : state.contextData.userAge,
					inputValidity : state.contextData.inputValidity,
					pictureUploadButtons : {
						maleBasicButton : {
							buttonTitle : "Male",
							buttonClass : this.hiddenBasicButton
						},
						femaleBasicButton : {
							buttonTitle : "Female",
							buttonClass : this.visibleBasicButton
						},
						maleHollowButton : {
							buttonTitle : "Male",
							buttonClass : this.visibleHollowButton
						},
						femaleHollowButton : {
							buttonTitle : "Female",
							buttonClass : this.hiddenFemaleHollowButton
						},
						uploadBasicButton : state.contextData.pictureUploadButtons.uploadBasicButton,
						puzzleProgressAnimation : state.contextData.pictureUploadButtons.puzzleProgressAnimation
					}
				}
			}});  

			this.pictureUploadRequest.sex = "Female";

			this.validateUploadPicture();

			setTimeout(function() {
				this.validateUserSex();	
			}.bind(this), 1000);
		}
	}

	clickChosenMale(buttonClicked) {
		if (buttonClicked) {}
	}

	clickChosenFemale(buttonClicked) {
		if (buttonClicked) {}
	}

	openSystemGallery(buttonClicked) {
		if (buttonClicked) {
			this.selectPictureButton.click();
		}
	}

	openDeviceCamera(buttonClicked) {
		if (buttonClicked) {

		}
	}

	selectPictureFile(event) {
		this.selectPictureButton.click();
	}
  
	handlePictureUpload(buttonClicked) {
		if (buttonClicked) {
			this.validateUploadPicture();
			this.validateUserSex();
			this.validateUserAge();
  
			if (this.state.contextData.inputValidity.pictureValidity.pictureValid && 
				this.state.contextData.inputValidity.userSexValidity.userSexValid && 
				this.state.contextData.inputValidity.userAgeValidity.userAgeValid) {
				this.setState(function(state) {
					return {contextData : {
						pictureUpload : state.contextData.pictureUpload,
						userSex : state.contextData.userSex,
						userAge : state.contextData.userAge,
						inputValidity : state.contextData.inputValidity,
						pictureUploadButtons : {
							maleBasicButton : state.contextData.pictureUploadButtons.maleBasicButton,
							femaleBasicButton : state.contextData.pictureUploadButtons.femaleBasicButton,
							maleHollowButton : state.contextData.pictureUploadButtons.maleHollowButton,
							femaleHollowButton : state.contextData.pictureUploadButtons.femaleHollowButton,
							uploadBasicButton : {
								buttonTitle : state.contextData.pictureUploadButtons.uploadBasicButton.buttonTitle,
								buttonClass : this.hiddenUploadButton
							},
							puzzleProgressAnimation : {
								animationLayout : this.visibleAnimationClass,
								animationImageClass : state.contextData.pictureUploadButtons.puzzleProgressAnimation.animationImageClass,
								animationMotionIcon : state.contextData.pictureUploadButtons.puzzleProgressAnimation.animationMotionIcon
							}
						}
					}
				}});  

				axios.post("https://datemomo.com/service/postpicture.php", this.pictureUploadRequest)
			    	.then(response => {     
						this.setState(function(state) {
							return {contextData : {
								pictureUpload : state.contextData.pictureUpload,
								userSex : state.contextData.userSex,
								userAge : state.contextData.userAge, 
								inputValidity : state.contextData.inputValidity,								
								pictureUploadButtons : {
									maleBasicButton : state.contextData.pictureUploadButtons.maleBasicButton,
									femaleBasicButton : state.contextData.pictureUploadButtons.femaleBasicButton,
									maleHollowButton : state.contextData.pictureUploadButtons.maleHollowButton,
									femaleHollowButton : state.contextData.pictureUploadButtons.femaleHollowButton,
									uploadBasicButton : {
										buttonTitle : state.contextData.pictureUploadButtons.uploadBasicButton.buttonTitle,
										buttonClass : this.visibleUploadButton
									},
									puzzleProgressAnimation : {
										animationLayout : this.hiddenAnimationClass,
										animationImageClass : state.contextData.pictureUploadButtons.puzzleProgressAnimation.animationImageClass,
										animationMotionIcon : state.contextData.pictureUploadButtons.puzzleProgressAnimation.animationMotionIcon
									}									
								}
							}
						}});  

						this.currentUser.userLevel = this.pictureUploadRequest.userLevel;
						localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
						window.location.replace("/sexuality");
			        }, error => {    
						this.setState(function(state) {
							return {contextData : {
								pictureUpload : state.contextData.pictureUpload,
								userSex : state.contextData.userSex,
								userAge : state.contextData.userAge,
								inputValidity : state.contextData.inputValidity,
								pictureUploadButtons : {
									maleBasicButton : state.contextData.pictureUploadButtons.maleBasicButton,
									femaleBasicButton : state.contextData.pictureUploadButtons.femaleBasicButton,
									maleHollowButton : state.contextData.pictureUploadButtons.maleHollowButton,
									femaleHollowButton : state.contextData.pictureUploadButtons.femaleHollowButton,
									uploadBasicButton : {
										buttonTitle : state.contextData.pictureUploadButtons.uploadBasicButton.buttonTitle,
										buttonClass : this.visibleUploadButton
									},
									puzzleProgressAnimation : {
										animationLayout : this.hiddenAnimationClass,
										animationImageClass : state.contextData.pictureUploadButtons.puzzleProgressAnimation.animationImageClass,
										animationMotionIcon : state.contextData.pictureUploadButtons.puzzleProgressAnimation.animationMotionIcon
									}									
								}
							}
						}});  

			        	console.log(error);
			        });
			}	
		}
	}

	handlePictureChange(event) {
		if (event.target.files[0] != null) {
			var imageReader = new FileReader();
			imageReader.readAsDataURL(event.target.files[0]);

			imageReader.onload = function(event) {
				var imageData = new Image();
				var base64String = event.target.result;

				// console.log("base64String gotten here is " + base64String.substring(5));

				this.setState(function(state) {
					return {contextData : {
						pictureUpload : {
							picture : base64String,
							faceCountInPicture : state.contextData.pictureUpload.faceCountInPicture,
							imageWidth : state.contextData.pictureUpload.imageWidth,
							imageHeight : state.contextData.pictureUpload.imageHeight
						},
						userSex : state.contextData.userSex,
						userAge : state.contextData.userAge,
						inputValidity : state.contextData.inputValidity,						
						pictureUploadButtons : state.contextData.pictureUploadButtons
					}
				}});  

				this.pictureUploadRequest.base64Picture = 
					base64String.substring(base64String.indexOf("base64,") + 7);
            
				imageData.src = base64String;

				this.processFaceDetection(imageData);

				imageData.onload = function() {
					this.setState(function(state) {
						return {contextData : {
							pictureUpload : {
								picture : state.contextData.pictureUpload.picture,
								faceCountInPicture : state.contextData.pictureUpload.faceCountInPicture,
								imageWidth : imageData.width,
								imageHeight : imageData.height
							},
							userSex : state.contextData.userSex,
							userAge : state.contextData.userAge,
							inputValidity : state.contextData.inputValidity,
							pictureUploadButtons : state.contextData.pictureUploadButtons
						}
					}});  
    
    				this.pictureUploadRequest.imageWidth = imageData.width;
    				this.pictureUploadRequest.imageHeight = imageData.height;

					setTimeout(function() {
						this.validateUploadPicture();
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
					pictureUpload : {
						picture : state.contextData.pictureUpload.picture,
						faceCountInPicture : response.length,
						imageWidth : state.contextData.pictureUpload.imageWidth,
						imageHeight : state.contextData.pictureUpload.imageHeight
					},
					userSex : state.contextData.userSex,
					userAge : state.contextData.userAge,
					inputValidity : state.contextData.inputValidity,						
					pictureUploadButtons : state.contextData.pictureUploadButtons
				}
			}});           
   		});
	}

	validateUserAge() {
		var userAgeValidity = {
			errorMessage : this.ageRequiredError,
			messageLayout : this.visibleUserAgeError,
			userAgeValid : false
		};
    	
		if (this.state.contextData.userAge < 81 && this.state.contextData.userAge > 18) {
			userAgeValidity.messageLayout = this.hiddenErrorMessage;
			userAgeValidity.userAgeValid = true;
		}
    
		if (this.state.contextData.userAge < 18 && this.state.contextData.userAge > 0) {
			userAgeValidity.errorMessage = this.ageMinimumError;
		}

		if (this.state.contextData.userAge > 80) {
			userAgeValidity.errorMessage = this.ageMaximumError;
		}

		this.setState(function(state) {
			return {contextData : {
				pictureUpload : state.contextData.pictureUpload,
				userSex : state.contextData.userSex,
				userAge : state.contextData.userAge,
				inputValidity : {
					pictureValidity : state.contextData.inputValidity.pictureValidity,
					userSexValidity : state.contextData.inputValidity.userSexValidity,
					userAgeValidity : userAgeValidity
				},
				pictureUploadButtons : state.contextData.pictureUploadButtons
			}
		}});  
	}

	validateUserSex() {
		var userSexValidity = {
			errorMessage : this.state.contextData.inputValidity.userSexValidity.errorMessage,
			messageLayout : this.visibleErrorMessage,
			userSexValid : false
		}

		if (this.state.contextData.userSex !== "") {
			userSexValidity.messageLayout = this.hiddenErrorMessage;
			userSexValidity.userSexValid = true;
		}

		this.setState(function(state) {
			return {contextData : {
				pictureUpload : state.contextData.pictureUpload,
				userSex : state.contextData.userSex,
				userAge : state.contextData.userAge,
				inputValidity : {
					pictureValidity : state.contextData.inputValidity.pictureValidity,
					userSexValidity : userSexValidity,
					userAgeValidity : state.contextData.inputValidity.userAgeValidity
				},
				pictureUploadButtons : state.contextData.pictureUploadButtons
			}
		}});  
	}

	validateUploadPicture() {
		var pictureValidity = {
			errorMessage : this.pictureErrorMessage,
			messageLayout : this.visibleErrorMessage,
			pictureValid : false
		};

		if (this.state.contextData.pictureUpload.imageWidth > 0 
			&& this.state.contextData.pictureUpload.imageHeight > 0 
			&& this.state.contextData.pictureUpload.faceCountInPicture > 0) {
			pictureValidity.messageLayout = this.hiddenErrorMessage;
			pictureValidity.pictureValid = true;
		} else {
			if (this.state.contextData.pictureUpload.faceCountInPicture <= 0) {
				pictureValidity.errorMessage = this.noFaceInPictureErrorMessage;
			}      
		}

		this.setState(function(state) {
			return {contextData : {
				pictureUpload : state.contextData.pictureUpload,
				userSex : state.contextData.userSex,
				userAge : state.contextData.userAge,
				inputValidity : {
					pictureValidity : pictureValidity,
					userSexValidity : state.contextData.inputValidity.userSexValidity,
					userAgeValidity : state.contextData.inputValidity.userAgeValidity
				},
				pictureUploadButtons : state.contextData.pictureUploadButtons
			}
		}});  
	}

	updateInputUserAge(userAgeValue, isBlurred) {
		this.setState(function(state) {
			return {contextData : {
				pictureUpload : state.contextData.pictureUpload,
				userSex : state.contextData.userSex,
				userAge : userAgeValue,
				inputValidity : state.contextData.inputValidity,
				pictureUploadButtons : state.contextData.pictureUploadButtons
			}
		}});  

		this.pictureUploadRequest.userAge = userAgeValue;

		if (isBlurred) {
			this.validateUploadPicture();
			this.validateUserSex();
			this.validateUserAge();
		}
	}
	
	render() { 
		var takePictureButton = {
			buttonTitle : "Take Picture",
			buttonIcon : icon_camera_blue,
			leftIconHollowButtonLayout : "leftIconHollowButton buttonTopMargin",
			leftIconHollowButtonIcon : "hollowButtonLeftIcon",
			leftIconHollowButtonTitle : "leftHollowButtonTitle buttonTitleSize"
		}

		var uploadPictureButton = {
			buttonTitle : "Upload Picture",
			buttonIcon : icon_gallery_blue,
			leftIconHollowButtonLayout : "leftIconHollowButton buttonTopMargin uploadPicture",
			leftIconHollowButtonIcon : "hollowButtonLeftIcon",
			leftIconHollowButtonTitle : "leftHollowButtonTitle buttonTitleSize"
		}

		var ageFormField = {
			inputFieldClass : "ageFormField",
			placeholder : "Age",
			type : "number"
		}

		return (
			<div className="login">
				<div className="loginWidget">
					<div className="registerPageHeader">
						<div className="registerPageTitle">Upload Your <br></br>Profile Picture</div>
						<img className="registerPageIcon" alt="Logo" src={logo}/>
					</div>
					<input type="file" onChange={this.handlePictureChange} className="uploadPictureButton"
						ref={(selectPictureButton) => {this.selectPictureButton = selectPictureButton}} accept="image/*" />
					<img className="userPicture" onClick={this.selectPictureFile} alt="" src={this.state.contextData.pictureUpload.picture} />
					<div className="pictureButtons customTopMargin">
						<LeftIconHollowButton onButtonClicked={this.openDeviceCamera} buttonParts={takePictureButton} />
						<LeftIconHollowButton onButtonClicked={this.openSystemGallery} buttonParts={uploadPictureButton} />
					</div>
					<InputErrorMessage errorMessageData={this.state.contextData.inputValidity.pictureValidity} />
					<div className="sexTitle">Sex</div>
					<div className="pictureButtons">
						<div className="maleSexButtons">
							<HollowButton onButtonClicked={this.chooseMaleSex} 
								buttonParts={this.state.contextData.pictureUploadButtons.maleHollowButton} />
							<BasicButton onButtonClicked={this.clickChosenMale} 
								buttonParts={this.state.contextData.pictureUploadButtons.maleBasicButton} />
						</div>
						<div className="femaleSexButtons">
							<HollowButton onButtonClicked={this.chooseFemaleSex} 
								buttonParts={this.state.contextData.pictureUploadButtons.femaleHollowButton} />
							<BasicButton onButtonClicked={this.clickChosenFemale} 
								buttonParts={this.state.contextData.pictureUploadButtons.femaleBasicButton} />
						</div>
					</div>
					<InputErrorMessage errorMessageData={this.state.contextData.inputValidity.userSexValidity} />
					<div className="ageFormLayout">
						<div className="ageFormTitle">Age</div>
						<BasicFormField onFormValueChange={this.updateInputUserAge} formParts={ageFormField} />
					</div>
					<InputErrorMessage errorMessageData={this.state.contextData.inputValidity.userAgeValidity} />
					<BasicButton onButtonClicked={this.handlePictureUpload} 
						buttonParts={this.state.contextData.pictureUploadButtons.uploadBasicButton} />
					<ProgressAnimation animationData={this.state.contextData.pictureUploadButtons.puzzleProgressAnimation} />
				</div>
			</div>
		);
	}
}

export default PictureUpload;


