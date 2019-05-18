import React, { Fragment } from 'react'

import { questionCondtionTypes } from '../../../utils/helpers'

function ConditionBlock(props) {
    return (
        <Fragment>
            <label>Condition</label>
            <select onChange={props.conditionTypeChange} value={props.conditionType}>
                <option value={questionCondtionTypes.equals}>Equals</option>
                {props.parentValueType === 'number' && (
                    <Fragment>
                        <option value={questionCondtionTypes.greater}>Greater than</option>
                        <option value={questionCondtionTypes.less}>Less than</option>
                    </Fragment>
                )}
            </select>
            {props.parentValueType !== 'boolean' ? (
                <input
                    onChange={props.conditionValueChange}
                    type={props.parentValueType}
                    value={props.conditionValue}
                />
            ) : (
                <select onChange={props.conditionValueChange} value={props.conditionValue}>
                    <option defaultChecked value="" disabled>
                        -- select --
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            )}
        </Fragment>
    )
}

export default ConditionBlock
