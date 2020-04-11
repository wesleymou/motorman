'use strict'

/*
|--------------------------------------------------------------------------
| GroupSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class GroupSeeder {
  async run() {
    await Factory.model('App/Models/Group').create({ name: 'Treinador' })
    await Factory.model('App/Models/Group').create({ name: 'Jogador' })
    await Factory.model('App/Models/Group').create({ name: 'Auxiliar' })
  }
}

module.exports = GroupSeeder
