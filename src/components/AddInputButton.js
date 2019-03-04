import React from 'react';

function AddInputButton(props) {
	return (
		<button onClick={() => props.addQuestion({ question: '', type: 'text' })}>
			Add question block
		</button>
	);
}

export default AddInputButton;
