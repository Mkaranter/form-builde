import React, { useState } from 'react'

import Question from './Question/'

function QuestionList({ questionsData, parentQuestion, parentValueType }) {
    const [parentValueTypeFromState, setParentValueType] = useState('')

    return questionsData.map(question => (
        <div key={question.id}>
            <Question
                questionData={question}
                setParentValueType={setParentValueType}
                parentValueType={parentQuestion ? parentQuestion.type : parentValueType}
            />
            {question.children && (
                <QuestionList
                    questionsData={question.children}
                    parentQuestion={question}
                    parentValueType={parentValueTypeFromState}
                />
            )}
        </div>
    ))
}

export default QuestionList
