// importo express
const express = require('express');

// inizializzo la variabile app con il metodo express()
const app = express();

// definisco il numero di porta su cui il server deve rimanere in ascolto
const port = process.env.SERVER_PORT || 3000;

// importo il router
const movieRouter = require('./routers/movieRouter')

// importo i custom middlewares
const errorsHandler = require("./middlewares/errorsHandler")
const notFound = require("./middlewares/notFound")

// uso il middleware per gli asset statici
app.use(express.static('public'));

// uso il middleware per il parsing del body delle richieste
app.use(express.json());

// definisco un entry point
app.get("/", (req, res) => {
    res.send('Movies API server');
});

// utilizzo movieRouter
app.use('/api/movies', movieRouter)

// Error handler middleware
app.use(errorsHandler)

// Not found middleware
app.use(notFound)

// dico al server di rimanere in ascolto sulla porta 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});