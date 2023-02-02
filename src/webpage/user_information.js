import React from 'react';
import '../css/style.css';
import '../css/profile.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import test_image from '../image/test_image.png';
import icon_edit_blue from '../image/icon_edit_blue.png';
import ProfilePicture from '../component/profile_picture';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import SexualityBiometrics from '../widget/sexuality_biometrics';
import LeftIconHollowButton from '../component/left_icon_hollow_button';

class UserInformation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {userDetailParts : {}};
	}
    
	render() {             
		var userProfilePicture = {
			roundPicture : test_image
		};

		var editProfileButton = {
			buttonTitle : "Edit Profile",
			buttonIcon : icon_edit_blue,
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin " + 
				"greyHollowButton floatingAccountButton",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
		}

		var pictureGalleryButton = {
			buttonTitle : "Photos",
			buttonIcon : icon_gallery_blue,
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin " + 
				"greyHollowButton floatingAccountButton",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
		}

		var sexualCategoryButtons = [
			{buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"}
		];

		var sexualInterestButtons = [
			{buttonTitle : "Bisexual", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Friendship", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Relationship", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "basicButton sexualityButton"}
		];
    
		var sexualExperienceButtons = [
			{buttonTitle : "69", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Anal Sex", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Given Head", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Missionary", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "One-night Stand", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Orgy Sex", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Pool Sex", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Received Head", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sexed In Car", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sexed In Public", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Sexed With Camera", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Threesome", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Used Sex Toys", buttonClass : "basicButton sexualityButton"},
			{buttonTitle : "Video Sex Chat", buttonClass : "basicButton sexualityButton"}
		];
     
		return (
			<div className="dateMomoOuterLayout">
				<Header />
				<div className="dateMomoProfileLayout">
					<div className="pictureUserNameLayout">
						<div className="profilePictureContainer">
							<ProfilePicture pictureParts={userProfilePicture} />
						</div>
						<div className="userNameLocationLayout">
							<div className="userNameAgeText">Solution, 33</div>
							<div className="userLocationText">Minarelikoy</div>
							<div className="currentStatusText">Hello dear! Welcome to my profile!</div>
						</div>
					</div>
					<div className="profileButtonLayout">
						<LeftIconHollowButton buttonParts={pictureGalleryButton} />
						<LeftIconHollowButton buttonParts={editProfileButton} />
					</div>
					<div className="userLikerSexualityLayout">
						<div className="sexualityHeader">My sexuality</div>
						<SexualityBiometrics sexualityButtons={sexualCategoryButtons} />
						<div className="sexualityHeader">My Interests</div>
						<SexualityBiometrics sexualityButtons={sexualInterestButtons} />
						<div className="sexualityHeader">My Experiences</div>
						<SexualityBiometrics sexualityButtons={sexualExperienceButtons} />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default UserInformation;   


