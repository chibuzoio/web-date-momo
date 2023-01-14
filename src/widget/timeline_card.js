import React from 'react';
import '../css/header.css';
import '../css/timeline.css';
import placeholder from '../image/placeholder.jpg';
import icon_menu_black from '../image/icon_menu_black.png';
import RoundPicture from '../component/round_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_heart_hollow from '../image/icon_heart_hollow.png';
import icon_search from '../image/icon_search.png';
import test_image from '../image/test_image.png';
import logo from '../image/datemomo.png';

class TimelineCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
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
			<div className="timelineWidget"> 
				<img className="centerCropped" src={test_image} />
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
		);
	}
}

export default TimelineCard;   


