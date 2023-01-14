import React from 'react';
import axios from 'axios';
import '../css/header.css';
import '../css/footer.css';
import '../css/home_page.css';
import { Outlet, Link } from "react-router-dom";
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

class HomePage extends React.Component {
	state = {userNames : []};

	constructor(props) {
		super(props);
		this.state.userNames = props.userNames;
	}

	componentDidMount() {
	
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

		var roundPictureParts = {
			roundPictureClass : "roundPictureClass",
			roundPicture : test_image
		};

		// For footer 
		var homeBottomMenu = {
			bottomMenuClass : "bottomMenuLayout selectedMenuLayout",
			menuIcon : icon_home_white
		};

		var messengerBottomMenu = {
			bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
			menuIcon : icon_message_blue
		};

		var userAccountBottomMenu = {
			bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
			menuIcon : icon_account_blue
		};

		var notificationBottomMenu = {
			bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
			menuIcon : icon_notification_blue
		};

		return (
			<div className="homePage">
				<div className="header">
					<img className="companyLogo" alt="Logo" src={logo} />
					<RightIconFormField formParts={searchFormPartsValue}/>
					<RoundPicture pictureParts={roundPictureParts} />
				</div>
		
				<Outlet />
				
				<div className="footer">
					<Link className="footerLink" to="/">
						<BottomMenuIcon menuParts={homeBottomMenu} />
					</Link>
					<Link className="footerLink" to="messenger">
						<BottomMenuIcon menuParts={messengerBottomMenu} />
					</Link>
					<Link className="footerLink" to="profile">
						<BottomMenuIcon menuParts={userAccountBottomMenu} />
					</Link>
					<Link className="footerLink" to="notification">
						<BottomMenuIcon menuParts={notificationBottomMenu} />
					</Link>
				</div>
			</div>
		);
	}
}

export default HomePage;


