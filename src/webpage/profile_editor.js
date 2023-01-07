import React from 'react';
import '../css/style.css';
import '../css/profile.css';
import Header from '../widget/header';
import Footer from '../widget/footer'; 
import test_image from '../image/test_image.png';
import BasicButton from '../component/basic_button';
import ProfilePicture from '../component/profile_picture'; 
import SexualityOptions from '../widget/sexuality_options';

class ProfileEditor extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {             
		var userProfilePicture = {
			roundPicture : test_image
		};

		var basicButton = {
			buttonTitle : "Done",
			buttonClass : "basicButton fullWidth"
		}
    
		var sexualCategoryButtons = [
			{buttonTitle : "Bisexual", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "hollowButton sexualityButton"}
		];

		var sexualInterestButtons = [
			{buttonTitle : "Bisexual", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Friendship", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Relationship", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "hollowButton sexualityButton"}
		];
    
		var sexualExperienceButtons = [
			{buttonTitle : "69", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Anal Sex", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Given Head", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Missionary", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "One-night Stand", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Orgy Sex", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Pool Sex", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Received Head", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sexed In Car", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sexed In Public", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sexed With Camera", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Threesome", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Used Sex Toys", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Video Sex Chat", buttonClass : "hollowButton sexualityButton"}
		];
           
		return (
			<div className="dateMomoOuterLayout">
				<Header />
				<div className="profileEditorLayout">
					<div className="profileEditorHeader">Edit Profile</div>
					<div className="lineSeparator"></div>
					<div className="profilePictureUpdater">
						<div className="leftLayoutSpace"></div>
						<div className="profilePictureChanger">
							<ProfilePicture pictureParts={userProfilePicture} />
						</div>
						<div className="rightLayoutSpace">Add</div>
					</div>
					<div className="lineSeparator"></div>
					<div className="statusEditorLayout">
						<div className="statusEditorButton">Edit</div>
						<div className="statusEditorText">Hello dear! Welcome to my profile!</div>
					</div> 
					<div className="lineSeparator"></div>
					<div className="subEditorHeader">Edit Your Sexuality</div>
					<div className="sexualityEditorButtons">
						<SexualityOptions sexualityButtons={sexualCategoryButtons} />
					</div>
					<div className="lineSeparator"></div>
					<div className="subEditorHeader">Edit Your Sexual Interests</div>
					<div className="sexualityEditorButtons">
						<SexualityOptions sexualityButtons={sexualInterestButtons} />
					</div>
					<div className="lineSeparator"></div>
					<div className="subEditorHeader">Edit Your Sexual Experiences</div>
					<div className="sexualityEditorButtons">
						<SexualityOptions sexualityButtons={sexualExperienceButtons} />
					</div>
					<div className="lineSeparator"></div>
					<div className="profileEditorButton">
						<BasicButton buttonParts={basicButton} />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default ProfileEditor;   


