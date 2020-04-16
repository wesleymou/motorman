'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeamSchema extends Schema {
  up() {
    this.create('teams', (table) => {
      table.increments()
      table.string("name", 80)
      table.string("image")
      table.string("description", 255)
      table.timestamps()
    })
  }

  down() {
    this.drop('teams')
  }
}

module.exports = TeamSchema
