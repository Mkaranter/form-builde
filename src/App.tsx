import React, { useEffect } from 'react'
import { connect, Provider } from 'react-redux'
import arrayToTree from 'array-to-tree'
import styled from 'styled-components'

import FormBuilder from './views/FormBuilder'
import UserForm from './views/UserForm'

import { store, iRootState, Dispatch } from 'utils/store'
import { storageService } from 'utils/storageService'
import { GlobalStyles } from 'common/globalStyles'
import Header from 'common/components/Header'

const AppWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 50% auto;
    grid-template-areas: 'header header header' '. main .';
    grid-row-gap: 25px;
`

const Main = styled.main`
    grid-area: main;
`

type AppProps = ConnectedProps

const App: React.SFC<AppProps> = ({
    showUserForm,
    questionList,
    toggleUserForm,
    makeQuestionTree,
}): JSX.Element => {
    useEffect(() => {
        storageService.getAllQuestions()
    }, [])

    const questionTree = makeQuestionTree(questionList, {
        parentProperty: 'parentId',
    })

    return (
        <AppWrapper>
            <GlobalStyles />
            <Header />
            <Main>
                {!showUserForm ? (
                    <FormBuilder questions={questionTree} toggleUserForm={toggleUserForm} />
                ) : (
                    <UserForm questions={questionTree} parentValue={undefined} />
                )}
            </Main>
        </AppWrapper>
    )
}

const mapStateToProps = ({ form, view }: iRootState) => ({
    questionList: form.questionList,
    showUserForm: view.showUserForm,
    makeQuestionTree: arrayToTree,
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
