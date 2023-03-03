import React from 'react';
import '../css/style.css';
import '../css/footer.css';
import { Outlet, Link } from "react-router-dom";
import { getRefinedLocation } from '../utility/utility';
import BottomMenuIcon from '../component/bottom_menu_icon';
import icon_notification_white from '../image/icon_notification_white.png';
import icon_notification_blue from '../image/icon_notification_blue.png';
import icon_message_white from '../image/icon_message_white.png';
import icon_account_white from '../image/icon_account_white.png';
import icon_message_blue from '../image/icon_message_blue.png';
import icon_account_blue from '../image/icon_account_blue.png';
import icon_home_white from '../image/icon_home_white.png';
import icon_home_blue from '../image/icon_home_blue.png';

class Footer extends React.Component {
	locationIntervalId = {};
	visibleBottomMenuLayout = "footer";
	hiddenBottomMenuLayout = this.visibleBottomMenuLayout + " hideComponent";
	state = {contextData : {
		footerBottomMenu : {
			homeBottomMenu : {
				bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
				bottomMenuIcon : "bottomMenuIcon",
				menuIcon : icon_home_blue
			},
			messengerBottomMenu : {
				bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
				bottomMenuIcon : "bottomMenuIcon",				
				menuIcon : icon_message_blue
			},
			userAccountBottomMenu : {
				bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
				bottomMenuIcon : "bottomMenuIcon",				
				menuIcon : icon_account_blue
			},
			notificationBottomMenu : {
				bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
				bottomMenuIcon : "bottomMenuIcon",				
				menuIcon : icon_notification_blue
			}
		},
		bottomMenuLayout : this.visibleBottomMenuLayout,
		currentLocation : ""
	}};
	
	constructor(props) {
		super(props);
		this.notificationBottomMenuClicked = this.notificationBottomMenuClicked.bind(this);
		this.userAccountBottomMenuClicked = this.userAccountBottomMenuClicked.bind(this);
		this.messengerBottomMenuClicked = this.messengerBottomMenuClicked.bind(this);  
		this.neutralizeAllBottomMenu = this.neutralizeAllBottomMenu.bind(this);
		this.homeBottomMenuClicked = this.homeBottomMenuClicked.bind(this);
	}
	
	componentDidMount() {
		this.locationIntervalId = setInterval(function() {  
		    if (this.state.contextData.currentLocation !== window.location.pathname) {
				this.setState(function(state) {
					return {contextData : {
						footerBottomMenu : state.contextData.footerBottomMenu,
						bottomMenuLayout : state.contextData.bottomMenuLayout,
						currentLocation : window.location.pathname
					}
				}});		

			    switch (window.location.pathname) {
			    	case "/": 
			    		this.homeBottomMenuClicked(true);
			    		break;
			    	case "/messenger": 
			    		this.messengerBottomMenuClicked(true);
			    		break;
			    	case "/profile": 
			    		this.userAccountBottomMenuClicked(true);
			    		break;
			    	case "/notification": 
			    		this.notificationBottomMenuClicked(true);
			    		break;
			    	case "/message":
						this.setState(function(state) {
							return {contextData : {
								footerBottomMenu : state.contextData.footerBottomMenu,
								bottomMenuLayout : this.hiddenBottomMenuLayout,
								currentLocation : state.contextData.currentLocation
							}
						}});		
			    		this.neutralizeAllBottomMenu();
			    		break;
			    	default: 
						this.setState(function(state) {
							return {contextData : {
								footerBottomMenu : state.contextData.footerBottomMenu,
								bottomMenuLayout : this.visibleBottomMenuLayout,
								currentLocation : state.contextData.currentLocation
							}
						}});		
			    		this.neutralizeAllBottomMenu();						
			    }	
		    }
		}.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.locationIntervalId);
	}

	neutralizeAllBottomMenu() {
		this.setState(function(state) {
			return {contextData : {
				footerBottomMenu : {
					homeBottomMenu : {
						bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
						bottomMenuIcon : state.contextData.footerBottomMenu.homeBottomMenu.bottomMenuIcon,
						menuIcon : icon_home_blue
					},
					messengerBottomMenu : {
						bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
						bottomMenuIcon : state.contextData.footerBottomMenu.messengerBottomMenu.bottomMenuIcon,
						menuIcon : icon_message_blue
					},
					userAccountBottomMenu : {
						bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
						bottomMenuIcon : state.contextData.footerBottomMenu.userAccountBottomMenu.bottomMenuIcon,
						menuIcon : icon_account_blue
					},
					notificationBottomMenu : {
						bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
						bottomMenuIcon : state.contextData.footerBottomMenu.notificationBottomMenu.bottomMenuIcon,
						menuIcon : icon_notification_blue
					}						
				},
				bottomMenuLayout : state.contextData.bottomMenuLayout,
				currentLocation : state.contextData.currentLocation
			}
		}});
	}

	homeBottomMenuClicked(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					footerBottomMenu : {
						homeBottomMenu : {
							bottomMenuClass : "bottomMenuLayout selectedMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.homeBottomMenu.bottomMenuIcon,
							menuIcon : icon_home_white
						},
						messengerBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.messengerBottomMenu.bottomMenuIcon,
							menuIcon : icon_message_blue
						},
						userAccountBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.userAccountBottomMenu.bottomMenuIcon,
							menuIcon : icon_account_blue
						},
						notificationBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.notificationBottomMenu.bottomMenuIcon,
							menuIcon : icon_notification_blue
						}						
					},
					bottomMenuLayout : this.visibleBottomMenuLayout,
					currentLocation : state.contextData.currentLocation
				}
			}});
		}
	}
	
	messengerBottomMenuClicked(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					footerBottomMenu : {
						homeBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.homeBottomMenu.bottomMenuIcon,
							menuIcon : icon_home_blue
						},
						messengerBottomMenu : {
							bottomMenuClass : "bottomMenuLayout selectedMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.messengerBottomMenu.bottomMenuIcon,
							menuIcon : icon_message_white
						},
						userAccountBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.userAccountBottomMenu.bottomMenuIcon,
							menuIcon : icon_account_blue
						},
						notificationBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.notificationBottomMenu.bottomMenuIcon,
							menuIcon : icon_notification_blue
						}						
					},
					bottomMenuLayout : this.visibleBottomMenuLayout,
					currentLocation : state.contextData.currentLocation
				}
			}});
		}
	}
	
	userAccountBottomMenuClicked(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					footerBottomMenu : {
						homeBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.homeBottomMenu.bottomMenuIcon,
							menuIcon : icon_home_blue
						},
						messengerBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.messengerBottomMenu.bottomMenuIcon,
							menuIcon : icon_message_blue
						},
						userAccountBottomMenu : {
							bottomMenuClass : "bottomMenuLayout selectedMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.userAccountBottomMenu.bottomMenuIcon,
							menuIcon : icon_account_white
						},
						notificationBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.notificationBottomMenu.bottomMenuIcon,
							menuIcon : icon_notification_blue
						}						
					},
					bottomMenuLayout : this.visibleBottomMenuLayout,
					currentLocation : state.contextData.currentLocation
				}
			}});
		}
	}
	
	notificationBottomMenuClicked(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					footerBottomMenu : {
						homeBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.homeBottomMenu.bottomMenuIcon,
							menuIcon : icon_home_blue
						},
						messengerBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.messengerBottomMenu.bottomMenuIcon,
							menuIcon : icon_message_blue
						},
						userAccountBottomMenu : {
							bottomMenuClass : "bottomMenuLayout ignoredMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.userAccountBottomMenu.bottomMenuIcon,
							menuIcon : icon_account_blue
						},
						notificationBottomMenu : {
							bottomMenuClass : "bottomMenuLayout selectedMenuLayout",
							bottomMenuIcon : state.contextData.footerBottomMenu.notificationBottomMenu.bottomMenuIcon,
							menuIcon : icon_notification_white
						}						
					},
					bottomMenuLayout : this.visibleBottomMenuLayout,
					currentLocation : state.contextData.currentLocation
				}
			}});
		}
	}

	render() {
		return (
			<div className={this.state.contextData.bottomMenuLayout}>
				<Link onClick={this.homeBottomMenuClicked} className="footerLink" to="/">
					<BottomMenuIcon onButtonClicked={this.homeBottomMenuClicked} menuParts={this.state.contextData.footerBottomMenu.homeBottomMenu} />
				</Link>
				<Link onClick={this.messengerBottomMenuClicked} className="footerLink" to="messenger">
					<BottomMenuIcon onButtonClicked={this.messengerBottomMenuClicked} menuParts={this.state.contextData.footerBottomMenu.messengerBottomMenu} />
				</Link>
				<Link onClick={this.userAccountBottomMenuClicked} className="footerLink" to="profile">
					<BottomMenuIcon onButtonClicked={this.userAccountBottomMenuClicked} menuParts={this.state.contextData.footerBottomMenu.userAccountBottomMenu} />
				</Link>
				<Link onClick={this.notificationBottomMenuClicked} className="footerLink" to="notification">
					<BottomMenuIcon onButtonClicked={this.notificationBottomMenuClicked} menuParts={this.state.contextData.footerBottomMenu.notificationBottomMenu} />
				</Link>
			</div>
		);
	}
}

export default Footer;   


