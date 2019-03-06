import React from 'react';
import QuestionBlock from './RenderQuestionTree/QuestionBlock';

function RenderQuestionTree(props) {
	return props.data.map(i => {
		return (
			<div key={i.id}>
				<QuestionBlock
					value={i}
					removeQuestion={props.removeQuestion}
					updateQuestion={props.updateQuestion}
					getOne={props.getOne}
				/>
				{i.children ? (
					<RenderQuestionTree
						data={i.children}
						updateQuestion={props.updateQuestion}
						removeQuestion={props.removeQuestion}
						getOne={props.getOne}
					/>
				) : null}
			</div>
		);
	});
}

export default RenderQuestionTree;
