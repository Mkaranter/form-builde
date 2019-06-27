import React, { useState } from 'react'

import { Question } from 'common/models'

import UserQuestion from '../UserQuestion'
import UserForm from '../../UserForm'

interface StateWrapperProps {
    question: Question
    parentValue?: string
}

const StateWrapper = ({ question }: StateWrapperProps) => {
    const [inputValue, setInputValue] = useState('')

    return (
        <>
            <UserQuestion
                data={question}
                setInputValue={({ target }) => setInputValue(target.value)}
            />
            {question.children && (
                <UserForm questions={question.children} parentValue={inputValue} />
            )}
        </>
    )
}

export default StateWrapper
