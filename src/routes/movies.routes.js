const { Router } = require("express")
const movieRoutes = Router()
const MoviesController = require("../controllers/MoviesController")
const moviesController = new MoviesController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

movieRoutes.use(ensureAuthenticated)

movieRoutes.post("/", moviesController.create)
movieRoutes.get("/:id", moviesController.show)
movieRoutes.delete("/:id", moviesController.delete)
movieRoutes.get("/", moviesController.index)

module.exports = movieRoutes