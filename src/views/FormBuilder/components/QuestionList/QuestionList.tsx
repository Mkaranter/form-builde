import React, { useState } from 'react'

import { Question as QuestionModel } from 'common/models'

import Question from '../Question'

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

    return (
        <ul>
            {questions.map(question => (
                <li key={question.id}>
                    {/* //   questionServiceContext.Consumer */}
                    <Question
                        question={question}
                        // questionService={questionService}
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
        </ul>
    )
}

export default QuestionList
