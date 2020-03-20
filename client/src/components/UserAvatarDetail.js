import React from 'react'
import PropTypes from 'prop-types'

const style = {
  height: 60,
  width: 60,
  borderRadius: '50%',
  backgroundColor: '',
}

function UserAvatarDetail({ user }) {
  return user.avatar ? (
    <img style={style} src={user.avatar} alt="Avatar" />
  ) : (
    <div style={style}>{user.nomeCompleto[0]}</div>
  )
}

UserAvatarDetail.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    nomeCompleto: PropTypes.string,
  }).isRequired,
}

export default UserAvatarDetail
