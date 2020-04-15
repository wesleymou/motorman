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
  },
  {
    name: 'gerenciar grupos de permissao',
    description: 'Permite gerenciar os grupos de permissão'
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
      "fullName": "Jennie Underwood",
      "nickname": "Carolyn",
      "phone": "9932343357",
      "rg": "853116297",
      "cpf": "97190760709",
      "cep": "31487000",
      "state": "CA",
      "city": "Zulpogo",
      "neighborhood": "sisuji",
      "street": "Rutlu Mill",
      "number": 30704,
      "complement": "RNGYV7GM",
      "weight": "74.30",
      "height": 173,
      "dob": "1979-11-23 09:52:04",
      "emergencyName": "Clifford Chavez",
      "emergencyEmail": "sokud@mig.iq",
      "emergencyPhone": "6247433898",
      "emergencyConsanguinity": "laali",
      "healthInsurance": "ipmofdu",
      "sex": "Male",
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