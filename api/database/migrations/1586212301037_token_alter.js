'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokenAlterSchema extends Schema {
  up() {
    this.table('tokens', (table) => {
      // alter table
      table.datetime('expires_at')
    })
  }

  down() {
    this.table('tokens', (table) => {
      // reverse alternations
      table.dropColumns('expires_at')
    })
  }
}

module.exports = TokenAlterSchema
