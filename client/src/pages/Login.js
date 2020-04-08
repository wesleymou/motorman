import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { login } from '../services/auth'
import api from '../services/api'

import LoginForm from '../components/forms/LoginForm'
import LoginLayout from '../layout/LoginLayout'

function Login() {
  const history = useHistory()
  const location = useLocation()

  const handleLogin = async values => {
    const { data } = await api.post('/authenticate', values)
    const { token } = data

    login(token)

    // volta o usuário para a página que ele tentou acessar,
    // se foi uma rota do app
    const { from } = location.state || { from: { pathname: '/' } }
    history.replace(from)
  }

  return (
    <LoginLayout>
      <LoginForm onSubmit={handleLogin} />
    </LoginLayout>
  )
}

export default Login
