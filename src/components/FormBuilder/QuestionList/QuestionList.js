import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Question from './Question/'

function QuestionList({ questions, parentQuestion, parentValueType }) {
    const [parentValueTypeFromState, setParentValueType] = useState('')

    return questions.map(question => (
        <div key={question.id}>
            <Question
                question={question}
                setParentValueType={setParentValueType}
                parentValueType={parentQuestion ? parentQuestion.type : parentValueType}
            />
            {question.children && (
                <QuestionList
                    questions={question.children}
                    parentQuestion={question}
                    parentValueType={parentValueTypeFromState}
                />
            )}
        </div>
    ))
}

export default QuestionList

QuestionList.propTypes = {
    questionData: PropTypes.object,
    parentQuestion: PropTypes.object,
    parentValueType: PropTypes.string,
}
