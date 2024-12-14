import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateMovie = () => {
    const [movieId, setMovieId] = useState("");
    const [movieDetails, setMovieDetails] = useState({
        title: "",
        price: "",
        description: ""
    });

    const [isUpdated, setIsUpdated] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieDetails({
            ...movieDetails,
            [name]: value
        });
    };


    const updateMovie = async () => {
        if (!movieId.trim() || !movieDetails.title || !movieDetails.price) {
            alert("Please provide all the required fields");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/movies/${movieId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movieDetails)
            });

            if (!response.ok) {
                throw new Error("Failed to update movie");
            }

            alert("Movie updated successfully");
            setIsUpdated(true);
        } catch (err) {
            alert("There was an error updating the movie: " + err);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Update Movie</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter movie ID"
                    value={movieId}
                    onChange={(e) => setMovieId(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter movie title"
                    name="title"
                    value={movieDetails.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter movie price"
                    name="price"
                    value={movieDetails.price}
                    onChange={handleInputChange}
                />
                <textarea
                    className="form-control mb-2"
                    placeholder="Enter movie description"
                    name="description"
                    value={movieDetails.description}
                    onChange={handleInputChange}
                ></textarea>
            </div>
            <button className="btn btn-primary" onClick={updateMovie}>
                Update Movie
            </button>
            {isUpdated && <p className="text-success mt-3">Movie updated successfully!</p>}
        </div>
    );
};

export default UpdateMovie;