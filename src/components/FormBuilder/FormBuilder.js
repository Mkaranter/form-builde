import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Question from './Question/'

function FormBuilder({ questionsData, parentQuestion, parentValueType }) {
    const [parentValueTypeFromState, setParentValueType] = useState('')

    return questionsData.map(question => {
        return (
            <div key={question.id}>
                <Question
                    questionData={question}
                    setParentValueType={setParentValueType}
                    parentValueType={parentQuestion ? parentQuestion.type : parentValueType}
                />
                {question.children && (
                    <FormBuilder
                        questionsData={question.children}
                        parentQuestion={question}
                        parentValueType={parentValueTypeFromState}
                    />
                )}
            </div>
        )
    })
}

export default FormBuilder

FormBuilder.propTypes = {
    questionData: PropTypes.object,
    parentQuestion: PropTypes.object,
    parentValueType: PropTypes.string,
}
