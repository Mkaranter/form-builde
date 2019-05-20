import React from 'react'
import PropTypes from 'prop-types'

import { questionCondtionTypes } from '../../../utils/helpers'

function ConditionBlock({
    conditionTypeChange,
    conditionValueChange,
    conditionType,
    conditionValue,
    parentValueType,
}) {
    return (
        <>
            <label>Condition</label>
            <select onChange={conditionTypeChange} value={conditionType}>
                <option value={questionCondtionTypes.equals}>Equals</option>
                {parentValueType === 'number' && (
                    <>
                        <option value={questionCondtionTypes.greater}>Greater than</option>
                        <option value={questionCondtionTypes.less}>Less than</option>
                    </>
                )}
            </select>
            {parentValueType !== 'boolean' ? (
                <input
                    onChange={conditionValueChange}
                    type={parentValueType}
                    value={conditionValue}
                />
            ) : (
                <select onChange={conditionValueChange} value={conditionValue}>
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
