import React, { useState, useEffect } from 'react';
import { indexedDBinit, idbInputs } from './utils/indexedDB';
import QuestionBlock from './components/QuestionBlock';
import AddInputButton from './components/AddInputButton';

function App() {
	const [inputList, setInputList] = useState([]);

	useEffect(() => {
		indexedDBinit();
		idbInputs.getAll().then(e => setInputList(e));
	}, []);

	useEffect(() => {
		console.log(inputList);
	});

	const addQuestion = value => {
		idbInputs.set(value).then(() => {
			idbInputs.getAll().then(e => {
				setInputList(e);
			});
		});
	};

	const removeQuestion = id => {
		idbInputs.delete(id).then(() => {
			idbInputs.getAll().then(e => {
				setInputList(e);
			});
		});
	};

	const QuestionBlockList = props => {
		return inputList.map(i => {
			return (
				<QuestionBlock
					key={i.id}
					value={i.name}
					id={i.id}
					removeQuestion={props.removeQuestion}
				>
					{i.name} {i.id}
				</QuestionBlock>
			);
		});
	};

	return (
		<div className="App">
			<QuestionBlockList removeQuestion={removeQuestion} />
			<AddInputButton addQuestion={addQuestion} />
		</div>
	);
}

export default App;
