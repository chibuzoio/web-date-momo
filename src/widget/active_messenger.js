import React from 'react';
import '../css/messenger.css';
import ActiveMessengerContent from './active_messenger_content';

function ActiveMessenger(props) {
	const clickMessengerComponent = (messengerResponse) => {
		props.onActiveMessengerClicked(messengerResponse);
	}

    return (
        <div className="activeMessengerLayout">
            {
                props.activeMessengerComposite.map((messengerContent) => ( 
                    <ActiveMessengerContent onMessengerClicked={clickMessengerComponent} 
                        messengerComposite={messengerContent} />
                ))
            }
            <div className="bottomPadding"><p></p></div>
        </div>
    );
}

export default ActiveMessenger;


