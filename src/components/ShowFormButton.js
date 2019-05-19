import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ShowFormButton = styled.button`
    background: lightgrey;
    padding: 5px 10px;
    margin: 0 10px 0 0;
`

function ShowFormButtonStyled({ setGeneratedFormVisible }) {
    return <ShowFormButton onClick={setGeneratedFormVisible}>Create form</ShowFormButton>
}

export default ShowFormButtonStyled

ShowFormButtonStyled.propTypes = {
    setGeneratedFormVisible: PropTypes.func.isRequired,
}
