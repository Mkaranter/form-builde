import React, { useState, Fragment } from 'react'
import FormBlock from './RenderFormTree/FormBlock'

function RenderFormTree(props) {
    const [formInputValue, setFormInputValue] = useState('')

    const checkCondition = (conditionType, formInputValue, conditionValue, level) => {
        if (level === 0) return true

        //eslint-disable-next-line
        if (conditionType === 'equals' && formInputValue == conditionValue) return true
        if (conditionType === 'less' && formInputValue < Number(conditionValue)) return true
        if (conditionType === 'greater' && formInputValue > Number(conditionValue)) return true

        return false
    }

    return props.formData.map(e => {
        return (
            <div key={e.id}>
                {checkCondition(e.conditionType, formInputValue, e.conditionValue, e.level) ? (
                    <Fragment>
                        <FormBlock
                            data={e}
                            setFormInputValue={e => setFormInputValue(e.target.value)}
                        />
                        {e.children ? (
                            <RenderFormTree formData={e.children} parentValue={formInputValue} />
                        ) : null}
                    </Fragment>
                ) : null}
            </div>
        )
    })
}

export default RenderFormTree
