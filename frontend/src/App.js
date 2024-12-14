import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./SideBar"; 
import Movies from "./Movies"; 
import SearchMovies from "./SearchMovies"; 
import AddMovie from "./AddMovie"; 
import UpdateMovie from "./UpdateMovie"; 
import DeleteMovie from "./DeleteMovie"; 
import Authentication from "./login"; 
import About from "./About.js"

function App() {
  const [movies, setMovies] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      {userRole ? (
        <Router>
          <div className="d-flex">
            {userRole && <Sidebar username={username} userRole={userRole} />}
            <div className="flex-grow-1 p-3">
              <h1 className="text-center">Ames Cinema</h1>
              <Routes>
                <Route path="/" element={<div>Welcome to AMES CINEMA</div>} />
                <Route path="/movies" element={<Movies movies={movies} setMovies={setMovies} />} />
                <Route path="/search-movies" element={<SearchMovies movies={movies} setMovies={setMovies} />} />
                <Route path="/about" element={<About />} />
                {userRole === "admin" && (
                  <>
                    <Route path="/add-movie" element={<AddMovie movies={movies} setMovies={setMovies} />} />
                    <Route path="/update-movie" element={<UpdateMovie movies={movies} setMovies={setMovies} />} />
                    <Route path="/delete-movie" element={<DeleteMovie movies={movies} setMovies={setMovies} />} />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </Router>
      ) : (
        <Authentication 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
          setUserRole={setUserRole} 
        />
      )}
    </div>
  );
}

export default App;
