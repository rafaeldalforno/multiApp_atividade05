import axios from "axios";

export const requestService = {
	async request({
		url,
		method = "GET",
		data = null,
		params = {},
		token = null,
	}) {
		const headers = {
			Authorization: token ? `Bearer ${token}` : undefined,
			"Content-Type": "application/json",
		};

		try {
			const response = await axios({
				url,
				method,
				data,
				params,
				headers,
			});
			return response.data;
		} catch (error) {
			console.error(`Error making ${method} request to ${url}:`, error);
			throw error;
		}
	},
};

export const translationService = {
	async translateText(text, sourceLang, targetLang) {
		const url = "https://api.mymemory.translated.net/get";
		const params = {
			q: text,
			langpair: `${sourceLang}|${targetLang}`,
		};

		try {
			const response = await requestService.request({ url, params });
			return response;
		} catch (error) {
			console.error("Error translating text:", error);
			throw error;
		}
	},
};

export const movieService = {
	async searchMovies(query) {
		const url = "https://www.omdbapi.com/";
		const params = {
			s: query,
			apikey: "d7bc9df7",
		};

		try {
			const response = await requestService.request({ url, params });
			return response;
		} catch (error) {
			console.error("Error fetching movie data:", error);
			throw error;
		}
	},
};
