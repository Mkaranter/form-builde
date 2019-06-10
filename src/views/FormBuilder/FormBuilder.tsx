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
    const validate = (): boolean => {
        const failedFields = questions.filter(q => q.text === '')
        if (failedFields.length === 0) return true
        return false
    }

    const submit = () => {
        if (validate()) toggleUserForm()
    }

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
            <Button onClick={submit} disabled={questions.length === 0}>
                Make a form
            </Button>
        </>
    )
}

export default FormBuilder
