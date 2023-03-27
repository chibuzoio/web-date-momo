import React from 'react';
import '../css/messenger.css';
import ActiveMessengerContent from '../widget/active_messenger_content';

class ActiveMessenger extends React.Component {

	constructor(props) {
		super(props);
		this.clickMessengerComponent = this.clickMessengerComponent.bind(this);
	}

	clickMessengerComponent(messengerResponse) {
		this.props.onActiveMessengerClicked(messengerResponse);
	}

	render() {  
		return (
			<div className="activeMessengerLayout">
				{
					this.props.activeMessengerComposite.map((messengerContent) => ( 
						<ActiveMessengerContent onMessengerClicked={this.clickMessengerComponent} 
							messengerComposite={messengerContent} />
					))
				}
				<div className="bottomPadding"><p></p></div>
			</div>
		);
	}
}

export default ActiveMessenger;   


