import React from 'react';
import '../css/messenger.css';
import ActiveMessengerContent from '../widget/active_messenger_content';

class ActiveMessenger extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {  
		return (
			<div className="genericMessengerLayout">
				<div className="activeMessengerHeader">Chats</div>
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<ActiveMessengerContent />
				<div className="bottomPadding"><p></p></div>
			</div>
		);
	}
}

export default ActiveMessenger;   


