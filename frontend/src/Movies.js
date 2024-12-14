import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Movies = ({ movies, setMovies }) => {
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:8081/movies");
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                alert("There was an Error loading movies: " + error);
            }
        };
        fetchMovies();
    }, [setMovies]);

    return (
        <div className="container">
            <h2 className="text-center mt-4">Movies List</h2>
            <ul className="list-group">
                {movies.map((movie) => (
                    <li key={movie.id} className="list-group-item d-flex align-items-center">
                        {movie.url && (
                            <img
                                src={`http://localhost:8081${movie.url}`}
                                alt={movie.title}
                                style={{ width: '50px', height: '50px', marginRight: '15px', objectFit: 'cover' }}
                            />
                        )}
                        <div>
                            <strong>{movie.title}</strong> - ${movie.price}
                            <p>{movie.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Movies;
