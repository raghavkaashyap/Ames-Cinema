import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ username, userRole }) => {
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        async function fetchProfilePicture() {
            console.log("Fetching profile picture for Sidebar...");
            try {
                const response = await fetch(`http://localhost:8081/users/profile_picture/${encodeURIComponent(username)}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setProfilePicture(`http://localhost:8081${data.picture}`);
                } else {
                    console.error("Failed to fetch profile picture: ", response.statusText);
                }
            } catch (err) {
                console.error("Failed to fetch profile picture: ", err);
            }
        }
        fetchProfilePicture();
    }, [username]);

    return (
        <div className="d-flex flex-column vh-100 p-3 bg-dark text-light" style={{ width: '250px' }}>
            <h2 className="text-center">Navigation</h2>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                    <Link to="/movies" className="nav-link">View All Movies</Link>
                </li>
                <li className="nav-item">
                    <Link to="/search-movies" className="nav-link">Search Movies</Link>
                </li>
                {userRole === "admin" && (
                    <>
                        <li className="nav-item">
                            <Link to="/add-movie" className="nav-link">Add Movie</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/delete-movie" className="nav-link">Delete Movie</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/update-movie" className="nav-link">Update Movie</Link>
                        </li>
                    </>
                )}
            </ul>
            {/* Profile Picture Section */}
            <div className="profile-picture mt-3 text-center">
                {profilePicture && <img src={profilePicture} style={{ width: "150px", height: "auto" }} alt="User Profile" />}
                <p className="mt-2">{username}</p>
            </div>
        </div>
    );
};

export default Sidebar;