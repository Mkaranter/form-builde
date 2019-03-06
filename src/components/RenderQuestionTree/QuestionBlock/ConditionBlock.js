import React, { Fragment } from 'react';

function ConditionBlock(props) {
	return (
		<Fragment>
			<label>Condition</label>
			<select
				onChange={props.inputConditionTypeChange}
				value={props.conditionType}
			>
				<option value="equals">Equals</option>
				{props.parentValueType === 'number' && (
					<Fragment>
						<option value="greater">Greater than</option>
						<option value="less">Less than</option>
					</Fragment>
				)}
			</select>
			{props.parentValueType !== 'boolean' ? (
				<input
					onChange={props.inputConditionValueChange}
					type={props.parentValueType}
					value={props.conditionValue}
				/>
			) : (
				<select
					onChange={props.inputConditionValueChange}
					value={props.conditionValue}
				>
					<option defaultChecked value="" disabled>
						-- select --
					</option>
					<option value="true">Yes</option>
					<option value="false">No</option>
				</select>
			)}
		</Fragment>
	);
}

export default ConditionBlock;
