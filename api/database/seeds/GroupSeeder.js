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

const Group = use('App/Models/Group')

class GroupSeeder {
  async run() {
    await Group.createMany([
      {
        name: 'Administradores',
        description: 'Tem acesso a todas as funções do sistema.'
      },
      {
        name: 'Gerentes',
        description: 'Tem acesso a todos os times. Não tem acesso às configurações do sistema.'
      },
      {
        name: 'Usuários',
        description: 'Tem acesso a funções limitadas.'
      }
    ])

  }
}

module.exports = GroupSeeder
