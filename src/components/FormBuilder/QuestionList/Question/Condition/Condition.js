import React from 'react'
import PropTypes from 'prop-types'

import { questionConditionTypes } from '../../../../../utils/helpers'

function Condition(props) {
    return (
        <>
            <label>Condition</label>
            <select onChange={props.setType} value={props.type}>
                <option value={questionConditionTypes.equals}>Equals</option>
                {props.parentValueType === 'number' && (
                    <>
                        <option value={questionConditionTypes.greater}>Greater than</option>
                        <option value={questionConditionTypes.less}>Less than</option>
                    </>
                )}
            </select>
            {props.parentValueType !== 'boolean' ? (
                <input onChange={props.setValue} type={props.parentValueType} value={props.value} />
            ) : (
                <select onChange={props.setValue} value={props.value}>
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
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setType: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
}
