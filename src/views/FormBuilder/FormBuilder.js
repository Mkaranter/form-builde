import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import { storageService } from 'utils/storageService'

import QuestionList from './components/QuestionList'

function FormBuilder({ questions, showUserForm }) {
    return (
        <>
            <QuestionList questions={questions} />
            <Button
                onClick={() =>
                    storageService.addQuestion({ question: '', type: 'text', level: 0 })
                }>
                Add Input
            </Button>
            <Button onClick={showUserForm}>Make a form</Button>
        </>
    )
}

export default FormBuilder

FormBuilder.propTypes = {
    questionData: PropTypes.object,
    showUserForm: PropTypes.func,
}
