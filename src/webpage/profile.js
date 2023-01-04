import React from 'react';
import '../css/style.css';
import '../css/profile.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import test_image from '../image/test_image.png';
import icon_edit_blue from '../image/icon_edit_blue.png';
import ProfilePicture from '../component/profile_picture';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import UserDetailPicture from '../component/user_detail_picture';
import IconProfilePicture from '../component/icon_profile_picture';
import LeftIconHollowButton from '../component/left_icon_hollow_button';

class Profile extends React.Component {
	state = {userDetailParts : {}};

	constructor(props) {
		super(props);
		this.state.userDetailParts = {
			roundPicture : test_image,
			userNameAge : "Solution, 33",
			detailPictureHeight : "154px",
			detailPictureWidth : "140px",
			userNameLabelHeight : "30px"
		}; 

		this.calculatePictureDimensions = this.calculatePictureDimensions.bind(this);
		// this.calculatePictureDimensions(); // Very very wrong to call this 
		// method in the constructor because it sets state in itself      
	}

	componentDidMount() {
		window.addEventListener('resize', this.calculatePictureDimensions);
	}

	calculatePictureDimensions() {
		var browserWidth = window.innerWidth;  
		var sumOfPictureMargins = (8 / 100) * browserWidth;
		var totalPictureWidth = browserWidth - sumOfPictureMargins;
		var eachPictureWidth = totalPictureWidth / 3;
		var eachPictureHeight = 1.1 * eachPictureWidth;
		var userNameLabel = (19.48052 / 100) * eachPictureHeight;
		var userNameTopMargin = (eachPictureHeight * (-34)) / 154; // (newHeight * oldMargin) / oldHeight

		console.log("Execution entered here with browserWidth = " + browserWidth);

		this.setState({userDetailParts : {    
			roundPicture : test_image,
			userNameAge : "Solution, 33",
			detailPictureHeight : eachPictureHeight + "px",
			detailPictureWidth : eachPictureWidth + "px",
			userNameLabelHeight : userNameLabel + "px",
			topUserNameMargin : userNameTopMargin + "px"
		}});
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
					<div className="allLikerUserLayout"> 
						<div className="firstThreeLikerUsers">
							<div className="detailPictureLayout" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}>
								<img className="detailPictureImage" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}
									alt="" src={this.state.userDetailParts.roundPicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.userDetailParts.topUserNameMargin,
									height : this.state.userDetailParts.userNameLabelHeight}}>
									{this.state.userDetailParts.userNameAge}
								</div>
							</div>

							<div className="detailPictureLayout" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}>
								<img className="detailPictureImage" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}
									alt="" src={this.state.userDetailParts.roundPicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.userDetailParts.topUserNameMargin,
									height : this.state.userDetailParts.userNameLabelHeight}}>
									{this.state.userDetailParts.userNameAge}
								</div>
							</div>
						
							<div className="detailPictureLayout" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}>
								<img className="detailPictureImage" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}
									alt="" src={this.state.userDetailParts.roundPicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.userDetailParts.topUserNameMargin,
									height : this.state.userDetailParts.userNameLabelHeight}}>
									{this.state.userDetailParts.userNameAge}
								</div>
							</div>  
						</div>
						<div className="secondThreeLikerUsers">
							<div className="detailPictureLayout" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}>
								<img className="detailPictureImage" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}
									alt="" src={this.state.userDetailParts.roundPicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.userDetailParts.topUserNameMargin,
									height : this.state.userDetailParts.userNameLabelHeight}}>
									{this.state.userDetailParts.userNameAge}
								</div>
							</div>
						
							<div className="detailPictureLayout" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}>
								<img className="detailPictureImage" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}
									alt="" src={this.state.userDetailParts.roundPicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.userDetailParts.topUserNameMargin,
									height : this.state.userDetailParts.userNameLabelHeight}}>
									{this.state.userDetailParts.userNameAge}
								</div>
							</div>
						
							<div className="detailPictureLayout" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}>
								<img className="detailPictureImage" style={{
									height : this.state.userDetailParts.detailPictureHeight,
									width : this.state.userDetailParts.detailPictureWidth}}
									alt="" src={this.state.userDetailParts.roundPicture} />
								<div className="userNameLabel" style={{
									marginTop : this.state.userDetailParts.topUserNameMargin,
									height : this.state.userDetailParts.userNameLabelHeight}}>
									{this.state.userDetailParts.userNameAge}
								</div>
							</div>  
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Profile;   


