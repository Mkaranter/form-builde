import React, { useEffect } from 'react'
import { connect, Provider } from 'react-redux'
import arrayToTree from 'array-to-tree'
import styled from 'styled-components'

import { store, RootState, Dispatch } from 'utils/store'
import { GlobalStyles } from 'utils/globalStyles'
import Header from 'common/components/Header'

import FormBuilder from './views/FormBuilder'
import UserForm from './views/UserForm'

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
    isUserFormVisible,
    questionList,
    toggleUserForm,
    addQuestion,
    makeQuestionTree,
    getAllQuestions,
}): JSX.Element => {
    useEffect(() => {
        getAllQuestions()
    }, [getAllQuestions])

    const questionTree = makeQuestionTree(questionList, {
        parentProperty: 'parentId',
    })

    return (
        <AppWrapper>
            <GlobalStyles />
            <Header />
            <Main>
                {isUserFormVisible ? (
                    <UserForm questions={questionTree} />
                ) : (
                    <FormBuilder
                        questions={questionTree}
                        toggleUserForm={toggleUserForm}
                        addQuestion={addQuestion}
                    />
                )}
            </Main>
        </AppWrapper>
    )
}

const mapStateToProps = ({ form, view }: RootState) => ({
    questionList: form.questionList,
    isUserFormVisible: view.isUserFormVisible,
    makeQuestionTree: arrayToTree,
})

//Github Issue: https://github.com/rematch/rematch/issues/601
const mapDispatchToProps = ({ view, form }: Dispatch): any => ({
    toggleUserForm: view.toggleUserForm,
    addQuestion: form.addQuestion,
    getAllQuestions: form.initQuestionList,
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
