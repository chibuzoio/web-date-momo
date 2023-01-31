import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/picture_upload.css';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import BasicFormField from '../component/basic_form_field';
import BasicButton from '../component/basic_button';
import HollowButton from '../component/hollow_button';
import icon_picture_upload from '../image/icon_picture_upload.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import icon_camera_blue from '../image/icon_camera_blue.png';
import placeholder from '../image/placeholder.jpg';
import logo from '../image/datemomo.png';

class PictureUpload extends React.Component {
	state = {contextData : {
			pictureUpload : {
				picture : icon_picture_upload
			},
			chosenSex : {
				userSex : "",
				maleBasicButtonDisplay : "none",
				maleHollowButtonDisplay : "flex",
				femaleBasicButtonDisplay : "none",
				femaleHollowButtonDisplay : "flex"
			},
			userAge : 0,
			pictureValidity : {
				pictureError : "Choose picture to upload",
				errorDisplay : "flex"
			},
			userSexValidity : {
				userSexError : "Select your sex",
				errorDisplay : "flex"
			},
			userAgeValidity : {
				userAgeError : "Your age is required",
				errorDisplay : "flex"
			}
		}
	};

	constructor(props) {
		super(props);
		this.chooseMaleSex = this.chooseMaleSex.bind(this);
		this.chooseFemaleSex = this.chooseFemaleSex.bind(this);
		this.clickChosenMale = this.clickChosenMale.bind(this);
		this.openDeviceCamera = this.openDeviceCamera.bind(this);
		this.clickChosenFemale = this.clickChosenFemale.bind(this);
		this.selectPictureFile = this.selectPictureFile.bind(this);
		this.openSystemGallery = this.openSystemGallery.bind(this);
		this.handlePictureChange = this.handlePictureChange.bind(this);
		this.handlePictureUpload = this.handlePictureUpload.bind(this);
	}

	componentDidMount() {
	
	}

	componentWillUnmount() {

	}

	chooseMaleSex(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					pictureUpload : state.contextData.pictureUpload,
					chosenSex : {
						userSex : "Male",
						maleBasicButtonDisplay : "flex",
						maleHollowButtonDisplay : "none",
						femaleBasicButtonDisplay : "none",
						femaleHollowButtonDisplay : "flex"
					},
					userAge : state.contextData.userAge,
					pictureValidity : state.contextData.pictureValidity,
					userSexValidity : state.contextData.userSexValidity,
					userAgeValidity : state.contextData.userAgeValidity
				}
			}});  
		}
	}

	chooseFemaleSex(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					pictureUpload : state.contextData.pictureUpload,
					chosenSex : {
						userSex : "Female",
						maleBasicButtonDisplay : "none",
						maleHollowButtonDisplay : "flex",
						femaleBasicButtonDisplay : "flex",
						femaleHollowButtonDisplay : "none"
					},
					userAge : state.contextData.userAge,
					pictureValidity : state.contextData.pictureValidity,
					userSexValidity : state.contextData.userSexValidity,
					userAgeValidity : state.contextData.userAgeValidity
				}
			}});  
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

		}
	}

	handlePictureChange(event) {
		if (event.target.files[0] != null) {
			this.setState(function(state) {
				return {contextData : {
					pictureUpload : {
						picture : URL.createObjectURL(event.target.files[0])
					},
					chosenSex : state.contextData.chosenSex,
					userAge : state.contextData.userAge,
					pictureValidity : state.contextData.pictureValidity,
					userSexValidity : state.contextData.userSexValidity,
					userAgeValidity : state.contextData.userAgeValidity
				}
			}});  

			var imageReader = new FileReader();
			
			imageReader.readAsDataURL(event.target.files[0]);

			imageReader.onload = function(event) {
				console.log(event.target.result);
				// window.location.href = event.target.result;

				var imageData = new Image();
				imageData.src = event.target.result;
				
				imageData.onload = function() {
					console.log("Natural width and height of this image are, width: " + imageData.naturalWidth 
						+ " and height: " + imageData.naturalHeight);
					console.log("Natural width and height of this image are, width: " + imageData.width 
						+ " and height: " + imageData.height);	
				}
			}

			imageReader.onerror = function(error) {
				console.log("Error gotten here is: " + error);
			}
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

		var basicButton = {
			buttonTitle : "Next",
			buttonClass : "basicButton customTopMargin fullWidth"
		}

		var maleBasicButton = {
			buttonTitle : "Male",
			buttonClass : "basicButton fullWidth",
			buttonDisplay : this.state.contextData.chosenSex.maleBasicButtonDisplay
		}

		var femaleBasicButton = {
			buttonTitle : "Female",
			buttonClass : "basicButton fullWidth",
			buttonDisplay : this.state.contextData.chosenSex.femaleBasicButtonDisplay
		}

		var maleHollowButton = {
			buttonTitle : "Male",
			buttonClass : "hollowButton fullWidth",
			buttonDisplay : this.state.contextData.chosenSex.maleHollowButtonDisplay
		}

		var femaleHollowButton = {
			buttonTitle : "Female",
			buttonClass : "hollowButton uploadPicture fullWidth",
			buttonDisplay : this.state.contextData.chosenSex.femaleHollowButtonDisplay
		}

		var ageFormField = {
			ageFieldClass : "ageFormField",
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
							<HollowButton onButtonClicked={this.chooseMaleSex} buttonParts={maleHollowButton} />
							<BasicButton onButtonClicked={this.clickChosenMale} buttonParts={maleBasicButton} />
						</div>
						<div className="femaleSexButtons">
							<HollowButton onButtonClicked={this.chooseFemaleSex} buttonParts={femaleHollowButton} />
							<BasicButton onButtonClicked={this.clickChosenFemale} buttonParts={femaleBasicButton} />
						</div>
					</div>
					<div className="inputErrorMessage" 
						style={{display: this.state.contextData.userSexValidity.errorDisplay}}>
						{this.state.contextData.userSexValidity.userSexError}
					</div>
					<div className="ageFormLayout">
						<div className="ageFormTitle">Age</div>
						<BasicFormField formParts={ageFormField} />
					</div>
					<div className="inputErrorMessage centerMessage" 
						style={{display: this.state.contextData.userAgeValidity.errorDisplay}}>
						{this.state.contextData.userAgeValidity.userAgeError}
					</div>
					<BasicButton onButtonClicked={this.handlePictureUpload} buttonParts={basicButton} />
				</div>
			</div>
		);
	}
}

export default PictureUpload;


