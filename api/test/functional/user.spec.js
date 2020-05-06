const Suite = use('Test/Suite')('User')

const { test, trait, beforeEach, afterEach } = Suite

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

const Hash = use('Hash')
const Mail = use('Mail')
const Factory = use('Factory')
const User = use('App/Models/User')

beforeEach(() => {
  Mail.fake()
})

afterEach(() => {
  Mail.restore()
})

test('detalhes do usuário', async ({ assert, client }) => {
  const login = await User.find(1)
  const user = await Factory.model('App/Models/User').create()

  const response = await client.get(`api/v1/user/${user.id}`).loginVia(login).end()
  const { body } = response

  response.assertJSONSubset(user.toJSON())
  assert.exists(body.roles)
  assert.isDefined(body.group)
})

test('listagem de usuário', async ({ assert, client }) => {
  const login = await User.find(1)
  await Factory.model('App/Models/User').createMany(3)

  const response = await client.get('api/v1/user').loginVia(login).end()

  const { body } = response

  assert.isAtLeast(body.length, 3)
})

test('cadastro de usuário', async ({ assert, client }) => {
  const email = 'newuser@email.com'

  const login = await User.find(1)
  const payload = await Factory.model('App/Models/User').make({ email })

  const response = await client.post('api/v1/user').send(payload.toJSON()).loginVia(login).end()

  const { body } = response
  const { password, generatedPassword } = body

  const user = await User.findBy('email', email)

  response.assertStatus(201)
  assert.exists(user)
  assert.notExists(password)
  assert.notExists(generatedPassword)
})

test('envio de email para o usuário cadastrado', async ({ assert, client }) => {
  const login = await User.find(1)
  const payload = await Factory.model('App/Models/User').make()

  await client.post('api/v1/user').send(payload.toObject()).loginVia(login).end()

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, payload.email)
})

test('edição de usuário', async ({ assert, client }) => {
  const login = await User.find(1)
  const user = await Factory.model('App/Models/User').create({
    active: true,
  })

  const payload = {
    username: 'newusername',
    email: 'newusername@email.com',
    fullName: 'New User Full Name',
    nickname: 'newnickname',
    phone: '1234567890',
    rg: '12345678',
    cpf: '12345678901',
    cep: '12345678',
    state: 'MG',
    city: 'Belo Horizonte',
    neighborhood: 'Funcionários',
    street: 'Pça da Liberdade',
    buildingNumber: 123,
    complement: 'ABC 123',
    weight: 75.4,
    height: 184,
    dob: new Date('1994-07-20').toISOString(),
    emergencyName: 'New Emergency Name',
    emergencyEmail: 'newemergencyemail@email.com',
    emergencyPhone: '32165489780',
    emergencyConsanguinity: 'Pai',
    healthInsurance: 'Amil',
    sex: 'NewSex',
    active: false,
  }

  const response = await client.put(`api/v1/user/${user.id}`).send(payload).loginVia(login).end()

  response.assertStatus(200)

  await user.reload()

  assert.equal(payload.username, user.username)
  assert.equal(payload.email, user.email)
  assert.equal(payload.fullName, user.fullName)
  assert.equal(payload.nickname, user.nickname)
  assert.equal(payload.phone, user.phone)
  assert.equal(payload.rg, user.rg)
  assert.equal(payload.cpf, user.cpf)
  assert.equal(payload.cep, user.cep)
  assert.equal(payload.state, user.state)
  assert.equal(payload.city, user.city)
  assert.equal(payload.neighborhood, user.neighborhood)
  assert.equal(payload.street, user.street)
  assert.equal(payload.buildingNumber, user.buildingNumber)
  assert.equal(payload.complement, user.complement)
  assert.equal(payload.weight, user.weight)
  assert.equal(payload.height, user.height)
  assert.equal(payload.dob, new Date(user.dob).toISOString())
  assert.equal(payload.emergencyName, user.emergencyName)
  assert.equal(payload.emergencyEmail, user.emergencyEmail)
  assert.equal(payload.emergencyPhone, user.emergencyPhone)
  assert.equal(payload.emergencyConsanguinity, user.emergencyConsanguinity)
  assert.equal(payload.healthInsurance, user.healthInsurance)
  assert.equal(payload.sex, user.sex)

  // a edição não deve alterar o status
  assert.notEqual(payload.active, user.active)
})

test('remoção de usuário', async ({ assert, client }) => {
  const login = await User.find(1)
  await Factory.model('App/Models/User').create()

  const response = await client.delete('api/v1/user/1').loginVia(login).end()
  const user = await User.find(1)

  response.assertStatus(200)

  assert.exists(user)
  assert.isNotOk(user.active)
})

test('reativação de usuário', async ({ assert, client }) => {
  const login = await User.find(1)

  const user = await Factory.model('App/Models/User').create({
    active: false,
  })

  const response = await client.post(`api/v1/user/restore/${user.id}`).loginVia(login).end()

  await user.reload()

  response.assertStatus(200)
  assert.exists(user)
  assert.isOk(user.active)
})

test('alteração de senha', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    password: 'OLDPASSWORD',
  })

  const response = await client
    .post(`api/v1/user/${user.id}/change-password`)
    .send({
      currentPassword: 'OLDPASSWORD',
      password: 'NEWPASSWORD',
    })
    .loginVia(user)
    .end()

  await user.reload()

  const { body } = response

  const matches = await Hash.verify('NEWPASSWORD', user.password)

  response.assertStatus(200)
  assert.exists(body.token)
  assert.isTrue(matches)
})
