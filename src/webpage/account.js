import React from 'react';
import '../css/style.css';
import '../css/profile.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import test_image from '../image/test_image.png';

import icon_logout from '../image/icon_logout.png';
import icon_suggestion from '../image/icon_suggestion.png';
import icon_announcement from '../image/icon_announcement.png';
import icon_help_and_support from '../image/icon_help_and_support.png';
import icon_terms_and_conditions from '../image/icon_terms_and_conditions.png';

import ProfilePicture from '../component/profile_picture'; 
import BorderlessIconMenu from '../component/borderless_icon_menu'; 
import BottomBorderIconMenu from '../component/bottom_border_icon_menu'; 

class Account extends React.Component {
	state = {userDetailParts : {}};

	constructor(props) {
		super(props);
		this.state.userDetailParts = {
			roundPicture : test_image,
			userNameAge : "Solution, 33",
			detailPictureHeight : "113.85px",
			detailPictureWidth : "103.5px",
			userNameLabelHeight : "20px"
		}; 

		this.calculatePictureDimensions = this.calculatePictureDimensions.bind(this);
	}

	componentDidMount() {
		this.calculatePictureDimensions();
		window.addEventListener('resize', this.calculatePictureDimensions);
	}

	calculatePictureDimensions() {
		var browserWidth = window.innerWidth;  
		var sumOfPictureMargins = (8 / 100) * browserWidth;
		var totalPictureWidth = browserWidth - sumOfPictureMargins;
		var eachPictureWidth = totalPictureWidth / 4;
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

		var friendReferenceMenu = {
			iconMenuImage : icon_announcement,
			iconMenuTitle : "Refer A Friend"
		};

		var suggestionMenu = {
			iconMenuImage : icon_suggestion,
			iconMenuTitle : "Suggestion"
		};

		var helpSupportMenu = {
			iconMenuImage : icon_help_and_support,
			iconMenuTitle : "Help And Support"
		};

		var termsConditionMenu = {
			iconMenuImage : icon_terms_and_conditions,
			iconMenuTitle : "Terms And Conditions"
		};

		var accountLogoutMenu = {
			iconMenuImage : icon_logout,
			iconMenuTitle : "Logout"
		};

		return (
			<div className="dateMomoOuterLayout">
				<Header />
				<div className="dateMomoProfileLayout">
					<div className="profilePictureImpactCount">
						<div className="accountPictureLayout">
							<ProfilePicture pictureParts={userProfilePicture} />
						</div>
						<div className="impactCountLayout">
							<div className="impactCountHeader">Impact</div>
							<div className="impactCountNumber">1</div>
						</div>
					</div>
					<div className="likedUsersTitle">People You Like</div>
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

					<div className="accountMenuLayout">
						<BottomBorderIconMenu iconMenuParts={friendReferenceMenu} />
						<BottomBorderIconMenu iconMenuParts={suggestionMenu} />
						<BottomBorderIconMenu iconMenuParts={helpSupportMenu} />
						<BottomBorderIconMenu iconMenuParts={termsConditionMenu} />
						<BorderlessIconMenu iconMenuParts={accountLogoutMenu} />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Account;   


