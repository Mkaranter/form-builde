import React from 'react'
import styled from 'styled-components'

import Button from 'common/components/Button'
import { questionService } from './questionService'
import { Question as QuestionModel } from 'common/models'

import Condition from '../Condition'

interface QuestionStyledProps {
    level?: number
}

interface InputWrapperProps {
    select?: boolean
}

const QuestionStyled = styled.form<QuestionStyledProps>`
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

const InputWrapper = styled.div<InputWrapperProps>`
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

interface QuestionProps {
    question: QuestionModel
    setParentValueType: React.Dispatch<React.SetStateAction<string>>
    parentValueType?: string
}

const Question: React.SFC<QuestionProps> = ({
    question,
    setParentValueType,
    parentValueType,
}): JSX.Element => {
    return (
        <QuestionStyled
            level={question.level}
            onSubmit={e => {
                questionService.addSub(question)
                e.preventDefault()
            }}>
            {question.level > 0 && (
                <InputWrapper select>
                    <Condition
                        value={question.conditionValue}
                        type={question.conditionType}
                        setValue={e => questionService.change(e, 'conditionValue', question)}
                        setType={e => questionService.change(e, 'conditionType', question)}
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
                    onChange={e => questionService.change(e, 'text', question)}
                    required
                />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor={`type-${question.id}`}>Type</label>
                <select
                    id={`type-${question.id}`}
                    value={question.type}
                    onChange={e => {
                        setParentValueType(e.target.value)
                        questionService.changeType(e, question)
                    }}>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Yes / No</option>
                </select>
            </InputWrapper>
            <ButtonWrapper>
                <Button type="submit">Add Sub-Input</Button>
                <Button type="button" onClick={() => questionService.remove(question)}>
                    Delete
                </Button>
            </ButtonWrapper>
        </QuestionStyled>
    )
}

export default Question
