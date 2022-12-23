import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/picture_upload.css';
import LeftIconHollowButton from '../component/left_icon_hollow_button'
import BasicFormField from '../component/basic_form_field'
import BasicButton from '../component/basic_button'
import HollowButton from '../component/hollow_button'
import icon_gallery_blue from '../image/icon_gallery_blue.png'
import icon_camera_blue from '../image/icon_camera_blue.png'
import placeholder from '../image/placeholder.jpg';
import logo from '../image/datemomo.png';

class PictureUpload extends React.Component {
	state = {userNames : []};

	constructor(props) {
		super(props);
		this.state.userNames = props.userNames;
	}

	componentDidMount() {
	
	}

	componentWillUnmount() {

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
			buttonClass : "basicButton customTopMargin"
		}

		var maleHollowButton = {
			buttonTitle : "Male",
			buttonClass : "hollowButton"
		}

		var femaleHollowButton = {
			buttonTitle : "Female",
			buttonClass : "hollowButton uploadPicture"
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
					<img className="userPicture" alt="" src={placeholder} />
					<div className="pictureButtons customTopMargin">
						<LeftIconHollowButton buttonParts={takePictureButton} />
						<LeftIconHollowButton buttonParts={uploadPictureButton} />
					</div>
					<div className="sexTitle">Sex</div>
					<div className="pictureButtons">
						<HollowButton buttonParts={maleHollowButton} />
						<HollowButton buttonParts={femaleHollowButton} />
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


