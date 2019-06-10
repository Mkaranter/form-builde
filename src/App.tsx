import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import arrayToTree from 'array-to-tree'
import styled from 'styled-components'

import FormBuilder from './views/FormBuilder'
import Header from './common/components/Header'
import UserForm from './views/UserForm'

import { Provider } from 'react-redux'
import { store } from './utils/store'

import { storageService } from 'utils/storageService'

import { iRootState, Dispatch } from 'utils/store'

const AppWrapper = styled.div`
    margin: 0 auto;
    max-width: 50vw;

    @media (max-width: 768px) {
        max-width: 100vw;
    }
`

type AppProps = ConnectedProps

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

const mapStateToProps = ({ form, view }: iRootState) => ({
    questionList: form.questionList,
    showUserForm: view.showUserForm,
})

//TODO: Action is loosing type due to rematch bug. Waiting for fix.
const mapDispatchToProps = ({ view }: Dispatch): any => ({
    toggleUserForm: view.toggleUserForm,
})

type ConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

const Root = () => (
    <Provider store={store}>
        <ConnectedApp />
    </Provider>
)

export default Root
