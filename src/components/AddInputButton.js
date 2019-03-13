import React from 'react'
import styled from 'styled-components'
import { idbEvents } from '../utils/indexedDB'

const AddInputButton = styled.button`
    background: lightgrey;
    padding: 5px 10px;
    margin: 0 10px 0 10px;
`

function AddInputButtonStyled() {
    return (
        <AddInputButton
            onClick={() => {
                idbEvents.addQuestion({ question: '', type: 'text', level: 0 })
            }}>
            Add Input
        </AddInputButton>
    )
}

export default AddInputButtonStyled
