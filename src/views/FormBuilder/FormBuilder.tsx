import React from 'react'

import Button from 'common/components/Button'
import { storageService } from 'utils/storageService'
import { Question } from 'common/models'

import QuestionList from './components/QuestionList'
import { Dispatch } from 'utils/store'

interface FormBuilderProps {
    questions: Question[]
    toggleUserForm: Dispatch
}

function FormBuilder({ questions, toggleUserForm }: FormBuilderProps) {
    return (
        <>
            <QuestionList
                questions={questions}
                parentQuestion={undefined}
                parentValueType={undefined}
            />
            <Button
                onClick={() => storageService.addQuestion({ text: '', type: 'text', level: 0 })}>
                Add Input
            </Button>
            <Button onClick={toggleUserForm}>Make a form</Button>
        </>
    )
}

export default FormBuilder
