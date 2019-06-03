import React from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.button`
    background: tomato;
    padding: 5px 10px;
    margin: 0 10px 0 10px;
`

export function Button({ buttonClick, label }) {
    return <ButtonStyled onClick={buttonClick}>{label}</ButtonStyled>
}
