'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database')

const Permission = use('App/Models/Permission')
const Group = use('App/Models/Group')
const User = use('App/Models/User')
const Hash = use('Hash')

class DatabaseSeeder {
  async run() {
    Factory.model('App/Models/User').createMany(10)
  }
}

module.exports = DatabaseSeeder
