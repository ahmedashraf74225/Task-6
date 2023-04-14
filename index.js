const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(express.json());

let pool= mysql.createPool({
    connectionLimit :10,
    host :"localhost",
    user:"root",
    password:"",
    database :"movies_database"

});

  app.get('/cinema/movies', (req, res) => {
    pool.query('SELECT * FROM thecamp_cinema', (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving movies');
      } else {
        res.send(results);
      }
    });
  });

  
app.post('/cinema/movies', (req, res) => {
  const { movie_name, movie_length, movie_director } = req.body;
  pool.query('INSERT INTO thecamp_cinema (movie_name, movie_length, movie_director) VALUES (?, ?, ?)', [movie_name, movie_length, movie_director], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error adding movie , ro7 4of el mo4kela feeeeen xD');
    } else {
      res.send('Movie added Gad3 & mo7tram <333 ');
    }
  });
});

  
  app.put('/cinema/movies/:id', (req, res) => {
    const { movie_name, movie_length, movie_director } = req.body;
    const id = req.params.id;
    pool.query('UPDATE thecamp_cinema SET movie_name = ?, movie_length = ?, movie_director = ? WHERE id = ?', [movie_name, movie_length, movie_director, id], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating movie');
      } else {
        res.send('Movie updated successfully');
      }
    });
  });
  
  app.delete('/cinema/movies/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM thecamp_cinema WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting movie');
      } else {
        res.send('Movie deleted successfully');
      }
    });
  });
  
  // Define route for adding reviews
  app.post('/cinema/movies/ratings', (req, res) => {
    const { movie_id, movie_review, date } = req.body;
    pool.query('INSERT INTO thecamp_movies_ratings (movie_id, movie_review, date) VALUES (?, ?, ?)', [movie_id, movie_review, date], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error adding review');
      } else {
        res.send('Review added successfully');
      }
    });
  });

  
app.listen(5000, () => {
    console.log("Server is runing on PORT 5000...");
});
