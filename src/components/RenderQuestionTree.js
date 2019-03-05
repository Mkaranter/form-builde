import React from 'react';
import QuestionBlock from './QuestionBlock';

function RenderQuestionTree(props) {
	return props.data.map(i => {
		return (
			<div key={i.id}>
				<QuestionBlock
					value={i}
					removeQuestion={props.removeQuestion}
					updateQuestion={props.updateQuestion}
				/>
				{i.children ? (
					<RenderQuestionTree
						data={i.children}
						updateQuestion={props.updateQuestion}
						removeQuestion={props.removeQuestion}
					/>
				) : null}
			</div>
		);
	});
}

export default RenderQuestionTree;
