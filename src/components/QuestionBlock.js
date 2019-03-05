import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const QuestionBlock = styled.fieldset`
	display: flex;
	margin-left: ${props => (props.level ? `${props.level * 20}px` : '10px')};
	margin-right: 10px;
	margin-bottom: 20px;
`;

const InputWrapper = styled.div`
	display: flex;
	margin: 0 10px 5px 10px;
	label {
		width: 20%;
	}
	input,
	select {
		flex-grow: 1;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`;

function QuestionBlockStyled(props) {
	const [parentValueType, setParentValueType] = useState({});

	useEffect(() => {
		if (props.value.parentId) getParentValue(props.value.parentId);
	});

	const inputQuestionChange = e => {
		props.updateQuestion({ ...props.value, question: e.target.value });
	};

	const inputTypeChange = e => {
		props.updateQuestion({ ...props.value, type: e.target.value });
	};

	const inputConditionTypeChange = e => {
		props.updateQuestion({ ...props.value, conditionType: e.target.value });
	};

	const inputConditionValueChange = e => {
		props.updateQuestion({ ...props.value, conditionValue: e.target.value });
	};

	const addSubQuestion = () => {
		props.updateQuestion({
			parentId: props.value.id,
			question: '',
			type: 'text',
			conditionType: 'equals'
		});
	};

	const getParentValue = parentId => {
		props.getOne(parentId).then(val => {
			setParentValueType(val.type);
		});
	};

	return (
		<QuestionBlock level={props.value.level}>
			{props.value.level > 0 ? (
				<div>
					<label>Condition</label>
					<select onChange={inputConditionTypeChange}>
						<option value="equals">Equals</option>
						{parentValueType === 'number' ? (
							<option value="greater">Greater than</option>
						) : null}
						{parentValueType === 'number' ? (
							<option value="less">Less than</option>
						) : null}
					</select>
					<input onChange={inputConditionValueChange} />
				</div>
			) : null}
			<InputWrapper>
				<label htmlFor={`question-${props.value.question}`}>Question</label>
				<input
					type="text"
					id={`question-${props.value.question}`}
					value={props.value.question}
					onChange={inputQuestionChange}
				/>
			</InputWrapper>
			<InputWrapper>
				<label htmlFor={`type-${props.value}`}>Type</label>
				<select
					id={`type-${props.value}`}
					value={props.value.type}
					onChange={inputTypeChange}
				>
					<option value="text">Text</option>
					<option value="number">Number</option>
					<option value="boolean">Yes / No</option>
				</select>
			</InputWrapper>
			<ButtonWrapper>
				<button onClick={() => addSubQuestion(props.value.id)}>
					Add Sub-Input
				</button>
				<button onClick={() => props.removeQuestion(props.value)}>
					Delete
				</button>
			</ButtonWrapper>
		</QuestionBlock>
	);
}

export default QuestionBlockStyled;
