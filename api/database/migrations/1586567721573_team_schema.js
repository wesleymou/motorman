'use strict'
const AdonisType = require('../../types')
/** @typedef {typeof AdonisType.Migration.Table} Table*/


/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeamSchema extends Schema {
  up() {
    this.table('teams', (/** @type {Table} */ table) => {
      table.boolean('active').notNullable().defaultTo(true)
    })
  }

  down() {
    this.table('teams', (table) => {
      table.dropColumns('active')
    })
  }
}

module.exports = TeamSchema
