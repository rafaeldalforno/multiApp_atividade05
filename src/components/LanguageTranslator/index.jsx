import { useState } from "react";
import { translationService } from "../../services/apiService";
import styled from "styled-components";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const Label = styled.label`
	color: #555;
	font-size: 16px;
	margin-right: 10px;
`;

const Select = styled.select`
	margin-bottom: 20px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
	transition: border-color 0.3s;

	&:focus {
		border-color: #007bff;
		outline: none;
	}
`;

const TranslatedText = styled.p`
	color: #333;
	font-size: 18px;
	background: var(--bgk-white);
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 100%;
	text-align: center;
`;

export const LanguageTranslator = () => {
	const [text, setText] = useState("");
	const [translatedText, setTranslatedText] = useState("");
	const [sourceLang, setSourceLang] = useState("pt");
	const [targetLang, setTargetLang] = useState("en");
	const [error, setError] = useState(null);

	const translateText = async () => {
		setError(null);
		try {
			const result = await translationService.translateText(
				text,
				sourceLang,
				targetLang
			);
			setTranslatedText(result.responseData.translatedText);
		} catch (error) {
			setError("Error translating text. Please try again.");
			console.error("Error translating text:", error);
		}
	};

	return (
		<div className="container">
			<h2 className="titleOne">Language Translator</h2>
			<div>
				<Label>Source Language:</Label>
				<Select
					value={sourceLang}
					onChange={(e) => setSourceLang(e.target.value)}
				>
					<option value="en">English</option>
					<option value="es">Spanish</option>
					<option value="fr">French</option>
					<option value="de">German</option>
					<option value="it">Italian</option>
					<option value="pt">Portuguese</option>
				</Select>
			</div>
			<div>
				<Label>Target Language:</Label>
				<Select
					value={targetLang}
					onChange={(e) => setTargetLang(e.target.value)}
				>
					<option value="en">English</option>
					<option value="es">Spanish</option>
					<option value="fr">French</option>
					<option value="de">German</option>
					<option value="it">Italian</option>
					<option value="pt">Portuguese</option>
				</Select>
			</div>
			<Input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Enter text to translate"
			/>
			<Button onClick={translateText}>Translate</Button>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{translatedText && <TranslatedText>{translatedText}</TranslatedText>}
		</div>
	);
};
