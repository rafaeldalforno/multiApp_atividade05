import { useState } from "react";
import styled from "styled-components";
import { requestService } from "../../services/apiService";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const ResultsContainer = styled.div`
	margin-top: 20px;
	padding: 20px;
	background: var(--bgk-white);
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 100%;
`;

export const IPAddressFinder = () => {
	const [ip, setIp] = useState("");
	const [ipData, setIpData] = useState(null);
	const [error, setError] = useState(null);

	const findIP = async () => {
		setError(null);
		try {
			const url = `https://ipinfo.io/${ip}/json`;

			const data = await requestService.request({ url });

			setIpData(data);
		} catch (error) {
			setError("Error fetching IP address data. Please try again.");
			console.error("Error fetching IP address data:", error);
		}
	};

	return (
		<div className="container">
			<h2 className="titleOne">IP Address Finder</h2>
			<Input
				type="text"
				value={ip}
				onChange={(e) => setIp(e.target.value)}
				placeholder="Enter IP address"
			/>
			<Button onClick={findIP}>Find IP</Button>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{ipData && (
				<ResultsContainer>
					<p>
						<strong>IP:</strong> {ipData.ip}
					</p>
					<p>
						<strong>Location:</strong> {ipData.city}, {ipData.region},{" "}
						{ipData.country}
					</p>
					<p>
						<strong>ISP:</strong> {ipData.org}
					</p>
				</ResultsContainer>
			)}
		</div>
	);
};
