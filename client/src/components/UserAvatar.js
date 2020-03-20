import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'

function UserAvatar({ user, size = 32 }) {
  const style = {
    width: size,
    height: size,
    fontSize: size * 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <Avatar
      style={style}
      src={user.avatar || `https://api.adorable.io/avatars/285/${user.email}`}
    />
  )
}

UserAvatar.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    nomeCompleto: PropTypes.string,
  }).isRequired,
  size: PropTypes.number,
}

UserAvatar.defaultProps = {
  size: 32,
}

export default UserAvatar
