'use strict'

const { test, trait } = use('Test/Suite')('Auth')

// Habilita o simulador de cliente HTTP
trait('Test/ApiClient')
// Trait utilizada para truncar o banco após cada teste
trait('DatabaseTransactions')


// const { before, beforeEach, after, afterEach } = Suite

test('cadastrar usuário', ({ assert, client }) => {
  assert.isTrue(true)
})
