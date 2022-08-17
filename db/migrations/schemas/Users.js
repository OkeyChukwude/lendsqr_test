const userSchema = (table) => {
  table.uuid('id').primary()
  table.string('firstname').notNullable()
  table.string('lastname').notNullable()
  table.string('email').unique().notNullable()
  table.string('phone')
  table.string('passwordHash').notNullable()
  table.string('pinHash').notNullable()
  table.timestamps(true, true)
}

module.exports = userSchema;