import { useState } from "react";
import styled from "styled-components";
import { movieService } from "../../services/apiService";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const MoviesContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 20px;
	max-height: 500px;
	overflow-y: auto;
	width: 100%;
`;

const MovieCard = styled.div`
	background: var(--bgk-white);
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin: 10px;
	padding: 20px;
	width: 180px;
	text-align: center;
	transition: transform 0.3s, box-shadow 0.3s;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	img {
		border-radius: 10px;
		max-width: 100%;
		height: auto;
		margin-bottom: 10px;
	}
`;

export const MovieSearchEngine = () => {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);

	const searchMovies = async () => {
		try {
			const data = await movieService.searchMovies(query);
			setMovies(data.Search || []);
		} catch (error) {
			console.error("Error fetching movie data:", error);
		}
	};

	return (
		<div className="container">
			<h2 className="titleOne">Movie Search Engine</h2>
			<Input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search for a movie"
			/>
			<Button onClick={searchMovies}>Search</Button>
			<MoviesContainer>
				{movies.map((movie) => (
					<MovieCard key={movie.imdbID}>
						<img src={movie.Poster} alt={`${movie.Title} Poster`} />
						<h3>{movie.Title}</h3>
						<p>{movie.Year}</p>
					</MovieCard>
				))}
			</MoviesContainer>
		</div>
	);
};
