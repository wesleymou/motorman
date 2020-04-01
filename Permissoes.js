const Permissions_ = [
    {
        name: 'cadastrar usuarios',
        description: 'Permite cadastrar novos usuários'
    },
    {
        name: 'listar usuarios',
        description: 'Permite listar os usuários cadastrados'
    },
    {
        name: 'detalhar usuarios',
        description: 'Permite visualizar detalhes dos usuários cadastrados'
    },
    {
        name: 'editar usuarios',
        description: 'Permite editar informações dos usuários'
    },
    {
        name: 'excluir usuarios',
        description: 'Permite excluir usuários cadastrados'
    },
    {
        name: 'cadastrar times',
        description: 'Permite cadastrar novos times'
    },
    {
        name: 'listar times',
        description: 'Permite ver a lista de times cadastrados'
    },
    {
        name: 'detalhar time',
        description: 'Permite ver detalhes dos times'
    },
    {
        name: 'editar time',
        description: 'Permite editar o time'
    },
    {
        name: 'excluir time',
        description: 'Permite excluir os times cadastrados'
    }
]


const jsonTest = `
{
  "uid": 35,
  "data": {
    "user": {
      "id": 35,
      "username": "admin",
      "email": "admin@email.com",
      "created_at": "2020-03-26 17:36:46",
      "updated_at": "2020-03-26 17:36:46",
      "avatar": "https://www.gravatar.com/avatar/e806dcf8d4d7ee882390459f31d1a74f",
      "nomeCompleto": "Jennie Underwood",
      "apelido": "Carolyn",
      "telefone": "9932343357",
      "rg": "853116297",
      "cpf": "97190760709",
      "cep": "31487000",
      "estado": "CA",
      "cidade": "Zulpogo",
      "bairro": "sisuji",
      "endereco": "Rutlu Mill",
      "numero": 30704,
      "complemento": "RNGYV7GM",
      "peso": "74.30",
      "altura": 173,
      "dataNasc": "1979-11-23 09:52:04",
      "nomeResponsavel": "Clifford Chavez",
      "emailResponsavel": "sokud@mig.iq",
      "telefoneResponsavel": "6247433898",
      "grauParentescoResponsavel": "laali",
      "planoSaude": "ipmofdu",
      "sexo": "Male",
      "active": true,
      "teams": [
        {
          "name": "Administração",
          "groups": {
            "name": "Administrador",
            "permissions": [
              {
                "name": "cadastrar usuarios"
              },
              {
                "name": "listar usuarios"
              },
              {
                "name": "cadastrar times"
              }
            ]
          }
        }
      ]
    }
  },
  "iat": 1585255053
}
`

module.exports = Permissions_