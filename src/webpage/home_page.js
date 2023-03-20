import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/footer.css';
import '../css/timeline.css';
import '../css/home_page.css';
import { Outlet, Link, useLocation } from "react-router-dom";
import Footer from '../widget/footer';
import LeftMenuSection from '../widget/left_menu_section';
import BottomMenuIcon from '../component/bottom_menu_icon';
import icon_notification_blue from '../image/icon_notification_blue.png';
import icon_message_blue from '../image/icon_message_blue.png';
import icon_account_blue from '../image/icon_account_blue.png';
import icon_home_white from '../image/icon_home_white.png';
import placeholder from '../image/placeholder.jpg';
import icon_menu_black from '../image/icon_menu_black.png';
import RoundPicture from '../component/round_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_search from '../image/icon_search.png';
import test_image from '../image/test_image.png';
import logo from '../image/datemomo.png';

function HomePage() {
	var visibleHeaderLayout = "header";
	var contentParentLayout = "outerParentLayout";
	var messageParentLayout = "messageOuterParentLayout outerParentLayout";
	var hiddenHeaderLayout = visibleHeaderLayout + " hideComponent";
  
	var searchFormPartsValue = {
		fieldIcon : icon_search,
		placeholder : "Search",
		type : "text",
		formFieldClass : "formFieldClass",
		fieldLayoutClass : "rightIconFieldLayout",
		fieldIconClass : "rightFieldIcon"
	};

	const location = useLocation();

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const [headerLayoutClass, setHeaderLayoutClass] = useState(visibleHeaderLayout);
	const [contentOuterContainer, setContentOuterContainer] = useState(contentParentLayout);

	useEffect(() => {
		if (currentUser != null) {
			if (Object.keys(currentUser).length > 0) {
				if (currentUser.authenticated) {
					if (currentUser.userLevel === "uploadProfilePicture") { 
						window.location.replace("/picture_upload");
					} else if (currentUser.userLevel === "selectSexualityInterest") { 
						window.location.replace("/sexuality");
					}
				} else {
					window.location.replace("/login");
				}
			} else {
				window.location.replace("/login");
			}
		} else {
			window.location.replace("/login");
		}

		if (location.pathname.indexOf("/message") > -1) {
			setHeaderLayoutClass(hiddenHeaderLayout); 
			setContentOuterContainer(messageParentLayout);
		} else {
			setHeaderLayoutClass(visibleHeaderLayout); 
			setContentOuterContainer(contentParentLayout);
		}
	}, [location.pathname]);
           
	return (
		<div className="homePage">
			<div className={headerLayoutClass}>
				<Link className="companyLogoLink" to="/">
					<img className="companyLogo" alt="Logo" src={logo} />
				</Link>
				<RightIconFormField formParts={searchFormPartsValue}/>
				<Link className="companyLogoLink" to="account">
					<img className="roundPictureClass" alt="" 
						src={"https://datemomo.com/client/image/" + currentUser.profilePicture} />
				</Link>
			</div>
			<div className={contentOuterContainer}>

				<LeftMenuSection />

				<Outlet />

			</div>
			<Footer />
		</div>
	);
}

export default HomePage;


