'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupPermissionSchema extends Schema {
  up () {
    this.create('group_permission', (table) => {
      table.increments()
      table.integer('permission_id').unsigned().references('permissions.id').onDelete('cascade').index('permission_id')
      table.integer('group_id').unsigned().references('groups.id').onDelete('cascade').index('group_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('group_permission')
  }
}

module.exports = GroupPermissionSchema
