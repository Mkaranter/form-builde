import styled from 'styled-components'
import { InterfaceColors } from 'utils/helpers'

const Button = styled.button`
    background: ${InterfaceColors.Primary};
    color: #000;
    border: none
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    padding: 10px 15px;
    margin: 0 10px 0 10px;
`
export default Button
