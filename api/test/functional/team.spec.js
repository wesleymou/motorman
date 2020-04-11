'use strict'

const { test, trait } = use('Test/Suite')('Team')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

const Database = use('Database')
const UserModel = require('../../app/Models/User')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('../../app/Models/Team')} */
const Team = use('App/Models/Team')

/** @type {typeof import('../../app/Models/User')} */
const User = use('App/Models/User')

/** @type {typeof import('../../app/Models/Group')} */
const Group = use('App/Models/Group')

test('cadastro de times', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()

  const data = await Factory.model('App/Models/Team').make()

  const response = await client
    .post('api/v1/team')
    .send({
      name: data.name,
      description: data.description,
    })
    .loginVia(login)
    .end()

  const team = await Database.from('teams').where({
    name: data.name,
    description: data.description,
  })

  response.assertStatus(201)
  assert.exists(team)
})

test('detalhe do time', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()

  const teamFactory = await Factory.model('App/Models/Team').create()
  const userFactory = await Factory.model('App/Models/User').create()
  const groupFactory = await Factory.model('App/Models/Group').create()
  const permissionFactory = await Factory.model('App/Models/Permission').create()

  await groupFactory.permissions().attach(permissionFactory.id)
  await Database.insert({
    user_id: userFactory.id,
    team_id: teamFactory.id,
    group_id: groupFactory.id,
  }).into('user_roles')

  const response = await client.get(`api/v1/team/${teamFactory.id}`).loginVia(login).end()

  response.assertStatus(200)
  assert.containsAllDeepKeys(response.body, {
    ...teamFactory.toJSON(),
    groups: [
      {
        ...groupFactory.toJSON(),
        permissions: [permissionFactory.toJSON()],
        users: [userFactory.toJSON()],
      },
    ],
  })
})

test('listagem de times', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()

  await Factory.model('App/Models/Team').createMany(5)

  const response = await client.get('api/v1/team/').loginVia(login).end()

  const { body } = response

  response.assertStatus(200)
  assert.isAtLeast(body.length, 5)
})

test('edicao de times', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()

  const team = await Factory.model('App/Models/Team').create()
  const newData = {
    name: 'novo nome',
    description: 'nova descricao',
  }

  const response = await client
    .put(`/api/v1/team/${team.id}`)
    .send(newData)
    .loginVia(login)
    .end()

  await team.reload()

  response.assertStatus(200)
  assert.containsAllDeepKeys(team, newData)
})

test('desativacao de times', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()

  const team = await Factory.model('App/Models/Team').create()

  const response = await client.delete(`/api/v1/team/${team.id}`).loginVia(login).end()

  const teamVerify = await Team.find(team.id)

  response.assertStatus(200)
  assert.equal(teamVerify.active, false)
})

test('associacao usuario a um time', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()

  const teamFactory = await Factory.model('App/Models/Team').create()
  const userFactory = await Factory.model('App/Models/User').create()
  const groupFactory = await Factory.model('App/Models/Group').create()
  const permissionFactory = await Factory.model('App/Models/Permission').create()

  await groupFactory.permissions().attach(permissionFactory.id)
  await Database.insert({
    user_id: userFactory.id,
    team_id: teamFactory.id,
    group_id: groupFactory.id,
  }).into('user_roles')

  const response = await client
    .post(`/api/v1/team/enroll/${teamFactory.id}`)
    .send({
      user_id: userFactory.id,
      group_name: groupFactory.name,
    })
    .loginVia(login)
    .end()

  const team = await Team.query()
    .with('groups', (builder) => {
      builder.with('permissions')
      builder.with('users')
    })
    .where('id', teamFactory.id)
    .first()

  response.assertStatus(204)
  assert.containsAllDeepKeys(team.toJSON(), {
    ...teamFactory.toJSON(),
    groups: [
      {
        ...groupFactory.toJSON(),
        permissions: [permissionFactory.toJSON()],
        users: [userFactory.toJSON()],
      },
    ],
  })
})

test('remover usuario de um time', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()

  const teamFactory = await Factory.model('App/Models/Team').create()
  const userFactory = await Factory.model('App/Models/User').create()
  const groupFactory = await Factory.model('App/Models/Group').create()
  const permissionFactory = await Factory.model('App/Models/Permission').create()

  await groupFactory.permissions().attach(permissionFactory.id)
  await Database.insert({
    user_id: userFactory.id,
    team_id: teamFactory.id,
    group_id: groupFactory.id,
  }).into('user_roles')

  const response = await client
    .post(`/api/v1/team/enroll/${teamFactory.id}`)
    .send({
      user_id: userFactory.id,
      group_name: groupFactory.name,
    })
    .loginVia(login)
    .end()

  const team = await Team.query()
    .with('groups', (builder) => {
      builder.with('permissions')
      builder.with('users')
    })
    .where('id', teamFactory.id)
    .first()

  response.assertStatus(204)
  assert.notDeepInclude(team.toJSON(), userFactory.toJSON())
  assert.deepInclude(team.toJSON(), teamFactory.toJSON())
})
