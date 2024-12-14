import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const SearchMovie = ({ movies, setMovies }) => {
    const [movieTitle, setMovieTitle] = useState("");
    const [moviesQuery, setMoviesQuery] = useState([]);


    const fetchMovies = async () => {
        if (!movieTitle.trim()) {
            alert("Please enter a movie title");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8081/movies/title?title_name=${encodeURIComponent(movieTitle)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            setMoviesQuery(data);  
        } catch (err) {
            alert("There was an error loading searched movies: " + err);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Search Movie</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter movie title"
                    value={movieTitle}
                    onChange={(e) => setMovieTitle(e.target.value.toLowerCase())}
                />
                <button className="btn btn-primary" onClick={fetchMovies}>
                    Search
                </button>
            </div>
            <ul className="list-group">
                {moviesQuery.map((movie) => (
                    <li key={movie.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            {movie.url && (
                                <img
                                    src={`http://localhost:8081${movie.url}`}
                                    alt={movie.title}
                                    style={{ width: "50px", height: "50px", marginRight: "15px", objectFit: "cover" }}
                                />
                            )}
                            <div>
                                <strong>{movie.title}</strong> - ${movie.price}
                                <p>{movie.description}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchMovie;