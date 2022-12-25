import React from 'react';
import '../css/header.css';
import placeholder from '../image/placeholder.jpg';
import icon_menu_black from '../image/icon_menu_black.png';
import RoundPicture from '../component/round_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_search from '../image/icon_search.png';
import logo from '../image/datemomo.png';

class Header extends React.Component {

/*		
	You declare constructor explicitly because 
	you want to initialize state. You initialized 
	state because you want to set state somewhere
	in the class. If not, use data from props directly, 
	without initializing state with it and do not declare 
	the constructor because it's already declared implicitly.
*/		
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
			roundPicture : placeholder
		}

		return (
			<div className="header">
				<img className="companyLogo" alt="Logo" src={logo} />
				<RightIconFormField formParts={searchFormPartsValue}/>
				<RoundPicture pictureParts={roundPictureParts} />
			</div>
		);
	}
}

export default Header;   


