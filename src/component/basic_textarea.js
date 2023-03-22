import React, { useState, useEffect, useRef } from 'react';
import '../css/input.css';

function BasicTextarea(props) {
	const textMessageEditor = useRef();

	useEffect(() => {
		updateMessageEditor();
	}, [props.formParts.setPlaceholder]);

	const expandTextareaInput = ({target : element}) => {
	  	var minimumRows = element.getAttribute('data-min-rows')|0, rows;
	  	!element._baseScrollHeight && getScrollHeight(element)

		element.rows = minimumRows
	  	rows = Math.ceil((element.scrollHeight - element._baseScrollHeight) / 16)
	  	element.rows = minimumRows + rows
	}

	const readTextareaValue = (event) => {
		props.onTextValueChange(event.target.innerHTML);
	}

	const getScrollHeight = (element) => {
		var savedValue = element.value;
     	element.value = '';
		element._baseScrollHeight = element.scrollHeight;
		element.value = savedValue;
	}

	const checkEmptyEditor = (event) => {
		if (event.target.textContent.trim() === "") {
			props.displayPlaceholder(true);
			props.onTextValueChange("");
		} else {
			props.displayPlaceholder(false);
		}
	}

	const updateMessageEditor = () => {
		if (props.formParts.setPlaceholder) {
			textMessageEditor.current.innerHTML = props.formParts.placeholder;
		} 
	}

	const deleteThePlaceholder = (event) => {
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
			props.displayPlaceholder(false);
			props.onTextValueChange("");
			event.target.innerHTML = "";
		}
	}

	return (
		<div className={props.formParts.basicTextarea} onFocus={deleteThePlaceholder} 
			contentEditable="true" onKeyUp={readTextareaValue} ref={textMessageEditor} 
			onBlur={checkEmptyEditor}>
			{props.formParts.placeholder}
		</div>
	);
}

export default BasicTextarea;   


