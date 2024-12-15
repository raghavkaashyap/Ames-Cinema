var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
const multer = require("multer");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

const path = require("path");
// MySQL
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "ArcherIsCute13!", //change to your password
    database: "secoms3190",
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

const fs = require("fs");
if (!fs.existsSync("Images")) {
    fs.mkdirSync("Images");
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/Images", express.static("Images")); 

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/movies", (req, res) => {
    try{
        db.query("SELECT * FROM movies", (err, result) => {
        if (err) {
        console.error({error:"Error reading all posts:"+err});
        return res.status(500).send({ error: "Error reading all movies"+err});
        }
        res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred"+err });
        res.status(500).send({ error: "An unexpected error occurred"+err });
    }  
});

app.get("/movies/id_val/:id", (req, res) => {
    try{
        const {id} = req.params;
        db.query("SELECT * FROM movies where movieId like ?", [id], (err, result) => {
            if (err) {
            console.error({error:"Error reading all posts:"+err});
            return res.status(500).send({ error: "Error reading all movies"+err});
            }
            res.status(200).send(result);
        });
    } catch(err){
        console.error({ error: "An unexpected error occurred"+err });
        res.status(500).send({ error: "An unexpected error occurred"+err });
    }
})

app.post("/movies", upload.single("image"), (req, res) => {
    const { movieId, title, price, description } = req.body;
    const randomMovieId = Math.floor(Math.random() * 1000) + 1;    

    if (!req.file) {
        return res.status(400).json({ error: "Image upload is required." });
    }

    const imageUrl = `/Images/${req.file.filename}`; // Path to the uploaded image

    const query = "INSERT INTO movies (movieId, title, price, description, url) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [randomMovieId, title, price, description, imageUrl], (err) => {
        if (err) {
            console.error("Error adding movie:", err);
            return res.status(500).json({ error: "Error adding movie" });
        }
        res.status(201).json({ message: "Movie added successfully.", imageUrl });
    });
});


app.post("/customer/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ error: "Username and password are required." });
    }
    const query = "SELECT role FROM users WHERE username = ? AND password = ?";
    try{
        db.query(query, [username, password], (err, results) => {
            if (err) {
                console.error("Database error during login:", err);
                return res.status(500).send({ error: "An error occurred in Query. Please try again." });
            }
            if (results.length === 0) {
                return res.status(401).send({ error: "Invalid username or password." });
            }

            const { role } = results[0];
            res.status(200).send({role});
        });
    } catch (err) {

        console.error("Error in GET /customer/login", err);
        res.status(500).send({ error: "An unexpected error occurred in Login: " + err.message });
    }

});

app.delete("/movies/:movieId", (req, res) => {
    const { movieId } = req.params;


    const query = "DELETE FROM movies WHERE movieId like ?";
    db.query(query, [movieId], (err) => {
        if (err) {
            console.error("Error deleting movie:", err);
            return res.status(500).json({ error: "Error deleting movie" });
        }
        res.status(200).json({ message: "Movie deleted successfully." });
    });
});

app.get("/timeslots", (req, res) => {
    const timeslots = [
        { movieId: "1234", title: "Oppenheimer", timeSlots: ["12:00 PM", "3:00 PM", "7:00 PM"] },
        { movieId: "A124", title: "The Martian", timeSlots: ["1:00 PM", "4:00 PM", "8:00 PM"] },
        // Add more movies and time slots
    ];
    res.status(200).json(timeslots);
});

app.put("/movies/:id", (req, res) => {
    try {
        const id = req.params.id;
        const { title, price, description } = req.body; 

        if (!title || !price || !description) {
            return res.status(400).send({ error: "All fields (title, price, description) are required" });
        }

        const query = "UPDATE movies SET title = ?, price = ?, description = ? WHERE movieId = ?";

        db.query(query, [title, price, description, id], (err, result) => {
            if (err) {
                console.error("Error updating movie:", err);
                res.status(500).send({ error: "Error updating movie" });
            } else if (result.affectedRows === 0) {
                res.status(404).send({ error: "Movie not found" });
            } else {
                res.status(200).send("Movie updated successfully");
            }
        });
    } catch (err) {
        console.error("Error in UPDATE /movies:", err);
        res.status(500).send({ error: "An unexpected error occurred in UPDATE: " + err.message });
    }
});

app.get("/movies/title", (req, res) => {
    try {
        const { title_name } = req.query;  
        if (!title_name) {
            return res.status(400).send({ error: "Title query parameter is required" });
        }
        const query = "SELECT * FROM movies WHERE LOWER(title) LIKE LOWER(?)";
        const searchValue = `%${title_name}%`; 
        db.query(query, [searchValue], (err, result) => {
            if (err) {
                console.error("Error fetching movies:", err);
                return res.status(500).send({ error: "Error fetching movies" });
            }
            res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred: " + err });
        res.status(500).send({ error: "An unexpected error occurred" });
    }
});