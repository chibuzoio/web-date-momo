import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/footer.css';
import '../css/home_page.css';
import { Outlet, Link } from "react-router-dom";
import Footer from '../widget/footer';
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

/* This home page has to serve as the only page where widgets are coupled, decoupled, removed and replaced */
/* So, modify the home page so that everything will happen here. Then, use all other pages and widgets as dependencies */

class HomePage extends React.Component {
	currentUser = {};
	state = {userNames : []};

	constructor(props) {
		super(props);
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
	}

	componentDidMount() {
		if (this.currentUser.authenticated) {
			if (this.currentUser.userLevel === "uploadProfilePicture") { 
				window.location.replace("/picture_upload");
			} else if (this.currentUser.userLevel === "selectSexualityInterest") { 
				window.location.replace("/sexuality");
			}
		} else {
			window.location.replace("/login");
		}
	}

	componentWillUnmount() {

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
         
		return (
			<div className="homePage">
				<div className="header">
					<Link className="companyLogoLink" to="/">
						<img className="companyLogo" alt="Logo" src={logo} />
					</Link>
					<RightIconFormField formParts={searchFormPartsValue}/>
					<Link className="companyLogoLink" to="account">
						<img className="roundPictureClass" alt="" 
							src={"https://datemomo.com/client/image/" + this.currentUser.profilePicture} />
					</Link>
				</div>
		
				<Outlet />

				<Footer />
			</div>
		);
	}
}

export default HomePage;


