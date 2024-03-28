exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("users")
  table.integer("movie_id").references("id").inTable("movies").onDelete("CASCADE")
  table.string("name")
})

exports.down = knex => knex.schema.dropTable("tags")
