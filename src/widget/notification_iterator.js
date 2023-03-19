import React from 'react';
import '../css/messenger.css';
import NotificationContent from '../widget/notification_content';

class NotificationIterator extends React.Component {

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

export default NotificationIterator;   


