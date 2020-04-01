"use strict";

const { test, trait } = use("Test/Suite")("Group");

trait("Test/ApiClient");
trait("DatabaseTransactions");
trait('Auth/Client')

const Database = use("Database");
const UserModel = require("../../app/Models/User");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

/** @type {typeof import('../../app/Models/Team')} */
const Team = use("App/Models/Team");

/** @type {typeof import('../../app/Models/User')} */
const User = use("App/Models/User");

/** @type {typeof import('../../app/Models/Group')} */
const Group = use("App/Models/Group");

test("cadastro de times", async ({ assert, client }) => {
  const data = await Factory.model("App/Models/Team").make();

  const response = await client
    .post("api/v1/team")
    .send({
      name: data.name,
      description: data.description
    })
    .end();

  const team = await Database.from("teams").where({
    name: data.name,
    description: data.description
  });

  response.assertStatus(201);
  assert.exists(team);
});

test("detalhe do time", async ({ assert, client }) => {
  const teamFactory = await Factory.model("App/Models/Team").create();
  const userFactory = await Factory.model("App/Models/User").create();
  const groupFactory = await Factory.model("App/Models/Group").create();
  const permissionFactory = await Factory.model(
    "App/Models/Permission"
  ).create();

  await groupFactory.permissions().attach(permissionFactory.id);
  await Database.insert({
    user_id: userFactory.id,
    team_id: teamFactory.id,
    group_id: groupFactory.id
  }).into("user_roles");

  const response = await client.get(`api/v1/team/${teamFactory.id}`).end();

  response.assertStatus(200);
  assert.containsAllDeepKeys(response.body, {
    ...teamFactory.toJSON(),
    groups: [{
      ...groupFactory.toJSON(),
      permissions: [permissionFactory.toJSON()],
      users: [userFactory.toJSON()]
    }]
  });
});

test("listagem de times", async ({ assert, client }) => {
  await Factory.model("App/Models/Team").createMany(5);

  const response = await client.get("api/v1/team/").end();

  const { body } = response;

  response.assertStatus(200);
  assert.isAtLeast(body.length, 5);
});

test("edicao de times", async ({ assert, client }) => {
  const team = await Factory.model("App/Models/Team").create();
  const newData = {
    name: "novo nome",
    description: "nova descricao"
  };

  const response = await client
    .put(`/api/v1/team/${team.id}`)
    .send(newData)
    .end();

  await team.reload();

  response.assertStatus(204);
  assert.containsAllDeepKeys(team, newData);
});

test("exclusao de times", async ({ assert, client }) => {
  const team = await Factory.model("App/Models/Team").create();

  const response = await client.delete(`/api/v1/team/${team.id}`).end();

  const teamVerify = await Team.find(team.id)

  response.assertStatus(204);
  assert.notExists(teamVerify);
});
