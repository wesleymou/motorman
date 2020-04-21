/** @typedef {typeof AdonisType.Migration.Table} Table */

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema {
  up() {
    this.create('roles', (table) => {
      table.increments()

      table.string('name', 80).notNullable().unique()
      table.string('description')

      table.timestamps(/* useTimestamps: */ false, /* defaultToNow: */ true)
    })
  }

  down() {
    this.drop('roles')
  }
}

module.exports = RoleSchema
