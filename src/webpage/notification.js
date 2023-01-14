import React from 'react';
import '../css/style.css';
import '../css/messenger.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import NotificationContent from '../widget/notification_content';

class Notification extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {             
		return (
			<div>
			{/*<div className="dateMomoOuterLayout">
				<Header />*/}
				<div className="dateMomoMessengerLayout">
					<div className="notificationHeader">Notifications</div>
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />
					<NotificationContent />   
				</div>
				{/*<Footer />
			</div>*/}
			</div>
		);
	}
}

export default Notification;   


