import React from 'react';

function QuestionBlock(props) {
	return (
		<div>
			{props.id} {props.value}
			<button onClick={() => props.removeQuestion(props.id)}>X</button>
		</div>
	);
}

export default QuestionBlock;
