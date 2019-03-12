import React from 'react'
import styled from 'styled-components'

const AddInputButton = styled.button`
    background: lightgrey;
    padding: 5px 10px;
    margin: 0 10px 0 10px;
`

function AddInputButtonStyled(props) {
    return (
        <AddInputButton onClick={() => props.addQuestion({ question: '', type: 'text' })}>
            Add Input
        </AddInputButton>
    )
}

export default AddInputButtonStyled
