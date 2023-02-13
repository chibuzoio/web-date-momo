import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/picture_upload.css';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
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
	visibleUploadButton = "basicButton customTopMargin fullWidth";
	visibleAnimationClass = "progressLoadingLayout customTopMargin";
	visibleFemaleHollowButton = "hollowButton uploadPicture fullWidth";
	hiddenBasicButton = this.visibleBasicButton + " hideComponent";
	hiddenHollowButton = this.visibleHollowButton + " hideComponent";
	hiddenUploadButton = this.visibleUploadButton + " hideComponent";
	hiddenAnimationClass = this.visibleAnimationClass + " hideComponent";
	hiddenFemaleHollowButton = this.visibleFemaleHollowButton + " hideComponent";
	currentUser = {};
	ageMaximumError = "Age cannot be greater than 80";
	ageMinimumError = "You must be 18 years old or older";
	ageRequiredError = "Your age is required";
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
				imageWidth : 0,
				imageHeight : 0
			},
			userSex : "",
			userAge : 0,
			pictureValidity : {
				pictureError : "Choose picture to upload",
				errorDisplay : "none",
				pictureValid : false
			},
			userSexValidity : {
				userSexError : "Select your sex",
				errorDisplay : "none",
				userSexValid : false
			},
			userAgeValidity : {
				userAgeError : this.ageRequiredError,
				errorDisplay : "none",
				userAgeValid : false
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
		this.validateUploadPicture = this.validateUploadPicture.bind(this);
	}

	componentDidMount() {
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.pictureUploadRequest.memberId = this.currentUser.memberId;
	}

	componentWillUnmount() {

	}

	chooseMaleSex(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					pictureUpload : state.contextData.pictureUpload,	
					userSex : "Male",
					userAge : state.contextData.userAge,
					pictureValidity : state.contextData.pictureValidity,
					userSexValidity : state.contextData.userSexValidity,
					userAgeValidity : state.contextData.userAgeValidity,
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
					pictureValidity : state.contextData.pictureValidity,
					userSexValidity : state.contextData.userSexValidity,
					userAgeValidity : state.contextData.userAgeValidity,
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
  
			this.setState(function(state) {
				return {contextData : {
					pictureUpload : state.contextData.pictureUpload,
					userSex : state.contextData.userSex,
					userAge : state.contextData.userAge,
					pictureValidity : state.contextData.pictureValidity,
					userSexValidity : state.contextData.userSexValidity,
					userAgeValidity : state.contextData.userAgeValidity,
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

			if (this.state.contextData.pictureValidity.pictureValid && 
				this.state.contextData.userSexValidity.userSexValid && 
				this.state.contextData.userAgeValidity.userAgeValid) {
				axios.post("https://datemomo.com/service/postpicture.php", this.pictureUploadRequest)
			    	.then(response => {     
						this.setState(function(state) {
							return {contextData : {
								pictureUpload : state.contextData.pictureUpload,
								userSex : state.contextData.userSex,
								userAge : state.contextData.userAge,
								pictureValidity : state.contextData.pictureValidity,
								userSexValidity : state.contextData.userSexValidity,
								userAgeValidity : state.contextData.userAgeValidity,
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
								pictureValidity : state.contextData.pictureValidity,
								userSexValidity : state.contextData.userSexValidity,
								userAgeValidity : state.contextData.userAgeValidity,
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
							imageWidth : state.contextData.pictureUpload.imageWidth,
							imageHeight : state.contextData.pictureUpload.imageHeight
						},
						userSex : state.contextData.userSex,
						userAge : state.contextData.userAge,
						pictureValidity : state.contextData.pictureValidity,
						userSexValidity : state.contextData.userSexValidity,
						userAgeValidity : state.contextData.userAgeValidity,
						pictureUploadButtons : state.contextData.pictureUploadButtons
					}
				}});  

				this.pictureUploadRequest.base64Picture = 
					base64String.substring(base64String.indexOf("base64,") + 7);
            
				imageData.src = base64String;
           
				imageData.onload = function() {
					this.setState(function(state) {
						return {contextData : {
							pictureUpload : {
								picture : state.contextData.pictureUpload.picture,
								imageWidth : imageData.width,
								imageHeight : imageData.height
							},
							userSex : state.contextData.userSex,
							userAge : state.contextData.userAge,
							pictureValidity : state.contextData.pictureValidity,
							userSexValidity : state.contextData.userSexValidity,
							userAgeValidity : state.contextData.userAgeValidity,
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

	validateUserAge() {
		var userAgeValidity = {
			userAgeError : this.ageRequiredError,
			errorDisplay : "flex",
			userAgeValid : false
		};
    
		if (this.state.contextData.userAge < 81 && this.state.contextData.userAge > 18) {
			userAgeValidity.errorDisplay = "none";
			userAgeValidity.userAgeValid = true;
		}
    
		if (this.state.contextData.userAge < 18 && this.state.contextData.userAge > 0) {
			userAgeValidity.userAgeError = this.ageMinimumError;
		}

		if (this.state.contextData.userAge > 80) {
			userAgeValidity.userAgeError = this.ageMaximumError;
		}

		this.setState(function(state) {
			return {contextData : {
				pictureUpload : state.contextData.pictureUpload,
				userSex : state.contextData.userSex,
				userAge : state.contextData.userAge,
				pictureValidity : state.contextData.pictureValidity,
				userSexValidity : state.contextData.userSexValidity,
				userAgeValidity : userAgeValidity,
				pictureUploadButtons : state.contextData.pictureUploadButtons
			}
		}});  
	}

	validateUserSex() {
		var userSexValidity = {
			userSexError : this.state.contextData.userSexValidity.userSexError,
			errorDisplay : "flex",
			userSexValid : false
		};

		if (this.state.contextData.userSex !== "") {
			userSexValidity.errorDisplay = "none";
			userSexValidity.userSexValid = true;
		}

		this.setState(function(state) {
			return {contextData : {
				pictureUpload : state.contextData.pictureUpload,
				userSex : state.contextData.userSex,
				userAge : state.contextData.userAge,
				pictureValidity : state.contextData.pictureValidity,
				userSexValidity : userSexValidity,
				userAgeValidity : state.contextData.userAgeValidity,
				pictureUploadButtons : state.contextData.pictureUploadButtons
			}
		}});  
	}

	validateUploadPicture() {
		var pictureValidity = {
			pictureError : "Choose picture to upload",
			errorDisplay : "flex",
			pictureValid : false
		};

		if (this.state.contextData.pictureUpload.imageWidth > 0 
			&& this.state.contextData.pictureUpload.imageHeight > 0) {
			pictureValidity.errorDisplay = "none";
			pictureValidity.pictureValid = true;
		}

		this.setState(function(state) {
			return {contextData : {
				pictureUpload : state.contextData.pictureUpload,
				userSex : state.contextData.userSex,
				userAge : state.contextData.userAge,
				pictureValidity : pictureValidity,
				userSexValidity : state.contextData.userSexValidity,
				userAgeValidity : state.contextData.userAgeValidity,
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
				pictureValidity : state.contextData.pictureValidity,
				userSexValidity : state.contextData.userSexValidity,
				userAgeValidity : state.contextData.userAgeValidity,
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
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
		}

		var uploadPictureButton = {
			buttonTitle : "Upload Picture",
			buttonIcon : icon_gallery_blue,
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin uploadPicture",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
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
					<div className="inputErrorMessage" 
						style={{display: this.state.contextData.pictureValidity.errorDisplay}}>
						{this.state.contextData.pictureValidity.pictureError}
					</div>
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
					<div className="inputErrorMessage" 
						style={{display: this.state.contextData.userSexValidity.errorDisplay}}>
						{this.state.contextData.userSexValidity.userSexError}
					</div>
					<div className="ageFormLayout">
						<div className="ageFormTitle">Age</div>
						<BasicFormField onFormValueChange={this.updateInputUserAge} formParts={ageFormField} />
					</div>
					<div className="inputErrorMessage centerMessage" 
						style={{display: this.state.contextData.userAgeValidity.errorDisplay}}>
						{this.state.contextData.userAgeValidity.userAgeError}
					</div>
					<BasicButton onButtonClicked={this.handlePictureUpload} 
						buttonParts={this.state.contextData.pictureUploadButtons.uploadBasicButton} />
					<ProgressAnimation animationData={this.state.contextData.pictureUploadButtons.puzzleProgressAnimation} />
				</div>
			</div>
		);
	}
}

export default PictureUpload;


