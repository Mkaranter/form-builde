import React from 'react';

function AddInputButton(props) {
	return (
		<button onClick={() => props.addQuestion({ name: 'wtf' })}>
			Add question block
		</button>
	);
}

export default AddInputButton;
