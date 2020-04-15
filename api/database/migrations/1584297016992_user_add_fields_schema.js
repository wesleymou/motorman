'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')
const Hash = use('Hash')

class UserAddFieldsSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.string('avatar', 512)
      table.string('fullName')
      table.string('nickname')
      table.string('phone')
      table.string('rg', 20)
      table.string('cpf', 11)
      table.string('cep', 8)
      table.string('state')
      table.string('city')
      table.string('neighborhood')
      table.string('street')
      table.integer('buildingNumber').defaultTo(0)
      table.string('complement')
      table.decimal('weight')
      table.integer('height')
      table.datetime('dob')
      table.string('emergencyName')
      table.string('emergencyEmail')
      table.string('emergencyPhone')
      table.string('emergencyConsanguinity')
      table.string('healthInsurance')
      table.string('sex')
      table.boolean('active').notNullable().defaultTo(true)
    })
  }

  down() {
    this.table('users', (table) => {
      table.dropColumns(
        'avatar',
        'fullName',
        'nickname',
        'phone',
        'rg',
        'cpf',
        'cep',
        'state',
        'city',
        'neighborhood',
        'street',
        'buildingNumber',
        'complement',
        'weight',
        'height',
        'dob',
        'emergencyName',
        'emergencyEmail',
        'emergencyPhone',
        'emergencyConsanguinity',
        'healthInsurance',
        'sex',
        'active'
      )
    })
  }
}

module.exports = UserAddFieldsSchema
