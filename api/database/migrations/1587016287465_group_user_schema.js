'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupUserSchema extends Schema {
  up() {
    this.create('group_user', (table) => {
      table.increments()
      table.integer('group_id').notNullable().unsigned().references('groups.id').onDelete('cascade')
      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('cascade')
      table.timestamps(
        /* useTimestamps: */ false,
        /* defaultToNow: */ true
      )
    })
  }

  down() {
    this.drop('group_user')
  }
}

module.exports = GroupUserSchema
