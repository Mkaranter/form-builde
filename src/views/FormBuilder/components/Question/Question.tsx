import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import isEqual from 'lodash.isequal'

import Button from 'common/components/Button'
import { Question as QuestionModel } from 'common/models'
import { QuestionTypes } from 'utils/enums'
import { getMarginForQuestion } from 'utils/helpers'
import { QuestionServiceFactory } from 'services/questionServiceFactory'

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
    margin-left: ${({ level }) => getMarginForQuestion(level)};
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

    select {
        flex-grow: 1;
    }

    select:nth-child(3) {
        width: 30%;
        margin: 0 0 0 10px;
        flex-grow: 0;
    }

    input {
        flex-grow: 1;
        width: unset;
        margin: 0;
        padding: 0 0 0 5px;
        ${({ select }) =>
            select &&
            css`
                flex-grow: 0;
                width: 20%;
                margin: 0 0 0 10px;
            `}
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
    questionService: QuestionServiceFactory
}

const Question: React.FC<QuestionProps> = ({
    question,
    setParentValueType,
    parentValueType,
    questionService,
}) => {
    const changeType = (value: string) => {
        setParentValueType(value)
        questionService.changeType(value, question)
    }

    const changeValue = (value: string, property: string) =>
        questionService.changeValue(value, property, question)

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        questionService.addSubQuestion(question)
        e.preventDefault()
    }

    const remove = () => questionService.remove(question)

    return (
        <>
            <QuestionStyled level={question.level} onSubmit={submit}>
                {question.level > 0 && (
                    <InputWrapper select>
                        <Condition
                            value={question.conditionValue}
                            type={question.conditionType}
                            setValue={e => changeValue(e.target.value, 'conditionValue')}
                            setType={e => changeValue(e.target.value, 'conditionType')}
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
                        onChange={e => changeValue(e.target.value, 'text')}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor={`type-${question.id}`}>Type</label>
                    <select
                        id={`type-${question.id}`}
                        value={question.type}
                        onChange={e => changeType(e.target.value)}>
                        <option value={QuestionTypes.Text}>Text</option>
                        <option value={QuestionTypes.Number}>Number</option>
                        <option value={QuestionTypes.Boolean}>Yes / No</option>
                    </select>
                </InputWrapper>
                <ButtonWrapper>
                    <Button type="submit">Add Sub-Input</Button>
                    <Button type="button" onClick={remove}>
                        Delete
                    </Button>
                </ButtonWrapper>
            </QuestionStyled>
        </>
    )
}

const shouldRefresh = (prevProps: QuestionProps, nextProps: QuestionProps) =>
    isEqual(prevProps.question, nextProps.question)

export default memo(Question, shouldRefresh)
