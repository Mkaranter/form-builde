import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import arrayToTree from 'array-to-tree'
import styled from 'styled-components'

import FormBuilder from './components/FormBuilder/'
import Header from './components/Header'

import UserForm from './components/UserForm/'
import { idbEvents } from './utils/indexedDB'

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
            <Header />
            {!props.showUserForm ? (
                <FormBuilder
                    questions={arrayToTree(props.questionList, {
                        parentProperty: 'parentId',
                    })}
                    showUserForm={props.toggleUserForm}
                />
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
    showUserForm: form.showUserForm,
})

const mapDispatchToProps = dispatch => {
    return { toggleUserForm: () => dispatch.form.toggleUserForm() }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
