import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { Question as QuestionModel } from 'common/models'
import { QuestionServiceContext } from 'App'

import Question from '../Question'
import { dispatch } from 'utils/store'

const ListStyled = styled.ul`
    list-style-type: none;
`

interface QuestionListProps {
    questions: QuestionModel[]
    parentQuestion?: QuestionModel
    parentValueType?: string
}

const QuestionList: React.FC<QuestionListProps> = ({
    questions,
    parentQuestion,
    parentValueType,
}) => {
    const [parentValueTypeUpdated, setParentValueType] = useState('')
    const questionService = useContext(QuestionServiceContext)(dispatch)

    return (
        <ListStyled>
            {questions.map(question => (
                <li key={question.id}>
                    <Question
                        question={question}
                        questionService={questionService}
                        setParentValueType={setParentValueType}
                        parentValueType={parentQuestion ? parentQuestion.type : parentValueType}
                    />
                    {question.children && (
                        <QuestionList
                            questions={question.children}
                            parentQuestion={question}
                            parentValueType={parentValueTypeUpdated}
                        />
                    )}
                </li>
            ))}
        </ListStyled>
    )
}

export default QuestionList
