import React from 'react';
import axios from 'axios';
import '../css/login.css';
import LeftIconHollowButton from '../component/left_icon_hollow_button'
import LeftIconFormField from '../component/left_icon_form_field'
import BasicButton from '../component/basic_button'
import HollowButton from '../component/hollow_button'
import icon_person from '../image/icon_person.png'
import icon_gallery_blue from '../image/icon_gallery_blue.png'
import icon_camera_blue from '../image/icon_camera_blue.png'
import icon_password from '../image/icon_password.png'
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
		var firstFormPartsValue = {
			fieldIcon : icon_person,
			placeholder : "User Name",
			label : "User Name",
			type : "text",
			fieldLayoutClass : "fieldLayout",
			fieldIconClass : "leftFieldIcon"
		};
   
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
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
		}

		var basicButton = {
			buttonTitle : "Sign Up",
			buttonClass : "basicButton"
		}
 
		return (
			<div className="login">
				<div className="loginWidget">
					<div className="registerPageHeader">
						<div className="registerPageTitle">Upload Your <br></br>Profile Picture</div>
						<img className="registerPageIcon" alt="Logo" src={logo}/>
					</div>
					<img className="userPicture" alt="" src={placeholder} />
					<div className="pictureButtons">
						<LeftIconHollowButton buttonParts={takePictureButton} />
						<LeftIconHollowButton buttonParts={uploadPictureButton} />
					</div>
				</div>
			</div>
		);
	}
}

export default PictureUpload;


