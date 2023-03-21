import React from 'react';
import '../css/input.css';

class BasicTextarea extends React.Component {
	state = {formParts : {}};

	constructor(props) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.getScrollHeight = this.getScrollHeight.bind(this);
		this.checkEmptyEditor = this.checkEmptyEditor.bind(this);
		this.readTextareaValue = this.readTextareaValue.bind(this);
		this.expandTextareaInput = this.expandTextareaInput.bind(this);
		this.deleteThePlaceholder = this.deleteThePlaceholder.bind(this);
	}

	// Remember this method type for setting state using props values  
	updateState() {
		this.setState(function(state, props) {
			return {
				formParts : props.formParts
			}
		});
	}

	expandTextareaInput({target : element}) {
	  	var minimumRows = element.getAttribute('data-min-rows')|0, rows;
	  	!element._baseScrollHeight && this.getScrollHeight(element)

		element.rows = minimumRows
	  	rows = Math.ceil((element.scrollHeight - element._baseScrollHeight) / 16)
	  	element.rows = minimumRows + rows
	}

	readTextareaValue(event) {
		this.props.onTextValueChange(event.target.innerHTML);
	}

	getScrollHeight(element) {
		var savedValue = element.value;
     	element.value = '';
		element._baseScrollHeight = element.scrollHeight;
		element.value = savedValue;
	}

	checkEmptyEditor(event) {
		if (event.target.textContent.trim() === "") {
			event.target.innerHTML = this.props.formParts.placeholder;
		}
	}

	deleteThePlaceholder(event) {
		var placeholder = event.target.innerHTML;
		var textContentLength = placeholder.length;   
		
	    if (document.selection) {
	    	let selection = document.selection.createRange();
    		selection.moveStart('character', textContentLength);
    		selection.select();
	    } else {
		    // let selection = window.getSelection();
		    // selection.collapse(event.target.lastChild, textContentLength);
		}

		if (placeholder.includes("Write Message...")) {
			event.target.innerHTML = "";
		}
	}

	render() {     
		return (
			<div className={this.props.formParts.basicTextarea} 
				onFocus={this.deleteThePlaceholder} onBlur={this.checkEmptyEditor} 
				contentEditable="true" onKeyUp={this.readTextareaValue}>
				{this.props.formParts.placeholder}
			</div>
		);
	}
}

export default BasicTextarea;   


