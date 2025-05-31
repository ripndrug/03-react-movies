import axios from 'axios';
import { type Movie } from '../types/movie';

interface MovieResProps {
    results: Movie[],
}

const API_URL = 'https://api.themoviedb.org/3/search/movie';

export default async function fetchData(newTopic: string): Promise<Movie[]> {
    const response = await axios.get<MovieResProps>(API_URL, {
        params: {
            query: newTopic
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    })

    return response.data.results;
}