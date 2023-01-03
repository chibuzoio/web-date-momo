import React from 'react';
import '../css/style.css';
import '../css/profile.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import test_image from '../image/test_image.png';
import icon_edit_blue from '../image/icon_edit_blue.png';
import ProfilePicture from '../component/profile_picture';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import IconProfilePicture from '../component/icon_profile_picture';
import LeftIconHollowButton from '../component/left_icon_hollow_button';

class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
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

		return (
			<div className="dateMomoOuterLayout">
				<Header />
				<div className="dateMomoProfileLayout">
					<div className="pictureUserNameLayout">
						<div className="profilePictureContainer">
							<IconProfilePicture pictureParts={userProfilePicture} />
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
				</div>
				<Footer />
			</div>
		);
	}
}

export default Profile;   


