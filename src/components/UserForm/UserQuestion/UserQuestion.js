import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { questionTypes } from 'utils/helpers'

const UserQuestionStyled = styled.fieldset`
    display: flex;
    flex-direction: column;
    margin-left: ${props => (props.level ? `${props.level * 20}px` : '10px')};
    margin-right: 10px;
    margin-bottom: 20px;

    &:first-child {
        margin-top: 20px;
    }

    label {
        padding: 10px 0;
    }

    input {
        width: 100%;
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

function UserQuestion({ data, setFormInputValue }) {
    return (
        <UserQuestionStyled>
            <label>{data.question}</label>
            {data.type !== questionTypes.boolean ? (
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

UserQuestion.propTypes = {
    formData: PropTypes.array,
    setFormInputValue: PropTypes.func.isRequired,
}
