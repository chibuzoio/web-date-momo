import React from 'react';
import '../css/header.css';

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = props;
	}

/*constructor(props) {
    super(props);

    this.state = {
      x: props.initialX
    };
  }*/

	render() {
		const {hours, minutes, seconds, ampm} = this.state;

		return (
			<div className="header">
	      {hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}:
	      {minutes > 9 ? minutes : "{minutes}"}:
	      {seconds > 9 ? seconds : "{seconds}"} {ampm}
			</div>
		);
	}
}

export default Header;   


