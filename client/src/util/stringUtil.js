export const formatUserAddress = user => {
  const { cep, estado, cidade, endereco, numero, complemento } = user

  let value = `${endereco} ${numero}`

  if (complemento) {
    value += `, ${complemento}`
  }

  value += ` - ${cidade}, ${estado} - ${cep}`

  return value
}

export const formatPhoneNumber = (phone = '') => {
  if (phone.length === 10) {
    return `(${phone.substr(0, 2)}) ${phone.substr(2, 4)}-${phone.substr(6)}`
  }

  if (phone.length === 11) {
    return `(${phone.substr(0, 2)}) ${phone.substr(2, 5)}-${phone.substr(7)}`
  }

  return phone
}

export const formatCpf = cpf =>
  `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(6, 3)}-${cpf.substr(9)}`

export const formatNumber = (num = 0) => {
  return Number(num).toLocaleString('pt-br')
}

export default {
  formatUserAddress,
}
