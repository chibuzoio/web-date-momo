import React, { useState, useEffect, useRef } from 'react';
import '../css/style.css';
import '../css/footer.css';
import { Outlet, Link, useLocation } from "react-router-dom";
import BottomMenuIcon from '../component/bottom_menu_icon';
import icon_notification_white from '../image/icon_notification_white.png';
import icon_notification_blue from '../image/icon_notification_blue.png';
import icon_message_white from '../image/icon_message_white.png';
import icon_account_white from '../image/icon_account_white.png';
import icon_message_blue from '../image/icon_message_blue.png';
import icon_account_blue from '../image/icon_account_blue.png';
import icon_home_white from '../image/icon_home_white.png';
import icon_home_blue from '../image/icon_home_blue.png';

function Footer() {
	var visibleBottomMenuLayout = "footer";
	var ignoredBottomMenuClass = "bottomMenuLayout ignoredMenuLayout";
	var selectedBottomMenuClass = "bottomMenuLayout selectedMenuLayout";
	var hiddenBottomMenuLayout = visibleBottomMenuLayout + " hideComponent";

	const location = useLocation();

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const [footerBottomState, setFooterBottomState] = useState({
		footerBottomMenu : {
			homeBottomMenu : {
				bottomMenuClass : ignoredBottomMenuClass,
				bottomMenuIcon : "bottomMenuIcon",
				menuIcon : icon_home_blue
			},
			messengerBottomMenu : {
				bottomMenuClass : ignoredBottomMenuClass,
				bottomMenuIcon : "bottomMenuIcon",				
				menuIcon : icon_message_blue
			},
			userAccountBottomMenu : {
				bottomMenuClass : ignoredBottomMenuClass,
				bottomMenuIcon : "bottomMenuIcon",				
				menuIcon : icon_account_blue
			},
			notificationBottomMenu : {
				bottomMenuClass : ignoredBottomMenuClass,
				bottomMenuIcon : "bottomMenuIcon",				
				menuIcon : icon_notification_blue
			}
		},
		bottomMenuLayout : visibleBottomMenuLayout
	});

	useEffect(() => {   
		if (location.pathname == "/") {   
			homeBottomMenuClicked(true);
		} else if (location.pathname.indexOf("/messenger") > -1) {
			messengerBottomMenuClicked(true);
		} else if (location.pathname.indexOf("/profile") > -1) {
			userAccountBottomMenuClicked(true);
		} else if (location.pathname.indexOf("/notification") > -1) { 
			notificationBottomMenuClicked(true);
		} else if (location.pathname.indexOf("/message") > -1) {
			neutralizeAllBottomMenu();
			setFooterBottomState({
				footerBottomMenu : footerBottomState.footerBottomMenu,
				bottomMenuLayout : hiddenBottomMenuLayout
			}); 
		} else {
			neutralizeAllBottomMenu();
			setFooterBottomState({
				footerBottomMenu : footerBottomState.footerBottomMenu,
				bottomMenuLayout : visibleBottomMenuLayout
			}); 
		}
	}, [location.pathname]);
	
	const neutralizeAllBottomMenu = () => {
		setFooterBottomState({
			footerBottomMenu : {
				homeBottomMenu : {
					bottomMenuClass : ignoredBottomMenuClass,
					bottomMenuIcon : footerBottomState.footerBottomMenu.homeBottomMenu.bottomMenuIcon,
					menuIcon : icon_home_blue
				},
				messengerBottomMenu : {
					bottomMenuClass : ignoredBottomMenuClass,
					bottomMenuIcon : footerBottomState.footerBottomMenu.messengerBottomMenu.bottomMenuIcon,
					menuIcon : icon_message_blue
				},
				userAccountBottomMenu : {
					bottomMenuClass : ignoredBottomMenuClass,
					bottomMenuIcon : footerBottomState.footerBottomMenu.userAccountBottomMenu.bottomMenuIcon,
					menuIcon : icon_account_blue
				},
				notificationBottomMenu : {
					bottomMenuClass : ignoredBottomMenuClass,
					bottomMenuIcon : footerBottomState.footerBottomMenu.notificationBottomMenu.bottomMenuIcon,
					menuIcon : icon_notification_blue
				}						
			},
			bottomMenuLayout : footerBottomState.bottomMenuLayout
		});   
	}

	const homeBottomMenuClicked = (buttonClicked) => {
		if (buttonClicked) {
			setFooterBottomState({
				footerBottomMenu : {
					homeBottomMenu : {
						bottomMenuClass : selectedBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.homeBottomMenu.bottomMenuIcon,
						menuIcon : icon_home_white
					},
					messengerBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.messengerBottomMenu.bottomMenuIcon,
						menuIcon : icon_message_blue
					},
					userAccountBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.userAccountBottomMenu.bottomMenuIcon,
						menuIcon : icon_account_blue
					},
					notificationBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.notificationBottomMenu.bottomMenuIcon,
						menuIcon : icon_notification_blue
					}						
				},
				bottomMenuLayout : visibleBottomMenuLayout
			});   
		}
	}
	
	const messengerBottomMenuClicked = (buttonClicked) => {
		if (buttonClicked) {
			setFooterBottomState({
				footerBottomMenu : {
					homeBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.homeBottomMenu.bottomMenuIcon,
						menuIcon : icon_home_blue
					},
					messengerBottomMenu : {
						bottomMenuClass : selectedBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.messengerBottomMenu.bottomMenuIcon,
						menuIcon : icon_message_white
					},
					userAccountBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.userAccountBottomMenu.bottomMenuIcon,
						menuIcon : icon_account_blue
					},
					notificationBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.notificationBottomMenu.bottomMenuIcon,
						menuIcon : icon_notification_blue
					}						
				},
				bottomMenuLayout : visibleBottomMenuLayout
			});   
		}
	}
	
	const userAccountBottomMenuClicked = (buttonClicked) => {
		if (buttonClicked) {
			setFooterBottomState({
				footerBottomMenu : {
					homeBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.homeBottomMenu.bottomMenuIcon,
						menuIcon : icon_home_blue
					},
					messengerBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.messengerBottomMenu.bottomMenuIcon,
						menuIcon : icon_message_blue
					},
					userAccountBottomMenu : {
						bottomMenuClass : selectedBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.userAccountBottomMenu.bottomMenuIcon,
						menuIcon : icon_account_white
					},
					notificationBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.notificationBottomMenu.bottomMenuIcon,
						menuIcon : icon_notification_blue
					}						
				},
				bottomMenuLayout : visibleBottomMenuLayout
			});   			
		}
	}
	
	const notificationBottomMenuClicked = (buttonClicked) => {
		if (buttonClicked) {
			setFooterBottomState({
				footerBottomMenu : {
					homeBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.homeBottomMenu.bottomMenuIcon,
						menuIcon : icon_home_blue
					},
					messengerBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.messengerBottomMenu.bottomMenuIcon,
						menuIcon : icon_message_blue
					},
					userAccountBottomMenu : {
						bottomMenuClass : ignoredBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.userAccountBottomMenu.bottomMenuIcon,
						menuIcon : icon_account_blue
					},
					notificationBottomMenu : {
						bottomMenuClass : selectedBottomMenuClass,
						bottomMenuIcon : footerBottomState.footerBottomMenu.notificationBottomMenu.bottomMenuIcon,
						menuIcon : icon_notification_white
					}						
				},
				bottomMenuLayout : visibleBottomMenuLayout
			});
		}
	}

	return (
		<div className={footerBottomState.bottomMenuLayout}>
			<Link onClick={homeBottomMenuClicked} className="footerLink" to="/">
				<BottomMenuIcon onButtonClicked={homeBottomMenuClicked} menuParts={footerBottomState.footerBottomMenu.homeBottomMenu} />
			</Link>
			<Link onClick={messengerBottomMenuClicked} className="footerLink" to="messenger">
				<BottomMenuIcon onButtonClicked={messengerBottomMenuClicked} menuParts={footerBottomState.footerBottomMenu.messengerBottomMenu} />
			</Link>
			<Link onClick={userAccountBottomMenuClicked} className="footerLink" to={"/profile/" + currentUser.userInformationData.memberId}>
				<BottomMenuIcon onButtonClicked={userAccountBottomMenuClicked} menuParts={footerBottomState.footerBottomMenu.userAccountBottomMenu} />
			</Link>
			<Link onClick={notificationBottomMenuClicked} className="footerLink" to="notification">
				<BottomMenuIcon onButtonClicked={notificationBottomMenuClicked} menuParts={footerBottomState.footerBottomMenu.notificationBottomMenu} />
			</Link>
		</div>
	);
}

export default Footer;   


