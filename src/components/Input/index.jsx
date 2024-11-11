import styled from "styled-components";

const InputStyle = styled.input`
	font-size: 16px;
	margin-bottom: 20px;
`;

export const Input = (props) => {
	return <InputStyle {...props} />;
};
