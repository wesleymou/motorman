import React from 'react'
import PropTypes from 'prop-types'

function EditUserForm({ user }) {
  return <div>Editar usuário {user.nomeCompleto}</div>
}

EditUserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string,
    nomeCompleto: PropTypes.string,
    apelido: PropTypes.string,
    telefone: PropTypes.string,
    rg: PropTypes.string,
    cpf: PropTypes.string,
    cep: PropTypes.string,
    estado: PropTypes.string,
    cidade: PropTypes.string,
    bairro: PropTypes.string,
    endereco: PropTypes.string,
    numero: PropTypes.number,
    complemento: PropTypes.string,
    peso: PropTypes.number,
    altura: PropTypes.number,
    dataNasc: PropTypes.string,
    nomeResponsavel: PropTypes.string,
    emailResponsavel: PropTypes.string,
    telefoneResponsavel: PropTypes.string,
    grauParentescoResponsavel: PropTypes.string,
    planoSaude: PropTypes.string,
    sexo: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
}

export default EditUserForm
