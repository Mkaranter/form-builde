import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import arrayToTree from 'array-to-tree'
import styled from 'styled-components'

import FormBuilder from './components/FormBuilder/'

import UserForm from './components/UserForm/'
import { idbEvents } from './utils/indexedDB'

import { Button } from './components/common/Button'

const AppWrapper = styled.div`
    margin: 0 auto;
    max-width: 50vw;

    @media (max-width: 768px) {
        max-width: 100vw;
    }
`

function App(props) {
    useEffect(() => {
        idbEvents.getAllQuestions()
    }, [])

    return (
        <AppWrapper>
            {!props.showGeneratedForm ? (
                <>
                    <h1>FORM BUILDER</h1>
                    <FormBuilder
                        questionsData={arrayToTree(props.questionList, {
                            parentProperty: 'parentId',
                        })}
                    />
                    <Button
                        label={'Add input'}
                        buttonClick={() =>
                            idbEvents.addQuestion({ question: '', type: 'text', level: 0 })
                        }
                    />
                    <Button buttonClick={props.toggleGeneratedForm} label={'Make a form'} />
                </>
            ) : (
                <UserForm
                    formData={arrayToTree(props.questionList, { parentProperty: 'parentId' })}
                />
            )}
        </AppWrapper>
    )
}

const mapStateToProps = ({ form }) => ({
    questionList: form.questionList,
    showGeneratedForm: form.showGeneratedForm,
})

const mapDispatchToProps = dispatch => {
    return { toggleGeneratedForm: () => dispatch.form.toggleGeneratedForm() }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
