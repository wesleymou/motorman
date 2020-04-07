
const Env = use('Env')
const Mail = use('Mail')

const config = {
  from: 'kyouko@gmail.com',
  sender: 'América Locomotiva',
}

module.exports = {
  /**
   * Sends a welcome message with the generated password
   * 
   * @param {object} data
   * @param {string} data.to
   * @param {string} data.nomeCompleto
   * @param {string} data.generatedPassword
   */
  sendWelcomeMessage: async function (data) {
    await Mail.send('Emails.password', data, (message) => {
      message
        .subject('Boas-vindas - América Locomotiva')
        .from(config.from, config.sender)
        .to(data.to, data.nomeCompleto)
    })
  },

  /**
   * Sends a password recovery link message
   * 
   * @param {object} data
   * @param {string} data.to
   * @param {string} data.apelido
   * @param {string} data.nomeCompleto
   * @param {string} data.url
   */
  sendPasswordRecoveryRequestMessage: async function (data) {
    await Mail.send('Emails.forgotPassword', data, message => {
      message
        .subject('Recuperação de senha - América Locomotiva')
        .from(config.from, config.sender)
        .to(data.to, data.nomeCompleto)
    })
  }

}