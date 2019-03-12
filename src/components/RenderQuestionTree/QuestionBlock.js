import React, { useState, useEffect } from 'react'
import { idbEvents } from '../../utils/indexedDB'
import styled from 'styled-components'
import ConditionBlock from './QuestionBlock/ConditionBlock'

const QuestionBlock = styled.form`
    display: flex;
    flex-direction: column;
    margin-left: ${props => (props.level ? `${props.level * 20}px` : '10px')};
    margin-right: 10px;
    margin-bottom: 20px;
    margin-inline-end: 2px;
    padding-block-start: 0.35em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    min-inline-size: min-content;
    border-width: 2px;
    border-style: groove;
    border-color: threedface;
    border-image: initial;
`

const InputWrapper = styled.div`
    display: flex;
    margin: 0 10px 5px 10px;
    label {
        width: 20%;
    }
    input {
        flex-grow: ${props => (props.select ? '0' : '1')};
        width: ${props => (props.select ? '20%' : 'unset')};
        margin: ${props => (props.select ? '0 0 0 10px' : '0')};
        padding: 0 0 0 5px;
    }
    select {
        flex-grow: 1;
    }
    select:nth-child(3) {
        width: 30%;
        margin: 0 0 0 10px;
        flex-grow: 0;
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px 10px 0 0;

    button {
        background: lightgrey;
        padding: 5px 10px;
    }

    button:first-child {
        margin: 0 10px 0 0;
    }
`

function QuestionBlockStyled(props) {
    const [questionValue, setQuestionValue] = useState({})
    const [questionText, setQuestionText] = useState('')
    const [questionType, setQuestionType] = useState('')
    const [conditionText, setConditionText] = useState('')
    const [conditionType, setConditionType] = useState('')
    const [parentValueType, setParentValueType] = useState('')

    useEffect(() => {
        idbEvents.getOne(props.questionId).then(val => {
            setQuestionValue(val)
            setQuestionText(val.question)
            setQuestionType(val.type)
            setConditionText(val.conditionValue)
            setConditionType(val.conditionType)
        })
    }, [])

    useEffect(() => {
        if (props.parentId) getParentValue(props.parentId)
    })

    const questionTextChange = e => {
        setQuestionText(e.target.value)
        idbEvents.updateQuestion({ ...questionValue, question: e.target.value })
    }

    const questionTypeChange = e => {
        setQuestionType(e.target.value)
        idbEvents.updateQuestion({ ...questionValue, type: e.target.value })
    }

    const inputConditionTextChange = e => {
        setConditionText(e.target.value)
        idbEvents.updateQuestion({ ...questionValue, conditionValue: e.target.value })
    }

    const inputConditionTypeChange = e => {
        setConditionType(e.target.value)
        idbEvents.updateQuestion({ ...questionValue, conditionType: e.target.value })
    }

    const addSubQuestion = value => {
        idbEvents.addSubQuestion({
            parentId: value.id,
            question: '',
            type: 'text',
            conditionType: 'equals',
            conditionValue: '',
            level: value.level + 1,
        })
    }

    const deleteQuestion = value => {
        if (value.children) {
            value.children.forEach(element => {
                idbEvents.deleteQuestion(element.id)
            })
        }
        idbEvents.deleteQuestion(value.id)
    }

    const getParentValue = parentId => {
        idbEvents.getOne(parentId).then(val => setParentValueType(val.type))
    }

    return (
        <QuestionBlock
            level={questionValue.level}
            onSubmit={e => {
                addSubQuestion(questionValue)
                e.preventDefault()
            }}>
            {questionValue.level > 0 && (
                <InputWrapper select>
                    <ConditionBlock
                        inputConditionTypeChange={inputConditionTypeChange}
                        inputConditionValueChange={inputConditionTextChange}
                        conditionType={conditionType}
                        conditionValue={conditionText}
                        parentValueType={parentValueType}
                    />
                </InputWrapper>
            )}
            <InputWrapper>
                <label htmlFor={`question-${questionText}`}>Question</label>
                <input
                    type="text"
                    id={`question-${questionText}`}
                    value={questionText}
                    onChange={questionTextChange}
                />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor={`type-${questionType}`}>Type</label>
                <select
                    id={`type-${questionType}`}
                    value={questionType}
                    onChange={questionTypeChange}>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Yes / No</option>
                </select>
            </InputWrapper>
            <ButtonWrapper>
                <button type="submit">Add Sub-Input</button>
                <button type="button" onClick={() => deleteQuestion(props.value)}>
                    Delete
                </button>
            </ButtonWrapper>
        </QuestionBlock>
    )
}

export default QuestionBlockStyled
