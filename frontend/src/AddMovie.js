import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const AddMovie = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addMovie();
        setTitle('');
        setPrice('');
        setDescription('');
        setImage(null);
        setPreview(null);
    };

    const addMovie = async () => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("image", image);

            const response = await fetch("http://localhost:8081/movies", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Error: " + errorData.error);
            } else {
                const successMessage = await response.json();
                alert(successMessage.message);
            }
        } catch (err) {
            alert("An error occurred: " + err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Add New Movie</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Movie Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Movie Image</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-3"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Movie
                </button>
            </form>
        </div>
    );
};

export default AddMovie;