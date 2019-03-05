import React from 'react';
import styled from 'styled-components';

const QuestionBlock = styled.fieldset`
	display: flex;
	margin-left: ${props =>
		props.level ? `${props.level * 20}px` : 'palevioletred'};
`;

function QuestionBlockStyled(props) {
	const inputQuestionChange = e => {
		props.updateQuestion({ ...props.value, question: e.target.value });
	};

	const inputTypeChange = e => {
		props.updateQuestion({ ...props.value, type: e.target.value });
	};

	const addSubQuestion = () => {
		props.updateQuestion({
			parentId: props.value.id,
			question: ''
		});
	};

	return (
		<QuestionBlock level={props.value.level}>
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
			<button onClick={() => props.removeQuestion(props.value)}>X</button>
			<button onClick={() => addSubQuestion(props.value.id)}>ADD SUB</button>
		</QuestionBlock>
	);
}

export default QuestionBlockStyled;
