exports.up = knex => knex.schema.createTable("movies", table => {
  table.increments("id")
  table.integer("user_id").references("id").inTable("users")
  table.text("title")
  table.text("description")
  table.integer("rating")
  table.timestamp("created_at").default(knex.fn.now())
}) 


exports.down = knex => knex.schema.dropTable("movies")
