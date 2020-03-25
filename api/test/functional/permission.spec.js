'use strict'

const { test, trait } = use('Test/Suite')('Permission')


trait('Test/ApiClient')
trait('DatabaseTransactions')

const Factory = use('Factory')

/** @type {typeof import('../../Models/Group')} */
const Groups = use('App/Models/Group')

/** @type {typeof import('../../Models/Permission')} */
const Permissions = use('App/Models/Permission')


test('Cria um novo grupo de permissoes', async ({ assert, client }) => {

  const temp = {
    name: 'criar usuarios',
    description: 'Permite cadastrar',
    permission_id: [
      1,
      2,
      3
    ]
  }

  const response = await client
    .post('api/v1/permission')
    .send(temp)
    .end()

  response.assertStatus(501)
})
