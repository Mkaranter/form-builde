import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'common/components/Button'
import { Question } from 'common/models'
import { Dispatch } from 'utils/store'

import QuestionList from './components/QuestionList'

interface FormBuilderProps {
    questions: Question[]
}
const newQuestion = { text: '', type: 'text', level: 0 }

const FormBuilder: React.FC<FormBuilderProps> = ({ questions }) => {
    const dispatch = useDispatch<Dispatch>()

    const validate = (): boolean => (questions.find(q => q.text === '') ? false : true)
    const submit = () => validate() && dispatch.view.toggleUserForm()

    return (
        <>
            <QuestionList questions={questions} />
            <Button onClick={() => dispatch.form.addQuestion(newQuestion)}>Add Input</Button>
            <Button onClick={submit} disabled={questions.length === 0}>
                Make a form
            </Button>
        </>
    )
}

export default FormBuilder
