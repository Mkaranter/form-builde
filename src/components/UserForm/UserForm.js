import React, { useState } from 'react'
import PropTypes from 'prop-types'

import FormBlock from './UserQuestion'

import { questionConditionTypes } from '../../utils/helpers'

function UserForm({ formData, parentValue }) {
    const [formInputValue, setFormInputValue] = useState('')

    const checkCondition = (conditionType, formInputValue, conditionValue, level) => {
        if (level === 0) return true

        //eslint-disable-next-line
        if (conditionType === questionConditionTypes.equals && formInputValue == conditionValue)
            return true
        if (
            conditionType === questionConditionTypes.less &&
            formInputValue !== '' &&
            formInputValue < parseInt(conditionValue, 10)
        )
            return true
        if (
            conditionType === questionConditionTypes.greater &&
            formInputValue > parseInt(conditionValue, 10)
        )
            return true

        return false
    }

    return formData.map(e => (
        <div key={e.id}>
            {checkCondition(e.conditionType, parentValue, e.conditionValue, e.level) && (
                <>
                    <FormBlock
                        data={e}
                        setFormInputValue={e => setFormInputValue(e.target.value)}
                    />
                    {e.children && <UserForm formData={e.children} parentValue={formInputValue} />}
                </>
            )}
        </div>
    ))
}

export default UserForm

UserForm.propTypes = {
    formData: PropTypes.array.isRequired,
    parentValue: PropTypes.string,
}
