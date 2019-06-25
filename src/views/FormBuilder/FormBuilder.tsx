import React from 'react'

import { Dispatch } from 'utils/store'
import Button from 'common/components/Button'
import { Question } from 'common/models'

import QuestionList from './components/QuestionList'

interface FormBuilderProps {
    questions: Question[]
    toggleUserForm(): void
    addQuestion(question: Question): void
}

const FormBuilder: React.SFC<FormBuilderProps> = ({
    questions,
    toggleUserForm,
    addQuestion,
}): JSX.Element => {
    const validate = (): boolean => {
        const failedFields = questions.filter(q => q.text === '')
        if (failedFields.length === 0) return true // use {}, or even ternary
        return false
    }

    const submit = () => validate() && toggleUserForm()

    return (
        <>
            <QuestionList questions={questions} />
            {/* / move it to const */}
            <Button onClick={() => addQuestion({ text: '', type: 'text', level: 0 })}>
                Add Input
            </Button>
            <Button onClick={submit} disabled={questions.length === 0}>
                Make a form
            </Button>
        </>
    )
}

export default FormBuilder
