import React from 'react';
import '../css/footer.css';
import BottomMenuIcon from '../component/bottom_menu_icon';
import icon_notification_blue from '../image/icon_notification_blue.png';
import icon_message_blue from '../image/icon_message_blue.png';
import icon_account_blue from '../image/icon_account_blue.png';
import icon_home_white from '../image/icon_home_white.png';

class Footer extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {
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
			<div className="footer">
				<BottomMenuIcon menuParts={homeBottomMenu} />
				<BottomMenuIcon menuParts={messengerBottomMenu} />
				<BottomMenuIcon menuParts={userAccountBottomMenu} />
				<BottomMenuIcon menuParts={notificationBottomMenu} />
			</div>
		);
	}
}

export default Footer;   


