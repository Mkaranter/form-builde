import React, { useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { store, RootState, Dispatch } from 'utils/store'
import { GlobalStyles } from 'utils/globalStyles'
import { questionServiceFactory } from 'services/questionServiceFactory'
import Header from 'common/components/Header'
import { listToTree } from 'utils/helpers'
import { Question } from 'common/models'

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

export const QuestionServiceContext = React.createContext(questionServiceFactory)

const App: React.FC = () => {
    const questionList = useSelector((state: RootState) => state.form.questionList)
    const isUserFormVisible = useSelector((state: RootState) => state.view.isUserFormVisible)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        dispatch.form.initQuestionList()
    }, [dispatch.form])

    const questionTree = listToTree<Question>(questionList)

    return (
        <AppWrapper>
            <GlobalStyles />
            <Header />
            <Main>
                {isUserFormVisible ? (
                    <UserForm questions={questionTree} />
                ) : (
                    <FormBuilder questions={questionTree} />
                )}
            </Main>
        </AppWrapper>
    )
}

const Root = () => (
    <Provider store={store}>
        <QuestionServiceContext.Provider value={questionServiceFactory}>
            <App />
        </QuestionServiceContext.Provider>
    </Provider>
)

export default Root
