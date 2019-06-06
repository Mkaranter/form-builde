import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import arrayToTree from 'array-to-tree'
import styled from 'styled-components'

import FormBuilder from './views/FormBuilder'
import Header from './common/components/Header'
import UserForm from './views/UserForm'

import { storageService } from 'utils/storageService'
import { AppState, FormState } from 'common/models'

const AppWrapper = styled.div`
    margin: 0 auto;
    max-width: 50vw;

    @media (max-width: 768px) {
        max-width: 100vw;
    }
`

interface AppDispatchProps {
    toggleUserForm: any
}

type AppProps = FormState & AppDispatchProps

function App({ showUserForm, questionList, toggleUserForm }: AppProps) {
    useEffect(() => {
        storageService.getAllQuestions()
    }, [])

    return (
        <AppWrapper>
            <Header />
            {!showUserForm ? (
                <FormBuilder
                    questions={arrayToTree(questionList, {
                        parentProperty: 'parentId',
                    })}
                    toggleUserForm={toggleUserForm}
                />
            ) : (
                <UserForm
                    questions={arrayToTree(questionList, { parentProperty: 'parentId' })}
                    parentValue={undefined}
                />
            )}
        </AppWrapper>
    )
}

const mapStateToProps = ({ form }: AppState) => ({
    questionList: form.questionList,
    showUserForm: form.showUserForm,
})

const mapDispatchToProps = ({ form }: any) => ({
    toggleUserForm: () => form.toggleUserForm(),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
