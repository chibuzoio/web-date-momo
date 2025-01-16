import React from 'react';
import '../css/messenger.css';
import NotificationContent from './notification_content';

function NotificationIterator(props) {
	const clickNotificationIteratorComponent = (notificationEffectorId) => {
		props.onNotificationIteratorClicked(notificationEffectorId);
	}
    
    return (
        <div className="notificationIteratorLayout">

            {
                props.notificationComposite.map((notificationContent) => ( 
                    <NotificationContent notificationComposite={notificationContent} 
                        onNotificationClicked={clickNotificationIteratorComponent} />
                ))
            }

            <div className="bottomPadding"><p></p></div>
        </div>
    );
}

export default NotificationIterator;


