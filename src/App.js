import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import arrayToTree from 'array-to-tree'
import styled from 'styled-components'

import AddInputButton from './components/AddInputButton'
import RenderQuestionTree from './components/RenderQuestionTree'
import ShowFormButton from './components/ShowFormButton'
import GeneratedForm from './components/GeneratedForm'
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
            {!props.showGeneratedForm ? (
                <>
                    <h1>FORM BUILDER</h1>
                    <RenderQuestionTree
                        data={arrayToTree(props.questionList, { parentProperty: 'parentId' })}
                    />
                    <AddInputButton />
                    <ShowFormButton setGeneratedFormVisible={props.toggleGeneratedForm} />
                </>
            ) : (
                <GeneratedForm
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
