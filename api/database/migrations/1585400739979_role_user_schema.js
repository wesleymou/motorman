'use strict'

const AdonisType = require('../../types')
/** @typedef {typeof AdonisType.Migration.Table} Table*/

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRoleSchema extends Schema {
  up() {
    this.create('role_user', (/** @type {Table} */ table) => {
      table.increments()

      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('cascade')
      table.integer('role_id').notNullable().unsigned().references('roles.id').onDelete('cascade')
      table.integer('team_id').notNullable().unsigned().references('teams.id').onDelete('cascade')
      table.integer('group_id').notNullable().unsigned().references('groups.id').onDelete('cascade')

      table.index([
        'user_id',
        'team_id'
      ])

      table.timestamps(
        /* useTimestamps: */ false,
        /* defaultToNow: */ true
      )
    })
  }

  down() {
    this.drop('role_user')
  }
}

module.exports = UserRoleSchema
