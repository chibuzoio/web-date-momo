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
			}
		}
	};

	constructor(props) {
		super(props);
		this.openDeviceCamera = this.openDeviceCamera.bind(this);
		this.selectPictureFile = this.selectPictureFile.bind(this);
		this.openSystemGallery = this.openSystemGallery.bind(this);
		this.handlePictureChange = this.handlePictureChange.bind(this);
	}

	componentDidMount() {
	
	}

	componentWillUnmount() {

	}

	chooseMaleSex(buttonClicked) {
		if (buttonClicked) {
			// change male sex button 
		}
	}

	chooseFemaleSex(buttonClicked) {
		if (buttonClicked) {
			// change female sex button
		}
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
  
	handlePictureChange(event) {
		if (event.target.files[0] != null) {
			this.setState(function(state) {
				return {contextData : {
					pictureUpload : {
						picture : URL.createObjectURL(event.target.files[0])
					}
				}
			}});  
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

		var maleHollowButton = {
			buttonTitle : "Male",
			buttonClass : "hollowButton halfSpacedWidth"
		}

		var femaleHollowButton = {
			buttonTitle : "Female",
			buttonClass : "hollowButton uploadPicture halfSpacedWidth"
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
					<div className="sexTitle">Sex</div>
					<div className="pictureButtons">
						<HollowButton onButtonClicked={this.chooseMaleSex} buttonParts={maleHollowButton} />
						<HollowButton onButtonClicked={this.chooseFemaleSex} buttonParts={femaleHollowButton} />
					</div>
					<div className="ageFormLayout">
						<div className="ageFormTitle">Age</div>
						<BasicFormField formParts={ageFormField} />
					</div>
					<BasicButton buttonParts={basicButton} />
				</div>
			</div>
		);
	}
}

export default PictureUpload;


