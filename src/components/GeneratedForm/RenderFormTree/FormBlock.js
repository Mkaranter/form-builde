import React from 'react'
import styled from 'styled-components'

const FormBlock = styled.fieldset`
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

function FormBlockStyled(props) {
    return (
        <FormBlock>
            <label>{props.data.question}</label>
            {props.data.type !== 'boolean' ? (
                <input onChange={props.setFormInputValue} />
            ) : (
                <>
                    <RadioWrapper>
                        <input
                            type="radio"
                            id="yes"
                            name="boolForm"
                            value="true"
                            onChange={props.setFormInputValue}
                        />
                        <label htmlFor="yes">Yes</label>
                    </RadioWrapper>
                    <RadioWrapper>
                        <input
                            type="radio"
                            name="boolForm"
                            id="no"
                            value="false"
                            onChange={props.setFormInputValue}
                        />
                        <label htmlFor="no">No</label>
                    </RadioWrapper>
                </>
            )}
        </FormBlock>
    )
}

export default FormBlockStyled
