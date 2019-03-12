import React, { useState, useEffect } from 'react'
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
    const [parentValueType, setParentValueType] = useState({})

    useEffect(() => {
        if (props.value.parentId) getParentValue(props.value.parentId)
    })

    const inputQuestionChange = e => {
        props.updateQuestion({ ...props.value, question: e.target.value })
    }

    const inputTypeChange = e => {
        props
            .updateQuestion({
                ...props.value,
                type: e.target.value,
            })
            .then(() => {
                if (props.value.children && props.value.children.length > 0) {
                    props.value.children.forEach(element => {
                        props.updateQuestion({
                            ...element,
                            conditionType: 'equals',
                            conditionValue: '',
                        })
                    })
                }
            })
    }

    const inputConditionTypeChange = e => {
        props.updateQuestion({
            ...props.value,
            conditionType: e.target.value,
        })
    }

    const inputConditionValueChange = e => {
        props.updateQuestion({ ...props.value, conditionValue: e.target.value })
    }

    const addSubQuestion = () => {
        props.updateQuestion({
            parentId: props.value.id,
            question: '',
            type: 'text',
            conditionType: 'equals',
            conditionValue: '',
        })
    }

    const getParentValue = parentId => {
        props.getOne(parentId).then(val => {
            setParentValueType(val.type)
        })
    }

    return (
        <QuestionBlock
            level={props.value.level}
            onSubmit={e => {
                addSubQuestion(props.value.id)
                e.preventDefault()
            }}>
            {props.value.level > 0 && (
                <InputWrapper select>
                    <ConditionBlock
                        inputConditionTypeChange={inputConditionTypeChange}
                        inputConditionValueChange={inputConditionValueChange}
                        conditionType={props.value.conditionType}
                        conditionValue={props.value.conditionValue}
                        parentValueType={parentValueType}
                    />
                </InputWrapper>
            )}
            <InputWrapper>
                <label htmlFor={`question-${props.value.question}`}>Question</label>
                <input
                    type="text"
                    id={`question-${props.value.question}`}
                    value={props.value.question}
                    onChange={inputQuestionChange}
                />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor={`type-${props.value}`}>Type</label>
                <select
                    id={`type-${props.value}`}
                    value={props.value.type}
                    onChange={inputTypeChange}>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Yes / No</option>
                </select>
            </InputWrapper>
            <ButtonWrapper>
                <button type="submit">Add Sub-Input</button>
                <button type="button" onClick={() => props.removeQuestion(props.value)}>
                    Delete
                </button>
            </ButtonWrapper>
        </QuestionBlock>
    )
}

export default QuestionBlockStyled
