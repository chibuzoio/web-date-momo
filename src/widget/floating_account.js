import React from 'react';
import '../css/style.css';
import '../css/floating_account.css';
import placeholder from '../image/placeholder.jpg';
import icon_message_blue from '../image/icon_message_blue.png';
import RoundPicture from '../component/round_picture';
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
				</div>
			</div>
		);
	}
}

export default FloatingAccount;   


