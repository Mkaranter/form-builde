import React, { useState, useEffect, Fragment } from 'react';
import { indexedDBinit, idbEvents } from './utils/indexedDB';
import AddInputButton from './components/AddInputButton';
import RenderQuestionTree from './components/RenderQuestionTree';
import ShowFormButton from './components/ShowFormButton';
import GeneratedForm from './components/GeneratedForm';

function App() {
	const [questionList, setQuestionList] = useState([]);
	const [generatedFormVisible, setGeneratedFormVisible] = useState(false);

	useEffect(() => {
		indexedDBinit();
		idbEvents.getAll().then(e => setQuestionList(flatToRoot(e)));
	}, []);

	const addQuestion = value => {
		if (value.children) delete value.children;
		idbEvents.set(value).then(() => {
			idbEvents.getAll().then(e => {
				setQuestionList(flatToRoot(e));
			});
		});
	};

	const removeQuestion = value => {
		idbEvents.delete(value.id).then(() => {
			idbEvents.getAll().then(e => {
				return setQuestionList(flatToRoot(e));
			});
		});

		if (value.children) {
			return value.children.map(e => {
				return removeQuestion(e);
			});
		}
	};

	const getOne = id => {
		return idbEvents.getOne(id).then(value => {
			return value;
		});
	};

	const flatToRoot = data => {
		const root = [];
		let level = 0;

		data.forEach(node => {
			if (!node.parentId) {
				node.level = level;
				return root.push(node);
			}

			const parentIndex = data.findIndex(el => el.id === node.parentId);
			if (!data[parentIndex].children) {
				[node].forEach(n => {
					n.level = data[parentIndex].level + 1;
				});

				return (data[parentIndex].children = [node]);
			}

			node.level = data[parentIndex].level + 1;
			data[parentIndex].children.push(node);
		});

		return root;
	};

	return (
		<div className="App">
			{!generatedFormVisible ? (
				<Fragment>
					<h1>FORM BUILDER</h1>
					<RenderQuestionTree
						data={questionList}
						removeQuestion={removeQuestion}
						updateQuestion={addQuestion}
						getOne={getOne}
					/>
					<AddInputButton addQuestion={addQuestion} />
					<ShowFormButton setGeneratedFormVisible={setGeneratedFormVisible} />
				</Fragment>
			) : (
				<GeneratedForm formData={questionList} getOne={getOne} />
			)}
		</div>
	);
}

export default App;
