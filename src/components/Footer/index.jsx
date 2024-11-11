/* eslint-disable react/prop-types */
import styled from "styled-components";

const FooterStyle = styled.div`
	width: 100%;
	background-color: var(--bkg-blue);
	color: var(--white);
	text-align: center;
	padding: 10px 0;
	position: absolute;
	bottom: 0;

	@media (max-width: 768px) {
		padding: 5px 0;
		font-size: 12px;
	}
`;

export const Footer = ({ children, ...props }) => {
	return <FooterStyle {...props}>{children}</FooterStyle>;
};
