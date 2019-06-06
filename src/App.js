import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import arrayToTree from 'array-to-tree'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import FormBuilder from './views/FormBuilder'
import Header from './components/Header'
import UserForm from './views/UserForm'

import { storageService } from 'utils/storageService'

const AppWrapper = styled.div`
    margin: 0 auto;
    max-width: 50vw;

    @media (max-width: 768px) {
        max-width: 100vw;
    }
`

function App({ showUserForm, questionList, toggleUserForm }) {
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
                    showUserForm={toggleUserForm}
                />
            ) : (
                <UserForm formData={arrayToTree(questionList, { parentProperty: 'parentId' })} />
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

App.propTypes = {
    showUserForm: PropTypes.bool.isRequired,
    questionList: PropTypes.array.isRequired,
    toggleUserForm: PropTypes.func,
}
