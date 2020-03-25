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

    const permissions = [
      await Permission.create({
        name: 'cadastrar usuarios',
        description: 'Permite cadastrar novos usuários'
      }),
      await Permission.create({
        name: 'editar usuarios',
        description: 'Permite editar os usuários'
      }),
      await Permission.create({
        name: 'listar usuarios',
        description: 'Permite listar os usuários'
      }),
      await Group.create({
        name: 'administrador',
        description: 'Tem acesso e controle a todas as funções do sistema'
      })
    ]
    await group.permissions().attach(permissions)
  }
}

module.exports = DatabaseSeeder
