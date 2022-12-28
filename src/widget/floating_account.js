import React from 'react';
import '../css/style.css';
import '../css/floating_account.css';
import placeholder from '../image/placeholder.jpg';
import icon_message_blue from '../image/icon_message_blue.png';
import RoundPicture from '../component/round_picture';
import SexualityOptions from '../widget/sexuality_options';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import RightIconFormField from '../component/right_icon_form_field';
import icon_view_blue from '../image/icon_view_blue.png';
import test_image from '../image/test_image.png';
import logo from '../image/datemomo.png';

class FloatingAccount extends React.Component {
	state = {gradientHeight : 0};

	constructor(props) {
		super(props);
		this.state = {}; 
		this.setGradientHeight = this.setGradientHeight.bind(this);
		this.updateGradientHeight = this.updateGradientHeight.bind(this);
	}

	componentDidMount() {
		// const height = this.gradientCover.clientHeight;
		// console.log("The original height of gradientCover here is " + height);
		window.addEventListener('resize', this.updateGradientHeight);
	}

	updateGradientHeight() {
		console.log("Updated height of image here is " + this.userAccountImage.clientHeight);
		this.setState({gradientHeight : this.userAccountImage.clientHeight});
	}

	setGradientHeight(event) { 
		console.log("The height of the image here is " + event.target.clientHeight);
		console.log("The height of this.gradientCover.style.height here is " + this.gradientCover.style.height);
		this.setState({gradientHeight : event.target.clientHeight});
	}

	render() {
		var viewProfileButton = {
			buttonTitle : "View Profile",
			buttonIcon : icon_view_blue,
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin " + 
				"greyHollowButton floatingAccountButton",
			leftHollowButtonContentClass : "leftHollowButtonContent",
			hollowButtonLeftIconClass : "hollowButtonLeftIcon",
			leftHollowButtonTitleClass : "leftHollowButtonTitle"
		}

		var messageButton = {
			buttonTitle : "Message",
			buttonIcon : icon_message_blue,
			leftIconHollowButtonClass : "leftIconHollowButton hollowButton buttonTopMargin " + 
				"floatContentRight greyHollowButton floatingAccountButton",
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
			<div className="floatingUserAccountLayout">
				<div className="floatingUserAccountWidget">
					<img className="floatingUserAccountImage" 
						ref={(userAccountImage) => {this.userAccountImage = userAccountImage}} 
						onLoad={this.setGradientHeight} alt="" src={test_image} />
					<div className="gradientCover" ref={(gradientCover) => {this.gradientCover = gradientCover}} 
						style={{height : this.state.gradientHeight}}>
						<div className="gradientLayout">
							<div className="gradientUserName">Solution, 37</div>
							<div className="gradientLocation">Minarelikoy</div>
						</div>
					</div>
					<div className="userStatusText">Hello dear! Welcome to my profile!</div>
					<div className="floatingLayoutButtons">
						<LeftIconHollowButton buttonParts={viewProfileButton} />
						<LeftIconHollowButton buttonParts={messageButton} />
					</div>
					<div className="floatingSexualityLayout">
						<div className="sexualityHeader">Kelechi sexuality</div>
						<SexualityOptions sexualityButtons={sexualCategoryButtons} />
						<div className="sexualityHeader">Kelechi is looking for</div>
						<SexualityOptions sexualityButtons={sexualInterestButtons} />
						<div className="sexualityHeader">Kelechi sexual fantasies</div>
						<SexualityOptions sexualityButtons={sexualExperienceButtons} />
					</div>
				</div>
			</div>
		);
	}
}

export default FloatingAccount;   


