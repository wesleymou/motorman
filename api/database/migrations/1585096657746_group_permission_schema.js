'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupPermissionSchema extends Schema {
  up() {
    this.create('group_permission', (table) => {
      table.increments()

      table.integer('permission_id')
        .unsigned()
        .references('permissions.id')
        .onDelete('cascade')

      table.integer('group_id')
        .unsigned()
        .references('groups.id')
        .onDelete('cascade')

      table.index([
        'permission_id',
        'group_id'
      ])

      table.timestamps()
    })
  }

  down() {
    this.drop('group_permission')
  }
}

module.exports = GroupPermissionSchema
