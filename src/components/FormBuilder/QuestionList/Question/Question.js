import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Button } from 'components/common/Button'
import { idbEvents } from 'utils/indexedDB'
import { questionConditionTypes } from 'utils/helpers'

import Condition from './Condition/'

const QuestionStyled = styled.form`
    display: flex;
    flex-direction: column;
    margin-left: ${({ level }) => (level ? `${level * 20}px` : '10px')};
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
        flex-grow: ${({ select }) => (select ? '0' : '1')};
        width: ${({ select }) => (select ? '20%' : 'unset')};
        margin: ${({ select }) => (select ? '0 0 0 10px' : '0')};
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
`

function Question({ question, setParentValueType, parentValueType }) {
    const questionChange = (e, property) => {
        const questionObject = {
            ...question,
            children: undefined,
        }

        questionObject[property] = e.target.value
        idbEvents.updateQuestion(questionObject)
    }

    const questionTypeChange = ({ target }) => {
        if (question.children) {
            question.children.forEach(element => {
                idbEvents.updateQuestion({
                    ...element,
                    conditionType: questionConditionTypes.equals,
                    conditionValue: '',
                })
            })
        }

        idbEvents.updateQuestion({
            ...question,
            type: target.value,
            children: undefined,
        })

        setParentValueType(target.value)
    }

    const addSubQuestion = value => {
        idbEvents.addQuestion({
            parentId: value.id,
            text: '',
            type: 'text',
            conditionType: questionConditionTypes.equals,
            conditionValue: '',
            level: value.level + 1,
        })
    }

    const deleteQuestion = ({ id, children }) => {
        if (children) {
            children.forEach(child => {
                deleteQuestion(child)
            })
        }
        idbEvents.deleteQuestion(id)
    }

    return (
        <QuestionStyled
            level={question.level}
            onSubmit={e => {
                addSubQuestion(question)
                e.preventDefault()
            }}>
            {question.level > 0 && (
                <InputWrapper select>
                    <Condition
                        value={question.conditionValue}
                        type={question.conditionType}
                        setValue={e => questionChange(e, 'conditionValue')}
                        setType={e => questionChange(e, 'conditionType')}
                        parentValueType={parentValueType}
                    />
                </InputWrapper>
            )}
            <InputWrapper>
                <label htmlFor={`question-${question.id}`}>Question</label>
                <input
                    type="text"
                    id={`question-${question.id}`}
                    value={question.text}
                    onChange={e => questionChange(e, 'question')}
                />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor={`type-${question.id}`}>Type</label>
                <select
                    id={`type-${question.id}`}
                    value={question.type}
                    onChange={questionTypeChange}>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Yes / No</option>
                </select>
            </InputWrapper>
            <ButtonWrapper>
                <Button type="submit">Add Sub-Input</Button>
                <Button type="button" onClick={() => deleteQuestion(question)}>
                    Delete
                </Button>
            </ButtonWrapper>
        </QuestionStyled>
    )
}

export default Question

Question.propTypes = {
    question: PropTypes.object,
    setParentValueType: PropTypes.func,
    parentValueType: PropTypes.string,
}
