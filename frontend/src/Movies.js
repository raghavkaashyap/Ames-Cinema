import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const Movies = ({ movies, setMovies }) => {
    const navigate = useNavigate();

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

    const handleShowtimeClick = (movie, time) => {
        navigate('/payment', {
            state: {
                title: movie.title,
                price: movie.price,
                time: time,
                url: `http://localhost:8081${movie.url}`
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Movies List</h2>
            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.id} className="col-12 col-md-3 mb-4">
                        <div className="card d-flex flex-column shadow-sm rounded bg-dark text-light">
                            {movie.url && (
                                <img
                                    src={`http://localhost:8081${movie.url}`}
                                    alt={movie.title}
                                    className="card-img-top"
                                    style={{ objectFit: 'cover', height: 'auto', width: '100%' }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{movie.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">${movie.price}</h6>
                                <p className="card-text">{movie.description}</p>
                                <div className="btn-group flex-wrap">
                                    {['11:40 AM', '2:10 PM', '4:40 PM', '7:10 PM', '9:40 PM'].map((time) => (
                                        <button
                                            key={time}
                                            type="button"
                                            className="btn btn-outline-light"
                                            onClick={() => handleShowtimeClick(movie, time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;
