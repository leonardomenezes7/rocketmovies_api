exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id")
  table.string("name", 255)
  table.string("email", 255)
  table.string("password")
  table.string("avatar").nullable()
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
}) 

exports.down = knex => knex.schema.dropTable("users")
