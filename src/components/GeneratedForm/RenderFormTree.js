import React, { useState } from 'react'
import PropTypes from 'prop-types'

import FormBlock from './RenderFormTree/FormBlock'
import { questionCondtionTypes } from '../../utils/helpers'

function RenderFormTree({ formData, parentValue }) {
    const [formInputValue, setFormInputValue] = useState('')

    const checkCondition = (conditionType, formInputValue, conditionValue, level) => {
        if (level === 0) return true

        //eslint-disable-next-line
        if (conditionType === questionCondtionTypes.equals && formInputValue == conditionValue)
            return true
        if (
            conditionType === questionCondtionTypes.less &&
            formInputValue !== '' &&
            formInputValue < parseInt(conditionValue, 10)
        )
            return true
        if (
            conditionType === questionCondtionTypes.greater &&
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
                    {e.children && (
                        <RenderFormTree formData={e.children} parentValue={formInputValue} />
                    )}
                </>
            )}
        </div>
    ))
}

export default RenderFormTree

RenderFormTree.propTypes = {
    formData: PropTypes.array.isRequired,
    parentValue: PropTypes.string,
}
