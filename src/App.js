import React, { useState, useEffect, Fragment } from 'react'
import { idbEvents } from './utils/indexedDB'
import styled from 'styled-components'
import rootArray from './utils/rootArray'
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

function App() {
    const [questionList, setQuestionList] = useState([])
    const [generatedFormVisible, setGeneratedFormVisible] = useState(false)

    useEffect(() => {
        idbEvents.getAll().then(e => setQuestionList(rootArray(e)))
    }, [])

    const addQuestion = value => {
        if (value.children) delete value.children
        return idbEvents.set(value).then(() => {
            idbEvents.getAll().then(e => {
                setQuestionList(rootArray(e))
            })
        })
    }

    const removeQuestion = value => {
        idbEvents.delete(value.id).then(() => {
            idbEvents.getAll().then(e => {
                return setQuestionList(rootArray(e))
            })
        })

        if (value.children) {
            return value.children.map(e => {
                return removeQuestion(e)
            })
        }
    }

    const getOne = id => {
        return idbEvents.getOne(id).then(value => {
            return value
        })
    }

    return (
        <AppWrapper>
            {!generatedFormVisible ? (
                <Fragment>
                    <h1>FORM BUILDER</h1>
                    <RenderQuestionTree
                        data={questionList}
                        removeQuestion={removeQuestion}
                        updateQuestion={addQuestion}
                        getOne={getOne}
                    />
                    <AddInputButton addQuestion={addQuestion} />
                    <ShowFormButton setGeneratedFormVisible={setGeneratedFormVisible} />
                </Fragment>
            ) : (
                <GeneratedForm formData={questionList} getOne={getOne} />
            )}
        </AppWrapper>
    )
}

export default App
