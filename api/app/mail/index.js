// const Env = use('Env')
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
   * @param {string} data.fullName
   * @param {string} data.generatedPassword
   */
  async sendWelcomeMessage(data) {
    await Mail.send('Emails.password', data, (message) => {
      message
        .subject('Boas-vindas - América Locomotiva')
        .from(config.from, config.sender)
        .to(data.to, data.fullName)
    })
  },

  /**
   * Sends a password recovery link message
   *
   * @param {object} data
   * @param {string} data.to
   * @param {string} data.nickname
   * @param {string} data.fullName
   * @param {string} data.url
   */
  async sendPasswordRecoveryRequestMessage(data) {
    await Mail.send('Emails.forgotPassword', data, (message) => {
      message
        .subject('Recuperação de senha - América Locomotiva')
        .from(config.from, config.sender)
        .to(data.to, data.fullName)
    })
  },
}
