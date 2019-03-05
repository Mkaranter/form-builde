const rootArray = data => {
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

export default rootArray;
