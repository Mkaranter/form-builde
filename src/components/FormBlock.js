import React from 'react';
import styled from 'styled-components';

const FormBlock = styled.fieldset`
	display: flex;
	margin-left: ${props => (props.level ? `${props.level * 20}px` : '10px')};
	margin-right: 10px;
	margin-bottom: 20px;

	&:first-child {
		margin-top: 20px;
	}

	label {
		padding: 10px 0;
	}

	input {
		width: 100%;
		padding: 5px 0;
	}
`;

function FormBlockStyled(props) {
	return (
		<FormBlock>
			<label>{props.data.question}</label>
			<input onChange={props.setFormInputValue} />
		</FormBlock>
	);
}

export default FormBlockStyled;
