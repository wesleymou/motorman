"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Group extends Model {
  /** @type {string} */
  name;
  /** @type {string} */
  description;

  /**
   * @method permissions
   * @return {typeof import('@adonisjs/lucid/src/Lucid/Relations/BelongsToMany')}
   */
  permissions() {
    return this.belongsToMany(
      "App/Models/Permission",
      "group_id",
      "permission_id",
      "id",
      "id"
    );
  }

  /**
   * @method userRoles
   * @return {typeof import('@adonisjs/lucid/src/Lucid/Relations/BelongsTo')}
   */
  userRoles() {
    return this.belongsTo("App/Models/UserRole");
  }

  /**
   * @method users
   * @return {Object}
   */
  users() {
    return this.manyThrough("App/Models/UserRole", "user", "id", "group_id");
  }
}

module.exports = Group;
