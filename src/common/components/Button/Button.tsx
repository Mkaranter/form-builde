import styled, { css } from 'styled-components'

import { Colors } from 'utils/enums'

const Button = styled.button`
    background: ${Colors.Primary};
    /* color: #000; use variable */
    border: none;
    cursor: pointer;
    padding: 10px 15px;
    margin: 0 10px 0 10px;

    ${({ disabled }) =>
        disabled &&
        css`
            background: ${Colors.Disabled};
            cursor: not-allowed;
        `}
`
export default Button
