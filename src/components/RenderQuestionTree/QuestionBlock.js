import React from 'react'
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
    const questionTextChange = e => {
        idbEvents.updateQuestion({
            ...props.questionData,
            question: e.target.value,
            children: undefined,
        })
    }

    const questionTypeChange = e => {
        if (props.questionData.children) {
            props.questionData.children.forEach(element => {
                idbEvents.updateQuestion({
                    ...element,
                    conditionType: 'equals',
                    conditionValue: '',
                })
            })
        }

        idbEvents.updateQuestion({
            ...props.questionData,
            type: e.target.value,
            children: undefined,
        })

        props.setParentValueType(e.target.value)
    }

    const conditionValueChange = e => {
        idbEvents.updateQuestion({
            ...props.questionData,
            conditionValue: e.target.value,
            children: undefined,
        })
    }

    const conditionTypeChange = e => {
        idbEvents.updateQuestion({
            ...props.questionData,
            conditionType: e.target.value,
            children: undefined,
        })
    }

    const addSubQuestion = value => {
        idbEvents.addQuestion({
            parentId: value.id,
            question: '',
            type: 'text',
            conditionType: 'equals',
            conditionValue: '',
            level: value.level + 1,
        })
    }

    const deleteQuestion = questionData => {
        if (questionData.children) {
            questionData.children.forEach(element => {
                idbEvents.deleteQuestion(element.id)
            })
        }
        idbEvents.deleteQuestion(questionData.id)
    }

    return (
        <QuestionBlock
            level={props.questionData.level}
            onSubmit={e => {
                addSubQuestion(props.questionData)
                e.preventDefault()
            }}>
            {props.questionData.level > 0 && (
                <InputWrapper select>
                    <ConditionBlock
                        conditionTypeChange={conditionTypeChange}
                        conditionValueChange={conditionValueChange}
                        conditionType={props.questionData.conditionType}
                        conditionValue={props.questionData.conditionValue}
                        parentValueType={props.parentValueType}
                    />
                </InputWrapper>
            )}
            <InputWrapper>
                <label htmlFor={`question-${props.questionData.id}`}>Question</label>
                <input
                    type="text"
                    id={`question-${props.questionData.id}`}
                    value={props.questionData.question}
                    onChange={questionTextChange}
                />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor={`type-${props.questionData.id}`}>Type</label>
                <select
                    id={`type-${props.questionData.id}`}
                    value={props.questionData.type}
                    onChange={questionTypeChange}>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Yes / No</option>
                </select>
            </InputWrapper>
            <ButtonWrapper>
                <button type="submit">Add Sub-Input</button>
                <button type="button" onClick={() => deleteQuestion(props.questionData)}>
                    Delete
                </button>
            </ButtonWrapper>
        </QuestionBlock>
    )
}

export default QuestionBlockStyled
