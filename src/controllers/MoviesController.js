const knex = require("../database/knex")

class MoviesController {
  async create(request, response) {
    const { title, description, tags, rating } = request.body
    const user_id  = request.user.id

    const [movie_id] = await knex("movies").insert({
      user_id,
      title,
      description,
      rating,
    })

    const tagsInsert = tags.map(name => {
      return {
        movie_id,
        name,
        user_id
      }
    })

    await knex("tags").insert(tagsInsert)

    return response.json({message: "Filme cadastrado com sucesso!"})
  }

  async show(request, response) {
    const { id } = request.params

    const movie = await knex("movies").where({id}).first()
    const tags = await knex("tags").where({movie_id: id}).orderBy("name")

    response.json({
      ...movie,
      tags
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("movies").where({id}).delete()

    return response.json({message: "Filme excluído."})
  }

  async index(request, response) {
    const { title, tags } = request.query
    const user_id = request.user.id

    let movies

    if(tags) {
      const filterTags = tags.split(",").map(tag => tag.trim())
     
      movies = await knex("tags")
        .select([
          "movies.id",
          "movies.title",
          "movies.user_id"
        ])
        .where("movies.user_id", user_id)
        .whereLike("movies.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movies", "movie_id", "tags.movie_id")

    } else {
      movies = await knex("movies")
        .where({user_id})
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("tags").where({user_id})

    const moviesWithTags = movies.map(movie => {
      const movieTags = userTags.filter(tag => tag.movie_id === movie.id)

      return {
        ...movie,
        tags: movieTags
      }
    })

    return response.json(moviesWithTags)
  }
}

module.exports = MoviesController