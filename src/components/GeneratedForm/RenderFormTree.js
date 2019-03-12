import React, { useState, Fragment } from 'react'
import FormBlock from './RenderFormTree/FormBlock'

function RenderFormTree(props) {
    const [formInputValue, setFormInputValue] = useState('')

    const checkCondition = (conditionType, parentValue, conditionValue, level) => {
        if (level === 0) return true
        //eslint-disable-next-line
        if (conditionType === 'equals' && parentValue == conditionValue) return true
        if (conditionType === 'less' && parentValue < Number(conditionValue)) return true
        if (conditionType === 'greater' && parentValue > Number(conditionValue)) return true

        return false
    }

    return props.formData.map(e => {
        return (
            <div key={e.id}>
                {checkCondition(e.conditionType, props.parentValue, e.conditionValue, e.level) ? (
                    <Fragment>
                        <FormBlock
                            data={e}
                            getOne={props.getOne}
                            setFormInputValue={e => setFormInputValue(e.target.value)}
                        />
                        {e.children ? (
                            <RenderFormTree
                                formData={e.children}
                                getOne={props.getOne}
                                parentValue={formInputValue}
                            />
                        ) : null}
                    </Fragment>
                ) : null}
            </div>
        )
    })
}

export default RenderFormTree
