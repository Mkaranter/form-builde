import React from 'react'
import styled from 'styled-components'

import { QuestionTypes } from 'utils/enums'
import { Question } from 'common/models'

interface UserQuestionStyledProps {
    level?: number
}

// you can extract margin-left calc to helper
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
    setInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UserQuestion: React.FC<UserQuestionProps> = ({ data, setInputValue }) => {
    return (
        <UserQuestionStyled level={data.level}>
            <label>{data.text}</label>
            {data.type !== QuestionTypes.Boolean ? (
                <input onChange={setInputValue} />
            ) : (
                <>
                    <RadioWrapper>
                        <input
                            type="radio"
                            id="yes"
                            name="boolForm"
                            value="true"
                            onChange={setInputValue}
                        />
                        <label htmlFor="yes">Yes</label>
                    </RadioWrapper>
                    <RadioWrapper>
                        <input
                            type="radio"
                            name="boolForm"
                            id="no"
                            value="false"
                            onChange={setInputValue}
                        />
                        <label htmlFor="no">No</label>
                    </RadioWrapper>
                </>
            )}
        </UserQuestionStyled>
    )
}

export default UserQuestion
