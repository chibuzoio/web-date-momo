import React from 'react';
import '../css/style.css';
import grey_placeholder from '../image/grey_placeholder.png';

class RoundPicture extends React.Component {
	imageData = {};
	state = {contextData : {
		roundPictureImage : grey_placeholder
	}};

	constructor(props) {
		super(props);
		this.imageData = new Image();
	}

	componentDidMount() {
		this.imageData.src = this.props.pictureParts.roundPicture;

		this.imageData.onload = function() {
			this.setState(function(state, props) {
				return {contextData : {
	          		roundPictureImage : props.pictureParts.roundPicture
				}
			}});  
		}.bind(this);
	}
            
	render() {  
		return (
			<img className={this.props.pictureParts.roundPictureClass} 
				alt="" src={this.state.contextData.roundPictureImage} />
		);
	}
}

export default RoundPicture;   


