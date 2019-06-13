import React, { useState } from 'react'

import { Question } from 'common/models'

import UserQuestion from '../UserQuestion'
import UserForm from '../../UserForm'

interface StateWrapperProps {
    question: Question
    parentValue?: string
}

const StateWrapper = ({ question }: StateWrapperProps) => {
    const [formInputValue, setFormInputValue] = useState('')

    return (
        <>
            <UserQuestion
                data={question}
                setFormInputValue={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                    setFormInputValue(target.value)
                }
            />
            {question.children && (
                <UserForm questions={question.children} parentValue={formInputValue} />
            )}
        </>
    )
}

export default StateWrapper
