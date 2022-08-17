const accountSchema = (table) => {
  table.uuid('id').primary()
  table.string('acctNumber').notNullable().unique()
  table.integer('balance').notNullable()
  table.uuid('userId').notNullable()
  table.timestamps(true, true)

  table.foreign('userId').references('users.id');
}

module.exports = accountSchema;