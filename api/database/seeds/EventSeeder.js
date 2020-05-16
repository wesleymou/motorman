/*
|--------------------------------------------------------------------------
| LogSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const LogType = use('App/Models/LogType')

class LogSeeder {
  async run() {
    // const logTypes = await LogType.createMany([
    //   {
    //     name: "Chamada",
    //   },
    //   {
    //     name: "Jogo",
    //   },
    //   {
    //     name: "Treino",
    //   },
    // ]);
    // const events = await Factory.model("App/Models/Log").createMany(2);
    // const user = await Factory.model("App/Models/User").create();
    // // const users = await Factory.model('App/Models/User').createMany(3)
    // // const team = await Factory.model('App/Models/Team').create()
    // // await events[0].logType().associate(logTypes[0])
    // // await events[0].users().attach([user.id], (pivot) => {
    // //   // eslint-disable-next-line no-param-reassign
    // //   pivot.justification = 'vazio'
    // //   // eslint-disable-next-line no-param-reassign
    // //   pivot.points = '1'
    // //   // eslint-disable-next-line no-param-reassign
    // //   pivot.presence = true
    // // })
    // // await events[0].teams().attach([team.id])
    // // await events[1].logType().associate(logTypes[1])
    // // await events[1].users().attach([users[0].id, users[1].id, users[2].id])
  }
}

module.exports = LogSeeder
