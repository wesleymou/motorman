'use strict'

/*
|--------------------------------------------------------------------------
| TeamSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class TeamSeeder {
  async run() {
    await Factory.model('App/Models/Team').create({
      name: 'Administração',
      description: 'Tem acesso a todas as funções do sistema'
    })

    await Factory.model('App/Models/Team').createMany(3)
  }
}

module.exports = TeamSeeder
