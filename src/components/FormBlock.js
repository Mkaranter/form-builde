import React, { Fragment } from 'react';

function FormBlock(props) {
	return (
		<Fragment>
			<label>{props.data.question}</label>
			<input onChange={props.setFormInputValue} />
		</Fragment>
	);
}

export default FormBlock;
