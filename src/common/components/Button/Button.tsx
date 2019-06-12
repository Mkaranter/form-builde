import styled from 'styled-components'
import { InterfaceColors } from 'utils/enums'

const Button = styled.button`
    background: ${({ disabled }) =>
        disabled ? InterfaceColors.Disabled : InterfaceColors.Primary};
    color: #000;
    border: none;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    padding: 10px 15px;
    margin: 0 10px 0 10px;
`
export default Button
