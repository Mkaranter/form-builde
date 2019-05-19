import React from 'react'
import PropTypes from 'prop-types'

import { questionCondtionTypes } from '../../../utils/helpers'

function ConditionBlock(props) {
    return (
        <>
            <label>Condition</label>
            <select onChange={props.conditionTypeChange} value={props.conditionType}>
                <option value={questionCondtionTypes.equals}>Equals</option>
                {props.parentValueType === 'number' && (
                    <>
                        <option value={questionCondtionTypes.greater}>Greater than</option>
                        <option value={questionCondtionTypes.less}>Less than</option>
                    </>
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
        </>
    )
}

export default ConditionBlock

ConditionBlock.propTypes = {
    parentValueType: PropTypes.string,
    conditionType: PropTypes.string.isRequired,
    conditionValue: PropTypes.string.isRequired,
    conditionTypeChange: PropTypes.func.isRequired,
    conditionValueChange: PropTypes.func.isRequired,
}
