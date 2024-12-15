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
                                <div class="btn-group flex-wrap">
              <button type="button" class="text-nowrap bg-darker text-light" onclick="navigateToPayment('${title}', '11:40 AM', ${price}, '${url}')">11:40 AM</button>
              <button type="button" class="text-nowrap bg-darker text-light" onclick="navigateToPayment('${title}', '2:10 PM', ${price}, '${url}')">2:10 PM</button>
              <button type="button" class="text-nowrap bg-darker text-light" onclick="navigateToPayment('${title}', '4:40 PM', ${price}, '${url}')">4:40 PM</button>
              <button type="button" class="text-nowrap bg-darker text-light" onclick="navigateToPayment('${title}', '7:10 PM', ${price}, '${url}')">7:10 PM</button>
              <button type="button" class="text-nowrap bg-darker text-light" onclick="navigateToPayment('${title}', '9:40 PM', ${price}, '${url}')">9:40 PM</button>
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
