import React from 'react'
import styled from 'styled-components'

import { QuestionTypes } from 'utils/enums'
import { Question } from 'common/models'

interface UserQuestionStyledProps {
    level?: number
}

const UserQuestionStyled = styled.fieldset<UserQuestionStyledProps>`
    display: flex;
    flex-direction: column;
    margin-left: ${({ level }) => (level ? `${level * 20}px` : '10px')};
    margin-right: 10px;
    margin-bottom: 20px;

    &:first-child {
        margin-top: 20px;
    }

    label {
        padding: 10px 0;
    }

    input {
        padding: 5px 0;
    }
`

const RadioWrapper = styled.div`
    input {
        width: unset;
    }

    label {
        padding: 0 0 0 10px;
    }
`

interface UserQuestionProps {
    data: Question
    setFormInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UserQuestion: React.SFC<UserQuestionProps> = ({ data, setFormInputValue }): JSX.Element => {
    return (
        <UserQuestionStyled level={data.level}>
            <label>{data.text}</label>
            {data.type !== QuestionTypes.Boolean ? (
                <input onChange={setFormInputValue} />
            ) : (
                <>
                    <RadioWrapper>
                        <input
                            type="radio"
                            id="yes"
                            name="boolForm"
                            value="true"
                            onChange={setFormInputValue}
                        />
                        <label htmlFor="yes">Yes</label>
                    </RadioWrapper>
                    <RadioWrapper>
                        <input
                            type="radio"
                            name="boolForm"
                            id="no"
                            value="false"
                            onChange={setFormInputValue}
                        />
                        <label htmlFor="no">No</label>
                    </RadioWrapper>
                </>
            )}
        </UserQuestionStyled>
    )
}

export default UserQuestion
