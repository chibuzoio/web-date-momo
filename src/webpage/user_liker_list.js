import React from 'react';
import '../css/style.css';
import '../css/messenger.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import test_image from '../image/test_image.png';
import UserLikerContent from '../widget/user_liker_content';

class UserLikerList extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {             
		var userLikerContents = {   
			roundPictureParts : {
				roundPictureClass : "emptyMessengerPicture",
				roundPicture : test_image
			},
			userLikerNameAge : "Solution, 33",	
			userLikerLocation : "Minarelikoy"
		};
	    
		return (
			<div className="dateMomoOuterLayout">
				<Header />
				<div className="dateMomoMessengerLayout">
					<div className="notificationHeader hideComponent">Notifications</div>
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />
					<UserLikerContent userLikerData={userLikerContents} />   
				</div>
				<Footer />
			</div>
		);
	}
}

export default UserLikerList;   


