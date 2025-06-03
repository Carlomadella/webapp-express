// importo express
const express = require("express")

// definisco la var router
const router = express.Router()

// importo il movieController
const movieController = require("../controllers/movieController")

// definisco le rotte

// index
router.get('/', movieController.index)

// show
router.get('/:id', movieController.show)

// destroy
router.get('/:id', movieController.destroy)

module.exports = router;