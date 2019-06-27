import React from 'react'

import Button from 'common/components/Button'
import { Question } from 'common/models'

import QuestionList from './components/QuestionList'

interface FormBuilderProps {
    questions: Question[]
    toggleUserForm(): void
    addQuestion(question: Omit<Question, 'id'>): void
}

const newQuestion = { text: '', type: 'text', level: 0 }

const FormBuilder: React.FC<FormBuilderProps> = ({ questions, toggleUserForm, addQuestion }) => {
    const validate = (): boolean => {
        const failedFields = questions.filter(q => q.text === '')

        return failedFields.length === 0 ? true : false
    }

    const submit = () => validate() && toggleUserForm()

    return (
        <>
            <QuestionList questions={questions} />
            <Button onClick={() => addQuestion(newQuestion)}>Add Input</Button>
            <Button onClick={submit} disabled={questions.length === 0}>
                Make a form
            </Button>
        </>
    )
}

export default FormBuilder
