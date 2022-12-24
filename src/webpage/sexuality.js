import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/sexuality.css';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import BasicFormField from '../component/basic_form_field';
import BasicButton from '../component/basic_button';
import HollowButton from '../component/hollow_button';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import icon_camera_blue from '../image/icon_camera_blue.png';
import placeholder from '../image/placeholder.jpg';
import logo from '../image/datemomo.png';

class Sexuality extends React.Component {
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
			<div className="login">
				<div className="loginWidget">
					<div className="sexualCategoryHeader">Your Sexual Category</div>
					<div className="sexualityButtonLayout">
						{ 
							sexualCategoryButtons.map((categoryButton) => ( 
								<HollowButton buttonParts={categoryButton} />
							))
						}
					</div>
					<div className="sexualCategoryHeader">You are interested in</div>
					<div className="sexualityButtonLayout">
						{ 
							sexualInterestButtons.map((interestButton) => ( 
								<HollowButton buttonParts={interestButton} />
							)) 
						}
					</div>
					<div className="sexualCategoryHeader">Things you have tried or can do in sex</div>
					<div className="sexualityButtonLayout">
						{ 
							sexualExperienceButtons.map((experienceButton) => ( 
								<HollowButton buttonParts={experienceButton} />
							)) 
						}
					</div>
					<BasicButton buttonParts={basicButton} />
				</div>
			</div>
		);
	}
}

export default Sexuality;


