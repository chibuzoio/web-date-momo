import React from 'react';
import '../css/messenger.css';
import NotificationContent from './notification_content';

class NotificationIteratorDeprecated extends React.Component {

	constructor(props) {
		super(props);
		this.clickNotificationIteratorComponent = this.clickNotificationIteratorComponent.bind(this);
	}

	clickNotificationIteratorComponent(notificationEffectorId) {
		this.props.onNotificationIteratorClicked(notificationEffectorId);
	}

	render() {  
		return (
			<div className="notificationIteratorLayout">

				{
					this.props.notificationComposite.map((notificationContent) => ( 
						<NotificationContent notificationComposite={notificationContent} 
							onNotificationClicked={this.clickNotificationIteratorComponent} />
					))
				}

				<div className="bottomPadding"><p></p></div>
			</div>
		);
	}
}

export default NotificationIteratorDeprecated;   


