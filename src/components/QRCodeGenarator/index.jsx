import { useState } from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";

import { Input } from "../../components/Input";

const QRCodeContainer = styled.div`
	margin-top: 20px;
	padding: 20px;
	background: var(--bgk-white);
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const QRCodeGenerator = () => {
	const [text, setText] = useState("");

	return (
		<div className="container">
			<h2 className="titleOne">QR Code Generator</h2>
			<Input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Enter text to encode"
			/>
			{text && (
				<QRCodeContainer>
					<QRCode value={text} size={256} />
				</QRCodeContainer>
			)}
		</div>
	);
};
