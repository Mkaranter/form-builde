import React from 'react';
import styled from 'styled-components';

const QuestionBlock = styled.fieldset`
	display: flex;
`;

function QuestionBlockStyled(props) {
	const inputQuestionChange = e => {
		props.updateQuestion({ ...props.value, question: e.target.value });
	};

	const inputTypeChange = e => {
		props.updateQuestion({ ...props.value, type: e.target.value });
	};

	return (
		<QuestionBlock>
			<label htmlFor={`question-${props.value.question}`}>Question</label>
			<input
				type="text"
				id={`question-${props.value.question}`}
				value={props.value.question}
				onChange={inputQuestionChange}
			/>
			<label htmlFor={`type-${props.value}`}>Type</label>
			<select
				type="select"
				id={`type-${props.value}`}
				value={props.value.type}
				onChange={inputTypeChange}
			>
				<option value="text">Text</option>
				<option value="number">Number</option>
				<option value="boolean">Yes / No</option>
			</select>
			<button onClick={() => props.removeQuestion(props.value.id)}>X</button>
		</QuestionBlock>
	);
}

export default QuestionBlockStyled;
