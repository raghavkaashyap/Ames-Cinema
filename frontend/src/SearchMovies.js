import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const SearchMovie = ({ movies, setMovies }) => {
    const [movieTitle, setMovieTitle] = useState("");
    const [moviesQuery, setMoviesQuery] = useState([]);
    const navigate = useNavigate();

    const fetchMovies = async () => {
        if (!movieTitle.trim()) {
            alert("Please enter a movie title");
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8081/movies/title?title_name=${encodeURIComponent(movieTitle)}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            setMoviesQuery(data);
        } catch (err) {
            alert("There was an error loading searched movies: " + err);
        }
    };

    const navigateToPayment = (title, time, price, url) => {
        navigate("/payment", {
            state: { title, time, price, url },
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Search Movie</h2>
            <div className="input-group mb-4">
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

            <div className="row">
                {moviesQuery.map((movie) => (
                    <div key={movie.id} className="col-12 col-md-3 mb-4">
                        <div className="card d-flex flex-column shadow-sm rounded bg-dark text-light">
                            {movie.url && (
                                <img
                                    src={`http://localhost:8081${movie.url}`}
                                    alt={movie.title}
                                    className="card-img-top"
                                    style={{ objectFit: "cover", height: "auto", width: "100%" }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{movie.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">${movie.price}</h6>
                                <p className="card-text">{movie.description}</p>
                                <div className="btn-group flex-wrap">
                                    {["11:40 AM", "2:10 PM", "4:40 PM", "7:10 PM", "9:40 PM"].map((time) => (
                                        <button
                                            key={time}
                                            type="button"
                                            className="btn btn-outline-light m-1"
                                            onClick={() => navigateToPayment(movie.title, time, movie.price, movie.url)}
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

export default SearchMovie;

