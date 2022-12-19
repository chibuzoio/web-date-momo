import React from 'react';
import axios from 'axios';
import '../css/login.css';
import LeftIconFormField from '../component/left_icon_form_field'
import BasicButton from '../component/basic_button'
import icon_person from '../image/icon_person.png'
import logo from '../image/datemomo.png';

class Login extends React.Component {

/*		
	You declare constructor explicitly because 
	you want to initialize state. You initialized 
	state because you want to set state somewhere
	in the class. If not, use data from props directly, 
	without initializing state with it and do not declare 
	the constructor because it's already declared implicitly.
*/		
	constructor(props) {
		super(props);
		this.state = {userNames : []};

		// The binding below is necessary so as to attach 
		// testMethod to the context of this class and for 
		// the method not to appear undefined when called
		this.testMethod = this.testMethod.bind(this); 
	}

	componentDidMount() {
		axios.get("http://datemomo.com/service/usernamecomposite.php")
	    	.then(response => {
	    		this.setState({
	    			userNames : response.data
	    		});
	
				this.testMethod();
	        }, error => {
	        	console.log(error);
	        });
	}

	componentWillUnmount() {

	}

	testMethod() {
		// This kind of expression below is used when the 
		// state needs to be updated using values from state 
		// (old data) and values from props (new data)
 		this.setState((state, props) => {
			// counter: state.counter + props.increment
			// console.log("The value of state here is " + JSON.stringify(state));
		});
	}

	render() {
		var formPartsValue = {
			buttonTitle : "Please Submit",
			fieldIcon : icon_person,
			label : "Name"
		};

		return (
			<div className="login">
				<img className="logo" alt="Logo" src={logo}/>
				<div>
					<LeftIconFormField formParts={formPartsValue} />
					<BasicButton buttonTitle={formPartsValue.buttonTitle} />
				</div>
			</div>
		);
	}
}

export default Login;  


