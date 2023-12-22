import React, { useState, useEffect, useRef } from 'react';
import '../css/style.css';
import '../css/header.css';
import '../css/footer.css';
import '../css/timeline.css';
import '../css/home_page.css';
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import Footer from '../widget/footer';
import LeftMenuSection from '../widget/left_menu_section';
import RightIconFormField from '../component/right_icon_form_field';
import icon_search from '../image/icon_search.png';
import logo from '../image/datemomo.png';

function HomePage() {
	var visibleHeaderLayout = "header";
	var contentParentLayout = "outerParentLayout";
	var messageParentLayout = "messageOuterParentLayout outerParentLayout";
	var hiddenHeaderLayout = visibleHeaderLayout + " hideComponent";
	var currentUser = {
		profilePicture : "",
		authenticated : false, 
		userLevel : ""
	};
	var searchFormPartsValue = {
		fieldIcon : icon_search,
		placeholder : "Search",
		type : "text",
		formFieldClass : "formFieldClass",
		fieldLayoutClass : "rightIconFieldLayout",
		fieldIconClass : "rightFieldIcon"
	};

	const location = useLocation();
	const navigate = useNavigate();

	const [headerLayoutClass, setHeaderLayoutClass] = useState(visibleHeaderLayout);
	const [contentOuterContainer, setContentOuterContainer] = useState(contentParentLayout);

	const currentUserData = JSON.parse(localStorage.getItem("currentUser"));

	if (currentUserData != null) {
		if (Object.keys(currentUserData).length > 0) {
			currentUser = currentUserData;
		}
	}

	useEffect(() => {
		if (currentUser.authenticated) {
			if (currentUser.userInformationData.userLevel === "uploadProfilePicture") { 
				navigate("/picture_upload");
			} else if (currentUser.userInformationData.userLevel === "selectSexualityInterest") { 
				navigate("/sexuality");
			}
		} else {
			navigate("/login");
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
						src={"http://localhost:1337/image/" 
						+ (currentUser.userInformationData !== undefined 
						? currentUser.userInformationData.profilePicture : "")} />
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


