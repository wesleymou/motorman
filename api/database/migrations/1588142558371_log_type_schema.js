/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class LogTypeSchema extends Schema {
  up() {
    this.create('log_types', (
      /** @type {import('knex/types').TableBuilder | import('knex/types').AlterTableBuilder} */ table
    ) => {
      table.increments()

      table.string('name', 80).unique()
      table.string('description', 255)
      table.integer('points')

      table.timestamps()
    })

    // Create default admin user
    this.schedule(async (trx) => {
      await Database.table('log_types')
        .transacting(trx)
        .insert([
          {
            name: 'Partida',
          },
        ])

      await Database.table('log_types')
        .transacting(trx)
        .insert([
          {
            name: 'Aula',
          },
        ])

      await Database.table('log_types')
        .transacting(trx)
        .insert([
          {
            name: 'Contusão',
          },
        ])
    })
  }

  down() {
    this.drop('log_types')
  }
}

module.exports = LogTypeSchema
