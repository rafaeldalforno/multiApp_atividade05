/* eslint-disable react/prop-types */
import styled from "styled-components";

const ButtonStyle = styled.button`
	font-size: 16px;
`;

export const Button = ({ children, ...props }) => {
	return <ButtonStyle {...props}>{children}</ButtonStyle>;
};
