import React from 'react'
import styled from 'styled-components'

import { InterfaceColors } from 'utils/helpers'

const HeaderStyled = styled.header`
    background: ${InterfaceColors.Primary};
    grid-area: header;

    h1 {
        margin-left: 20px;
        text-transform: uppercase;
    }
`

const Header: React.SFC = (): JSX.Element => {
    return (
        <HeaderStyled>
            <h1>form builder</h1>
        </HeaderStyled>
    )
}

export default Header
