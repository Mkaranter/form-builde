import React, { useState } from 'react'

import { questionConditionTypes } from 'utils/helpers'
import { Question } from 'common/models'

import FormBlock from './components/UserQuestion'

interface UserFormProps {
    questions: Question[]
    parentValue?: string
}

function UserForm({ questions, parentValue }: UserFormProps): any {
    const [formInputValue, setFormInputValue] = useState('')

    const checkCondition = (
        conditionType: string,
        formInputValue: any,
        conditionValue: string,
        level: number
    ) => {
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

    return questions.map((e: any) => (
        <div key={e.id}>
            {checkCondition(e.conditionType, parentValue, e.conditionValue, e.level) && (
                <>
                    <FormBlock
                        data={e}
                        setFormInputValue={(e: any) => setFormInputValue(e.target.value)}
                    />
                    {e.children && <UserForm questions={e.children} parentValue={formInputValue} />}
                </>
            )}
        </div>
    ))
}

export default UserForm
