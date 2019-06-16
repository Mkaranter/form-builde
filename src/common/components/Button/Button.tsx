import styled from 'styled-components'
import { InterfaceColors } from 'utils/enums'

const Button = styled.button`
    background: ${InterfaceColors.Primary};
    color: #000;
    border: none;
    cursor: pointer;
    padding: 10px 15px;
    margin: 0 10px 0 10px;

    ${({ disabled }) =>
        disabled &&
        `
            background: ${InterfaceColors.Disabled};
            cursor: not-allowed;
        `}
`
export default Button
