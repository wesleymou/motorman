'use strict'

const { test, trait } = use('Test/Suite')('User')

trait('Test/ApiClient')
trait('DatabaseTransactions')

const Hash = use('Hash')
const Factory = use('Factory')
const User = use('App/Models/User')

test('detalhes do usuário', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client.get(`api/v1/user/${user.id}`).end()

  response.assertJSON(user.toJSON())
})

test('listagem de usuário', async ({ assert, client }) => {
  await Factory.model('App/Models/User').createMany(3)

  const response = await client.get('api/v1/user').end()

  const { body } = response

  assert.isAtLeast(body.length, 3)
})

test('cadastro de usuário', async ({ assert, client }) => {
  const payload = await Factory.model('App/Models/User').make()

  const response = await client
    .post('api/v1/user')
    .send(payload.toJSON())
    .end()

  const { body } = response
  const { id, generatedPassword } = body
  
  const user = await User.find(id)

  response.assertStatus(201)

  assert.exists(user)
  assert.exists(generatedPassword)
})

test('geração de senha para novos usuários', async ({ assert, client }) => {
  const payload = await Factory.model('App/Models/User').make()

  const response = await client
    .post('api/v1/user')
    .send(payload.toObject())
    .end()

  const { body } = response
  const { id, generatedPassword } = body

  const user = await User.find(id)
  const matches = await Hash.verify(generatedPassword, user.password)

  assert.isTrue(matches)
})

test('edição de usuário', async ({ assert, client }) => {
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

  const response = await client.put('api/v1/user/1').send(payload).end()

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

test('exclusão de usuário', async ({ assert, client }) => {
  await Factory.model('App/Models/User').create()

  const response = await client.delete('api/v1/user/1').end()
  const user = await User.find(1)

  response.assertStatus(200)

  assert.exists(user)
  assert.isFalse(Boolean(user.active))
})
