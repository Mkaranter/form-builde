import React from 'react'
import PropTypes from 'prop-types'

import { questionConditionTypes } from '../../../../../utils/helpers'

function Condition(props) {
    return (
        <>
            <label>Condition</label>
            <select onChange={props.conditionTypeChange} value={props.conditionType}>
                <option value={questionConditionTypes.equals}>Equals</option>
                {props.parentValueType === 'number' && (
                    <>
                        <option value={questionConditionTypes.greater}>Greater than</option>
                        <option value={questionConditionTypes.less}>Less than</option>
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

export default Condition

Condition.propTypes = {
    parentValueType: PropTypes.string,
    conditionType: PropTypes.string.isRequired,
    conditionValue: PropTypes.string.isRequired,
    conditionTypeChange: PropTypes.func.isRequired,
    conditionValueChange: PropTypes.func.isRequired,
}
