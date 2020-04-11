'use strict'

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
  const login = await Factory.model('App/Models/User').create()
  const user = await Factory.model('App/Models/User').create()

  const response = await client.get(`api/v1/user/${user.id}`).loginVia(login).end()

  response.assertJSON(user.toJSON())
})

test('listagem de usuário', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()
  await Factory.model('App/Models/User').createMany(3)

  const response = await client.get('api/v1/user').loginVia(login).end()

  const { body } = response

  assert.isAtLeast(body.length, 3)
})

test('cadastro de usuário', async ({ assert, client }) => {
  const email = 'newuser@email.com';

  const login = await Factory.model('App/Models/User').create()
  const payload = await Factory.model('App/Models/User').make({ email })

  const response = await client
    .post('api/v1/user')
    .send(payload.toJSON())
    .loginVia(login)
    .end()

  const { body } = response
  const { password, generatedPassword } = body

  const user = await User.findBy('email', email)

  response.assertStatus(201)
  assert.exists(user)
  assert.notExists(password)
  assert.notExists(generatedPassword)
})

test('envio de email para o usuário cadastrado', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()
  const payload = await Factory.model('App/Models/User').make()

  await client
    .post('api/v1/user')
    .send(payload.toObject())
    .loginVia(login)
    .end()

  const recentEmail = Mail.pullRecent()
  assert.equal(recentEmail.message.to[0].address, payload.email)
})

test('edição de usuário', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()
  await Factory.model('App/Models/User').create({
    active: true
  })

  const payload = {
    username: 'newusername',
    email: 'newusername@email.com',
    nomeCompleto: 'New User Full Name',
    apelido: 'newnickname',
    telefone: '1234567890',
    rg: '12345678',
    cpf: '12345678901',
    cep: '12345678',
    estado: 'MG',
    cidade: 'Belo Horizonte',
    bairro: 'Funcionários',
    endereco: 'Pça da Liberdade',
    numero: 123,
    complemento: 'ABC 123',
    peso: 75.4,
    altura: 184,
    dataNasc: new Date('1994-07-20').toISOString(),
    nomeResponsavel: 'New Emergency Name',
    emailResponsavel: 'newemergencyemail@email.com',
    telefoneResponsavel: '32165489780',
    grauParentescoResponsavel: 'Pai',
    planoSaude: 'Amil',
    sexo: 'NewSex',
    active: false
  }

  const response = await client.put('api/v1/user/1').send(payload).loginVia(login).end()

  response.assertStatus(200)

  const user = await User.find(1)

  assert.equal(payload.username, user.username)
  assert.equal(payload.email, user.email)
  assert.equal(payload.nomeCompleto, user.nomeCompleto)
  assert.equal(payload.apelido, user.apelido)
  assert.equal(payload.telefone, user.telefone)
  assert.equal(payload.rg, user.rg)
  assert.equal(payload.cpf, user.cpf)
  assert.equal(payload.cep, user.cep)
  assert.equal(payload.estado, user.estado)
  assert.equal(payload.cidade, user.cidade)
  assert.equal(payload.bairro, user.bairro)
  assert.equal(payload.endereco, user.endereco)
  assert.equal(payload.numero, user.numero)
  assert.equal(payload.complemento, user.complemento)
  assert.equal(payload.peso, user.peso)
  assert.equal(payload.altura, user.altura)
  assert.equal(payload.dataNasc, new Date(user.dataNasc).toISOString())
  assert.equal(payload.nomeResponsavel, user.nomeResponsavel)
  assert.equal(payload.emailResponsavel, user.emailResponsavel)
  assert.equal(payload.telefoneResponsavel, user.telefoneResponsavel)
  assert.equal(payload.grauParentescoResponsavel, user.grauParentescoResponsavel)
  assert.equal(payload.planoSaude, user.planoSaude)
  assert.equal(payload.sexo, user.sexo)

  // a edição não deve alterar o status
  assert.notEqual(payload.active, user.active)
})

test('remoção de usuário', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()
  await Factory.model('App/Models/User').create()

  const response = await client.delete('api/v1/user/1').loginVia(login).end()
  const user = await User.find(1)

  response.assertStatus(200)

  assert.exists(user)
  assert.isFalse(Boolean(user.active))
})

test('reativação de usuário', async ({ assert, client }) => {
  const login = await Factory.model('App/Models/User').create()
  await Factory.model('App/Models/User').create({
    active: false
  })

  const response = await client.post('api/v1/user/restore/1').loginVia(login).end()

  const user = await User.find(1)

  response.assertStatus(200)

  assert.exists(user)
  assert.isTrue(Boolean(user.active))
})

test('alteração de senha', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    password: 'OLDPASSWORD'
  })

  const response = await client
    .post('api/v1/user/1/change-password')
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
