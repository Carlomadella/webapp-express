// importo la variabile connection
const connection = require('../data/db.js');

// metodo index del controller
const index = (req, res) => {
  // eseguo la query
  connection.query("SELECT * FROM movies", (err, moviesResults) => {
    // se la query mi dà errore
    if (err) return res.status(500).json({ error: "Database query failed: " + err });

    res.json(moviesResults);
  });
};

const show = (req, res) => {
    const { id } = req.params;
    
    // creo la query per il recupero del singolo post
    const movieSql = "SELECT * FROM movies WHERE id = ?";
    
    // query per il recupero delle recensione del libro selezionato
    const reviewSql = `
        SELECT *
        FROM reviews
        JOIN movies
        WHERE movie_id = ?
    `;
    
    // eseguo la query
    connection.query(movieSql, [id], (err, movieResult) => {
        if(err) return res.status(500).json({error: "Database query failed: "+err});
        
        // controlliamo che il movie cercato esista
        if(movieResult.length === 0) return res.status(404).json({error: "movie not found"})
        
        // recuperiamo il singolo movie dall'array risultato
        const movie = movieResult[0];
        
        // BONUS
        // eseguo la seconda query per recuperare i review del movie trovato
        connection.query(reviewSql, [id], (err, reviewsResult) => {
            if(err) return res.status(500).json({error: "Database query failed: " + err});
            
            // nell'oggetto movie vado a creare una nuova proprietà a cui assegnare l'array recuperato
            movie.reviews = reviewsResult;
            
            res.json(movie);
        })
    })
}

// metodo delete del controller
const destroy = (req,res) => {
    
// recupero l'id del movie da cancellare
    const id = req.params.id;

// stabilisco la connessione per fare la query
    connection.query("DELETE FROM movies WHERE id = ?", [id], (err) => {
// controllo che err sia pieno
        if(err) return res.status(500).json({error: "Database query failed: "+err});

        res.sendStatus(204);
    })
}

module.exports = {
    index,
    show,
    destroy
}