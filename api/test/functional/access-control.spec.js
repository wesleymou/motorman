const { test, trait } = use('Test/Suite')('Access Control Middleware')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

const User = use('App/Models/User')
// const UserTeam = use('App/Models/UserTeam')
const Factory = use('Factory')

test('acesso de administrador', async ({ client }) => {
  const admin = await User.find(1)
  const response = await client.get('/api/v1/user').loginVia(admin).end()
  response.assertStatus(200)
})

test('acesso a nível de aplicação', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const group = await Factory.model('App/Models/Group').create()
  const permission = await Factory.model('App/Models/Permission').create({
    name: 'application/users/manage',
  })

  await group.permissions().save(permission)
  await user.group().associate(group)

  const response = await client.get('/api/v1/user').loginVia(user).end()

  response.assertStatus(200)
})

// test('acesso a nível de time', async ({ client }) => {
//   const user = await Factory.model('App/Models/User').create()
//   const member = await Factory.model('App/Models/User').create()
//   const team = await Factory.model('App/Models/Team').create()
//   const group = await Factory.model('App/Models/Group').create()
//   const permission = await Factory.model('App/Models/Permission').create({
//     name: 'team/members/manage',
//   })

//   await group.permissions().save(permission)

//   await UserTeam.create({
//     user_id: user.id,
//     team_id: team.id,
//     group_id: group.id,
//   })

//   const response = await client
//     .post(`/api/v1/team/${team.id}/member/${member.id}`)
//     .send({ group_id: group.id })
//     .loginVia(user)
//     .end()

//   response.assertStatus(200)
// })
