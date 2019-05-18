import React, { useState } from 'react'

import FormBlock from './RenderFormTree/FormBlock'
import { questionCondtionTypes } from '../../utils/helpers'

function RenderFormTree(props) {
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

    return props.formData.map(e => {
        return (
            <div key={e.id}>
                {checkCondition(e.conditionType, props.parentValue, e.conditionValue, e.level) && (
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
        )
    })
}

export default RenderFormTree
