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

const PermissionTable = use('App/Models/Permission')
const Group = use('App/Models/Group')
const User = use('App/Models/User')
const Hash = use('Hash')

const Permissions_ = require('../../../Permissoes');

class PermissionSeeder {
  async run() {

    const promisses = Permissions_.map(async (p) => {
      return PermissionTable.create({
        name: p.name,
        description: p.description
      })
    })
    let permissionsToDB = await Promise.all(promisses)
    permissionsToDB = permissionsToDB.map(p => p.id)

    const group = await Group.create({
      name: 'administrador',
      description: 'Tem acesso e controle a todas as funções do sistema'
    })

    await group.permissions().attach(permissionsToDB)

    await Factory.model('App/Models/User').create({
      username: 'admin',
      email: 'admin@email.com',
      password: await Hash.make('adminpassword')
    })
  }
}

module.exports = PermissionSeeder
