import React, { useState } from 'react'
import PropTypes from 'prop-types'

import QuestionBlock from './RenderQuestionTree/QuestionBlock'

function RenderQuestionTree({ questionsData, parentQuestion, parentValueType }) {
    const [parentValueTypeFromState, setParentValueType] = useState('')

    return questionsData.map(question => {
        return (
            <div key={question.id}>
                <QuestionBlock
                    questionData={question}
                    setParentValueType={setParentValueType}
                    parentValueType={parentQuestion ? parentQuestion.type : parentValueType}
                />
                {question.children && (
                    <RenderQuestionTree
                        questionsData={question.children}
                        parentQuestion={question}
                        parentValueType={parentValueTypeFromState}
                    />
                )}
            </div>
        )
    })
}

export default RenderQuestionTree

RenderQuestionTree.propTypes = {
    questionData: PropTypes.object,
    parentQuestion: PropTypes.object,
    parentValueType: PropTypes.string,
}
