import { useState } from "react";
import styled from "styled-components";

const Question = styled.p`
	color: #555;
	font-size: 20px;
	margin-bottom: 20px;
	text-align: center;
`;

const OptionButton = styled.button`
	font-size: 16px;
	margin: 10px;
	transition: background-color 0.3s, transform 0.3s;

	&:hover {
		transform: scale(1.05);
	}

	&:active {
		transform: scale(0.95);
	}
`;

const Score = styled.p`
	font-size: 20px;
`;

export const QuizApp = () => {
	const [score, setScore] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const questions = [
		{
			question: "What is 2+2?",
			options: ["3", "4", "5", "6"],
			answer: "4",
		},
		{
			question: "What is 3+3?",
			options: ["5", "6", "7", "8"],
			answer: "6",
		},
	];

	const handleAnswer = (answer) => {
		if (answer === questions[currentQuestion].answer) {
			setScore(score + 1);
		}
		setCurrentQuestion(currentQuestion + 1);
	};

	return (
		<div className="container">
			<h2 className="titleOne">Quiz App</h2>
			{currentQuestion < questions.length ? (
				<div>
					<Question>{questions[currentQuestion].question}</Question>
					{questions[currentQuestion].options.map((option) => (
						<OptionButton key={option} onClick={() => handleAnswer(option)}>
							{option}
						</OptionButton>
					))}
				</div>
			) : (
				<Score>Your score: {score}</Score>
			)}
		</div>
	);
};
