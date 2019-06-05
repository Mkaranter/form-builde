import React from 'react'
import PropTypes from 'prop-types'

import QuestionList from './QuestionList/'
import { Button } from '../common/Button'
import { idbEvents } from '../../utils/indexedDB'

function FormBuilder({ questionsData, parentQuestion, parentValueType, showUserForm }) {
    return (
        <>
            <QuestionList
                questionsData={questionsData}
                parentQuestion={parentQuestion}
                parentValueType={parentValueType}
            />
            <Button onClick={() => idbEvents.addQuestion({ question: '', type: 'text', level: 0 })}>
                Add Input
            </Button>
            <Button onClick={showUserForm}>Make a form</Button>
        </>
    )
}

export default FormBuilder

FormBuilder.propTypes = {
    questionData: PropTypes.object,
    parentQuestion: PropTypes.object,
    parentValueType: PropTypes.string,
    showUserForm: PropTypes.func,
}
