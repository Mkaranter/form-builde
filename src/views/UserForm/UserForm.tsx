import React from 'react'

import { Question } from 'common/models'

import StateWrapper from './components/StateWrapper'
import { checkForCondition } from './checkForCondition'

interface UserFormProps {
    questions: Question[]
    parentValue?: string
}

const UserForm: React.SFC<UserFormProps> = ({ questions, parentValue }) => {
    return (
        <>
            {questions.map(
                question =>
                    checkForCondition(
                        question.conditionType!,
                        question.conditionValue!,
                        question.level,
                        parentValue
                    ) && (
                        <StateWrapper
                            question={question}
                            key={question.id}
                            parentValue={parentValue}
                        />
                    )
            )}
        </>
    )
}

export default UserForm
