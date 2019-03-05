import React, { useState, Fragment } from 'react';
import FormBlock from './FormBlock';

function RenderFormTree(props) {
	const [formInputValue, setFormInputValue] = useState('');

	return props.formData.map(e => {
		return (
			<div key={e.id}>
				{props.parentValue === e.conditionValue ? (
					<Fragment>
						<FormBlock
							data={e}
							getOne={props.getOne}
							setFormInputValue={e => setFormInputValue(e.target.value)}
						/>
						{e.children ? (
							<RenderFormTree
								formData={e.children}
								getOne={props.getOne}
								parentValue={formInputValue}
							/>
						) : null}
					</Fragment>
				) : null}
			</div>
		);
	});
}

export default RenderFormTree;
