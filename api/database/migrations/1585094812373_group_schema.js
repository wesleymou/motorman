/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupSchema extends Schema {
  up() {
    this.create('groups', (table) => {
      table.increments()
      table.string('name', 80)
      table.string('description', 255)
      table.timestamps(/* useTimestamps: */ false, /* defaultToNow: */ true)
    })
  }

  down() {
    this.drop('groups')
  }
}

module.exports = GroupSchema
