import React from 'react';
import '../css/header.css';
import '../css/timeline.css';
import placeholder from '../image/placeholder.jpg';
import icon_menu_black from '../image/icon_menu_black.png';
import TimeLineCard from '../widget/timeline_card';
import RoundPicture from '../component/round_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_search from '../image/icon_search.png';
import test_image from '../image/test_image.png';
import logo from '../image/datemomo.png';

class Timeline extends React.Component {

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
			<div className="scrollView">
				<TimeLineCard />
			</div>
		);
	}
}

export default Timeline;   


