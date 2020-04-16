'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('App/Models/Role')

class RoleSeeder {
  async run() {
    await Role.createMany([
      {
        name: 'Treinador',
        description: 'Treina e gerencia as atividades do time'
      },
      {
        name: 'Jogador',
        description: 'Participa dos jogos e treinos'
      },
      {
        name: 'Auxiliar',
        description: 'Auxilia nas tarefas do time'
      }
    ])
  }
}

module.exports = RoleSeeder
