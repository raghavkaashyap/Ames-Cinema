import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteMovie = ({ movies, setMovies }) => {
    const [movieTitle, setMovieTitle] = useState("");
    const [moviesQuery, setMoviesQuery] = useState([]);

    // Search movies by title or partial title
    const fetchMovies = async () => {
        if (!movieTitle.trim()) {
            alert("Please enter a movie name");
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

    // Delete a movie by ID
    const deleteOneMovie = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/movies/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete movie");
            }
            alert("Movie deleted successfully");

            // Refresh the movie list after deletion
            setMoviesQuery(moviesQuery.filter(movie => movie.movieId !== id));
        } catch (err) {
            alert("There was an error deleting the movie: " + err);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Delete Movie</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter movie name"
                    value={movieTitle}
                    onChange={(e) => setMovieTitle(e.target.value.toLowerCase())}
                />
                <button className="btn btn-primary" onClick={fetchMovies}>
                    Search
                </button>
            </div>

            <ul className="list-group">
                {moviesQuery.map((movie) => (
                    <li key={movie.movieId} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            {movie.url && (
                                <img
                                    src={`http://localhost:8081${movie.url}`}
                                    alt={movie.title}
                                    style={{
                                        width: "50px", 
                                        height: "50px", 
                                        marginRight: "15px", 
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                            <div>
                                <strong>{movie.title}</strong> - {movie.price}
                                <p>{movie.description}</p>
                            </div>
                        </div>

                        <button
                            className="btn btn-outline-secondary btn-sm rounded-pill"
                            onClick={() => deleteOneMovie(movie.movieId)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeleteMovie;
