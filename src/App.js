import React, { useState, useEffect } from 'react';
import { indexedDBinit, idbEvents } from './utils/indexedDB';
import QuestionBlock from './components/QuestionBlock';
import AddInputButton from './components/AddInputButton';

function App() {
	const [questionList, setQuestionList] = useState([]);

	useEffect(() => {
		indexedDBinit();
		idbEvents.getAll().then(e => setQuestionList(e));
	}, []);

	useEffect(() => {
		console.log(questionList);
	});

	const addQuestion = value => {
		idbEvents.set(value).then(() => {
			idbEvents.getAll().then(e => {
				setQuestionList(e);
			});
		});
	};

	const removeQuestion = id => {
		idbEvents.delete(id).then(() => {
			idbEvents.getAll().then(e => {
				setQuestionList(e);
			});
		});
	};

	return (
		<div className="App">
			<h1>FORM BUILDER</h1>
			{questionList.map(i => {
				return (
					<QuestionBlock
						key={i.id}
						value={i}
						removeQuestion={removeQuestion}
						updateQuestion={addQuestion}
					/>
				);
			})}

			<AddInputButton addQuestion={addQuestion} />
		</div>
	);
}

export default App;
