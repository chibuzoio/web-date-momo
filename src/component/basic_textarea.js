import React from 'react';
import '../css/input.css';

class BasicTextarea extends React.Component {
	state = {formParts : {}};

	constructor(props) {
		super(props);
		this.state.formParts = props.formParts; 
		this.getScrollHeight = this.getScrollHeight.bind(this);
		this.expandTextareaInput = this.expandTextareaInput.bind(this);
	}

	expandTextareaInput({target : element}) {
	  	var minimumRows = element.getAttribute('data-min-rows')|0, rows;
	  	!element._baseScrollHeight && this.getScrollHeight(element)

		element.rows = minimumRows
	  	rows = Math.ceil((element.scrollHeight - element._baseScrollHeight) / 16)
	  	element.rows = minimumRows + rows
	}

	getScrollHeight(element) {
		var savedValue = element.value;
     	element.value = '';
		element._baseScrollHeight = element.scrollHeight;
		element.value = savedValue;
	}

	render() {     
		return (
			<div> 
				<textarea 
					className={this.state.formParts.basicTextarea} 
					onKeyUp={this.expandTextareaInput} 
					rows={this.state.formParts.rowCount} 
					data-min-rows={this.state.formParts.minimumRows} 
					placeholder={this.state.formParts.placeholder} 
					autoFocus></textarea>

				{/* <textarea className='autoExpand' onKeyUp={} rows='3' data-min-rows='3' 
				placeholder='Auto-Expanding Textarea' autoFocus></textarea> */}

				{/* <TextareaAutosize className={this.state.formParts.basicTextarea} 
					minRows={this.state.formParts.minimumRows}
					maxRows={this.state.formParts.maximumRows}
					placeholder={this.state.formParts.placeholder} /> */}
			</div>
		);
	}
}

export default BasicTextarea;   


