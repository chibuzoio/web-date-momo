import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import '../css/style.css';
import '../css/header.css';
import placeholder from '../image/placeholder.jpg';
import icon_menu_black from '../image/icon_menu_black.png';
import RoundPicture from '../component/round_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_search from '../image/icon_search.png';
import test_image from '../image/test_image.png';
import logo from '../image/datemomo.png';

function Header() {
	var visibleHeaderLayout = "header";
	var hiddenHeaderLayout = visibleHeaderLayout + " hideComponent";

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

	const location = useLocation();

	const [headerLayoutClass, setHeaderLayoutClass] = useState(visibleHeaderLayout);

	useEffect(() => {
		if (location.pathname.indexOf("/message") > -1) {
			setHeaderLayoutClass(hiddenHeaderLayout); 
		} else {
			setHeaderLayoutClass(visibleHeaderLayout); 
		}
	}, [location.pathname]);

	return (
		<div className={headerLayoutClass}>
			<img className="companyLogo" alt="Logo" src={logo} />
			<RightIconFormField formParts={searchFormPartsValue}/>
			<RoundPicture pictureParts={roundPictureParts} />
		</div>
	);
}

export default Header;   


