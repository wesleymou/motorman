import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { login } from '../services/auth'
import api from '../services/api'

function LoginPage() {
  const history = useHistory()
  const location = useLocation()
  const emailInputRef = React.createRef()
  const passwordInputRef = React.createRef()

  const handleLogin = async () => {
    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value
    const body = { email, password }

    const { data } = await api.post('/authenticate', body)
    const { token } = data

    login(token)
    // volta o usuário para a página que ele tentou acessar,
    // se foi uma rota do app
    const { from } = location.state || { from: { pathname: '/' } }
    history.replace(from)
  }

  return (
    <>
      Usuário não logado
      <br />
      email:
      <input name="email" ref={emailInputRef} type="text" />
      <br />
      senha:
      <input name="password" ref={passwordInputRef} type="text" />
      <br />
      <button type="button" onClick={handleLogin}>
        Entrar
      </button>
    </>
  )
}

export default LoginPage
