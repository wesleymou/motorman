const permissions = require('./permissions')

class AccessControl {
  getPermissions() {
    return { ...permissions }
  }

  /**
   * Verifica se o usuário tem a permissão requerida
   * @param {User} user Usuário
   * @param {string} permission Permissão
   * @param {number} teamId Id do time que o usuário deve ter a permissão, se for o caso
   */
  userHasPermission(user, permission, teamId) {
    // user is admin
    if (user.group_id === 1) {
      return true
    }

    if (teamId && user.roles) {
      const role = user.roles.find((g) => g.team_id === teamId)
      if (role) {
        return role.permissions.some((p) => p.name === permission)
      }
    } else if (user.group && user.group.permissions) {
      return user.group.permissions.some((p) => p.name === permission)
    }

    return false
  }
}

module.exports = AccessControl
