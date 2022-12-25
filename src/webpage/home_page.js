import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/sexuality.css';
import '../css/home_page.css';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import BasicFormField from '../component/basic_form_field';
import BasicButton from '../component/basic_button';
import HollowButton from '../component/hollow_button';
import motion_placeholder from '../image/motion_placeholder.gif';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import icon_camera_blue from '../image/icon_camera_blue.png';
import test_image from '../image/test_image.png';
import icon_heart_hollow from '../image/icon_heart_hollow.png';
import logo from '../image/datemomo.png';

class HomePage extends React.Component {
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
			buttonTitle : "Submit",
			buttonClass : "basicButton customTopMargin fullWidth"
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

		var sexualCategoryButtons = [
			{buttonTitle : "Bisexual", buttonClass : "sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "sexualityButton"}
		];

		var sexualInterestButtons = [
			{buttonTitle : "Bisexual", buttonClass : "sexualityButton"},
			{buttonTitle : "Friendship", buttonClass : "sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "sexualityButton"},
			{buttonTitle : "Relationship", buttonClass : "sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "sexualityButton"}
		];
    
		var sexualExperienceButtons = [
			{buttonTitle : "69", buttonClass : "sexualityButton"},
			{buttonTitle : "Anal Sex", buttonClass : "sexualityButton"},
			{buttonTitle : "Given Head", buttonClass : "sexualityButton"},
			{buttonTitle : "Missionary", buttonClass : "sexualityButton"},
			{buttonTitle : "One-night Stand", buttonClass : "sexualityButton"},
			{buttonTitle : "Orgy Sex", buttonClass : "sexualityButton"},
			{buttonTitle : "Pool Sex", buttonClass : "sexualityButton"},
			{buttonTitle : "Received Head", buttonClass : "sexualityButton"},
			{buttonTitle : "Sexed In Car", buttonClass : "sexualityButton"},
			{buttonTitle : "Sexed In Public", buttonClass : "sexualityButton"},
			{buttonTitle : "Sexed With Camera", buttonClass : "sexualityButton"},
			{buttonTitle : "Threesome", buttonClass : "sexualityButton"},
			{buttonTitle : "Used Sex Toys", buttonClass : "sexualityButton"},
			{buttonTitle : "Video Sex Chat", buttonClass : "sexualityButton"}
		];
           
		return (
			<div className="homePage">
				<div className="scrollView">
					<div className="homePageWidget">
						<img class="centerCropped" src={test_image} />
						<div className="bottomContentLayout">
							<div className="userNameLayout">
								<div className="userNameText">Solution, 37</div>
								<div className="locationText">Minarelikoy</div>
							</div>
							<div className="likeIconLayout">
								<img className="heartIcon" alt="" src={icon_heart_hollow}/>
							</div>
						</div>
					</div>
					<div className="homePageWidget">
						<img class="centerCropped" src={motion_placeholder} />
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;


