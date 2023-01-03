import React from 'react';
import '../css/style.css';
import '../css/profile.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import test_image from '../image/test_image.png';
import ProfilePicture from '../component/profile_picture';
import IconProfilePicture from '../component/icon_profile_picture';

class Account extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {             
		var userProfilePicture = {
			roundPicture : test_image
		};

		return (
			<div className="dateMomoOuterLayout">
				<Header />
				<div className="dateMomoProfileLayout">
					<IconProfilePicture pictureParts={userProfilePicture} />
				</div>
				<Footer />
			</div>
		);
	}
}

export default Account;   


