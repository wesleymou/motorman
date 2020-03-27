import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

function UserStatusTag({ user }) {
  return <Tag color={user.active ? 'blue' : 'red'}>{user.active ? 'Ativo' : 'Inativo'}</Tag>
}

UserStatusTag.propTypes = {
  user: PropTypes.shape({
    active: PropTypes.bool,
  }).isRequired,
}

export default UserStatusTag
