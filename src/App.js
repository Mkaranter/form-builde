import React, { useState, useEffect, Fragment } from 'react'
import { idbEvents } from './utils/indexedDB'
import arrayToTree from 'array-to-tree'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AddInputButton from './components/AddInputButton'
import RenderQuestionTree from './components/RenderQuestionTree'
import ShowFormButton from './components/ShowFormButton'
import GeneratedForm from './components/GeneratedForm'

const AppWrapper = styled.div`
    margin: 0 auto;
    max-width: 50vw;

    @media (max-width: 768px) {
        max-width: 100vw;
    }
`

function App(props) {
    const [generatedFormVisible, setGeneratedFormVisible] = useState(false)

    useEffect(() => {
        idbEvents.getAllRedux()
    }, [])

    return (
        <AppWrapper>
            {!generatedFormVisible ? (
                <Fragment>
                    <h1>FORM BUILDER</h1>
                    <RenderQuestionTree
                        data={arrayToTree(props.questionList, { parentProperty: 'parentId' })}
                    />
                    <AddInputButton />
                    <ShowFormButton setGeneratedFormVisible={setGeneratedFormVisible} />
                </Fragment>
            ) : (
                <GeneratedForm
                    formData={arrayToTree(props.questionList, { parentProperty: 'parentId' })}
                />
            )}
        </AppWrapper>
    )
}

const mapStateToProps = state => {
    return {
        questionList: state.form.questionList,
    }
}

export default connect(
    mapStateToProps,
    null
)(App)
