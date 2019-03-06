import React from 'react';
import styled from 'styled-components';

const ShowFormButton = styled.button`
	background: lightgrey;
	padding: 5px 10px;
	margin: 0 10px 0 0;
`;

function ShowFormButtonStyled(props) {
	return (
		<ShowFormButton onClick={props.setGeneratedFormVisible}>
			Create form
		</ShowFormButton>
	);
}

export default ShowFormButtonStyled;
