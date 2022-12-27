import React from 'react';
import '../css/style.css';
import '../css/floating_account.css';
import placeholder from '../image/placeholder.jpg';
import icon_menu_black from '../image/icon_menu_black.png';
import RoundPicture from '../component/round_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_search from '../image/icon_search.png';
import test_image from '../image/test_image.png';
import logo from '../image/datemomo.png';

class FloatingAccount extends React.Component {
	state = {gradientHeight : 0};

	constructor(props) {
		super(props);
		this.state = {}; 
		this.setGradientHeight = this.setGradientHeight.bind(this);
	}

	componentDidMount() {
		const height = this.gradientCover.clientHeight;
		console.log("The original height of gradientCover here is " + height);
	}
               
	setGradientHeight(event) { 
		console.log("The height of the image here is " + event.target.clientHeight);
		console.log("The height of this.gradientCover.style.height here is " + this.gradientCover.style.height);
		this.setState({gradientHeight : event.target.clientHeight});
	}

	render() {
		var searchFormPartsValue = {
			fieldIcon : icon_search,
			placeholder : "Search",
			type : "text",
			formFieldClass : "formFieldClass",
			fieldLayoutClass : "rightIconFieldLayout",
			fieldIconClass : "rightFieldIcon"
		};

		var roundPictureParts = {
			roundPictureClass : "roundPictureClass",
			roundPicture : test_image
		};

		return (
			<div className="floatingUserAccountLayout">
				<div className="floatingUserAccountWidget">
					<img className="floatingUserAccountImage" onLoad={this.setGradientHeight} alt="" src={test_image} />
					<div className="gradientCover" ref={(gradientCover) => {this.gradientCover = gradientCover}} 
					style={{height : this.state.gradientHeight}}>
						<div className="gradientLayout">
							<div className="gradientUserName">Solution, 37</div>
							<div className="gradientLocation">Minarelikoy</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FloatingAccount;   


