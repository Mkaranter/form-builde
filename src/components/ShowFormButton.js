import React from 'react';

function ShowFormButton(props) {
	return <button onClick={props.setGeneratedFormVisible}>Generate form</button>;
}

export default ShowFormButton;
