import React from 'react'
import styled from 'styled-components'

import { InterfaceColors } from 'utils/helpers'

const HeaderStyled = styled.header`
    background: ${InterfaceColors.Primary};
    grid-area: header;
`

function Header() {
    return (
        <HeaderStyled>
            <h1>FORM BUILDER APP</h1>
        </HeaderStyled>
    )
}

export default Header
