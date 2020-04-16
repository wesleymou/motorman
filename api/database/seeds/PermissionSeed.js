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

class PermissionSeeder {
  async run() {
    const permissions = Permission.createMany([
      {
        name: 'cadastrar usuarios',
        description: 'Permite cadastrar novos usuários'
      },
      {
        name: 'listar usuarios',
        description: 'Permite listar os usuários cadastrados'
      },
      {
        name: 'detalhar usuarios',
        description: 'Permite visualizar detalhes dos usuários cadastrados'
      },
      {
        name: 'editar usuarios',
        description: 'Permite editar informações dos usuários'
      },
      {
        name: 'excluir usuarios',
        description: 'Permite excluir usuários cadastrados'
      },
      {
        name: 'cadastrar times',
        description: 'Permite cadastrar novos times'
      },
      {
        name: 'listar times',
        description: 'Permite ver a lista de times cadastrados'
      },
      {
        name: 'detalhar time',
        description: 'Permite ver detalhes dos times'
      },
      {
        name: 'editar time',
        description: 'Permite editar o time'
      },
      {
        name: 'excluir time',
        description: 'Permite excluir os times cadastrados'
      },
      {
        name: 'gerenciar grupos de permissao',
        description: 'Permite gerenciar os grupos de permissão'
      }
    ])
  }
}

module.exports = PermissionSeeder
